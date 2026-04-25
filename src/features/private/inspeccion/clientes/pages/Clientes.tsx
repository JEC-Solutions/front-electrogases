import { useClientes } from "@/features/private/inspeccion/clientes/hooks";
import { Button, Card, Spin, Input } from "antd";
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
    setSearchTerm,
  } = useClientes();

  return (
    <div className="mt-8 px-4 sm:px-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
        <p className="text-gray-600">
          Acá podrás crear y gestionar toda la información de los clientes,
          incluyendo sus datos personales y firmas autorizadas de inspecciones.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-4">
        <Input.Search
          placeholder="Buscar por nombre, documento o teléfono..."
          allowClear
          onSearch={(value) => setSearchTerm(value)}
          className="w-full xl:w-96"
        />
        <Button
          type="primary"
          className="w-full xl:w-auto"
          onClick={handleOpen}
        >
          Agregar Cliente
        </Button>
      </div>

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
            Ocurrió un error al cargar los clientes.
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
