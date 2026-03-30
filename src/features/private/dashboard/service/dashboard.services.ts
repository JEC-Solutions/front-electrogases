import { electroApi } from "@/api";

export const getPermissionsByUser = async () => {
  return await electroApi.get("permisos/user");
};
