import { useCuadroMaestro } from "@/features/private/informes/cuadroMaestro/hooks";
import { TableCuadroMaestro } from "@/features/private/informes/cuadroMaestro/components";
import { Button } from "antd";
import { FileExcelOutlined } from "@ant-design/icons";

export const CuadroMaestro = () => {
  const {
    cuadroMaestro,
    total,
    isLoading,
    isError,
    error,
    exportExcel,
    isExporting,
    page,
    setPage,
    limit,
    setLimit,
    setFilters,
  } = useCuadroMaestro();

  return (
    <div className="mt-8 px-4 sm:px-0">
      <div className="mb-6 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Cuadro Maestro</h1>
          <p className="text-gray-600">
            Acá podrás visualizar el consolidado detallado de todas las inspecciones y exportar la información a formato Excel.
          </p>
        </div>
        <Button
          type="primary"
          icon={<FileExcelOutlined />}
          onClick={exportExcel}
          loading={isExporting}
          className="w-full xl:w-auto"
        >
          Exportar Excel
        </Button>
      </div>

      {isError ? (
        <div style={{ color: "red", textAlign: "center" }}>
          Ocurrió un error al cargar el cuadro maestro.
          <br />
          {error instanceof Error
            ? error.message
            : "Inténtalo de nuevo más tarde."}
        </div>
      ) : (
        <TableCuadroMaestro
          cuadroMaestro={cuadroMaestro}
          total={total}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          setFilters={setFilters}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
