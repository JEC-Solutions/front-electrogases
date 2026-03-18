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
    <div className="mt-8 px-4 sm:px-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Departamentos</h1>
        <p className="text-gray-600">
          Acá podrás crear y gestionar los departamentos del país en el sistema.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-4">
        <Button
          type="primary"
          className="w-full xl:w-auto"
          onClick={handleOpen}
        >
          Agregar Departamento
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
