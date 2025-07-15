import * as departamentosServices from "@/features/private/configuracion/departamentos/services/departamentos.services";
import { useForm } from "react-hook-form";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IDepartamento, IDepartamentos } from "@/features/private/configuracion/departamentos/interfaces";
import Swal from "sweetalert2";

export const useDepartamento = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [currentDepartamento, setCurrentDepartamento] = useState<IDepartamentos | null>(
    null
  );
  const methodsDepartamentos = useForm<IDepartamento>();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentDepartamento(null);
    methodsDepartamentos.reset();
  };

  const openCurrentDepartamento = (departamento: IDepartamentos) => {
    setCurrentDepartamento(departamento);
    handleOpen();
  };

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery<IDepartamentos[]>({
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

  //   Crear departamento
  const departamentosMutation = useMutation({
    mutationFn: (form: IDepartamento) =>
      departamentosServices.crateDepartamento({
        nombre: form.nombre,
        codigo: form.codigo,
      }),

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
        text: "Departamento creado exitosamente",
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

  //   Actualizar departamento
  const updateDepartamentoMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: IDepartamento }) =>
      departamentosServices.updateDepartamento(id, data),

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
  const onSubmit = (form: IDepartamento) => {
    if (currentDepartamento) {
      updateDepartamentoMutation.mutate({
        id: currentDepartamento.codigo,
        data: form,
      });
    } else {
      departamentosMutation.mutate(form);
    }
  };

  useEffect(() => {
    if (currentDepartamento) {
      methodsDepartamentos.setValue("nombre", currentDepartamento.nombre);
      methodsDepartamentos.setValue("codigo", currentDepartamento.codigo);
    } else {
      methodsDepartamentos.setValue("nombre", "");
      methodsDepartamentos.setValue("codigo", "");
    }
  }, [currentDepartamento]);

  return {
    departamentos: data,
    isLoading,
    isError,
    error,
    handleOpen,
    handleClose,
    openCurrentDepartamento,
    open,
    currentDepartamento,
    onSubmit,
    methodsDepartamentos,
  };
};
