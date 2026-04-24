import { useState, useEffect } from "react";
import { Spin, Button, Card, Typography, Badge, Tooltip, Row, Col } from "antd";
import {
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
import { uploadImagenesRetroactivas } from "@/features/private/inspeccion/inspecciones/services/inspecciones.services";
import { useQueryClient } from "@tanstack/react-query";

const { Text } = Typography;

interface Props {
  currentInspeccionId: number | null;
  tiposImagenes: ITipoImagen[];
  getImagenPorTipo: (
    inspeccionId: number,
    tipoImagenId: number,
  ) => Promise<any>;
  onUploadSuccess?: () => void;
  refreshTrigger?: number;
}

export const TabCargaFaltantes = ({
  currentInspeccionId,
  tiposImagenes,
  getImagenPorTipo,
  onUploadSuccess,
  refreshTrigger,
}: Props) => {
  const [uploadZones, setUploadZones] = useState<IUploadZone[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [loadingZones, setLoadingZones] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    current: number;
    total: number;
  } | null>(null);
  const queryClient = useQueryClient();

  const loadZonesResumen = async (clearLocalFiles: boolean = false) => {
    if (!currentInspeccionId || !tiposImagenes.length) return;

    setLoadingZones(true);

    try {
      const results: IUploadZone[] = await Promise.all(
        tiposImagenes.map(async (tipo) => {
          try {
            const res = await getImagenPorTipo(currentInspeccionId, tipo.id);
            const count = res?.data?.imagenes?.length || 0;
            return {
              tipoImagen: tipo,
              archivos: [],
              totalActual: count,
              estado: (count > 0
                ? "con-fotos"
                : "vacio") as IUploadZone["estado"],
            };
          } catch (e) {
            return {
              tipoImagen: tipo,
              archivos: [],
              totalActual: 0,
              estado: "vacio" as const,
            };
          }
        }),
      );

      setUploadZones((prev) => {
        return results
          .map((newZone) => {
            const existing = prev.find(
              (p) => p.tipoImagen.id === newZone.tipoImagen.id,
            );
            if (!clearLocalFiles && existing && existing.archivos.length > 0) {
              return {
                ...newZone,
                archivos: existing.archivos,
                estado: "pendiente-subida" as const,
              };
            }
            return newZone;
          })
          .sort((a, b) => a.tipoImagen.orden - b.tipoImagen.orden);
      });
    } catch (error) {
      console.error("Error cargando resumen de zonas", error);
    } finally {
      setLoadingZones(false);
    }
  };

  useEffect(() => {
    if (tiposImagenes.length > 0) {
      loadZonesResumen(true);
    }
  }, [tiposImagenes, refreshTrigger, currentInspeccionId]);

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

    const totalFiles = zonesWithFiles.reduce(
      (acc, zone) => acc + zone.archivos.length,
      0,
    );
    let currentCount = 0;

    setIsUploading(true);
    setUploadProgress({ current: 0, total: totalFiles });

    try {
      for (const zone of zonesWithFiles) {
        for (const file of zone.archivos) {
          const formData = new FormData();
          formData.append("image", file);
          formData.append("tipoImagenId", zone.tipoImagen.id.toString());
          formData.append("tipoImagenNombre", zone.tipoImagen.nombre);

          await uploadImagenesRetroactivas(currentInspeccionId!, formData);

          currentCount++;
          setUploadProgress({ current: currentCount, total: totalFiles });
        }
      }

      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Las fotos han sido cargadas correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });

      await queryClient.invalidateQueries({
        queryKey: ["imagen-inspeccion", currentInspeccionId],
      });

      loadZonesResumen(true);
      if (onUploadSuccess) onUploadSuccess();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar todas las fotos. Verifica tu conexión e inténtalo de nuevo.",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
    }
  };

  return (
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
            Las categorías en{" "}
            <span style={{ color: "#ea580c", fontWeight: "600" }}>naranja</span>{" "}
            no tienen fotos. Haz clic en una zona para seleccionar archivos o
            arrástralos directamente.
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
        {loadingZones && uploadZones.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <Spin description="Analizando zonas vacías..." size="large" />
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
                          document
                            .getElementById(`file-${zone.tipoImagen.id}`)
                            ?.click()
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
                                    <PictureOutlined
                                      style={{ color: "#3b82f6" }}
                                    />
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
          {isUploading
            ? `Subiendo (${uploadProgress?.current || 0}/${uploadProgress?.total || 0})...`
            : "Subir todas las fotos"}
        </Button>
      </div>
    </div>
  );
};
