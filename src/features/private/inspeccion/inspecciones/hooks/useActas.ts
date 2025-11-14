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

  return {
    inspeccion,
    isLoading,
    isError,
    error,
  };
};
