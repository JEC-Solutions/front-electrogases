import { useRutas } from "@/features/private/inspeccion/rutas/hooks";
import { Button, Card, Spin } from "antd";
import { TableRutas } from "@/features/private/inspeccion/rutas/components";
import { useNavigate } from "react-router-dom";

export const Rutas = () => {
  const {
    // rutas
    rutas,
    isLoading,
    isError,
    error,

    // asignar
    open,
    currentRuta,
    handleOpen,
    handleClose,
    methods,
    onSubmit,
    inspectores,

    // pdf
    generarPDF
  } = useRutas();
  const navigate = useNavigate();

  const handleAgregarRuta = () => {
    navigate("/dashboard/inspecciones/rutas/crear");
  };

  return (
    <div className="mt-8">
      <Button type="primary" className="mb-4" onClick={handleAgregarRuta}>
        Agregar Rutas
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
            Ocurrió un error al cargar las rutas.
            <br />
            {error instanceof Error
              ? error.message
              : "Inténtalo de nuevo más tarde."}
          </div>
        ) : (
          <TableRutas
            rutas={rutas}
            current={currentRuta}
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            methods={methods}
            onSubmit={onSubmit}
            inspectores={inspectores}
            onDownload={generarPDF}
          />
        )}
      </Card>
    </div>
  );
};
