import * as inspeccionServices from "@/features/private/inspeccion/inspecciones/services/inspecciones.services";
import { IInspecciones } from "@/features/private/inspeccion/inspecciones/interfaces";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useQuery } from "@tanstack/react-query";

export const useInspecciones = () => {
  const {
    data: inspecciones = [],
    isLoading,
    isError,
    error,
  } = useQuery<IInspecciones[]>({
    queryKey: ["inspecciones"],
    queryFn: async () => {
      try {
        const { data } = await inspeccionServices.getInspecciones();
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
    // inspecciones
    inspecciones,
    isLoading,
    isError,
    error,
  };
};
