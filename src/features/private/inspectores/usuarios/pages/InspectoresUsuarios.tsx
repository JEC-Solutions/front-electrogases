import { Button, Card, Spin } from "antd";
import {
  ModalInspectoresUsuarios,
  TableInspectoresUsuarios,
} from "@/features/private/inspectores/usuarios/components";
import { useInspectoresUsuarios } from "@/features/private/inspectores/usuarios/hooks";

export const InspectoresUsuarios = () => {
  const {
    currentUsuarios,
    documentos,
    error,
    handleClose,
    handleOpen,
    isError,
    isLoading,
    methodsUsuarios,
    onSubmit,
    open,
    openCurrentUsuario,
    toggleStatus,
    inspectores,
  } = useInspectoresUsuarios();

  return (
    <div className="mt-8">
      <Button type="primary" className="mb-4" onClick={handleOpen}>
        Agregar Inspector
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
          <TableInspectoresUsuarios
            inspectores={inspectores}
            onOpenCurrent={openCurrentUsuario}
            onStatus={toggleStatus}
          />
        )}
      </Card>

      <ModalInspectoresUsuarios
        open={open}
        onClose={handleClose}
        methods={methodsUsuarios}
        onSubmit={onSubmit}
        currentUsuario={currentUsuarios}
        documentos={documentos}
      />
    </div>
  );
};
