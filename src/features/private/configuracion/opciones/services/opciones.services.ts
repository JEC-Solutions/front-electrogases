import { electroApi } from "@/api";

export const getOpciones = async () => {
  return await electroApi.get("/opciones");
};

export const createOpcion = async (data: any) => {
  return await electroApi.post("/opciones", data);
};

export const updateOpcion = async (idOpcion: number, data: any) => {
  return await electroApi.put(`/opciones/${idOpcion}`, data);
};

export const deleteOpcion = async (idOpcion: number) => {
  return await electroApi.delete(`/opciones/${idOpcion}`);
};

export const toggleStatus = async (idOpcion: number) => {
  return await electroApi.patch(`/opciones/${idOpcion}/toggle_status`);
};