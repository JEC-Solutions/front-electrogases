import { electroApi } from "../../../../../api/electroApi";

export const getActaEntregaList = async (params: any) => {
  const { data } = await electroApi.get("/inspeccion/acta-entrega-documentos/list", { params });
  return data;
};

export const getActaEntregaPdf = async (params: any) => {
  const { data } = await electroApi.get("/inspeccion/acta-entrega-documentos/pdf", { params });
  return data;
};
