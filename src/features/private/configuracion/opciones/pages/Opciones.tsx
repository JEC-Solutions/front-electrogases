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
    <div className="mt-8 px-4 sm:px-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Opciones</h1>
        <p className="text-gray-600">
          Acá podrás crear y gestionar las opciones del sistema y vincularlas a los menús correspondientes.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-4">
        <Button
          type="primary"
          className="w-full xl:w-auto"
          onClick={handleOpen}
        >
          Agregar Opción
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
            Ocurrió un error al cargar las opciones.
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
