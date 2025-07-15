import { electroApi } from "@/api";
import { IDepartamento } from "@/features/private/configuracion/departamentos/interfaces";

export const getDepartamentos = async () => {
  return await electroApi.get("/departamento");
};

export const crateDepartamento = async (data: IDepartamento) => {
  return await electroApi.post("/departamento", data);
};

export const updateDepartamento = async (
  codigo: string,
  data: IDepartamento
) => {
  return await electroApi.put(`/departamento/${codigo}`, data);
};
