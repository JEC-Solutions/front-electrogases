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
    },
  );

  const inspeccionQuery = useQuery({
    queryKey: ["reporte-tipo-inspeccion", queryDates],
    queryFn: () =>
      inicioServices.getReporteTipoInspeccion(
        queryDates.inicio,
        queryDates.fin,
      ),
  });

  const gasQuery = useQuery({
    queryKey: ["reporte-tipo-gas", queryDates],
    queryFn: () =>
      inicioServices.getReporteTipoGas(queryDates.inicio, queryDates.fin),
  });

  const equiposQuery = useQuery({
    queryKey: ["reporte-equipos-utilizados", queryDates],
    queryFn: () =>
      inicioServices.getReporteEquiposUtilizados(
        queryDates.inicio,
        queryDates.fin,
      ),
  });

  const historialAccesosQuery = useQuery({
    queryKey: ["historial-accesos-inspectores", queryDates],
    queryFn: () =>
      inicioServices.getHistorialAccesosInspectores(
        queryDates.inicio,
        queryDates.fin,
      ),
  });

  const inspectoresActivosQuery = useQuery({
    queryKey: ["inspectores-activos"],
    queryFn: () => inicioServices.getInspectoresActivos(),
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

    // Datos inspecciones
    inspeccionesData: inspeccionQuery.data?.data?.data || [],
    isLoadingInspecciones: inspeccionQuery.isLoading,

    // Datos gas
    gasData: gasQuery.data?.data?.data?.desglose || [],
    gasTotal: gasQuery.data?.data?.data?.total || 0,
    isLoadingGas: gasQuery.isLoading,

    // Datos equipos
    equiposData: equiposQuery.data?.data?.data?.desglose || [],
    equiposTotal: equiposQuery.data?.data?.data?.total || 0,
    isLoadingEquipos: equiposQuery.isLoading,

    // Datos historial de accesos
    historialAccesosData:
      historialAccesosQuery.data?.data?.data?.desglose || [],
    historialAccesosTotal: historialAccesosQuery.data?.data?.data?.total || 0,
    isLoadingHistorialAccesos: historialAccesosQuery.isLoading,

    // Datos inspectores activos
    inspectoresActivosData:
      inspectoresActivosQuery.data?.data?.data?.inspectores || [],
    inspectoresActivosTotal:
      inspectoresActivosQuery.data?.data?.data?.total || 0,
    isLoadingInspectoresActivos: inspectoresActivosQuery.isLoading,
  };
};
