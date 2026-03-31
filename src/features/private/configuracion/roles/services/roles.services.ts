import { electroApi } from "@/api";
import {
  IRole,
  IPermiso,
} from "@/features/private/configuracion/roles/interfaces";

export const getRoles = async () => {
  return await electroApi.get("/roles");
};

export const createPermisos = async (data: IPermiso) => {
  return await electroApi.post("/permisos", data);
};

export const getPermisosByRol = async (idRol: number) => {
  return await electroApi.get(`/permisos/rol/${idRol}`);
};

export const crateRoles = async (data: IRole) => {
  return await electroApi.post("/roles", data);
};

export const updateRole = async (idRole: number, data: IRole) => {
  return await electroApi.put(`/roles/${idRole}`, data);
};

export const deleteRole = async (idRole: number) => {
  return await electroApi.delete(`/roles/${idRole}`);
};

export const toggleStatus = async (idRole: number) => {
  return await electroApi.patch(`/roles/${idRole}/toggle-status`);
};

// Acciones granulares
export const getAcciones = async () => {
  return await electroApi.get("/acciones");
};

export const getAccionesByRol = async (idRol: number) => {
  return await electroApi.get(`/acciones/rol/${idRol}`);
};

export const assignAccionesToRol = async (idRol: number, id_acciones: number[]) => {
  return await electroApi.post(`/acciones/rol/${idRol}`, { id_acciones });
};
