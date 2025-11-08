import React from "react";
import {
  Modal,
  List,
  Tag,
  Spin,
  Empty,
  Alert,
  Space,
  Button,
  Typography,
  Divider,
} from "antd";
import type { IRutaHistorial } from "@/features/private/inspeccion/rutas/hooks";

type Props = {
  open: boolean;
  onClose: () => void;
  historial?: IRutaHistorial;
  loading: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
};

const { Text } = Typography;

const formatDateTime = (iso?: string) =>
  iso ? new Date(iso).toLocaleString() : "";

const AccionTag = ({
  accion,
}: {
  accion: "asignado" | "desasignado" | "reasignado" | "sin cambio";
}) => {
  switch (accion) {
    case "asignado":
      return <Tag color="green">ASIGNADO</Tag>;
    case "desasignado":
      return <Tag color="red">DESASIGNADO</Tag>;
    case "reasignado":
      return <Tag color="gold">REASIGNADO</Tag>;
    default:
      return <Tag>SIN CAMBIO</Tag>;
  }
};

export const ModalHistorico: React.FC<Props> = ({
  open,
  onClose,
  historial,
  loading,
  isError,
  error,
  refetch,
}) => {
  return (
    <Modal
      title="Historial de asignaciones"
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      {loading && (
        <div style={{ display: "flex", justifyContent: "center", padding: 24 }}>
          <Spin />
        </div>
      )}

      {!loading && isError && (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Alert
            type="error"
            showIcon
            message="No se pudo obtener el historial"
            description={String(
              (error as any)?.message ?? "Intenta nuevamente."
            )}
          />
          <Button onClick={refetch}>Reintentar</Button>
        </Space>
      )}

      {!loading && !isError && (
        <>
          <Space
            style={{ width: "100%", justifyContent: "space-between" }}
            wrap
          >
            <Space>
              <Text strong>Eventos:</Text>
              <Tag>{historial?.total_eventos ?? 0}</Tag>
            </Space>
          </Space>

          <Divider />

          {!historial || (historial.total_eventos ?? 0) === 0 ? (
            <Empty description="Sin cambios registrados" />
          ) : (
            <List
              itemLayout="vertical"
              dataSource={historial.eventos}
              renderItem={(ev) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <Space>
                        <AccionTag accion={ev.accion} />
                        <Text type="secondary">{formatDateTime(ev.fecha)}</Text>
                      </Space>
                    }
                    description={
                      <Space
                        direction="vertical"
                        size={4}
                        style={{ width: "100%" }}
                      >
                        <div>
                          <b>Anterior:</b>{" "}
                          {ev.prev_inspector?.nombre_completo ?? "(ninguno)"}{" "}
                          {ev.prev_inspector?.id_persona}
                        </div>
                        <div>
                          <b>Nuevo:</b>{" "}
                          {ev.new_inspector?.id_persona ?? "(sin asignar)"}
                        </div>
                        <div>
                          <b>Cambiado por:</b>{" "}
                          {ev.changed_by?.nombre_completo ??
                            (ev.changed_by?.id_persona
                              ? `ID: ${ev.changed_by.id_persona}`
                              : "—")}
                        </div>
                        {ev.motivo ? (
                          <div>
                            <b>Motivo:</b> {ev.motivo}
                          </div>
                        ) : null}
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </>
      )}
    </Modal>
  );
};
