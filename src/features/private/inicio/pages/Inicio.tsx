import { Col, DatePicker, Row, Typography, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useInicio } from "@/features/private/inicio/hooks";
import {
  InspeccionesPorTipoChart,
  DistribucionGasChart,
} from "@/features/private/inicio/components";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Title } = Typography;

export const Inicio = () => {
  const {
    handleDateChange,
    handleFiltrar,
    selectedDates,
    inspeccionesData,
    isLoadingInspecciones,
    gasData,
    gasTotal,
    isLoadingGas,
  } = useInicio();

  return (
    <div className="mt-8 p-4">
      <Row justify="space-between" align="middle" className="mb-6">
        <Col>
          <Title level={3}>Dashboard Operativo</Title>
        </Col>
        <Col>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Filtrar por fecha:</span>
            <RangePicker
              value={[dayjs(selectedDates.inicio), dayjs(selectedDates.fin)]}
              onChange={handleDateChange}
              format="YYYY-MM-DD"
              allowClear={false}
            />
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleFiltrar}
            >
              Filtrar
            </Button>
          </div>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Gráfica 1 */}
        <Col xs={24} md={12} lg={14}>
          <InspeccionesPorTipoChart
            data={inspeccionesData}
            isLoading={isLoadingInspecciones}
          />
        </Col>

        {/* Gráfica 2 */}
        <Col xs={24} md={12} lg={10}>
          <DistribucionGasChart
            data={gasData}
            total={gasTotal}
            isLoading={isLoadingGas}
          />
        </Col>
      </Row>
    </div>
  );
};
