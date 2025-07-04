import { electroApi } from "@/api";

export const getPermissionsByUser = async () => {
  return await electroApi.get("permisos/usuario_opciones");
};
