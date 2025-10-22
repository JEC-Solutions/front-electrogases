import { electroApi } from "@/api";
import { IRuta, ICasa, ICliente } from "@/features/private/inspeccion/rutas/interfaces";

// Servicios para Rutas
export const getRutas = async () => {
  return await electroApi.get("/rutas");
};

export const createRuta = async (data: IRuta) => {
  return await electroApi.post("/rutas", data);
};

export const updateRuta = async (idRuta: number, data: IRuta) => {
  return await electroApi.put(`/rutas/${idRuta}`, data);
};

export const deleteRuta = async (idRuta: number) => {
  return await electroApi.delete(`/rutas/${idRuta}`);
};

export const toggleStatusRuta = async (idRuta: number) => {
  return await electroApi.patch(`/rutas/${idRuta}/toggle_status`);
};

// Servicios para Casas
export const getCasas = async () => {
  return await electroApi.get("/casas");
};

export const createCasa = async (data: ICasa) => {
  return await electroApi.post("/casas", data);
};

export const getCasasByCliente = async (idCliente: number) => {
  return await electroApi.get(`/casas/cliente/${idCliente}`);
};

// Servicios para Clientes
export const getClientes = async () => {
  return await electroApi.get("/clientes");
};

export const createCliente = async (data: ICliente) => {
  return await electroApi.post("/clientes", data);
};

// Servicios para Inspectores (usuarios con rol de inspector)
export const getInspectores = async () => {
  return await electroApi.get("/usuarios/inspectores");
};

// Servicios para Ciudades
export const getCiudades = async () => {
  return await electroApi.get("/ciudades");
};

// Servicios para Tipos de Documento
export const getTiposDocumento = async () => {
  return await electroApi.get("/tipos-documento");
};
