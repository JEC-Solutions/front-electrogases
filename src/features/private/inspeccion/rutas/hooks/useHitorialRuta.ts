import * as rutaServices from "@/features/private/inspeccion/rutas/services/rutas.services";
import { IRutas } from "@/features/private/inspeccion/rutas/interfaces";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type AccionHist = "asignado" | "desasignado" | "reasignado" | "sin cambio";
export interface IRutaHistorial {
  id_ruta: number;
  inspector_actual_id: number | null;
  total_eventos: number;
  eventos: Array<{
    id_ruta_log: number;
    fecha: string;
    motivo: string | null;
    accion: AccionHist;
    prev_inspector: {
      id_persona: number | null;
      nombre_completo: string | null;
    };
    new_inspector: { id_persona: number | null };
    changed_by: { id_persona: number | null; nombre_completo: string | null };
  }>;
}

export const useHistorialRuta = () => {
  const [openHistorial, setOpenHistorial] = useState(false);
  const [historialRutaId, setHistorialRutaId] = useState<number | null>(null);

  const handleViewHistorial = (ruta: IRutas) => {
    setHistorialRutaId(ruta.id_ruta);
    setOpenHistorial(true);
  };
  const handleCloseHistorial = () => {
    setOpenHistorial(false);
    setHistorialRutaId(null);
  };

  const {
    data: historial,
    isLoading: loadingHistorial,
    isError: errorHistorial,
    error: historialError,
    refetch: refetchHistorial,
  } = useQuery<IRutaHistorial>({
    queryKey: ["historialRuta", historialRutaId],
    queryFn: async () => {
      try {
        const { data } = await rutaServices.historialRuta(
          historialRutaId as number
        );
        return data.data as IRutaHistorial;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    enabled: openHistorial && !!historialRutaId,
    refetchOnWindowFocus: false,
  });

  return {
    // historial
    openHistorial,
    historialRutaId,
    historial,
    loadingHistorial,
    errorHistorial,
    historialError,
    handleViewHistorial,
    handleCloseHistorial,
    refetchHistorial,
  };
};
