import { useState, useCallback } from "react";
import { getActaEntregaList, getActaEntregaPdf } from "../services/actaEntrega.service";
import Swal from "sweetalert2";

export const useActaEntrega = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    inspectorId: "",
  });

  const fetchData = useCallback(async (currentFilters: any = filters) => {
    // If no dates are provided, do not fetch
    if (!currentFilters.startDate || !currentFilters.endDate) {
      return;
    }
    
    setLoading(true);
    try {
      const response = await getActaEntregaList(currentFilters);
      if (response && response.success) {
        setData(response.data || []);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching Acta Entrega list:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const handleGeneratePdf = async () => {
    if (!filters.startDate || !filters.endDate) {
      Swal.fire({
        icon: "warning",
        title: "Fechas requeridas",
        text: "Por favor, seleccione un rango de fechas para generar el reporte.",
      });
      return;
    }

    setLoadingPdf(true);
    try {
      const response = await getActaEntregaPdf(filters);
      
      if (response && response.ok && response.base64) {
        const linkSource = response.dataUri || `data:application/pdf;base64,${response.base64}`;
        const downloadLink = document.createElement("a");
        const fileName = response.filename || `acta_entrega_documentos_${filters.startDate}_a_${filters.endDate}.pdf`;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        Swal.fire({
          icon: "success",
          title: "PDF Generado",
          text: "El acta de entrega se ha descargado correctamente.",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.message || "No se pudo generar el PDF.",
        });
      }
    } catch (error) {
      console.error("Error generating Acta Entrega PDF:", error);
      Swal.fire({
        icon: "error",
        title: "Error del Servidor",
        text: "Hubo un error al generar el PDF del acta de entrega.",
      });
    } finally {
      setLoadingPdf(false);
    }
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    fetchData(newFilters);
  };

  return {
    data,
    loading,
    loadingPdf,
    filters,
    fetchData,
    handleFilterChange,
    handleGeneratePdf,
  };
};
