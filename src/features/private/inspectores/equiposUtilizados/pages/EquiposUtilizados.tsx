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
    <div className="mt-8">
      <Button type="primary" className="mb-4" onClick={handleOpen}>
        Agregar Equipo Utilizado
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
