import * as rutaServices from "@/features/private/inspeccion/rutas/services/rutas.services";
import {
  IAsignar,
  IRutas,
} from "@/features/private/inspeccion/rutas/interfaces";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { IUsuarios } from "@/features/private/configuracion/usuarios/interfaces";

export const useRutas = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [currentRuta, setCurrentRuta] = useState({} as IRutas);
  const methods = useForm<IAsignar>();

  const handleOpen = (payload: IRutas) => {
    setCurrentRuta(payload);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentRuta({} as IRutas);
    setOpen(false);
    methods.reset();
  };

  const {
    data: rutas = [],
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

  // Get inspectores
  const { data: inspectores = [] } = useQuery<IUsuarios[]>({
    queryKey: ["inspectores"],
    queryFn: async () => {
      try {
        const { data } = await rutaServices.getInspectores();
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const asignarMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: IAsignar }) =>
      rutaServices.asignarRuta(id, data),

    onMutate: () => {
      Swal.fire({
        title: "Actualizando...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },

    onSuccess: (_, vars) => {
      Swal.fire({
        icon: "success",
        title: "Actualizado",
        text: "Cambio de inspector realizado",
        confirmButtonText: "Aceptar",
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["rutas"] });

        if (vars?.id) {
          queryClient.invalidateQueries({
            queryKey: ["historialRuta", vars.id],
          });
        }
        handleClose();
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  const onSubmit = (form: IAsignar) => {
    if (currentRuta) {
      asignarMutation.mutate({
        id: currentRuta.id_ruta,
        data: form,
      });
    }
  };

  return {
    // rutas
    rutas,
    isLoading,
    isError,
    error,

    // asignar
    open,
    currentRuta,
    handleOpen,
    handleClose,
    methods,
    onSubmit,
    inspectores,
  };
};
