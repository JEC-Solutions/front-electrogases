import { IUsuarios } from "@/features/private/configuracion/usuarios/interfaces";
import { Button, Space, Table, Tag, Tooltip } from "antd";
import { FaEdit, FaLock, FaUnlock } from "react-icons/fa";

interface Props {
  usuarios: IUsuarios[];
  onOpenCurrent: (cliente: IUsuarios) => void;
  onStatus: (id: number) => void;
}

export const TableUsuarios = ({ usuarios, onOpenCurrent, onStatus }: Props) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id_usuario",
      key: "id_usuario",
    },
    {
      title: "Nombre completo",
      key: "nombre_completo",
      render: (_: any, record: IUsuarios) => {
        const p = record.persona;
        return `${p.primer_nombre} ${p.segundo_nombre || ""} ${
          p.primer_apellido
        } ${p.segundo_apellido || ""}`;
      },
    },
    {
      title: "Correo",
      key: "email",
      render: (_: any, record: IUsuarios) => record.persona?.email || "-",
    },
    {
      title: "Usuario",
      dataIndex: "usuario",
      key: "usuario",
    },
    {
      title: "Rol",
      key: "rol",
      render: (_: any, record: IUsuarios) => record.rol?.nombre_rol || "-",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (estado: boolean) =>
        estado ? (
          <Tag color="green">Activo</Tag>
        ) : (
          <Tag color="red">Inactivo</Tag>
        ),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_text: any, record: IUsuarios) => (
        <Space>
          <Tooltip title="Editar Cliente">
            <Button type="link" onClick={() => onOpenCurrent(record)}>
              <FaEdit style={{ color: "#1890ff" }} />
            </Button>
          </Tooltip>

          {/* Botón de Activar/Desactivar */}
          <Tooltip title={record.estado ? "Desactivar" : "Activar"}>
            <Button type="link" onClick={() => onStatus(record.id_usuario)}>
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
        dataSource={usuarios}
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
