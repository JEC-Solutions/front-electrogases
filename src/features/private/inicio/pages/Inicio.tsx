import { Col, DatePicker, Row, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useInicio } from "@/features/private/inicio/hooks";
import {
  InspeccionesPorTipoChart,
  DistribucionGasChart,
  EquiposUtilizadosChart,
  HistorialAccesosChart,
  InspectoresActivosChart,
} from "@/features/private/inicio/components";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

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
    equiposData,
    equiposTotal,
    isLoadingEquipos,
    historialAccesosData,
    historialAccesosTotal,
    isLoadingHistorialAccesos,
    inspectoresActivosData,
    inspectoresActivosTotal,
    isLoadingInspectoresActivos,
  } = useInicio();

  return (
    <div className="mt-8 px-4 sm:px-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Inicio</h1>
        <p className="text-gray-600">
          Bienvenido al sistema de gestión de Electro G&S. Acá podrás visualizar un resumen operativo de las inspecciones, distribución de gas y estado de los equipos.
        </p>
      </div>

      <Row gutter={[16, 16]} align="middle" className="mb-6">
        <Col xs={24}>
          <div className="flex flex-wrap justify-start lg:justify-end items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold whitespace-nowrap">Filtrar por fecha:</span>
              <RangePicker
                value={[dayjs(selectedDates.inicio), dayjs(selectedDates.fin)]}
                onChange={handleDateChange}
                format="YYYY-MM-DD"
                allowClear={false}
                className="w-full sm:w-auto"
              />
            </div>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleFiltrar}
              className="w-full sm:w-64 lg:w-auto"
            >
              Filtrar
            </Button>
          </div>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Gráfica 1 - Inspecciones por tipo */}
        <Col xs={24} md={12} lg={14}>
          <InspeccionesPorTipoChart
            data={inspeccionesData}
            isLoading={isLoadingInspecciones}
          />
        </Col>

        {/* Gráfica 2 - Distribución de gas */}
        <Col xs={24} md={12} lg={10}>
          <DistribucionGasChart
            data={gasData}
            total={gasTotal}
            isLoading={isLoadingGas}
          />
        </Col>

        {/* Gráfica 3 - Equipos utilizados */}
        <Col xs={24} lg={12}>
          <EquiposUtilizadosChart
            data={equiposData}
            total={equiposTotal}
            isLoading={isLoadingEquipos}
          />
        </Col>

        {/* Gráfica 4 - Historial de accesos */}
        <Col xs={24} lg={12}>
          <HistorialAccesosChart
            data={historialAccesosData}
            total={historialAccesosTotal}
            isLoading={isLoadingHistorialAccesos}
          />
        </Col>

        {/* Tabla 5 - Inspectores activos */}
        <Col xs={24}>
          <InspectoresActivosChart
            data={inspectoresActivosData}
            total={inspectoresActivosTotal}
            isLoading={isLoadingInspectoresActivos}
          />
        </Col>
      </Row>
    </div>
  );
};
