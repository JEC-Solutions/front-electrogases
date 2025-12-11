import { electroApi } from "@/api";
import {
  IAsignar,
  IRuta,
  IPdfRuta,
} from "@/features/private/inspeccion/rutas/interfaces";

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

export const getInspectores = async () => {
  return await electroApi.get("/usuarios/inspectores");
};

export const getClienteByDocument = async (documento: string) => {
  return await electroApi.get(`/cliente/documento/${documento}`);
};

export const asignarRuta = async (id: number, payload: IAsignar) => {
  return await electroApi.patch(`/ruta/${id}/asignar`, payload);
};

export const historialRuta = async (id: number) => {
  return await electroApi.get(`/ruta/${id}/historial`);
};

export const generatePdf = async (data: IPdfRuta) => {
  return await electroApi.post("/ruta/pdf", data);
};
