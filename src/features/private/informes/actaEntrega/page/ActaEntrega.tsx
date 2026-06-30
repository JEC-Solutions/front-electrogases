import { Divider } from "antd";
import { ActaEntregaForm } from "../components/ActaEntregaForm";
import { ActaEntregaTable } from "../components/ActaEntregaTable";
import { useActaEntrega } from "../hooks/useActaEntrega";

export const ActaEntrega = () => {
  const { data, loading, loadingPdf, handleFilterChange, handleGeneratePdf } =
    useActaEntrega();

  return (
    <div className="mt-8 px-4 sm:px-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Generador de Reporte Acta de Entrega
        </h1>
        <p className="text-gray-600">
          Este módulo permite listar y filtrar las inspecciones realizadas para
          su posterior generación del acta de entrega.
        </p>
      </div>

      <Divider />

      <ActaEntregaForm
        onFiltersChange={handleFilterChange}
        onGeneratePdf={handleGeneratePdf}
        loading={loading}
        loadingPdf={loadingPdf}
      />

      <ActaEntregaTable data={data} loading={loading} />
    </div>
  );
};

