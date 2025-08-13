import { electroApi } from "@/api";
import { ICiudad } from "@/features/private/configuracion/ciudad/interfaces";

export const getCiudades = async () => {
  return await electroApi.get("/ciudad");
};

export const crateCiudad = async (data: ICiudad) => {
  return await electroApi.post("/ciudad", data);
};

export const updateCiudad = async (codigo: string, data: ICiudad) => {
  return await electroApi.put(`/ciudad/${codigo}`, data);
};

export const getCitysByDpto = async (codigo: string) => {
  return await electroApi.get(`/ciudad/departamentos/${codigo}/ciudades`);
};
