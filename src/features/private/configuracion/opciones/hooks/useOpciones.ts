import * as opcionesServices from "@/features/private/configuracion/opciones/services/opciones.services";
import * as menuServices from "@/features/private/configuracion/menus/services/menu.services";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  IOpciones,
  IOpcion,
} from "@/features/private/configuracion/opciones/interfaces";
import { IMenus } from "@/features/private/configuracion/menus/interface";
import { useEffect, useState } from "react";

export const useOpciones = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [currentOpcion, setCurrentOpcion] = useState<IOpciones | null>(null);
  const methodsOpciones = useForm<IOpcion>();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentOpcion(null);
    methodsOpciones.reset();
  };

  const openCurrentOpcion = (rol: IOpciones) => {
    setCurrentOpcion(rol);
    handleOpen();
  };

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery<IOpciones[]>({
    queryKey: ["opciones"],
    queryFn: async () => {
      try {
        const { data } = await opcionesServices.getOpciones();
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const { data: menus = [] } = useQuery<IMenus[]>({
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

  //   Create opcion
  const opcionMutation = useMutation({
    mutationFn: (form: IOpcion) =>
      opcionesServices.createOpcion({
        nombre: form.nombre,
        link: form.link,
        id_menu: form.id_menu,
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
        text: "Opcion creada exitosamente",
        confirmButtonText: "Aceptar",
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["opciones"] });
        handleClose();
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  //   Update opcion
  const updateOpcionMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: IOpcion }) =>
      opcionesServices.updateOpcion(id, data),

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
        text: "Opcion actualizada correctamente",
        confirmButtonText: "Aceptar",
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["opciones"] });
        handleClose();
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  //   Control del formulario
  const onSubmit = (form: IOpcion) => {
    if (currentOpcion) {
      updateOpcionMutation.mutate({ id: currentOpcion?.id_opcion, data: form });
    } else {
      opcionMutation.mutate(form);
    }
  };

  //   Eliminar rol
  const deleteOpcionMutation = useMutation({
    mutationFn: (id: number) => opcionesServices.deleteOpcion(id),

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
        deleteOpcionMutation.mutate(id);
      }
    });
  };

  // Actualizar estado del rol
  const toggleRoleMutation = useMutation({
    mutationFn: (id: number) => opcionesServices.toggleStatus(id),

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
    if (currentOpcion) {
      methodsOpciones.setValue("nombre", currentOpcion.nombre);
      methodsOpciones.setValue("link", currentOpcion.link);
      methodsOpciones.setValue("id_menu", currentOpcion.menu.id_menu);
    } else {
      methodsOpciones.setValue("nombre", "");
      methodsOpciones.setValue("link", "");
      methodsOpciones.setValue("id_menu", 0);
    }
  }, [currentOpcion]);

  return {
    opciones: data,
    menus,
    isLoading,
    isError,
    error,
    open,
    currentOpcion,
    handleOpen,
    handleClose,
    openCurrentOpcion,
    onSubmit,
    methodsOpciones,
    toggleMenuStatus,
    handleDelete,
  };
};
