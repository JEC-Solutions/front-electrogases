import { electroApi } from "@/api";
import { IOrganismo } from "@/features/private/configuracion/empresa/interfaces";

export const getOrganismo = async () => {
  return await electroApi.get("/configuracion/organismo");
};

export const updateOrganismo = async (data: IOrganismo) => {
  return await electroApi.put("/configuracion/organismo", data);
};
