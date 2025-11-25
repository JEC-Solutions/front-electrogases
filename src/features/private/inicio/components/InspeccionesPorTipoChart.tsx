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
  data: any[];
  isLoading: boolean;
}

export const InspeccionesPorTipoChart = ({ data, isLoading }: Props) => {
  return (
    <Card title="Inspecciones por Tipo" className="shadow-md h-full">
      {isLoading ? (
        <div className="flex justify-center p-10">
          <Spin />
        </div>
      ) : data.length > 0 ? (
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tipo" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad" fill="#1890ff" name="Cantidad" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <Empty description="No hay datos para esta fecha" />
      )}
    </Card>
  );
};