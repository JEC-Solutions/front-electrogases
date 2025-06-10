import Swal from "sweetalert2";
import { AxiosError } from "axios";

export const handleAxiosError = (error: AxiosError) => {
  if (error.response) {
    const status = error.response.status;
    const responseData: any = error.response.data;

    const message = responseData?.message || `Error ${status}`;
    const errorDetails = responseData?.error;

    let errorText = message;

    if (errorDetails && typeof errorDetails === "object") {
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

    Swal.fire({
      icon: "error",
      title: `Error ${status}`,
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
