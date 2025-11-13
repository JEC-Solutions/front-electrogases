import { electroApi } from "@/api";

export const getInspecciones = async () => {
  return await electroApi.get("/inspeccion");
};
