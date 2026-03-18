import { Card, Spin, Empty, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

interface Inspector {
  id_usuario: number;
  usuario: string;
  nombre_completo: string;
  telefono: string;
  email: string;
  fecha_registro: string;
}

interface Props {
  data: Inspector[];
  total: number;
  isLoading: boolean;
}

export const InspectoresActivosChart = ({ data, total, isLoading }: Props) => {
  const columns: ColumnsType<Inspector> = [
    {
      title: "Nombre",
      dataIndex: "nombre_completo",
      key: "nombre_completo",
      render: (text: string) => (
        <span className="flex items-center gap-2">
          <UserOutlined /> {text}
        </span>
      ),
    },
    {
      title: "Contacto",
      key: "contacto",
      render: (_: any, record: Inspector) => (
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-600 flex items-center gap-1">
            <MailOutlined /> {record.email}
          </span>
          <span className="text-xs text-gray-600 flex items-center gap-1">
            <PhoneOutlined /> {record.telefono}
          </span>
        </div>
      ),
    },
    {
      title: "Registrado",
      dataIndex: "fecha_registro",
      key: "fecha_registro",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Estado",
      key: "estado",
      align: "center",
      render: () => <Tag color="green">Activo</Tag>,
    },
  ];

  return (
    <Card
      title="Inspectores Activos"
      extra={<span className="text-gray-500">Total: {total}</span>}
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
        <Empty description="No hay inspectores activos" />
      )}
    </Card>
  );
};
