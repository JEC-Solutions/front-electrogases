import { useState } from "react";
import { Modal, Select, Spin, Empty, Image, Button } from "antd";
import Swal from "sweetalert2";
import { ITipoImagen } from "@/features/private/inspeccion/inspecciones/interfaces";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getTiposImagenes, changeImageType } from "@/features/private/inspeccion/inspecciones/services/inspecciones.services";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

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
      setImageList((prev) => prev.filter((img) => img.id !== variables.imagenId));

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
    return dayjs.utc(dateStr).format("DD/MM/YYYY, HH:mm:ss");
  };

  return (
    <Modal
      title="Visualizador de Imágenes"
      open={isModalOpen}
      onCancel={handleClose}
      footer={[
        <Button key="close" onClick={handleClose}>
          Cerrar
        </Button>,
      ]}
      width={700}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* 1. SELECCIONADOR DE TIPO */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Seleccione el tipo de imagen a visualizar:
          </label>
          <Select
            style={{ width: "100%" }}
            placeholder="Ej: Foto Fachada, Firma..."
            loading={isLoadingTipos}
            onChange={handleTypeChange}
            value={selectedTypeId}
            options={tiposImagenes.map((tipo) => ({
              label: `${tipo.descripcion}`,
              value: tipo.id,
            }))}
          />
        </div>

        {/* 2. ÁREA DE VISUALIZACIÓN */}
        <div
          style={{
            minHeight: "300px",
            border: "1px dashed #d9d9d9",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fafafa",
            padding: "20px",
          }}
        >
          {loadingImages ? (
            <Spin tip="Cargando imagen..." size="large" />
          ) : !selectedTypeId ? (
            <Empty description="Seleccione un tipo de imagen arriba" />
          ) : imageList.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              {imageList.map((img) => (
                <div
                  key={img.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <Image
                    width={200}
                    src={img.base64}
                    alt={img.nombre_archivo}
                    style={{ objectFit: "contain", maxHeight: "300px" }}
                  />
                  <span style={{ fontSize: "11px", color: "#888" }}>
                    {formatFecha(img.created_at)}
                  </span>
                  {img.hora_registro && (
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "#1890ff",
                      }}
                    >
                      Hora: {img.hora_registro}
                    </span>
                  )}
                  <div style={{ width: "100%", marginTop: "8px" }}>
                    <Select
                      size="small"
                      style={{ width: "100%" }}
                      placeholder="Cambiar tipo"
                      value={selectedTypeId}
                      loading={changeTypeMutation.isPending && changeTypeMutation.variables?.imagenId === img.id}
                      onChange={(val) => handleUpdateImageType(img.id, val)}
                      options={tiposImagenes.map((tipo) => ({
                        label: tipo.descripcion,
                        value: tipo.id,
                      }))}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Empty description="No hay imágenes para este tipo" />
          )}
        </div>
      </div>
    </Modal>
  );
};
