import { useRutas } from "@/features/private/inspeccion/rutas/hooks";
import {
  TableRutas,
  ModalRutas,
  ModalCasa,
  ModalCliente,
} from "@/features/private/inspeccion/rutas/components";
import { Button, Card, Row, Col, Statistic, Spin } from "antd";
import { FaPlus, FaRoute, FaHome, FaUserTie, FaUsers } from "react-icons/fa";

export const Rutas = () => {
  const {
    // Estados de datos
    rutas,
    casas,
    inspectores,
    ciudades,
    clientes,
    tiposDocumento,
    
    // Estados de carga
    isLoading,
    isLoadingCasas,
    isLoadingInspectores,
    isLoadingCiudades,
    isLoadingClientes,
    isLoadingTiposDocumento,
    
    // Métodos de formularios
    methodsRutas,
    methodsCasa,
    methodsCliente,
    
    // Handlers de formularios
    onSubmitRuta,
    onSubmitCasa,
    onSubmitCliente,
    
    // Estados de modales
    open,
    openCasa,
    openCliente,
    currentRuta,
    
    // Handlers de modales
    handleOpen,
    handleClose,
    handleOpenCasa,
    handleCloseCasa,
    handleOpenCliente,
    handleCloseCliente,
    openCurrentRuta,
    
    // Handlers de acciones
    handleDelete,
    toggleRutaStatus,
  } = useRutas();

  if (isLoading || isLoadingCasas || isLoadingInspectores || isLoadingCiudades || isLoadingClientes || isLoadingTiposDocumento) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Gestión de Rutas de Inspección
        </h1>
        <p className="text-gray-600">
          Administre las rutas de inspección asignadas a los inspectores del sistema.
        </p>
      </div>

      {/* Estadísticas */}
      <Row gutter={16} className="mb-6">
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Rutas"
              value={rutas.length}
              prefix={<FaRoute className="text-blue-500" />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Rutas Activas"
              value={rutas.filter(ruta => ruta.estado).length}
              prefix={<FaRoute className="text-green-500" />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Casas Registradas"
              value={casas.length}
              prefix={<FaHome className="text-orange-500" />}
              valueStyle={{ color: "#fa8c16" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Inspectores"
              value={inspectores.length}
              prefix={<FaUserTie className="text-purple-500" />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Acciones principales */}
      <Card className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold mb-2">Generar nuevas rutas</h3>
            <p className="text-gray-600">
              Cree nuevas rutas de inspección y gestione las existentes.
            </p>
          </div>
          <Button
            type="primary"
            icon={<FaPlus />}
            size="large"
            onClick={handleOpen}
          >
            Nueva Ruta de Inspección
          </Button>
        </div>
      </Card>

      {/* Tabla de rutas */}
      <Card>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Rutas de Inspección</h3>
          <p className="text-gray-600">
            Lista de todas las rutas de inspección registradas en el sistema.
          </p>
        </div>
        
        <TableRutas
          rutas={rutas}
          onOpenCurrent={openCurrentRuta}
          onDelete={handleDelete}
          onStatus={toggleRutaStatus}
        />
      </Card>

      {/* Modales */}
      <ModalRutas
        open={open}
        onClose={handleClose}
        methods={methodsRutas}
        onSubmit={onSubmitRuta}
        currentRuta={currentRuta}
        casas={casas}
        inspectores={inspectores}
        onOpenCasa={handleOpenCasa}
      />

      <ModalCasa
        open={openCasa}
        onClose={handleCloseCasa}
        methods={methodsCasa}
        onSubmit={onSubmitCasa}
        ciudades={ciudades}
        clientes={clientes}
        onOpenCliente={handleOpenCliente}
      />

      <ModalCliente
        open={openCliente}
        onClose={handleCloseCliente}
        methods={methodsCliente}
        onSubmit={onSubmitCliente}
        tiposDocumento={tiposDocumento}
      />
    </div>
  );
};
