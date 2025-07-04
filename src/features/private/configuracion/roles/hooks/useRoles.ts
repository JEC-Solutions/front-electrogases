import * as rolesServices from "@/features/private/configuracion/roles/services/roles.services";
import { useForm } from "react-hook-form";
import {
  IRole,
  IRoles,
} from "@/features/private/configuracion/roles/interfaces";
import Swal from "sweetalert2";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useRoles = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [currentRol, setCurrentRol] = useState<IRoles | null>(null);
  const methodsRoles = useForm<IRole>();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentRol(null);
    methodsRoles.reset();
  };

  const openCurrentRol = (rol: IRoles) => {
    setCurrentRol(rol);
    handleOpen();
  };

  //   Get roles
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery<IRoles[]>({
    queryKey: ["roles"],
    queryFn: async () => {
      try {
        const { data } = await rolesServices.getRoles();
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  //   Create roles
  const roleMutation = useMutation({
    mutationFn: (form: IRole) =>
      rolesServices.crateRoles({
        nombre_rol: form.nombre_rol,
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
        text: "Inicio de sesión exitoso",
        confirmButtonText: "Aceptar",
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["roles"] });
        handleClose();
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  //   Update role
  const updateRoleMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: IRole }) =>
      rolesServices.updateRole(id, data),

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
        text: "Rol actualizado correctamente",
        confirmButtonText: "Aceptar",
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["roles"] });
        handleClose();
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  //   Control del formulario
  const onSubmit = (form: IRole) => {
    if (currentRol) {
      updateRoleMutation.mutate({ id: currentRol.id_rol, data: form });
    } else {
      roleMutation.mutate(form);
    }
  };

  //   Eliminar rol
  const deleteRoleMutation = useMutation({
    mutationFn: (id: number) => rolesServices.deleteRole(id),

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
        text: "Rol eliminado correctamente",
        confirmButtonText: "Aceptar",
      });
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  //   Ejecutar el query
  const handleDelete = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRoleMutation.mutate(id);
      }
    });
  };

  // Actualizar estado del rol
  const toggleRoleMutation = useMutation({
    mutationFn: (id: number) => rolesServices.toggleStatus(id),

    onMutate: () => {
      Swal.fire({
        title: "Actualizando estado...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Estado actualizado",
        text: "El rol fue activado/desactivado correctamente",
        confirmButtonText: "Aceptar",
      });
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  // Actualizar estado del rol
  const toggleRoleStatus = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas activar o desactivar este rol?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        toggleRoleMutation.mutate(id);
      }
    });
  };

  useEffect(() => {
    if (currentRol) {
      methodsRoles.setValue("nombre_rol", currentRol.nombre_rol);
    } else {
      methodsRoles.setValue("nombre_rol", "");
    }
  }, [currentRol]);

  return {
    roles: data,
    isLoading,
    isError,
    error,
    onSubmit,
    methodsRoles,
    handleOpen,
    handleClose,
    open,
    currentRol,
    openCurrentRol,
    handleDelete,
    toggleRoleStatus
  };
};
