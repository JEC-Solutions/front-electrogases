import { IOpciones } from "@/features/private/configuracion/opciones/interfaces";
import { Button, Space, Table, Tag, Tooltip } from "antd";
import { FaEdit, FaLock, FaTrashAlt, FaUnlock } from "react-icons/fa";

interface Props {
  opciones: IOpciones[];
  onOpenCurrent: (rol: IOpciones) => void;
  onDelete: (id: number) => void;
  onStatus: (id: number) => void;
}
export const TableOpciones = ({
  onDelete,
  onOpenCurrent,
  onStatus,
  opciones,
}: Props) => {
  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
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
      render: (_text: any, record: IOpciones) => (
        <Space>
          <Tooltip title="Editar Opción">
            <Button type="link" onClick={() => onOpenCurrent(record)}>
              <FaEdit style={{ color: "#1890ff" }} />
            </Button>
          </Tooltip>

          {/* Botón de Eliminar con ícono y Tooltip */}
          <Tooltip title="Eliminar Opción">
            <Button type="link" danger onClick={() => onDelete(record.id_opcion)}>
              <FaTrashAlt style={{ color: "#ff4d4f" }} />
            </Button>
          </Tooltip>

          {/* Botón de Activar/Desactivar */}
          <Tooltip title={record.estado ? "Desactivar" : "Activar"}>
            <Button type="link" onClick={() => onStatus(record.id_opcion)}>
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
        dataSource={opciones}
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
