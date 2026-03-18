import { Button, Card, Spin } from "antd";
import {
  TableEquiposUtilizados,
  ModalEquiposUtilizados,
} from "@/features/private/inspectores/equiposUtilizados/components";
import { useEquiposUtilizados } from "@/features/private/inspectores/equiposUtilizados/hooks";

export const EquiposUtilizados = () => {
  const {
    equipos,
    isLoading,
    isError,
    error,
    methodsEquipos,
    open,
    handleOpen,
    handleClose,
    openCurrentEquipo,
    currentEquipo,
    onSubmit,
    handleDelete,
  } = useEquiposUtilizados();
  return (
    <div className="mt-8 px-4 sm:px-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Equipos Utilizados</h1>
        <p className="text-gray-600">
          Acá podrás crear y gestionar los equipos utilizados por los inspectores durante las inspecciones técnicas.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-4">
        <Button
          type="primary"
          className="w-full xl:w-auto"
          onClick={handleOpen}
        >
          Agregar Equipo Utilizado
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
            Ocurrió un error al cargar los equipos.
            <br />
            {error instanceof Error
              ? error.message
              : "Inténtalo de nuevo más tarde."}
          </div>
        ) : (
          <TableEquiposUtilizados
            equipos={equipos}
            onOpenCurrent={openCurrentEquipo}
            onDelete={handleDelete}
          />
        )}
      </Card>

      <ModalEquiposUtilizados
        open={open}
        onClose={handleClose}
        methods={methodsEquipos}
        onSubmit={onSubmit}
        currentEquipo={currentEquipo}
      />
    </div>
  );
};
