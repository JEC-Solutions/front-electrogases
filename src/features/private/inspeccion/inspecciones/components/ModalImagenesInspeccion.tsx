import { useState, useEffect } from "react";
import {
  Modal,
  Select,
  Spin,
  Empty,
  Image,
  Button,
  Card,
  Popover,
  Typography,
  Tabs,
  Badge,
  Tooltip,
  Row,
  Col,
} from "antd";
import {
  EditOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CloudUploadOutlined,
  PictureOutlined,
  CheckCircleFilled,
  DeleteOutlined,
  InfoCircleOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import {
  ITipoImagen,
  IUploadZone,
} from "@/features/private/inspeccion/inspecciones/interfaces";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getTiposImagenes,
  changeImageType,
  uploadImagenesRetroactivas,
} from "@/features/private/inspeccion/inspecciones/services/inspecciones.services";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

const { Text, Title } = Typography;
const { TabPane } = Tabs;
dayjs.extend(utc);

interface IImagenItem {
  id: number;
  nombre_archivo: string;
  tipo_mime: string;
  base64: string;
  created_at: string;
  hora_registro: string | null;
}

interface Props {
  isModalOpen: boolean;
  onClose: () => void;
  currentInspeccionId: number | null;
  currentTipoInspeccion: number | null;
  getImagenPorTipo: (
    inspeccionId: number,
    tipoImagenId: number,
  ) => Promise<any>;
}

