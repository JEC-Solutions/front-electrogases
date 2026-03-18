import Swal from "sweetalert2";
import { AxiosError } from "axios";

export const handleAxiosError = (error: AxiosError) => {
  if (error.response) {
    const status = error.response.status;
    const responseData: any = error.response.data;

    const message = responseData?.message || `Error ${status}`;
    const errorDetails = responseData?.error;

    let errorText = message;

    // Si es un error 500, solo mostrar el mensaje general
    if (status === 500) {
      errorText = message;
    } else if (errorDetails && typeof errorDetails === "object") {
      if (Array.isArray(errorDetails)) {
        errorText += "\n" + errorDetails.join("\n");
      } else {
        errorText +=
          "\n" +
          Object.entries(errorDetails)
            .map(([key, val]: any) => `${key}: ${val}`)
            .join("\n");
      }
    }

    let icon: "success" | "warning" | "error" = "error";
    let title = `Error ${status}`;

    if (status >= 200 && status < 300) {
      icon = "success";
      title = "Operación Exitosa";
    } else if (status >= 400 && status < 500) {
      icon = "warning";
      title = "Atención";
    } else if (status >= 500) {
      icon = "error";
      title = "Error del Servidor";
    }

    Swal.fire({
      icon,
      title,
      text: errorText,
    });
  } else if (error.request) {
    console.error("No se recibió respuesta del servidor", error.request);
    Swal.fire({
      icon: "error",
      title: "Error de red",
      text: "No se recibió respuesta del servidor. Verifica tu conexión.",
    });
  } else {
    console.error("Error inesperado", error.message);
    Swal.fire({
      icon: "error",
      title: "Error inesperado",
      text: "Ocurrió un error inesperado. Intenta nuevamente.",
    });
  }
};
