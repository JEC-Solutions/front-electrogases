import { useState, useEffect } from "react";
import {
  Select,
  Spin,
  Empty,
  Image,
  Button,
  Card,
  Popover,
  Typography,
} from "antd";
import {
  EditOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import {
  ITipoImagen,
  IImagenItem,
} from "@/features/private/inspeccion/inspecciones/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  changeImageType,
  deleteImagenInspeccion,
} from "@/features/private/inspeccion/inspecciones/services/inspecciones.services";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

const { Text } = Typography;
dayjs.extend(utc);

interface Props {
  currentInspeccionId: number | null;
  tiposImagenes: ITipoImagen[];
  isLoadingTipos: boolean;
  getImagenPorTipo: (
    inspeccionId: number,
    tipoImagenId: number,
  ) => Promise<any>;
  onRefreshZones?: () => void;
  isActive: boolean;
}

export const TabGaleria = ({
  currentInspeccionId,
  tiposImagenes,
  isLoadingTipos,
  getImagenPorTipo,
  onRefreshZones,
  isActive,
}: Props) => {
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [imageList, setImageList] = useState<IImagenItem[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isActive) {
      setSelectedTypeId(null);
      setImageList([]);
    }
  }, [isActive]);

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
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["imagen-inspeccion", currentInspeccionId],
      });

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
      if (onRefreshZones) onRefreshZones();
      if (selectedTypeId) handleTypeChange(selectedTypeId);
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

  const deleteImagenMutation = useMutation({
    mutationFn: async (imagenId: number) => {
      return await deleteImagenInspeccion(imagenId);
    },
    onSuccess: async (_, imagenId) => {
      await queryClient.invalidateQueries({
        queryKey: ["imagen-inspeccion", currentInspeccionId],
      });

      setImageList((prev) => prev.filter((img) => img.id !== imagenId));

      Swal.fire({
        icon: "success",
        title: "Imagen eliminada",
        text: "La imagen ha sido eliminada correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });
      if (onRefreshZones) onRefreshZones();
      if (selectedTypeId) handleTypeChange(selectedTypeId);
    },
    onError: (error: any) => {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar la imagen.",
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

  const handleDeleteImage = (imagenId: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto! Se eliminará el registro y el archivo físico.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteImagenMutation.mutate(imagenId);
      }
    });
  };

  const formatFecha = (dateStr: string) => {
    return dayjs.utc(dateStr).format("DD/MM/YYYY");
  };

  const formatHora = (dateStr: string) => {
    return dayjs.utc(dateStr).format("HH:mm:ss");
  };

  return (
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
                      styles={{ root: { width: "100%" } }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 10,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
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
                        <Button
                          shape="circle"
                          danger
                          icon={
                            deleteImagenMutation.isPending &&
                            deleteImagenMutation.variables === img.id ? (
                              <Spin size="small" />
                            ) : (
                              <DeleteOutlined />
                            )
                          }
                          onClick={() => handleDeleteImage(img.id)}
                          style={{
                            boxShadow: "0 2px 8px rgba(255,0,0,0.15)",
                            backgroundColor: "white",
                          }}
                        />
                      </div>
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
};
