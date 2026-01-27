import { electroApi } from "@/api";

export const getInspecciones = async () => {
  return await electroApi.get("/inspeccion");
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

export const getTiposImagenes = async () => {
  return await electroApi.get(`/inspeccion/imagenes/tipos-imagen`);
};

export const getImagenesByTipo = async (
  inspeccionId: number,
  tipoImagenId: number,
) => {
  return await electroApi.get(
    `/inspeccion/imagenes/${inspeccionId}/tipo/${tipoImagenId}`,
  );
};

export const downloadMassivePdf = async (ids: number[], printType?: string) => {
  return await electroApi.post(
    `/inspeccion/generate-pdf-massive`,
    { ids, printType },
    {
      responseType: "blob",
    },
  );
};

export const getSolicitudesEdicion = async (id: number) => {
  return await electroApi.get(`/inspeccion/${id}/solicitudes-edicion`);
};

export const responderSolicitudEdicion = async (id: number, data: any) => {
  return await electroApi.put(`/inspeccion/solicitud-edicion/${id}`, data);
};
