import { Table, Card } from "antd";
import { ColumnsType } from "antd/es/table";

interface Props {
  data: any[];
  loading: boolean;
}

export const ActaEntregaTable = ({ data, loading }: Props) => {
  const columns: ColumnsType<any> = [
    {
      title: "Nº",
      key: "index",
      width: 60,
      align: "center",
      render: (_value, _record, index) => index + 1,
    },
    {
      title: "Fecha de Inspección",
      dataIndex: "fecha_inspeccion",
      key: "fecha_inspeccion",
      width: 150,
      align: "center",
    },
    {
      title: "Nº de Informe",
      dataIndex: "numero_acta",
      key: "numero_acta",
      width: 150,
      align: "center",
    },
    {
      title: "Nombre de Usuario",
      dataIndex: "usuario",
      key: "usuario",
      width: 250,
    },
    {
      title: "Nº de Cuenta / Código de Usuario",
      dataIndex: "no_cuenta",
      key: "no_cuenta",
      width: 200,
      align: "center",
    },
    {
      title: "Fecha de Entrega",
      dataIndex: "fecha_entrega",
      key: "fecha_entrega",
      width: 150,
      align: "center",
      render: () => "", // Siempre vacío
    },
  ];

  return (
    <Card className="mt-4">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id_inspeccion"
        loading={loading}
        pagination={{
          pageSize: 25,
          showSizeChanger: false,
          showTotal: (total) => `Total: ${total} registros`,
        }}
      />
    </Card>
  );
};
