import { Card, Spin, Empty, Statistic } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Definimos los colores aquí, ya que son propios de esta gráfica
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface Props {
  data: any[];
  total: number;
  isLoading: boolean;
}

export const DistribucionGasChart = ({ data, total, isLoading }: Props) => {
  return (
    <Card title="Distribución por Tipo de Gas" className="shadow-md h-full">
      {isLoading ? (
        <div className="flex justify-center p-10">
          <Spin />
        </div>
      ) : data.length > 0 ? (
        <div className="flex flex-col items-center">
          <Statistic
            title="Total Inspecciones"
            value={total}
            className="mb-4"
          />
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${((percent || 0) * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="cantidad"
                >
                  {data.map((_entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Leyenda manual */}
          <div className="flex gap-4 mt-2 flex-wrap justify-center">
            {data.map((item: any, index: number) => (
              <div key={index} className="flex items-center gap-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                ></div>
                <span className="text-sm text-gray-600">
                  {item.nombre}: {item.cantidad}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Empty description="No hay datos de gas" />
      )}
    </Card>
  );
};