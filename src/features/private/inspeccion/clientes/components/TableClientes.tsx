import { IClientes } from "@/features/private/inspeccion/clientes/interfaces";
import { Button, Space, Table, Tag, Tooltip } from "antd";
import { FaEdit, FaLock, FaTrashAlt, FaUnlock } from "react-icons/fa";

interface Props {
  clientes: IClientes[];
  onOpenCurrent: (cliente: IClientes) => void;
  onDelete: (id: number) => void;
  onStatus: (id: number) => void;
}

export const TableClientes = ({
  clientes,
  onOpenCurrent,
  onDelete,
  onStatus,
}: Props) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id_cliente",
      key: "id_cliente",
    },
    {
      title: "Nombre Completo",
      key: "nombre_completo",
      render: (_: any, record: IClientes) => (
        <>
          {`${record.primer_nombre} ${record.segundo_nombre ?? ""} ${
            record.primer_apellido
          } ${record.segundo_apellido ?? ""}`}
        </>
      ),
    },
    {
      title: "Documento",
      key: "documento",
      render: (_: any, record: IClientes) => (
        <>
          {`${record.tipo_documento?.abreviacion ?? ""} - ${
            record.numero_documento
          }`}
        </>
      ),
    },
    {
      title: "Teléfono",
      dataIndex: "telefono",
      key: "telefono",
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
      render: (_text: any, record: IClientes) => (
        <Space>
          <Tooltip title="Editar Cliente">
            <Button type="link" onClick={() => onOpenCurrent(record)}>
              <FaEdit style={{ color: "#1890ff" }} />
            </Button>
          </Tooltip>

          {/* Botón de Eliminar con ícono y Tooltip */}
          <Tooltip title="Eliminar Cliente">
            <Button
              type="link"
              danger
              onClick={() => onDelete(record.id_cliente)}
            >
              <FaTrashAlt style={{ color: "#ff4d4f" }} />
            </Button>
          </Tooltip>

          {/* Botón de Activar/Desactivar */}
          <Tooltip title={record.estado ? "Desactivar" : "Activar"}>
            <Button type="link" onClick={() => onStatus(record.id_cliente)}>
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
        dataSource={clientes}
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
