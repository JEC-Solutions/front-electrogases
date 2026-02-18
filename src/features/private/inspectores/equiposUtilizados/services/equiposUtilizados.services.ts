import { electroApi } from "@/api";
import { IEquiposUtilizadosRequest } from "@/features/private/inspectores/equiposUtilizados/interfaces";

export const equiposUtilizadosServices = async () => {
  return electroApi.get("/equipos-utilizados");
};

export const createEquiposUtilizadosServices = async (
  data: IEquiposUtilizadosRequest,
) => {
  return electroApi.post("/equipos-utilizados", data);
};

export const updateEquiposUtilizadosServices = async (
  id: number,
  data: IEquiposUtilizadosRequest,
) => {
  return electroApi.put(`/equipos-utilizados/${id}`, data);
};

export const deleteEquiposUtilizadosServices = async (id: number) => {
  return electroApi.delete(`/equipos-utilizados/${id}`);
};
