import { useState } from "react";
import { Modal, Typography, Tabs, Badge } from "antd";
import { CloudUploadOutlined, PictureOutlined } from "@ant-design/icons";
import { ITipoImagen } from "@/features/private/inspeccion/inspecciones/interfaces";
import { useQuery } from "@tanstack/react-query";
import { getTiposImagenes } from "@/features/private/inspeccion/inspecciones/services/inspecciones.services";
import { TabGaleria } from "./TabGaleria";
import { TabCargaFaltantes } from "./TabCargaFaltantes";

const { Title } = Typography;
const { TabPane } = Tabs;

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

  const [refreshZonesKey, setRefreshZonesKey] = useState(0);

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

  const handleClose = () => {
    setActiveTab("gallery");
    onClose();
  };

  const notifyRefreshZones = () => {
    setRefreshZonesKey((prev) => prev + 1);
  };

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
          <TabGaleria
            isActive={activeTab === "gallery"}
            currentInspeccionId={currentInspeccionId}
            tiposImagenes={tiposImagenes}
            isLoadingTipos={isLoadingTipos}
            getImagenPorTipo={getImagenPorTipo}
            onRefreshZones={notifyRefreshZones}
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Badge dot={false} offset={[4, 0]}>
                <CloudUploadOutlined />
              </Badge>
              Cargar Fotos Faltantes
            </span>
          }
          key="upload"
        >
          <TabCargaFaltantes
            refreshTrigger={refreshZonesKey}
            currentInspeccionId={currentInspeccionId}
            tiposImagenes={tiposImagenes}
            getImagenPorTipo={getImagenPorTipo}
          />
        </TabPane>
      </Tabs>
    </Modal>
  );
};
