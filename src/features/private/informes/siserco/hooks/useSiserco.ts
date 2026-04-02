import { useState, useCallback } from "react";
import { getSisercoData, exportSisercoZip } from "../services/siserco.service";

export const useSiserco = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<any>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    tipoInspeccion: "",
    inspector: "",
    numeroActa: "",
  });

  const [loadingExport, setLoadingExport] = useState(false);

  const fetchData = useCallback(async (page: number = 1, currentFilters: any = filters) => {
    setLoading(true);
    try {
      const response = await getSisercoData({
        ...currentFilters,
        page,
        limit: pagination?.limit || 10,
      });
      if (response && response.data) {
        setData(response.data.data || []);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching SISERCO data:", error);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination?.limit]);

  const handleExportZip = async () => {
    setLoadingExport(true);
    try {
      const blob = await exportSisercoZip(filters);
      
      // Si el servidor retorna un error en formato JSON envuelto en un Blob
      if (blob.type === "application/json") {
        const text = await blob.text();
        const responseData = JSON.parse(text);
        alert(responseData.message || "Error al exportar el archivo ZIP");
        return;
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      const timestamp = new Date().toISOString().split("T")[0];
      link.href = url;
      link.setAttribute("download", `SISERCO_${timestamp}.zip`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting SISERCO ZIP:", error);
      alert("Hubo un error al generar el archivo ZIP. Por favor, reintente.");
    } finally {
      setLoadingExport(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    fetchData(newPage);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    fetchData(1, newFilters);
  };

  return {
    data,
    loading,
    loadingExport,
    pagination,
    filters,
    fetchData,
    handlePageChange,
    handleFilterChange,
    handleExportZip,
  };
};