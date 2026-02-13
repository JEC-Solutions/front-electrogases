import { useInspecciones } from "@/features/private/inspeccion/inspecciones/hooks";
import { Card } from "antd";
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
    downloadImages,
  } = useInspecciones();

  return (
    <div className="mt-8">
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
            downloadImages={downloadImages}
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
