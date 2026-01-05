import { useState } from "react";
import { Modal, Select, Spin, Empty, Image, Button } from "antd";
import Swal from "sweetalert2";
import { ITipoImagen } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  isModalOpen: boolean;
  onClose: () => void;
  currentInspeccionId: number | null;
  tiposImagenes: ITipoImagen[];
  isLoadingTipos: boolean;
  getImagenPorTipo: (
    inspeccionId: number,
    tipoImagenId: number
  ) => Promise<any>;
}

export const ModalImagenesInspeccion = ({
  isModalOpen,
  onClose,
  currentInspeccionId,
  tiposImagenes,
  isLoadingTipos,
  getImagenPorTipo,
}: Props) => {
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [imageList, setImageList] = useState<any[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);

  const handleTypeChange = async (tipoId: number) => {
    if (!currentInspeccionId) return;

    setSelectedTypeId(tipoId);
    setLoadingImages(true);
    setImageList([]);

    try {
      const res = await getImagenPorTipo(currentInspeccionId, tipoId);

      const responseData = res?.data?.imagenes || [];

      const validImages = Array.isArray(responseData)
        ? responseData.filter(
            (img: any) => typeof img === "string" && img.length > 0
          )
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
    // Resetear estados al cerrar
    setSelectedTypeId(null);
    setImageList([]);
    onClose();
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
              {imageList.map((imgSrc, idx) => (
                <Image
                  key={idx}
                  width={200}
                  src={imgSrc}
                  alt={`Evidencia ${idx + 1}`}
                  style={{ objectFit: "contain", maxHeight: "300px" }}
                />
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
