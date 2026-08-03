import { useInspecciones } from "@/features/private/inspeccion/inspecciones/hooks";
import { Alert, Card } from "antd";
import { TableInspecciones } from "@/features/private/inspeccion/inspecciones/components";

export const Inspecciones = () => {
  const {
    error,
    inspecciones,
    isError,
    isLoading,
    // paginación
    pagination,
    filters,
    handleFilterChange,
    handlePageChange,
    // pdf
    downloadPdf,
    downloadMassivePdf,
    getImagenPorTipo,
    autorizarEdicion,
    isAutorizando,
    togglePrueba,
    isTogglingPrueba,
    downloadImages,
    downloadMassiveImages,
  } = useInspecciones();

  // Solo cubre las inspecciones de la página visible, que es lo que trae el listado
  const incompletas = inspecciones.filter(
    (i) => i.estado_imagenes?.verificable && !i.estado_imagenes.completo,
  );
  const fotosFaltantes = incompletas.reduce(
    (acc, i) => acc + (i.estado_imagenes?.faltantes ?? 0),
    0,
  );

  return (
    <div className="mt-8 px-4 sm:px-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Inspecciones</h1>
        <p className="text-gray-600">
          Acá podrás visualizar y gestionar todas las inspecciones realizadas,
          descargar actas en PDF y consultar evidencias fotográficas.
        </p>
      </div>

      {incompletas.length > 0 && (
        <Alert
          type="warning"
          showIcon
          className="mb-4"
          message={
            incompletas.length === 1
              ? "1 inspección de esta página tiene fotos faltantes"
              : `${incompletas.length} inspecciones de esta página tienen fotos faltantes`
          }
          description={`Faltan ${fotosFaltantes} ${
            fotosFaltantes === 1 ? "fotografía" : "fotografías"
          } por cargar. Revisa la columna "Fotos" y haz clic en la etiqueta roja para subirlas.`}
        />
      )}

      <Card>
        {isError ? (
          <div style={{ color: "red", textAlign: "center" }}>
            Ocurrió un error al cargar las inspecciones.
            <br />
            {error instanceof Error
              ? error.message
              : "Inténtalo de nuevo más tarde."}
          </div>
        ) : (
          <TableInspecciones
            inspecciones={inspecciones}
            downloadPdf={downloadPdf}
            downloadMassivePdf={downloadMassivePdf}
            getImagenPorTipo={getImagenPorTipo}
            autorizarEdicion={autorizarEdicion}
            isAutorizando={isAutorizando}
            togglePrueba={togglePrueba}
            isTogglingPrueba={isTogglingPrueba}
            downloadImages={downloadImages}
            downloadMassiveImages={downloadMassiveImages}
            pagination={pagination}
            filters={filters}
            handleFilterChange={handleFilterChange}
            handlePageChange={handlePageChange}
            isLoading={isLoading}
          />
        )}
      </Card>
    </div>
  );
};
