import { electroApi } from "@/api";

export interface InspeccionesFilters {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  tipoInspeccion?: string;
  inspector?: string;
  numeroActa?: string;
}

export const getInspecciones = async (filters?: InspeccionesFilters) => {
  const params = new URLSearchParams();

  if (filters?.page) params.append("page", filters.page.toString());
  if (filters?.limit) params.append("limit", filters.limit.toString());
  if (filters?.startDate) params.append("startDate", filters.startDate);
  if (filters?.endDate) params.append("endDate", filters.endDate);
  if (filters?.tipoInspeccion)
    params.append("tipoInspeccion", filters.tipoInspeccion);
  if (filters?.inspector) params.append("inspector", filters.inspector);
  if (filters?.numeroActa) params.append("numeroActa", filters.numeroActa);

  const queryString = params.toString();
  return await electroApi.get(
    `/inspeccion${queryString ? `?${queryString}` : ""}`,
  );
};

export const getInspeccion = async (id: number) => {
  return await electroApi.get(`/inspeccion/${id}`);
};

export const getFirma = async (id: number) => {
  return await electroApi.get(`/inspeccion/imagenes/firma-cliente/${id}`);
};

export const getEsquemaPlanta = async (id: number) => {
  return await electroApi.get(`/inspeccion/imagenes/esquema-planta/${id}`);
};

export const getIsometrico = async (id: number) => {
  return await electroApi.get(`/inspeccion/imagenes/isometrico/${id}`);
};

export const downloadPdf = async (id: number) => {
  return await electroApi.get(`/inspeccion/generate-pdf/${id}`);
};

export const getTiposImagenes = async (tipoInspeccion?: number) => {
  const params = tipoInspeccion ? `?tipoInspeccion=${tipoInspeccion}` : "";
  return await electroApi.get(`/inspeccion/imagenes/tipos-imagen${params}`);
};

export const getImagenesByTipo = async (
  inspeccionId: number,
  tipoImagenId: number,
) => {
  return await electroApi.get(
    `/inspeccion/imagenes/${inspeccionId}/tipo/${tipoImagenId}`,
  );
};

export const downloadMassivePdf = async (params: {
  ids?: number[];
  printType?: string;
  filters?: InspeccionesFilters;
}) => {
  const { ids, printType, filters } = params;
  return await electroApi.post(
    `/inspeccion/generate-pdf-massive`,
    { ids, printType, ...filters },
    {
      responseType: "blob",
    },
  );
};

export const autorizarEdicionInforme = async (id: number) => {
  return await electroApi.patch(`/inspeccion/${id}/autorizar-edicion`);
};

export const togglePruebaInforme = async (id: number) => {
  return await electroApi.patch(`/inspeccion/${id}/toggle-prueba`);
};

export const getFirmaSelloInspector = async (id: number) => {
  return await electroApi.get(
    `/inspeccion/imagenes/firma-sello-inspector/${id}`,
  );
};

export const downloadImagesInspeccion = async (id: number) => {
  return await electroApi.get(`/inspeccion/imagenes/download-zip/${id}`, {
  });
};

export const changeImageType = async (
  imagenId: number,
  nuevoTipoImagenId: number,
) => {
  return await electroApi.patch(`/inspeccion/imagenes/${imagenId}/tipo`, {
    nuevoTipoImagenId,
  });
};
