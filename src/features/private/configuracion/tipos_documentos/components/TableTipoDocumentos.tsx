import { ITipoDocumentos } from "@/features/private/configuracion/tipos_documentos/interfaces";
import { Button, Space, Table, Tag, Tooltip } from "antd";
import { FaEdit, FaLock, FaTrashAlt, FaUnlock } from "react-icons/fa";

interface Props {
  tipoDocumentos: ITipoDocumentos[];
  onOpenCurrent: (tipoDocumento: ITipoDocumentos) => void;
  onDelete: (id: number) => void;
  onStatus: (id: number) => void;
}

export const TableTipoDocumentos = ({
  onDelete,
  onOpenCurrent,
  onStatus,
  tipoDocumentos,
}: Props) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id_tipo_documento",
      key: "id_tipo_documento",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Abreviación",
      dataIndex: "abreviacion",
      key: "abreviacion",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (estado: boolean) => (
        <Tag color={estado ? "green" : "red"}>
          {estado ? "Activo" : "Inactivo"}
        </Tag>
      ),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_text: any, record: ITipoDocumentos) => (
        <Space>
          <Tooltip title="Editar Rol">
            <Button type="link" onClick={() => onOpenCurrent(record)}>
              <FaEdit style={{ color: "#1890ff" }} />
            </Button>
          </Tooltip>

          {/* Botón de Eliminar con ícono y Tooltip */}
          <Tooltip title="Eliminar Rol">
            <Button
              type="link"
              danger
              onClick={() => onDelete(record.id_tipo_documento)}
            >
              <FaTrashAlt style={{ color: "#ff4d4f" }} />
            </Button>
          </Tooltip>

          {/* Botón de Activar/Desactivar */}
          <Tooltip title={record.estado ? "Desactivar" : "Activar"}>
            <Button
              type="link"
              onClick={() => onStatus(record.id_tipo_documento)}
            >
              {record.estado ? (
                <FaLock style={{ color: "#ff4d4f" }} />
              ) : (
                <FaUnlock style={{ color: "#52c41a" }} />
              )}
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Table
        columns={columns}
        dataSource={tipoDocumentos}
        rowKey="id"
        className="custom-table"
        rowClassName={(_record, index) =>
          index % 2 === 0 ? "even-row" : "odd-row"
        }
        scroll={{ x: 600 }}
      />
    </div>
  );
};
