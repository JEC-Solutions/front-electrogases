import * as loginServices from "@/features/public/login/services/login.services";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginForm } from "@/features/public/login/interface";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useMutation } from "@tanstack/react-query";

const cookies = new Cookies();

export const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, control } = useForm<LoginForm>();

  const navigate = useNavigate();

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
      Swal.fire({
        icon: "success",
        title: "Creado",
        text: "Inicio de sesión exitoso",
        confirmButtonText: "Aceptar",
      }).then(() => {
        cookies.set("token", data.data.token);
        navigate("/dashboard");
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  return {
    showPassword,
    setShowPassword,
    handleSubmit,
    control,
    onSubmit,
  };
};
