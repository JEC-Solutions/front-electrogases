import { useClientes } from "@/features/private/inspeccion/clientes/hooks";
import { Button, Card, Spin } from "antd";
import {
  ModalClientes,
  ModalFirmaCliente,
  TableClientes,
} from "@/features/private/inspeccion/clientes/components";

export const Clientes = () => {
  const {
    clientes,
    currentCliente,
    documentos,
    error,
    handleClose,
    handleOpen,
    isError,
    isLoading,
    methodsClientes,
    onSubmit,
    open,
    openCurrentCliente,
    // Firma
    openFirma,
    clienteFirma,
    openFirmaCliente,
    handleCloseFirma,
    inspeccionesConFirma,
    loadingInspecciones,
    handleUpdateFirma,
    isUpdatingFirma,
  } = useClientes();

  return (
    <div className="mt-8">
      <Button type="primary" className="mb-4" onClick={handleOpen}>
        Agregar Cliente
      </Button>

      <Card>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <Spin />
          </div>
        ) : isError ? (
          <div style={{ color: "red", textAlign: "center" }}>
            Ocurrió un error al cargar los roles.
            <br />
            {error instanceof Error
              ? error.message
              : "Inténtalo de nuevo más tarde."}
          </div>
        ) : (
          <TableClientes
            clientes={clientes}
            onOpenCurrent={openCurrentCliente}
            onFirma={openFirmaCliente}
          />
        )}
      </Card>

      <ModalClientes
        open={open}
        onClose={handleClose}
        methods={methodsClientes}
        onSubmit={onSubmit}
        currentCliente={currentCliente}
        documentos={documentos}
      />

      <ModalFirmaCliente
        open={openFirma}
        onClose={handleCloseFirma}
        cliente={clienteFirma}
        inspecciones={inspeccionesConFirma}
        loadingInspecciones={loadingInspecciones}
        onUpdateFirma={handleUpdateFirma}
        isUpdating={isUpdatingFirma}
      />
    </div>
  );
};
