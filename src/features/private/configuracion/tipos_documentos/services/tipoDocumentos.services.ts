import { electroApi } from "@/api";

export const getTipoDocumentos = async () => {
  return await electroApi.get("/tipo-documento");
};

export const crateTipoDocumento = async (data: any) => {
  return await electroApi.post("/tipo-documento", data);
};

export const updateTipoDocumento = async (idTipo: number, data: any) => {
  return await electroApi.put(`/tipo-documento/${idTipo}`, data);
};

export const deleteTipoDocumento = async (idTipo: number) => {
  return await electroApi.delete(`/tipo-documento/${idTipo}`);
};

export const toggleStatus = async (idTipo: number) => {
  return await electroApi.patch(`/tipo-documento/${idTipo}/toggle-status`);
};
