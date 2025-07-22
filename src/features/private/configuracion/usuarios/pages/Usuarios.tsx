import { useUsuarios } from "@/features/private/configuracion/usuarios/hooks";
import { Button, Card, Spin } from "antd";
import {
  TableUsuarios,
  ModalUsuarios,
} from "@/features/private/configuracion/usuarios/components";

export const Usuarios = () => {
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
    usuarios,
  } = useUsuarios();

  return (
    <div className="mt-8">
      <Button type="primary" className="mb-4" onClick={handleOpen}>
        Agregar Usuario
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
          <TableUsuarios
            usuarios={usuarios}
            onOpenCurrent={openCurrentUsuario}
            onStatus={toggleStatus}
          />
        )}
      </Card>

      <ModalUsuarios
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
