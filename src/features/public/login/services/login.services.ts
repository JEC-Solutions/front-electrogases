import { electroApi } from "@/api";
import { LoginForm } from "@/features/public/login/interface";


export const login = async (data: LoginForm) => {
  return await electroApi.post("auth/login", data);
};