export const ModalImagenesInspeccion = ({
  isModalOpen,
  onClose,
  currentInspeccionId,
  currentTipoInspeccion,
  getImagenPorTipo,
}: Props) => {
  const [activeTab, setActiveTab] = useState("gallery");
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [imageList, setImageList] = useState<IImagenItem[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);

  // Estado para la carga retroactiva
  const [uploadZones, setUploadZones] = useState<IUploadZone[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const { data: tiposImagenes = [], isLoading: isLoadingTipos } = useQuery<
    ITipoImagen[]
  >({
    queryKey: ["tipos-imagenes-modal", currentTipoInspeccion],
    queryFn: async () => {
      if (!currentTipoInspeccion) return [];
      try {
        const { data } = await getTiposImagenes(currentTipoInspeccion);
        return data?.data?.tipos_imagen || [];
      } catch (error) {
        console.error("Error cargando tipos de imágenes", error);
        return [];
      }
    },
    enabled: !!currentTipoInspeccion && isModalOpen,
    staleTime: 1000 * 60 * 5,
  });

  // Cargar resumen de zonas cuando se entra a la pestaña de carga
  const loadZonesResumen = async () => {
    if (!currentInspeccionId || !tiposImagenes.length) return;

    setLoadingImages(true);

    try {
      const results = await Promise.all(
        tiposImagenes.map(async (tipo) => {
          try {
            const res = await getImagenPorTipo(currentInspeccionId, tipo.id);
            const count = res?.data?.imagenes?.length || 0;
            return {
              tipoImagen: tipo,
              archivos: [],
              totalActual: count,
              estado: (count > 0 ? "con-fotos" : "vacio") as any,
            };
          } catch (e) {
            return {
              tipoImagen: tipo,
              archivos: [],
              totalActual: 0,
              estado: "vacio" as any,
            };
          }
        }),
      );

      setUploadZones(results.sort((a, b) => a.tipoImagen.orden - b.tipoImagen.orden));
    } catch (error) {
      console.error("Error cargando resumen de zonas", error);
    } finally {
      setLoadingImages(false);
    }
  };

  useEffect(() => {
    if (activeTab === "upload" && isModalOpen && tiposImagenes.length > 0) {
      loadZonesResumen();
    }
  }, [activeTab, isModalOpen, tiposImagenes]);

  const changeTypeMutation = useMutation({
    mutationFn: async ({
      imagenId,
      nuevoTipoId,
    }: {
      imagenId: number;
      nuevoTipoId: number;
    }) => {
      return await changeImageType(imagenId, nuevoTipoId);
    },
    onSuccess: (_, variables) => {
      setImageList((prev) =>
        prev.filter((img) => img.id !== variables.imagenId),
      );

      Swal.fire({
        icon: "success",
        title: "Tipo actualizado",
        text: "La imagen ha sido movida al nuevo tipo correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error: any) => {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el tipo de la imagen.",
      });
    },
  });

  const handleUpdateImageType = (imagenId: number, nuevoTipoId: number) => {
    if (nuevoTipoId === selectedTypeId) return;

    Swal.fire({
      title: "¿Cambiar tipo de imagen?",
      text: "La imagen se moverá a la nueva categoría seleccionada.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        changeTypeMutation.mutate({ imagenId, nuevoTipoId });
      }
    });
  };

  const handleTypeChange = async (tipoId: number) => {
    if (!currentInspeccionId) return;

    setSelectedTypeId(tipoId);
    setLoadingImages(true);
    setImageList([]);

    try {
      const res = await getImagenPorTipo(currentInspeccionId, tipoId);
      const responseData = res?.data?.imagenes || [];

      const validImages: IImagenItem[] = Array.isArray(responseData)
        ? responseData
            .filter(
              (img: any) =>
                img &&
                typeof img === "object" &&
                typeof img.base64 === "string" &&
                img.base64.length > 0,
            )
            .map((img: any) => ({
              ...img,
              hora_registro: img.hora_registro || null,
            }))
        : [];

      setImageList(validImages);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al intentar conectar con el servidor.",
        confirmButtonText: "Entendido",
      });
    } finally {
      setLoadingImages(false);
    }
  };

  const handleFileSelect = (tipoId: number, files: FileList | null) => {
    if (!files) return;
    const filesArray = Array.from(files);

    setUploadZones((prev) =>
      prev.map((zone) => {
        if (zone.tipoImagen.id === tipoId) {
          return {
            ...zone,
            archivos: [...zone.archivos, ...filesArray],
            estado: "pendiente-subida",
          };
        }
        return zone;
      }),
    );
  };

  const removeFile = (tipoId: number, fileIndex: number) => {
    setUploadZones((prev) =>
      prev.map((zone) => {
        if (zone.tipoImagen.id === tipoId) {
          const newFiles = [...zone.archivos];
          newFiles.splice(fileIndex, 1);
          return {
            ...zone,
            archivos: newFiles,
            estado:
              newFiles.length > 0
                ? "pendiente-subida"
                : zone.totalActual > 0
                ? "con-fotos"
                : "vacio",
          };
        }
        return zone;
      }),
    );
  };

  const handleBulkUpload = async () => {
    const zonesWithFiles = uploadZones.filter((z) => z.archivos.length > 0);
    if (zonesWithFiles.length === 0) return;

    setIsUploading(true);
    const formData = new FormData();
    const mappings: any[] = [];

    zonesWithFiles.forEach((zone) => {
      zone.archivos.forEach((file) => {
        formData.append("images", file);
        mappings.push({
          fileName: file.name,
          tipoImagenId: zone.tipoImagen.id,
          tipoImagenNombre: zone.tipoImagen.nombre,
        });
      });
    });

    formData.append("fileMappings", JSON.stringify(mappings));

    try {
      await uploadImagenesRetroactivas(currentInspeccionId!, formData);
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Las fotos han sido cargadas correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });
      loadZonesResumen();
      // Si estamos en galería y es el tipo seleccionado, recargar
      if (selectedTypeId) handleTypeChange(selectedTypeId);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar las fotos.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setSelectedTypeId(null);
    setImageList([]);
    setActiveTab("gallery");
    setUploadZones([]);
    onClose();
  };

  const formatFecha = (dateStr: string) => {
    return dayjs.utc(dateStr).format("DD/MM/YYYY");
  };

  const formatHora = (dateStr: string) => {
    return dayjs.utc(dateStr).format("HH:mm:ss");
  };

  const renderGallery = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        paddingTop: "10px",
      }}
    >
      <Card
        size="small"
        style={{
          borderRadius: "12px",
          border: "1px solid #eef2f6",
          backgroundColor: "#f8fafc",
        }}
      >
        <label
          style={{
            display: "block",
            marginBottom: "10px",
            fontWeight: "600",
            color: "#475569",
          }}
        >
          Seleccione la categoría de imagen:
        </label>
        <Select
          style={{ width: "100%" }}
          placeholder="Seleccione un tipo de imagen"
          loading={isLoadingTipos}
          onChange={handleTypeChange}
          value={selectedTypeId}
          size="large"
          options={tiposImagenes.map((tipo) => ({
            label: `${tipo.descripcion}`,
            value: tipo.id,
          }))}
          dropdownStyle={{ borderRadius: "8px" }}
        />
      </Card>

      <div
        style={{
          minHeight: "400px",
          maxHeight: "50vh",
          overflowY: "auto",
          borderRadius: "16px",
          display: "flex",
          justifyContent: "center",
          alignItems: imageList.length > 0 ? "flex-start" : "center",
          backgroundColor: "#f1f5f9",
          padding: "24px",
          border: "1px solid #e2e8f0",
        }}
      >
        {loadingImages ? (
          <div style={{ textAlign: "center" }}>
            <Spin tip="Cargando galería..." size="large" />
          </div>
        ) : !selectedTypeId ? (
          <Empty description="Por favor, selecciona una categoría para ver las fotos" />
        ) : imageList.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "20px",
              width: "100%",
            }}
          >
            {imageList.map((img) => (
              <Card
                key={img.id}
                hoverable
                cover={
                  <div
                    style={{
                      position: "relative",
                      height: "180px",
                      overflow: "hidden",
                      backgroundColor: "#000",
                    }}
                  >
                    <Image
                      src={img.base64}
                      alt={img.nombre_archivo}
                      style={{
                        height: "180px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      wrapperStyle={{ width: "100%" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 10,
                      }}
                    >
                      <Popover
                        content={
                          <div style={{ width: 220 }}>
                            <p style={{ marginBottom: 8, fontWeight: 600 }}>
                              Cambiar categoría:
                            </p>
                            <Select
                              style={{ width: "100%" }}
                              size="small"
                              placeholder="Elegir nuevo tipo"
                              value={selectedTypeId}
                              onChange={(val) =>
                                handleUpdateImageType(img.id, val)
                              }
                              options={tiposImagenes.map((tipo) => ({
                                label: tipo.descripcion,
                                value: tipo.id,
                              }))}
                            />
                          </div>
                        }
                        title="Gestionar Imagen"
                        trigger="click"
                        placement="bottomRight"
                      >
                        <Button
                          shape="circle"
                          icon={
                            changeTypeMutation.isPending &&
                            changeTypeMutation.variables?.imagenId ===
                              img.id ? (
                              <Spin size="small" />
                            ) : (
                              <EditOutlined />
                            )
                          }
                          type="primary"
                          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
                        />
                      </Popover>
                    </div>
                  </div>
                }
                styles={{ body: { padding: "12px" } }}
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <CalendarOutlined style={{ color: "#64748b" }} />
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      {formatFecha(img.created_at)}
                    </Text>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <ClockCircleOutlined style={{ color: "#64748b" }} />
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      {img.hora_registro || formatHora(img.created_at)}
                    </Text>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Empty description="No se encontraron imágenes en esta categoría" />
        )}
      </div>
    </div>
  );

  const renderUpload = () => (
    <div style={{ paddingTop: "10px" }}>
      <div
        style={{
          marginBottom: "20px",
          padding: "12px 16px",
          backgroundColor: "#fff7ed",
          borderRadius: "8px",
          border: "1px solid #fed7aa",
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <InfoCircleOutlined style={{ color: "#ea580c", marginTop: "4px" }} />
        <div>
          <Text strong style={{ color: "#9a3412" }}>
            Carga Retroactiva de Fotos
          </Text>
          <br />
          <Text type="secondary" style={{ fontSize: "13px" }}>
            Las categorías en <span style={{ color: "#ea580c", fontWeight: "600" }}>naranja</span> no tienen fotos.
            Haz clic en una zona para seleccionar archivos o arrástralos directamente.
          </Text>
        </div>
      </div>

      <div
        style={{
          maxHeight: "55vh",
          overflowY: "auto",
          padding: "4px",
        }}
      >
        {loadingImages && uploadZones.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <Spin tip="Analizando zonas vacías..." size="large" />
          </div>
        ) : (
          <Row gutter={[16, 16]}>
            {uploadZones.map((zone) => {
              const isEmpty = zone.totalActual === 0;
              const hasSelected = zone.archivos.length > 0;

              return (
                <Col xs={24} sm={12} md={8} key={zone.tipoImagen.id}>
                  <Card
                    size="small"
                    hoverable
                    style={{
                      borderRadius: "12px",
                      border: hasSelected
                        ? "2px solid #3b82f6"
                        : isEmpty
                        ? "2px dashed #fbbf24"
                        : "1px solid #e2e8f0",
                      backgroundColor: hasSelected
                        ? "#eff6ff"
                        : isEmpty
                        ? "#fffbeb"
                        : "#f8fafc",
                      transition: "all 0.3s ease",
                    }}
                    styles={{ body: { padding: 0 } }}
                  >
                    <div
                      style={{
                        padding: "12px",
                        position: "relative",
                        minHeight: "140px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "8px",
                        }}
                      >
                        <Badge
                          status={isEmpty ? "warning" : "success"}
                          text={
                            <Text strong style={{ fontSize: "13px" }}>
                              {zone.tipoImagen.descripcion}
                            </Text>
                          }
                        />
                        {zone.totalActual > 0 && (
                          <Tooltip title={`${zone.totalActual} fotos en BD`}>
                            <Badge
                              count={zone.totalActual}
                              style={{ backgroundColor: "#10b981" }}
                            />
                          </Tooltip>
                        )}
                      </div>

                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                          padding: "10px",
                        }}
                        onClick={() =>
                          document.getElementById(`file-${zone.tipoImagen.id}`)?.click()
                        }
                      >
                        <input
                          type="file"
                          id={`file-${zone.tipoImagen.id}`}
                          multiple
                          hidden
                          accept="image/*"
                          onChange={(e) =>
                            handleFileSelect(zone.tipoImagen.id, e.target.files)
                          }
                        />

                        {hasSelected ? (
                          <div style={{ width: "100%" }}>
                            <Text
                              style={{
                                display: "block",
                                textAlign: "center",
                                fontSize: "12px",
                                color: "#3b82f6",
                                marginBottom: "8px",
                              }}
                            >
                              {zone.archivos.length} archivos para subir
                            </Text>
                            <div
                              style={{
                                display: "flex",
                                gap: "4px",
                                overflowX: "auto",
                                padding: "4px 0",
                              }}
                            >
                              {zone.archivos.map((_file, idx) => (
                                <div
                                  key={idx}
                                  style={{
                                    position: "relative",
                                    width: "40px",
                                    height: "40px",
                                    flexShrink: 0,
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      borderRadius: "4px",
                                      backgroundColor: "#dbeafe",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      overflow: "hidden",
                                      border: "1px solid #bfdbfe",
                                    }}
                                  >
                                    <PictureOutlined style={{ color: "#3b82f6" }} />
                                  </div>
                                  <div
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeFile(zone.tipoImagen.id, idx);
                                    }}
                                    style={{
                                      position: "absolute",
                                      top: -4,
                                      right: -4,
                                      backgroundColor: "#ef4444",
                                      color: "white",
                                      borderRadius: "50%",
                                      width: "14px",
                                      height: "14px",
                                      fontSize: "10px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <DeleteOutlined style={{ fontSize: 8 }} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : isEmpty ? (
                          <>
                            <CameraOutlined
                              style={{
                                fontSize: "28px",
                                color: "#fbbf24",
                                marginBottom: "8px",
                              }}
                            />
                            <Text type="secondary" style={{ fontSize: "12px" }}>
                              Haz clic para cargar
                            </Text>
                          </>
                        ) : (
                          <>
                            <CheckCircleFilled
                              style={{
                                fontSize: "24px",
                                color: "#10b981",
                                marginBottom: "4px",
                              }}
                            />
                            <Text type="secondary" style={{ fontSize: "11px" }}>
                              Completado
                            </Text>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </div>

      <div
        style={{
          marginTop: "24px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          type="primary"
          size="large"
          icon={<CloudUploadOutlined />}
          loading={isUploading}
          disabled={uploadZones.every((z) => z.archivos.length === 0)}
          onClick={handleBulkUpload}
          style={{
            borderRadius: "8px",
            height: "45px",
            padding: "0 30px",
            boxShadow: "0 4px 10px rgba(59, 130, 246, 0.3)",
          }}
        >
          {isUploading ? "Subiendo fotos..." : "Subir todas las fotos"}
        </Button>
      </div>
    </div>
  );

  return (
    <Modal
      title={
        <Title level={4} style={{ margin: 0, color: "#1a3353" }}>
          Gestión de Imágenes de Inspección
        </Title>
      }
      open={isModalOpen}
      onCancel={handleClose}
      centered
      footer={null}
      width={1000}
      styles={{ body: { padding: "12px 24px 24px" } }}
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        animated={{ inkBar: true, tabPane: true }}
        tabBarStyle={{ marginBottom: "20px" }}
      >
        <TabPane
          tab={
            <span>
              <PictureOutlined />
              Galería
            </span>
          }
          key="gallery"
        >
          {renderGallery()}
        </TabPane>
        <TabPane
          tab={
            <span>
              <Badge
                dot={uploadZones.some((z) => z.archivos.length > 0)}
                offset={[4, 0]}
              >
                <CloudUploadOutlined />
              </Badge>
              Cargar Fotos Faltantes
            </span>
          }
          key="upload"
        >
          {renderUpload()}
        </TabPane>
      </Tabs>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Button onClick={handleClose} type="default" style={{ borderRadius: '6px' }}>
          Cerrar
        </Button>
      </div>
    </Modal>
  );
};

