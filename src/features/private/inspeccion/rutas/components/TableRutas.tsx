import { IRutas } from "@/features/private/inspeccion/rutas/interfaces";
import { Button, Space, Table, Tag, Tooltip } from "antd";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";

interface Props {
  rutas: IRutas[];
  onOpenCurrent: (ruta: IRutas) => void;
  onDelete: (id: number) => void;
  onStatus: (id: number) => void;
}

export const TableRutas = ({
  rutas,
  onOpenCurrent,
  onDelete,
  onStatus,
}: Props) => {
  const columns = [
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
      render: (fecha: string) => new Date(fecha).toLocaleDateString('es-CO'),
    },
    {
      title: "Hora",
      dataIndex: "hora",
      key: "hora",
    },
    {
      title: "Casa",
      key: "casa",
      render: (_text: any, record: IRutas) => (
        <div>
          <div><strong>Medidor:</strong> {record.casa.medidor}</div>
          <div><strong>Dirección:</strong> {record.casa.direccion}</div>
          <div><strong>Barrio:</strong> {record.casa.barrio}</div>
        </div>
      ),
    },
    {
      title: "Inspector",
      key: "inspector",
      render: (_text: any, record: IRutas) => (
        <div>
          <div>{record.inspector.primer_nombre} {record.inspector.primer_apellido}</div>
          <div><small>{record.inspector.email}</small></div>
        </div>
      ),
    },
    {
      title: "Cliente",
      key: "cliente",
      render: (_text: any, record: IRutas) => (
        <div>
          <div>{record.casa.cliente.primer_nombre} {record.casa.cliente.primer_apellido}</div>
          <div><small>{record.casa.cliente.numero_documento}</small></div>
        </div>
      ),
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
      render: (_text: any, record: IRutas) => (
        <Space>
          <Tooltip title="Ver Detalles">
            <Button type="link" onClick={() => onOpenCurrent(record)}>
              <FaEye style={{ color: "#1890ff" }} />
            </Button>
          </Tooltip>

          <Tooltip title="Editar Ruta">
            <Button type="link" onClick={() => onOpenCurrent(record)}>
              <FaEdit style={{ color: "#1890ff" }} />
            </Button>
          </Tooltip>

          <Tooltip title="Eliminar Ruta">
            <Button type="link" danger onClick={() => onDelete(record.id_ruta)}>
              <FaTrashAlt style={{ color: "#ff4d4f" }} />
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
        dataSource={rutas}
        rowKey="id_ruta"
        className="custom-table"
        rowClassName={(_record, index) =>
          index % 2 === 0 ? "even-row" : "odd-row"
        }
        scroll={{ x: 1200 }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} de ${total} rutas`,
        }}
      />
    </div>
  );
};
