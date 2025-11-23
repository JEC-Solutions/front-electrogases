import { electroApi } from "@/api";
import { LoginForm, IChangePassword, IRecoverPassword } from "@/features/public/login/interface";

export const login = async (data: LoginForm) => {
  return await electroApi.post("auth/login", data);
};

export const changePassword = async (data: IChangePassword) => {
  return await electroApi.post("auth/cambiar-contrasena-temporal", data);
};

export const recoverPassword = async (data: IRecoverPassword) => {
  return await electroApi.post("auth/recuperar-contrasena", data);
};
