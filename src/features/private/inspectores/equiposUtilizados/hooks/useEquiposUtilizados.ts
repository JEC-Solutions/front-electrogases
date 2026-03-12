import * as equiposUtilizadosServices from "@/features/private/inspectores/equiposUtilizados/services/equiposUtilizados.services";
import {
  IEquiposUtilizados,
  IEquiposUtilizadosRequest,
} from "@/features/private/inspectores/equiposUtilizados/interfaces";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export const useEquiposUtilizados = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [currentEquipo, setCurrentEquipo] = useState<IEquiposUtilizados | null>(
    null,
  );
  const methodsEquipos = useForm<IEquiposUtilizadosRequest>();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentEquipo(null);
    methodsEquipos.reset();
  };

  const openCurrentEquipo = (equipo: IEquiposUtilizados) => {
    setCurrentEquipo(equipo);
    handleOpen();
  };

  // Get equips
  const {
    data: equipos = [],
    isLoading,
    isError,
    error,
  } = useQuery<IEquiposUtilizados[]>({
    queryKey: ["equiposUtilizados"],
    queryFn: async () => {
      try {
        const { data } =
          await equiposUtilizadosServices.equiposUtilizadosServices();
        return data.data; // Assuming backend returns { data: [...] } like the reference service
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (form: IEquiposUtilizadosRequest) =>
      equiposUtilizadosServices.createEquiposUtilizadosServices(form),

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
        text: "Equipo creado con éxito",
        confirmButtonText: "Aceptar",
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["equiposUtilizados"] });
        handleClose();
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: IEquiposUtilizadosRequest;
    }) => equiposUtilizadosServices.updateEquiposUtilizadosServices(id, data),

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
        text: "Equipo actualizado correctamente",
        confirmButtonText: "Aceptar",
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["equiposUtilizados"] });
        handleClose();
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      equiposUtilizadosServices.deleteEquiposUtilizadosServices(id),

    onMutate: () => {
      Swal.fire({
        title: "Eliminando...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "Equipo eliminado correctamente",
        confirmButtonText: "Aceptar",
      });
      queryClient.invalidateQueries({ queryKey: ["equiposUtilizados"] });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const onSubmit = (form: IEquiposUtilizadosRequest) => {
    if (currentEquipo) {
      updateMutation.mutate({
        id: currentEquipo.id_equipos_utilizados,
        data: form,
      });
    } else {
      createMutation.mutate(form);
    }
  };

  useEffect(() => {
    if (currentEquipo) {
      methodsEquipos.setValue(
        "equiposUtilizados",
        currentEquipo.equiposUtilizados,
      );
      methodsEquipos.setValue("ns", currentEquipo.ns);
      methodsEquipos.setValue("marca", currentEquipo.marca);
      methodsEquipos.setValue("modelo", currentEquipo.modelo);
      methodsEquipos.setValue("codigo_interno", currentEquipo.codigo_interno ?? null);
      methodsEquipos.setValue("certificado_calibracion", currentEquipo.certificado_calibracion ?? null);
      methodsEquipos.setValue("prestado", currentEquipo.prestado ?? false);

      methodsEquipos.setValue(
        "personas",
        currentEquipo.equiposUsuarios?.map((eu) => eu.idPersona.id_persona),
      );
    } else {
      methodsEquipos.reset();
    }
  }, [currentEquipo]);

  return {
    equipos,
    isLoading,
    isError,
    error,
    methodsEquipos,
    open,
    handleOpen,
    handleClose,
    openCurrentEquipo,
    currentEquipo,
    onSubmit,
    handleDelete,
  };
};
