import { useState } from "react";
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
} from "antd";
import {
  EditOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import { ITipoImagen } from "@/features/private/inspeccion/inspecciones/interfaces";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getTiposImagenes,
  changeImageType,
} from "@/features/private/inspeccion/inspecciones/services/inspecciones.services";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

const { Text } = Typography;
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
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [imageList, setImageList] = useState<IImagenItem[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);

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
      // Remover la imagen de la lista actual ya que cambió de tipo
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

  const handleClose = () => {
    setSelectedTypeId(null);
    setImageList([]);
    onClose();
  };

  const formatFecha = (dateStr: string) => {
    return dayjs.utc(dateStr).format("DD/MM/YYYY");
  };

  const formatHora = (dateStr: string) => {
    return dayjs.utc(dateStr).format("HH:mm:ss");
  };

  return (
    <Modal
      title={
        <span
          style={{ fontSize: "1.2rem", fontWeight: "600", color: "#1a3353" }}
        >
          Visualizador de Imágenes
        </span>
      }
      open={isModalOpen}
      onCancel={handleClose}
      centered
      footer={[
        <Button
          key="close"
          type="primary"
          onClick={handleClose}
          style={{ borderRadius: "6px" }}
        >
          Cerrar
        </Button>,
      ]}
      width={850}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          paddingTop: "10px",
        }}
      >
        {/* 1. SELECCIONADOR DE TIPO */}
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

        {/* 2. ÁREA DE VISUALIZACIÓN */}
        <div
          style={{
            minHeight: "400px",
            maxHeight: "60vh",
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
    </Modal>
  );
};
