import { electroApi } from "@/api";
import { IRuta } from "@/features/private/inspeccion/rutas/interfaces";

export const getRutas = async () => {
  return await electroApi.get("/ruta");
};

export const createRuta = async (data: IRuta) => {
  return await electroApi.post("/ruta", data);
};

export const updateruta = async (idRuta: number, data: IRuta) => {
  return await electroApi.put(`/ruta/${idRuta}`, data);
};

export const deleteRuta = async (idRuta: number) => {
  return await electroApi.delete(`/ruta/${idRuta}`);
};

export const toggleStatus = async (idRuta: number) => {
  return await electroApi.patch(`/ruta/${idRuta}/toggle_status`);
};

export const getTiposVisita = async () => {
  return await electroApi.get("/tipo-visita");
};

export const getResultados = async () => {
  return await electroApi.get("/resultados");
};
