import * as inspeccionServices from "@/features/private/inspeccion/inspecciones/services/inspecciones.services";
import { IInspecciones, ITipoImagen } from "@/features/private/inspeccion/inspecciones/interfaces";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { downloadBase64 } from "@/utils/downloadBase64";
import Swal from "sweetalert2";


export const useInspecciones = () => {
  const queryClient = useQueryClient();

  const {
    data: inspecciones = [],
    isLoading,
    isError,
    error,
  } = useQuery<IInspecciones[]>({
    queryKey: ["inspecciones"],
    queryFn: async () => {
      try {
        const { data } = await inspeccionServices.getInspecciones();
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const downloadMutation = useMutation({
    mutationFn: async (id: number) => {
      Swal.fire({
        title: "Descargando PDF...",
        text: "Por favor, espere...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const { data } = await inspeccionServices.downloadPdf(id);
      return data;
    },
    onSuccess: (data) => {
      if (data && data.dataUri) {
        try {
          const cleanBase64 = data.dataUri.includes(",")
            ? data.dataUri.split(",")[1]
            : data.dataUri;

          downloadBase64(cleanBase64, data.filename, data.mimeType);

          Swal.fire({
            icon: "success",
            title: "¡Descarga completada!",
            text: "El PDF se ha descargado correctamente.",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (err) {
          console.error("Error procesando la descarga:", err);
          Swal.fire({
            icon: "error",
            title: "Error de procesamiento",
            text: "El archivo se recibió pero no se pudo generar.",
          });
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "Sin archivo",
          text: "El servidor no devolvió el contenido del PDF.",
        });
      }
    },
    onError: (error: any) => {
      handleAxiosError(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al intentar conectar con el servidor.",
        confirmButtonText: "Entendido",
      });
    },
  });

  const { data: tiposImagenes = [], isLoading: isLoadingTipos } = useQuery<
    ITipoImagen[]
  >({
    queryKey: ["tipos-imagenes"],
    queryFn: async () => {
      try {
        const { data } = await inspeccionServices.getTiposImagenes();
        return data?.data?.tipos_imagen || [];
      } catch (error) {
        console.error("Error cargando tipos de imágenes", error);
        return [];
      }
    },
    staleTime: 1000 * 60 * 60,
  });

  const getImagenPorTipo = async (
    inspeccionId: number,
    tipoImagenId: number
  ) => {
    try {
      return await queryClient.fetchQuery({
        queryKey: ["imagen-inspeccion", inspeccionId, "tipo", tipoImagenId],
        queryFn: async () => {
          const { data } = await inspeccionServices.getImagenesByTipo(
            inspeccionId,
            tipoImagenId
          );
          return data;
        },
        staleTime: 1000 * 60 * 10,
      });
    } catch (error) {
      console.error("Error obteniendo imagen:", error);
      return null;
    }
  };

  return {
    inspecciones,
    isLoading,
    isError,
    error,
    downloadPdf: downloadMutation.mutate,
    isDownloading: downloadMutation.isPending,
    // imagenes
    getImagenPorTipo,
    isLoadingTipos,
    tiposImagenes,
  };
};
