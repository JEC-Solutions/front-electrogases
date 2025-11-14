import { electroApi } from "@/api";

export const getInspecciones = async () => {
  return await electroApi.get("/inspeccion");
};

export const getInspeccion = async (id: number) => {
  return await electroApi.get(`/inspeccion/${id}`);
};
