import { electroApi } from "@/api";

export const getInspecciones = async () => {
  return await electroApi.get("/inspeccion");
};

export const getInspeccion = async (id: number) => {
  return await electroApi.get(`/inspeccion/${id}`);
};

export const getFirma = async (id: number) => {
  return await electroApi.get(`/inspeccion/imagenes/firma-cliente/${id}`);
};

export const getEsquemaPlanta = async (id: number) => {
  return await electroApi.get(`/inspeccion/imagenes/esquema-planta/${id}`);
};

export const getIsometrico = async (id: number) => {
  return await electroApi.get(`/inspeccion/imagenes/isometrico/${id}`);
};
