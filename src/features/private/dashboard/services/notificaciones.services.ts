import { electroApi } from "@/api";

export interface INotificacionEvento {
  id_notificacion_evento: number;
  titulo: string;
  mensaje: string;
  tipo: string;
  id_referencia?: number;
  leida: boolean;
  created_at: string;
  updated_at: string;
}

export const getNotificaciones = async (leida?: boolean) => {
  const params = leida !== undefined ? `?leida=${leida}` : "";
  return await electroApi.get(`/notificaciones${params}`);
};

export const marcarLeida = async (id: number) => {
  return await electroApi.patch(`/notificaciones/${id}/leer`);
};

export const marcarTodasLeidas = async () => {
  return await electroApi.patch("/notificaciones/leer-todas");
};
