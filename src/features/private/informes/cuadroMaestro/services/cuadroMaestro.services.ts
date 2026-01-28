import { electroApi } from "@/api";

export const getCuadroMaestro = () => {
  return electroApi.get("/cuadro-maestro");
};

export const exportCuadroMaestroExcel = () => {
  return electroApi.get("/cuadro-maestro/export", {
    responseType: "blob",
  });
};
