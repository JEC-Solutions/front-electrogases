import * as departamentosServices from "@/features/private/configuracion/departamentos/services/departamentos.services";
import * as ciudadServices from "@/features/private/configuracion/ciudad/services/ciudad.services";
import { IDepartamentos } from "@/features/private/configuracion/departamentos/interfaces";
import { ICiudades } from "@/features/private/configuracion/ciudad/interfaces";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useGlobalDptos = () => {
  const [selectedDpto, setSelectedDpto] = useState<string | null>(null);

  const { data: ciudades = [] } = useQuery<ICiudades[]>({
    queryKey: ["ciudades", selectedDpto],
    enabled: !!selectedDpto,
    queryFn: async () => {
      try {
        const { data } = await ciudadServices.getCitysByDpto(selectedDpto!);
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const { data: departamentos = [] } = useQuery<IDepartamentos[]>({
    queryKey: ["departamentos"],
    queryFn: async () => {
      try {
        const { data } = await departamentosServices.getDepartamentos();
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const getCityByDpto = (codigo: string) => {
    setSelectedDpto(codigo);
  };

  return {
    departamentos,
    ciudades,
    getCityByDpto
  };
};
