import { useRutas } from "@/features/private/inspeccion/rutas/hooks";
import { Button, Card } from "antd";
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
    asesores,

    // pdf
    generarPDF,

    // pagination & filters
    pagination,
    setPage,
    setLimit,
    setFilters,

    // update
    onUpdateDate,

    // toggle
    onToggleStatus,
  } = useRutas();
  const navigate = useNavigate();

  const handleAgregarRuta = () => {
    navigate("/dashboard/inspecciones/rutas/crear");
  };

  return (
    <div className="mt-8 px-4 sm:px-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Rutas</h1>
        <p className="text-gray-600">
          Acá podrás crear, asignar y gestionar las rutas de inspección, así como generar los reportes correspondientes para cada ruta.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-4">
        <Button
          type="primary"
          onClick={handleAgregarRuta}
          className="w-full xl:w-auto"
        >
          Agregar Rutas
        </Button>
      </div>

      <Card>
        {isError ? (
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
            asesores={asesores}
            onDownload={generarPDF}
            pagination={pagination}
            setPage={setPage}
            setLimit={setLimit}
            setFilters={setFilters}
            isLoading={isLoading}
            onUpdateDate={onUpdateDate}
            onToggleStatus={onToggleStatus}
          />
        )}
      </Card>
    </div>
  );
};
