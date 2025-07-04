import { IRoles } from "@/features/private/configuracion/roles/interfaces";
import { Button, Space, Table, Tag, Tooltip } from "antd";
import { FaEdit, FaLock, FaTrashAlt, FaUnlock } from "react-icons/fa";

interface Props {
  roles: IRoles[];
  onOpenCurrentRol: (rol: IRoles) => void;
  onDelete: (id: number) => void;
  onStatus: (id: number) => void;
}

export const TableRoles = ({
  roles,
  onOpenCurrentRol,
  onDelete,
  onStatus,
}: Props) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id_rol",
      key: "id_rol",
    },
    {
      title: "Nombre",
      dataIndex: "nombre_rol",
      key: "nombre_rol",
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
      render: (_text: any, record: IRoles) => (
        <Space>
          <Tooltip title="Editar Rol">
            <Button type="link" onClick={() => onOpenCurrentRol(record)}>
              <FaEdit style={{ color: "#1890ff" }} />
            </Button>
          </Tooltip>

          {/* Botón de Eliminar con ícono y Tooltip */}
          <Tooltip title="Eliminar Rol">
            <Button type="link" danger onClick={() => onDelete(record.id_rol)}>
              <FaTrashAlt style={{ color: "#ff4d4f" }} />
            </Button>
          </Tooltip>

          {/* Botón de Activar/Desactivar */}
          <Tooltip title={record.estado ? "Desactivar" : "Activar"}>
            <Button type="link" onClick={() => onStatus(record.id_rol)}>
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
        dataSource={roles}
        rowKey="id"
        className="custom-table"
        rowClassName={(_record, index) =>
          index % 2 === 0 ? "even-row" : "odd-row"
        }
        // pagination={{
        //   pageSize,
        //   showSizeChanger: true,
        //   showLessItems: true,
        //   pageSizeOptions: ["5", "10", "15", "20", "50", "100"],
        //   onShowSizeChange: (_, size) => setPageSize(size),
        //   locale: { items_per_page: "/ página", page: "Página" },
        // }}
        scroll={{ x: 600 }}
      />
    </div>
  );
};
