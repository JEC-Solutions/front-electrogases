import { electroApi } from "@/api";
import { IUsuario } from "@/features/private/configuracion/usuarios/interfaces";

export const getUsuarios = async () => {
  return await electroApi.get("/usuarios");
};

export const createUsuario = async (data: IUsuario) => {
  return await electroApi.post("/usuarios", data);
};

export const updateUsuario = async (idUsuario: number, data: IUsuario) => {
  return await electroApi.put(`/usuarios/${idUsuario}`, data);
};

export const toggleStatus = async (idUsuario: number) => {
  return await electroApi.patch(`/usuarios/${idUsuario}/toggle_status`);
};
