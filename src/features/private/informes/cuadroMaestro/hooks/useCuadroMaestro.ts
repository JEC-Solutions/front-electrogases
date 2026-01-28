import { useQuery } from "@tanstack/react-query";
import * as cuadroMaestroServices from "../services/cuadroMaestro.services";
import { handleAxiosError } from "@/utils";
import { IResponseCuadroMaestro } from "@/features/private/informes/cuadroMaestro/interfaces/cuadroMaestro.interfaces";
import { useState } from "react";
import { message } from "antd";

export const useCuadroMaestro = () => {
  const [isExporting, setIsExporting] = useState(false);

  const {
    data: cuadroMaestro = [],
    isLoading,
    isError,
    error,
  } = useQuery<IResponseCuadroMaestro[]>({
    queryKey: ["cuadro-maestro"],
    queryFn: async () => {
      try {
        const { data } = await cuadroMaestroServices.getCuadroMaestro();
        console.log(data);
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
    cuadroMaestro,
    isLoading,
    isError,
    error,
    exportExcel,
    isExporting,
  };
};
