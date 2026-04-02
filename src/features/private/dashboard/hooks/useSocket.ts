import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import Cookies from "universal-cookie";

const baseURL =
  import.meta.env.VITE_URL_API_PROD || import.meta.env.VITE_URL_API_DEV;

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const cookies = new Cookies();

  useEffect(() => {
    const token = cookies.get("token");

    if (!token) return;

    // Inicializar la conexión
    const socket = io(baseURL, {
      auth: {
        token,
      },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Conectado al servidor de WebSockets");
    });

    socket.on("connect_error", (err) => {
      console.error("Error de conexión al socket:", err.message);
    });

    return () => {
      if (socket) {
        socket.disconnect();
        console.log("Socket desconectado");
      }
    };
  }, []);

  return {
    socket: socketRef.current,
  };
};
