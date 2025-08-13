import * as rutaServices from "@/features/private/inspeccion/rutas/services/rutas.services";
import {
  IRuta,
  ITipoVisita,
  IResultados,
} from "@/features/private/inspeccion/rutas/interfaces";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCrearRutas = () => {
  const queryClient = useQueryClient();
  const methodsRutas = useForm<IRuta>();

  // Get tipos visitas
  const { data: dataTipoVisita = [] } = useQuery<ITipoVisita[]>({
    queryKey: ["tiposVisita"],
    queryFn: async () => {
      try {
        const { data } = await rutaServices.getTiposVisita();
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // Get resultados
  const { data: resultados = [] } = useQuery<IResultados[]>({
    queryKey: ["resultados"],
    queryFn: async () => {
      try {
        const { data } = await rutaServices.getResultados();
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // Crear ruta
  const rutaMutation = useMutation({
    mutationFn: (form: IRuta) => rutaServices.createRuta(form),

    onMutate: () => {
      Swal.fire({
        title: "Cargando...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Creado",
        text: "Ruta creada exitosamente",
        confirmButtonText: "Aceptar",
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["rutas"] });
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  const onSubmit = (form: IRuta) => {
    rutaMutation.mutate(form);
  };

  return {
    methods: methodsRutas,
    onSubmit,
    dataTipoVisita,
    resultados,
  };
};
