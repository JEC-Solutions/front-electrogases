import * as menuServices from "@/features/private/configuracion/menus/services/menu.services";
import {
  IMenu,
  IMenus,
} from "@/features/private/configuracion/menus/interface";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useMenu = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<IMenus | null>(null);
  const methodsMenus = useForm<IMenu>();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentMenu(null);
    methodsMenus.reset();
  };

  const openCurrentMenu = (rol: IMenus) => {
    setCurrentMenu(rol);
    handleOpen();
  };

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery<IMenus[]>({
    queryKey: ["menus"],
    queryFn: async () => {
      try {
        const { data } = await menuServices.getMenus();
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  //   Create menu
  const menuMutation = useMutation({
    mutationFn: (form: IMenu) =>
      menuServices.createMenu({
        nombre: form.nombre,
        icono: form.icono,
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
        text: "Menu creado exitosamente",
        confirmButtonText: "Aceptar",
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["menus"] });
        handleClose();
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  //   Update menu
  const updateMenuMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: IMenu }) =>
      menuServices.updateMenu(id, data),

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
        text: "Menu actualizado correctamente",
        confirmButtonText: "Aceptar",
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["menus"] });
        handleClose();
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  //   Control del formulario
  const onSubmit = (form: IMenu) => {
    if (currentMenu) {
      updateMenuMutation.mutate({ id: currentMenu.id_menu, data: form });
    } else {
      menuMutation.mutate(form);
    }
  };

  //   Eliminar rol
  const deleteRoleMutation = useMutation({
    mutationFn: (id: number) => menuServices.deleteMenu(id),

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
        text: "Menu eliminado correctamente",
        confirmButtonText: "Aceptar",
      });
      queryClient.invalidateQueries({ queryKey: ["menus"] });
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
    mutationFn: (id: number) => menuServices.toggleStatus(id),

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
        text: "El menu fue activado/desactivado correctamente",
        confirmButtonText: "Aceptar",
      });
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  // Actualizar estado del menu
  const toggleMenuStatus = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas activar o desactivar este menu?",
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
    if (currentMenu) {
      methodsMenus.setValue("nombre", currentMenu.nombre);
      methodsMenus.setValue("icono", currentMenu.icono);
    } else {
      methodsMenus.setValue("nombre", "");
      methodsMenus.setValue("icono", "");
    }
  }, [currentMenu]);

  return {
    menus: data,
    isLoading,
    isError,
    error,
    onSubmit,
    methodsMenus,
    handleOpen,
    handleClose,
    open,
    currentMenu,
    openCurrentMenu,
    handleDelete,
    toggleMenuStatus,
  };
};
