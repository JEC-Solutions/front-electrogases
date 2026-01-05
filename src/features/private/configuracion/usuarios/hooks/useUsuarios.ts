import * as usuariosServices from "@/features/private/configuracion/usuarios/services/usuarios.services";
import * as tiposDocumentos from "@/features/private/configuracion/tipos_documentos/services/tipoDocumentos.services";
import { ITipoDocumentos } from "@/features/private/configuracion/tipos_documentos/interfaces";
import {
  IUsuario,
  IUsuarios,
} from "@/features/private/configuracion/usuarios/interfaces";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useUsuarios = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [currentUsuarios, setCurrentUsuarios] = useState<IUsuarios | null>(
    null
  );
  const methodsUsuarios = useForm<IUsuario>();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentUsuarios(null);
    methodsUsuarios.reset();
  };

  const openCurrentUsuario = (usuario: IUsuarios) => {
    setCurrentUsuarios(usuario);
    handleOpen();
  };

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery<IUsuarios[]>({
    queryKey: ["usuarios"],
    queryFn: async () => {
      try {
        const { data } = await usuariosServices.getUsuarios();
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const { data: documentos = [] } = useQuery<ITipoDocumentos[]>({
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

  const usuarioMutation = useMutation({
    mutationFn: (form: IUsuario) => usuariosServices.createUsuario(form),

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
        text: "Usuarios creado con éxito",
        confirmButtonText: "Aceptar",
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["usuarios"] });
        handleClose();
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  //   Update usuario
  const updateUsuarioMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: IUsuario }) =>
      usuariosServices.updateUsuario(id, data),

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
        text: "Usuario actualizado correctamente",
        confirmButtonText: "Aceptar",
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["usuarios"] });
        handleClose();
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  //   Control del formulario
  const onSubmit = (form: IUsuario) => {
    if (currentUsuarios) {
      updateUsuarioMutation.mutate({
        id: currentUsuarios.id_usuario,
        data: form,
      });
    } else {
      usuarioMutation.mutate(form);
    }
  };

  const toggleClienteMutation = useMutation({
    mutationFn: (id: number) => usuariosServices.toggleStatus(id),

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
        text: "El usuario fue activado/desactivado correctamente",
        confirmButtonText: "Aceptar",
      });
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  //   Actualizar estado del tipo de documento
  const toggleStatus = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas activar o desactivar este tipo de documento?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        toggleClienteMutation.mutate(id);
      }
    });
  };

  useEffect(() => {
    if (currentUsuarios) {
      methodsUsuarios.setValue(
        "persona.id_tipo_documento",
        currentUsuarios.persona?.tipo_documento?.id_tipo_documento
      );
      methodsUsuarios.setValue("id_rol", currentUsuarios?.rol?.id_rol);
      methodsUsuarios.setValue(
        "persona.numero_documento",
        currentUsuarios.persona.numero_documento
      );
      methodsUsuarios.setValue(
        "persona.primer_nombre",
        currentUsuarios.persona.primer_nombre
      );
      methodsUsuarios.setValue(
        "persona.segundo_nombre",
        currentUsuarios.persona.segundo_nombre
      );
      methodsUsuarios.setValue(
        "persona.primer_apellido",
        currentUsuarios.persona.primer_apellido
      );
      methodsUsuarios.setValue(
        "persona.segundo_apellido",
        currentUsuarios.persona.segundo_apellido
      );
      methodsUsuarios.setValue(
        "persona.telefono",
        currentUsuarios.persona.telefono
      );
      methodsUsuarios.setValue("persona.email", currentUsuarios.persona.email);
    } else {
      methodsUsuarios.reset();
    }
  }, [currentUsuarios]);

  return {
    usuarios: data,
    isLoading,
    isError,
    error,
    documentos,
    methodsUsuarios,
    open,
    handleOpen,
    handleClose,
    openCurrentUsuario,
    currentUsuarios,
    onSubmit,
    toggleStatus,
  };
};
