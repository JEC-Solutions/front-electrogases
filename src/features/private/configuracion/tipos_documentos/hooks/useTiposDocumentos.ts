import * as tiposDocumentos from "@/features/private/configuracion/tipos_documentos/services/tipoDocumentos.services";
import { useForm } from "react-hook-form";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  ITipoDocumentos,
  ITipoDocumento,
} from "@/features/private/configuracion/tipos_documentos/interfaces";
import Swal from "sweetalert2";

export const useTiposDocumentos = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [currentTipoDocumentos, setCurrentTipoDocumentos] =
    useState<ITipoDocumentos | null>(null);
  const methodsTipoDocumentos = useForm<ITipoDocumento>();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentTipoDocumentos(null);
    methodsTipoDocumentos.reset();
  };

  const openCurrentTipoDocumento = (tipoDocumento: any) => {
    setCurrentTipoDocumentos(tipoDocumento);
    handleOpen();
  };

  //   Get tipo documento
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery<ITipoDocumentos[]>({
    queryKey: ["tiposDocumentos"],
    queryFn: async () => {
      try {
        const { data } = await tiposDocumentos.getTipoDocumentos();
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  //   Create tipo documentos
  const tipoDocumentoMutation = useMutation({
    mutationFn: (form: ITipoDocumento) =>
      tiposDocumentos.crateTipoDocumento({
        nombre: form.nombre,
        abreviacion: form.abreviacion,
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
        queryClient.invalidateQueries({ queryKey: ["tiposDocumentos"] });
        handleClose();
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  //   Update tipo documentos
  const updateTipoDocumentoMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ITipoDocumento }) =>
      tiposDocumentos.updateTipoDocumento(id, data),

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
        text: "Tipo de documento actualizado correctamente",
        confirmButtonText: "Aceptar",
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["tiposDocumentos"] });
        handleClose();
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  //   Control del formulario
  const onSubmit = (form: ITipoDocumento) => {
    if (currentTipoDocumentos) {
      updateTipoDocumentoMutation.mutate({
        id: currentTipoDocumentos.id_tipo_documento,
        data: form,
      });
    } else {
      tipoDocumentoMutation.mutate(form);
    }
  };

  //   Eliminar Tipo de documento
  const deleteTipoDocumentoMutation = useMutation({
    mutationFn: (id: number) => tiposDocumentos.deleteTipoDocumento(id),

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
        text: "Tipo de documento eliminado correctamente",
        confirmButtonText: "Aceptar",
      });
      queryClient.invalidateQueries({ queryKey: ["tiposDocumentos"] });
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
        deleteTipoDocumentoMutation.mutate(id);
      }
    });
  };

  // Actualizar estado del tipo de documento
  const toggleTipoDocumentoMutation = useMutation({
    mutationFn: (id: number) => tiposDocumentos.toggleStatus(id),

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
        text: "El tipo de documento fue activado/desactivado correctamente",
        confirmButtonText: "Aceptar",
      });
      queryClient.invalidateQueries({ queryKey: ["tiposDocumentos"] });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  //   Actualizar estado del tipo de documento
  const toggleTipoDocumentoStatus = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas activar o desactivar este tipo de documento?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        toggleTipoDocumentoMutation.mutate(id);
      }
    });
  };

  useEffect(() => {
    if (currentTipoDocumentos) {
      methodsTipoDocumentos.setValue("nombre", currentTipoDocumentos.nombre);
      methodsTipoDocumentos.setValue(
        "abreviacion",
        currentTipoDocumentos.abreviacion
      );
    } else {
      methodsTipoDocumentos.setValue("nombre", "");
      methodsTipoDocumentos.setValue("abreviacion", "");
    }
  }, [currentTipoDocumentos]);

  return {
    tipoDocumentos: data,
    isLoading,
    isError,
    error,
    handleOpen,
    handleClose,
    openCurrentTipoDocumento,
    open,
    currentTipoDocumentos,
    handleDelete,
    onSubmit,
    toggleTipoDocumentoStatus,
    methodsTipoDocumentos
  };
};
