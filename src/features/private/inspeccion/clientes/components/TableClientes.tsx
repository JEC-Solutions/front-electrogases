import { IClientes } from "@/features/private/inspeccion/clientes/interfaces";
import { Button, Space, Table, Tag, Tooltip } from "antd";
import { FaEdit, FaSignature } from "react-icons/fa";

interface Props {
  clientes: IClientes[];
  onOpenCurrent: (cliente: IClientes) => void;
  onFirma: (cliente: IClientes) => void;
}

export const TableClientes = ({ clientes, onOpenCurrent, onFirma }: Props) => {
  const columns = [
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

          <Tooltip title="Actualizar Firma">
            <Button type="link" onClick={() => onFirma(record)}>
              <FaSignature style={{ color: "#722ed1" }} />
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
