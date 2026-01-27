import { electroApi } from "@/api";

export const getReporteTipoInspeccion = async (
  fechaInicio: string,
  fechaFin: string,
) => {
  return await electroApi.get(
    `/reportes/tipos-inspeccion?fechaInicio=${fechaInicio}&&fechaFin=${fechaFin}`,
  );
};

export const getReporteTipoGas = async (
  fechaInicio: string,
  fechaFin: string,
) => {
  return await electroApi.get(
    `/reportes/tipos-gas?fechaInicio=${fechaInicio}&&fechaFin=${fechaFin}`,
  );
};

export const getReporteEquiposUtilizados = async (
  fechaInicio: string,
  fechaFin: string,
) => {
  return await electroApi.get(
    `/reportes/equipos-utilizados?fechaInicio=${fechaInicio}&&fechaFin=${fechaFin}`,
  );
};

export const getHistorialAccesosInspectores = async (
  fechaInicio: string,
  fechaFin: string,
) => {
  return await electroApi.get(
    `/reportes/historial-accesos?fechaInicio=${fechaInicio}&&fechaFin=${fechaFin}`,
  );
};

export const getInspectoresActivos = async () => {
  return await electroApi.get(`/reportes/inspectores-activos`);
};
