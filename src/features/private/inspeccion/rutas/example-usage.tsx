// Ejemplo de uso del módulo de rutas de inspección
// Este archivo muestra cómo usar los componentes y hooks del módulo

import React from 'react';
import { useRutas } from '@/features/private/inspeccion/rutas/hooks';
import {
  TableRutas,
  ModalRutas,
  ModalCasa,
  ModalCliente,
} from '@/features/private/inspeccion/rutas/components';

const ExampleUsage = () => {
  // Usar el hook personalizado
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

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {/* Tabla de rutas */}
      <TableRutas
        rutas={rutas}
        onOpenCurrent={openCurrentRuta}
        onDelete={handleDelete}
        onStatus={toggleRutaStatus}
      />

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

export default ExampleUsage;
