import { Card, Spin, Empty, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

interface HistorialAcceso {
  id_usuario: number;
  usuario: string;
  nombre_completo: string;
  cantidad_accesos: number;
  accesos_aprobados: number;
  accesos_fallidos: number;
}

interface Props {
  data: HistorialAcceso[];
  total: number;
  isLoading: boolean;
}

export const HistorialAccesosChart = ({ data, total, isLoading }: Props) => {
  const columns: ColumnsType<HistorialAcceso> = [
    {
      title: "Nombre",
      dataIndex: "nombre_completo",
      key: "nombre_completo",
    },
    {
      title: "Total Accesos",
      dataIndex: "cantidad_accesos",
      key: "cantidad_accesos",
      align: "center",
      sorter: (a, b) => a.cantidad_accesos - b.cantidad_accesos,
    },
    {
      title: "Aprobados",
      dataIndex: "accesos_aprobados",
      key: "accesos_aprobados",
      align: "center",
      render: (value: number) => (
        <span className="text-green-600 flex items-center justify-center gap-1">
          <CheckCircleOutlined /> {value}
        </span>
      ),
    },
    {
      title: "Fallidos",
      dataIndex: "accesos_fallidos",
      key: "accesos_fallidos",
      align: "center",
      render: (value: number) => (
        <span className="text-red-500 flex items-center justify-center gap-1">
          <CloseCircleOutlined /> {value}
        </span>
      ),
    },
  ];

  return (
    <Card
      title="Historial de Accesos de Inspectores"
      extra={<span className="text-gray-500">Total accesos: {total}</span>}
      className="shadow-md h-full"
    >
      {isLoading ? (
        <div className="flex justify-center p-10">
          <Spin />
        </div>
      ) : data.length > 0 ? (
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id_usuario"
          pagination={{ pageSize: 5 }}
          size="small"
          scroll={{ x: true }}
        />
      ) : (
        <Empty description="No hay datos para esta fecha" />
      )}
    </Card>
  );
};
