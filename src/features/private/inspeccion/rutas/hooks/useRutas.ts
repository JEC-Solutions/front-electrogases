import * as rutaServices from "@/features/private/inspeccion/rutas/services/rutas.services";
import { IRutas } from "@/features/private/inspeccion/rutas/interfaces";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useQuery } from "@tanstack/react-query";

export const useRutas = () => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery<IRutas[]>({
    queryKey: ["rutas"],
    queryFn: async () => {
      try {
        const { data } = await rutaServices.getRutas();
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    rutas: data,
    isLoading,
    isError,
    error,
  };
};
