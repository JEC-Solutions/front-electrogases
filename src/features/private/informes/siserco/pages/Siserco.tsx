import { useEffect } from "react";
import { Divider } from "antd";
import { SisercoForm } from "../components/SisercoForm";
import { SisercoTable } from "../components/SisercoTable";
import { useSiserco } from "../hooks/useSiserco";

export const Siserco = () => {
  const {
    data,
    loading,
    loadingExport,
    pagination,
    handlePageChange,
    handleFilterChange,
    handleExportZip,
    fetchData,
  } = useSiserco();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="mt-8 px-4 sm:px-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Generador de Reporte SISERCO
        </h1>
        <p className="text-gray-600">
          Este módulo permite listar y filtrar las inspecciones realizadas para
          su posterior cargue en el sistema SISERCO.
        </p>
      </div>

      <Divider />

      <SisercoForm 
        onFiltersChange={handleFilterChange} 
        onExportZip={handleExportZip}
        loading={loading} 
        loadingExport={loadingExport}
      />

      <SisercoTable
        data={data}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
