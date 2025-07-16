import { electroApi } from "@/api";
import { IMenu } from "@/features/private/configuracion/menus/interface";

export const getMenus = async () => {
  return await electroApi.get("/menu");
};

export const createMenu = async (data: IMenu) => {
  return await electroApi.post("/menu", data);
};

export const updateMenu = async (idMenu: number, data: IMenu) => {
  return await electroApi.put(`/menu/${idMenu}`, data);
};

export const deleteMenu = async (idMenu: number) => {
  return await electroApi.delete(`/menu/${idMenu}`);
};

export const toggleStatus = async (idMenu: number) => {
  return await electroApi.patch(`/menu/${idMenu}/toggle_status`);
};
