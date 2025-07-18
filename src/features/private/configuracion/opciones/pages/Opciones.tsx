import { useOpciones } from "@/features/private/configuracion/opciones/hooks";
import { Button, Card, Spin } from "antd";
import {
  TableOpciones,
  ModalOpciones,
} from "@/features/private/configuracion/opciones/components";

export const Opciones = () => {
  const {
    currentOpcion,
    error,
    handleClose,
    handleDelete,
    handleOpen,
    isError,
    isLoading,
    methodsOpciones,
    onSubmit,
    opciones,
    menus,
    open,
    openCurrentOpcion,
    toggleMenuStatus,
  } = useOpciones();

  return (
    <div className="mt-8">
      <Button type="primary" className="mb-4" onClick={handleOpen}>
        Agregar Opción
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
          <TableOpciones
            opciones={opciones}
            onOpenCurrent={openCurrentOpcion}
            onDelete={handleDelete}
            onStatus={toggleMenuStatus}
          />
        )}
      </Card>

      <ModalOpciones
        open={open}
        onClose={handleClose}
        methods={methodsOpciones}
        onSubmit={onSubmit}
        currentMenu={currentOpcion}
        menus={menus}
      />
    </div>
  );
};
