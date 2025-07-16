import * as departamentosServices from "@/features/private/configuracion/departamentos/services/departamentos.services";
import * as ciudadServices from "@/features/private/configuracion/ciudad/services/ciudad.services";
import { IDepartamentos } from "@/features/private/configuracion/departamentos/interfaces";
import {
  ICiudad,
  ICiudades,
} from "@/features/private/configuracion/ciudad/interfaces";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useCiudad = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [currentCiudad, setCurrentCiudad] = useState<IDepartamentos | null>(
    null
  );
  const methodsCiudad = useForm<ICiudad>();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentCiudad(null);
    methodsCiudad.reset();
  };

  const openCurrentCiudad = (ciudad: ICiudades) => {
    setCurrentCiudad(ciudad);
    handleOpen();
  };

  //   Get departamentos
  const { data = [] } = useQuery<IDepartamentos[]>({
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

  //   Get ciudades
  const {
    data: ciudades = [],
    isLoading,
    isError,
    error,
  } = useQuery<ICiudades[]>({
    queryKey: ["ciudades"],
    queryFn: async () => {
      try {
        const { data } = await ciudadServices.getCiudades();
        return data.data;
      } catch (error) {
        console.error(error);
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const ciudadesMutation = useMutation({
    mutationFn: (form: ICiudad) =>
      ciudadServices.crateCiudad({
        codigo_municipio: form.codigo_municipio,
        nombre: form.nombre,
        id_departamento: form.id_departamento,
      }),

    onMutate: () => {
      Swal.fire({
        icon: "success",
        title: "Creado",
        text: "Ciudad creado exitosamente",
        confirmButtonText: "Aceptar",
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["ciudades"] });
        handleClose();
      });
    },
    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  const updateCiudadMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ICiudad }) =>
      ciudadServices.updateCiudad(id, data),

    onMutate: () => {
      Swal.fire({
        title: "Actualizando...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Actualizado",
        text: "Departamento actualizado correctamente",
        confirmButtonText: "Aceptar",
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["departamentos"] });
        handleClose();
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  //   Control del formulario
  const onSubmit = (form: ICiudad) => {
    if (currentCiudad) {
      updateCiudadMutation.mutate({
        id: currentCiudad.codigo,
        data: form,
      });
    } else {
      ciudadesMutation.mutate(form);
    }
  };

  useEffect(() => {
    if (currentCiudad) {
      methodsCiudad.setValue("nombre", currentCiudad.nombre);
      methodsCiudad.setValue("codigo_municipio", currentCiudad.codigo);
    } else {
      methodsCiudad.setValue("nombre", "");
      methodsCiudad.setValue("codigo_municipio", "");
    }
  }, [currentCiudad]);

  return {
    ciudades,
    departamentos: data,
     isLoading,
    isError,
    error,
    handleOpen,
    handleClose,
    openCurrentCiudad,
    open,
    currentCiudad,
    onSubmit,
    methodsCiudad,
  };
};
