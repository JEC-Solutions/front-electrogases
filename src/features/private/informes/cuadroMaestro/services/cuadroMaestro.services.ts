import { electroApi } from "@/api";

export const getCuadroMaestro = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
}) => {
  return electroApi.get("/cuadro-maestro", { params });
};

export const exportCuadroMaestroExcel = () => {
  return electroApi.get("/cuadro-maestro/export", {
    responseType: "blob",
  });
};
