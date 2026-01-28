import { useQuery } from "@tanstack/react-query";
import * as cuadroMaestroServices from "../services/cuadroMaestro.services";
import { handleAxiosError } from "@/utils";
import { IResponseCuadroMaestro } from "@/features/private/informes/cuadroMaestro/interfaces/cuadroMaestro.interfaces";

export const useCuadroMaestro = () => {
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
        console.log(data)
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
    cuadroMaestro,
    isLoading,
    isError,
    error,
  };
};
