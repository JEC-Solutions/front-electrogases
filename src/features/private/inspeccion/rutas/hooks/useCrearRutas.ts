import * as rutaServices from "@/features/private/inspeccion/rutas/services/rutas.services";
import { IRuta, IRutas } from "@/features/private/inspeccion/rutas/interfaces";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCrearRutas = () => {
  const queryClient = useQueryClient();
  const methodsRutas = useForm<IRuta>();

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
  };
};
