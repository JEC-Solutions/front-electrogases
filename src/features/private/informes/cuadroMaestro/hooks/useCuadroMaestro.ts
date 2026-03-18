import { useQuery } from "@tanstack/react-query";
import * as cuadroMaestroServices from "../services/cuadroMaestro.services";
import { handleAxiosError } from "@/utils";
import { useState } from "react";
import { message } from "antd";

export const useCuadroMaestro = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState<{
    search?: string;
    startDate?: string;
    endDate?: string;
  }>({});

  const {
    data: response = { data: [], pagination: { total: 0 } },
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cuadro-maestro", page, limit, filters],
    queryFn: async () => {
      try {
        const { data } = await cuadroMaestroServices.getCuadroMaestro({
          page,
          limit,
          ...filters,
        });
        // The backend returns sendResponse(res, 200, "...", { data, pagination })
        // So axios.data is { status, message, data: { data, pagination } }
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const exportExcel = async () => {
    try {
      setIsExporting(true);
      const response = await cuadroMaestroServices.exportCuadroMaestroExcel();

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `cuadro_maestro_${new Date().toISOString().split("T")[0]}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      message.success("Excel exportado correctamente");
    } catch (error: any) {
      handleAxiosError(error);
      message.error("Error al exportar el Excel");
    } finally {
      setIsExporting(false);
    }
  };

  return {
    cuadroMaestro: response.data,
    total: response.pagination.total,
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
  };
};
