import * as inspeccionServices from "@/features/private/inspeccion/inspecciones/services/inspecciones.services";
import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useActa = () => {
  const { id } = useParams<{ id: string }>();

  const numericId = id ? Number(id) : undefined;

  const {
    data: inspeccion,
    isLoading,
    isError,
    error,
  } = useQuery<IActa>({
    queryKey: ["inspeccion", numericId],
    queryFn: async () => {
      try {
        const { data } = await inspeccionServices.getInspeccion(numericId!);
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    enabled: !!numericId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // 2) Firma del cliente (opcional por si la usas en otro lado)
  const {
    data: firmaBase64,
    isLoading: isLoadingFirma,
    isError: isErrorFirma,
  } = useQuery<string>({
    queryKey: ["inspeccion-firma", numericId],
    queryFn: async () => {
      try {
        const { data } = await inspeccionServices.getFirma(numericId!);
        return data.data.imagen.base64 as string;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    enabled: !!numericId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // 3) Esquema en planta
  const {
    data: esquemaPlantaBase64,
    isLoading: isLoadingEsquema,
    isError: isErrorEsquema,
  } = useQuery<string>({
    queryKey: ["inspeccion-esquema-planta", numericId],
    queryFn: async () => {
      try {
        const { data } = await inspeccionServices.getEsquemaPlanta(numericId!);
        return data.data.imagen.base64 as string;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    enabled: !!numericId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // 4) Isométrico
  const {
    data: isometricoBase64,
    isLoading: isLoadingIsometrico,
    isError: isErrorIsometrico,
  } = useQuery<string>({
    queryKey: ["inspeccion-isometrico", numericId],
    queryFn: async () => {
      try {
        const { data } = await inspeccionServices.getIsometrico(numericId!);
        return data.data.imagen.base64 as string;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    enabled: !!numericId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const isLoadingImagenes =
    isLoadingFirma || isLoadingEsquema || isLoadingIsometrico;

  const isErrorImagenes = isErrorFirma || isErrorEsquema || isErrorIsometrico;

  return {
    // inspección
    inspeccion,
    isLoading,
    isError,
    error,

    // imágenes en base64
    firmaBase64,
    esquemaPlantaBase64,
    isometricoBase64,
    isLoadingImagenes,
    isErrorImagenes,
  };
};
