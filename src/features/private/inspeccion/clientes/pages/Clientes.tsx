import { useClientes } from "@/features/private/inspeccion/clientes/hooks";
import { Button, Card, Spin } from "antd";
import {
  ModalClientes,
  TableClientes,
} from "@/features/private/inspeccion/clientes/components";

export const Clientes = () => {
  const {
    clientes,
    currentCliente,
    documentos,
    error,
    handleClose,
    handleDelete,
    handleOpen,
    isError,
    isLoading,
    methodsClientes,
    onSubmit,
    open,
    openCurrentCliente,
    toggleStatus,
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
            onDelete={handleDelete}
            onStatus={toggleStatus}
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
    </div>
  );
};
