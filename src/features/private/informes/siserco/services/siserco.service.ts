import { electroApi } from "../../../../../api/electroApi";

export const getSisercoData = async (params: any) => {
  const { data } = await electroApi.get("/siserco", { params });
  return data;
};

export const exportSisercoZip = async (params: any) => {
  const response = await electroApi.get("/siserco/export-zip", {
    params,
    responseType: "blob",
  });
  return response.data;
};
