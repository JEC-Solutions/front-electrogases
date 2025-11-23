import * as loginServices from "@/features/public/login/services/login.services";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  LoginForm,
  IChangePassword,
  IRecoverPassword,
} from "@/features/public/login/interface";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useMutation } from "@tanstack/react-query";

const cookies = new Cookies();

export const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { handleSubmit, control, reset } = useForm<LoginForm>();

  const recoverForm = useForm<IRecoverPassword>();

  const navigate = useNavigate();

  const handleBackToLogin = () => {
    setChangePassword(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
    recoverForm.reset();
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
    recoverForm.reset();
  };

  const loginMutation = useMutation({
    mutationFn: (form: LoginForm) =>
      loginServices.login({
        username: form.username,
        password: form.password,
      }),

    onMutate: () => {
      Swal.fire({
        title: "Iniciando sesión...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },

    onSuccess: ({ data }) => {
      if (data.data.change_password) {
        Swal.fire({
          icon: "warning",
          title: "Cambio de contraseña requerido",
          text: "Por favor, cambie su contraseña antes de continuar.",
          confirmButtonText: "Cambiar contraseña",
        }).then(() => {
          setChangePassword(true);
          reset();
        });

        return;
      } else if (data.data.password_expired) {
        Swal.fire({
          icon: "warning",
          title: "Contraseña expirada",
          text: "Por favor, cambie su contraseña antes de continuar.",
          confirmButtonText: "Cambiar contraseña",
        }).then(() => {
          setChangePassword(true);
          reset();
        });

        return;
      }

      Swal.fire({
        icon: "success",
        title: "Bienvenido!!",
        text: "Inicio de sesión exitoso",
        confirmButtonText: "Aceptar",
      }).then(() => {
        cookies.set("token", data.data.token);
        reset();
        navigate("/dashboard");
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (data: IChangePassword) => loginServices.changePassword(data),

    onMutate: () => {
      Swal.fire({
        title: "Actualizando contraseña...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Contraseña actualizada",
        text: "Ahora puedes iniciar sesión con tu nueva contraseña.",
        confirmButtonText: "Aceptar",
      }).then(() => {
        setChangePassword(false);
        reset();
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  // --- Mutación para Recuperar Contraseña (Modal) ---
  const recoverPasswordMutation = useMutation({
    mutationFn: (data: IRecoverPassword) =>
      loginServices.recoverPassword({
        numero_documento: data.numero_documento,
      }),

    onMutate: () => {
      setIsModalOpen(false);
      Swal.fire({
        title: "Procesando...",
        text: "Validando documento y enviando correo...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Correo enviado",
        text: "Si el documento existe, recibirás una contraseña temporal en tu correo.",
        confirmButtonText: "Entendido",
      });
      recoverForm.reset();
    },
    onError: (error: any) => {
      handleAxiosError(error);
    },
  });

  const onSubmit = (data: LoginForm) => {
    if (data.numero_documento) {
      changePasswordMutation.mutate({
        numero_documento: data.numero_documento,
        nuevaContrasena: data.nuevaContrasena || "",
      });
    } else {
      loginMutation.mutate({
        username: data.username,
        password: data.password,
      });
    }
  };

  const onRecoverSubmit = (data: IRecoverPassword) => {
    recoverPasswordMutation.mutate(data);
  };

  return {
    showPassword,
    setShowPassword,
    handleSubmit,
    control,
    onSubmit,
    changePassword,
    handleBackToLogin,
    // Exports para el Modal
    isModalOpen,
    showModal,
    handleCancelModal,
    recoverForm,
    onRecoverSubmit,
  };
};
