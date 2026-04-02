import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNotificaciones,
  marcarLeida,
  marcarTodasLeidas,
  INotificacionEvento,
} from "../services/notificaciones.services";
import { message, notification } from "antd";
import { useSocket } from "./useSocket";
import { useEffect } from "react";

export const useNotificaciones = () => {
  const queryClient = useQueryClient();

  // Query para obtener notificaciones no leídas
  const {
    data: notificaciones = [],
    isLoading,
    refetch,
  } = useQuery<INotificacionEvento[]>({
    queryKey: ["notificaciones", "no-leidas"],
    queryFn: async () => {
      const response = await getNotificaciones(false);
      return response.data.data;
    },
    staleTime: 1000 * 10,
  });

  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (data: any) => {
      console.log("Nueva notificación recibida via Socket:", data);

      queryClient.invalidateQueries({ queryKey: ["notificaciones"] });

      notification.info({
        message: data.title || "Nueva Inspección",
        description: data.mensaje || data.message,
        placement: "bottomRight",
      });
    };

    socket.on("nueva_notificacion", handleNewNotification);

    return () => {
      socket.off("nueva_notificacion", handleNewNotification);
    };
  }, [socket, queryClient]);

  // Mutación para marcar una como leída
  const marcarLeidaMutation = useMutation({
    mutationFn: (id: number) => marcarLeida(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notificaciones"] });
    },
    onError: () => {
      message.error("Error al marcar como leída");
    },
  });

  // Mutación para marcar todas como leídas
  const marcarTodasLeidasMutation = useMutation({
    mutationFn: marcarTodasLeidas,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notificaciones"] });
      message.success("Todas las notificaciones marcadas como leídas");
    },
    onError: () => {
      message.error("Error al marcar todas como leídas");
    },
  });

  return {
    notificaciones,
    noLeidasCount: notificaciones.length,
    loading: isLoading,
    marcarLeida: (id: number) => marcarLeidaMutation.mutate(id),
    marcarTodasLeidas: () => marcarTodasLeidasMutation.mutate(),
    refresh: refetch,
  };
};
