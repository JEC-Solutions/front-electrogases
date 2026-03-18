import { Button, Card, Spin } from "antd";
import { useCiudad } from "@/features/private/configuracion/ciudad/hooks";
import {
  TableCiudad,
  ModalCiudad,
} from "@/features/private/configuracion/ciudad/components";

export const Ciudad = () => {
  const {
    ciudades,
    isLoading,
    isError,
    error,
    currentCiudad,
    departamentos,
    handleClose,
    handleOpen,
    methodsCiudad,
    onSubmit,
    open,
    openCurrentCiudad,
  } = useCiudad();

  return (
    <div className="mt-8 px-4 sm:px-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Ciudades</h1>
        <p className="text-gray-600">
          Acá podrás crear y gestionar las ciudades y sus departamentos asociados en el sistema.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-4">
        <Button
          type="primary"
          className="w-full xl:w-auto"
          onClick={handleOpen}
        >
          Agregar Ciudad
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
            Ocurrió un error al cargar las ciudades.
            <br />
            {error instanceof Error
              ? error.message
              : "Inténtalo de nuevo más tarde."}
          </div>
        ) : (
          <TableCiudad ciudades={ciudades} onOpenCurrent={openCurrentCiudad} />
        )}
      </Card>

      <ModalCiudad
        open={open}
        onClose={handleClose}
        departamentos={departamentos}
        methods={methodsCiudad}
        onSubmit={onSubmit}
        currentCiudad={currentCiudad}
      />
    </div>
  );
};
