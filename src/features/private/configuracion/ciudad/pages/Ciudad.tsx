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
    <div className="mt-8">
      <Button type="primary" className="mb-4" onClick={handleOpen}>
        Agregar Ciudad
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
