import { Card, Spin, Empty } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: { equipo: string; cantidad: number }[];
  total: number;
  isLoading: boolean;
}

export const EquiposUtilizadosChart = ({ data, total, isLoading }: Props) => {
  return (
    <Card
      title="Equipos Utilizados"
      extra={<span className="text-gray-500">Total: {total}</span>}
      className="shadow-md h-full"
    >
      {isLoading ? (
        <div className="flex justify-center p-10">
          <Spin />
        </div>
      ) : data.length > 0 ? (
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" allowDecimals={false} />
              <YAxis dataKey="equipo" type="category" width={120} />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad" fill="#52c41a" name="Cantidad" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <Empty description="No hay datos para esta fecha" />
      )}
    </Card>
  );
};
