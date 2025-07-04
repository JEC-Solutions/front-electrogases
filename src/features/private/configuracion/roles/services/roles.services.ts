import { electroApi } from "@/api";
import { IRole } from "@/features/private/configuracion/roles/interfaces";

export const getRoles = async () => {
  return await electroApi.get("/roles");
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
  return await electroApi.patch(`/roles/${idRole}/toggle_status`);
};
