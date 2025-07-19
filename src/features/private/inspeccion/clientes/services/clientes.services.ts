import { electroApi } from "@/api";
import { ICliente } from "@/features/private/inspeccion/clientes/interfaces";

export const getClientes = async () => {
  return await electroApi.get("/cliente");
};

export const createCliente = async (data: ICliente) => {
  return await electroApi.post("/cliente", data);
};

export const updateCliente = async (idCliente: number, data: ICliente) => {
  return await electroApi.put(`/cliente/${idCliente}`, data);
};

export const deleteCliente = async (idCliente: number) => {
  return await electroApi.delete(`/cliente/${idCliente}`);
};

export const toggleStatus = async (idCliente: number) => {
  return await electroApi.patch(`/cliente/${idCliente}/toggle_status`);
};
