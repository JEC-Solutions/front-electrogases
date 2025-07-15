import { useDepartamento } from "@/features/private/configuracion/departamentos/hooks";
import { Button, Card, Spin } from "antd";
import {
  TableDepartamentos,
  ModalDepartamentos,
} from "@/features/private/configuracion/departamentos/components";

export const Departamentos = () => {
  const {
    currentDepartamento,
    departamentos,
    error,
    handleClose,
    handleOpen,
    isError,
    isLoading,
    methodsDepartamentos,
    onSubmit,
    open,
    openCurrentDepartamento,
  } = useDepartamento();

  return (
    <div className="mt-8">
      <Button type="primary" className="mb-4" onClick={handleOpen}>
        Agregar Departamento
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
            Ocurrió un error al cargar los departamentos.
            <br />
            {error instanceof Error
              ? error.message
              : "Inténtalo de nuevo más tarde."}
          </div>
        ) : (
          <TableDepartamentos
            departamentos={departamentos}
            onOpenCurrent={openCurrentDepartamento}
          />
        )}
      </Card>

      <ModalDepartamentos
        open={open}
        onClose={handleClose}
        methods={methodsDepartamentos}
        onSubmit={onSubmit}
        currentDpto={currentDepartamento}
      />
    </div>
  );
};
