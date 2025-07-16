import { IMenus } from "@/features/private/configuracion/menus/interface";
import { Button, Space, Table, Tag, Tooltip } from "antd";
import { FaEdit, FaLock, FaTrashAlt, FaUnlock } from "react-icons/fa";

interface Props {
  menus: IMenus[];
  onOpenCurrent: (rol: IMenus) => void;
  onDelete: (id: number) => void;
  onStatus: (id: number) => void;
}

export const TableMenu = ({
  menus,
  onOpenCurrent,
  onDelete,
  onStatus,
}: Props) => {
  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Icono",
      dataIndex: "icono",
      key: "icono",
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
      render: (_text: any, record: IMenus) => (
        <Space>
          <Tooltip title="Editar Rol">
            <Button type="link" onClick={() => onOpenCurrent(record)}>
              <FaEdit style={{ color: "#1890ff" }} />
            </Button>
          </Tooltip>

          {/* Botón de Eliminar con ícono y Tooltip */}
          <Tooltip title="Eliminar Rol">
            <Button type="link" danger onClick={() => onDelete(record.id_menu)}>
              <FaTrashAlt style={{ color: "#ff4d4f" }} />
            </Button>
          </Tooltip>

          {/* Botón de Activar/Desactivar */}
          <Tooltip title={record.estado ? "Desactivar" : "Activar"}>
            <Button type="link" onClick={() => onStatus(record.id_menu)}>
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
        dataSource={menus}
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
