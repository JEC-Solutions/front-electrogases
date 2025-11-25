import * as inicioServices from "@/features/private/inicio/services/inicio.services";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import dayjs from "dayjs";

export const useInicio = () => {
  const today = dayjs().format("YYYY-MM-DD");

  const [selectedDates, setSelectedDates] = useState<{
    inicio: string;
    fin: string;
  }>({
    inicio: today,
    fin: today,
  });

  const [queryDates, setQueryDates] = useState<{ inicio: string; fin: string }>(
    {
      inicio: today,
      fin: today,
    }
  );

  const inspeccionQuery = useQuery({
    queryKey: ["reporte-tipo-inspeccion", queryDates],
    queryFn: () =>
      inicioServices.getReporteTipoInspeccion(
        queryDates.inicio,
        queryDates.fin
      ),
  });

  const gasQuery = useQuery({
    queryKey: ["reporte-tipo-gas", queryDates],
    queryFn: () =>
      inicioServices.getReporteTipoGas(queryDates.inicio, queryDates.fin),
  });

  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    if (dates) {
      setSelectedDates({
        inicio: dateStrings[0],
        fin: dateStrings[1],
      });
    }
  };

  const handleFiltrar = () => {
    setQueryDates(selectedDates);
  };

  return {
    selectedDates,
    handleDateChange,
    handleFiltrar,

    // Datos
    inspeccionesData: inspeccionQuery.data?.data?.data || [],
    isLoadingInspecciones: inspeccionQuery.isLoading,

    gasData: gasQuery.data?.data?.data?.desglose || [],
    gasTotal: gasQuery.data?.data?.data?.total || 0,
    isLoadingGas: gasQuery.isLoading,
  };
};
