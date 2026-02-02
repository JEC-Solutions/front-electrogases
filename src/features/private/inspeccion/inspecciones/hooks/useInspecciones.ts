import * as inspeccionServices from "@/features/private/inspeccion/inspecciones/services/inspecciones.services";
import { InspeccionesFilters } from "@/features/private/inspeccion/inspecciones/services/inspecciones.services";
import {
  IInspecciones,
  ITipoImagen,
} from "@/features/private/inspeccion/inspecciones/interfaces";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { downloadBase64 } from "@/utils/downloadBase64";
import Swal from "sweetalert2";
import { useState } from "react";

interface PaginatedResponse {
  data: IInspecciones[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const useInspecciones = () => {
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState<InspeccionesFilters>({
    page: 1,
    limit: 10,
  });

  const {
    data: paginatedData,
    isLoading,
    isError,
    error,
  } = useQuery<PaginatedResponse>({
    queryKey: ["inspecciones", filters],
    queryFn: async () => {
      try {
        const { data } = await inspeccionServices.getInspecciones(filters);
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const inspecciones = paginatedData?.data ?? [];
  const pagination = paginatedData?.pagination ?? {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  };

  const handleFilterChange = (newFilters: Partial<InspeccionesFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: newFilters.page ?? 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

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

  const downloadMassiveMutation = useMutation({
    mutationFn: async ({
      ids,
      printType,
    }: {
      ids: number[];
      printType?: string;
    }) => {
      Swal.fire({
        title: "Generando PDFs...",
        text: `Preparando ${ids.length} documento(s), por favor espere...`,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const { data } = await inspeccionServices.downloadMassivePdf(
        ids,
        printType,
      );
      return data;
    },
    onSuccess: (data) => {
      try {
        const blob = new Blob([data], { type: "application/zip" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Inspecciones_${new Date().toISOString().split("T")[0]}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        Swal.fire({
          icon: "success",
          title: "¡Descarga completada!",
          text: "El archivo ZIP se ha descargado correctamente.",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error("Error procesando la descarga masiva:", err);
        Swal.fire({
          icon: "error",
          title: "Error de procesamiento",
          text: "El archivo se recibió pero no se pudo descargar.",
        });
      }
    },
    onError: (error: any) => {
      handleAxiosError(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al generar los PDFs.",
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
    tipoImagenId: number,
  ) => {
    try {
      return await queryClient.fetchQuery({
        queryKey: ["imagen-inspeccion", inspeccionId, "tipo", tipoImagenId],
        queryFn: async () => {
          const { data } = await inspeccionServices.getImagenesByTipo(
            inspeccionId,
            tipoImagenId,
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

  const handleDownloadMassivePdf = (ids: number[], printType?: string) => {
    downloadMassiveMutation.mutate({ ids, printType });
  };

  // Autorizar edición de informe
  const autorizarEdicionMutation = useMutation({
    mutationFn: async (inspeccionId: number) => {
      const { data } =
        await inspeccionServices.autorizarEdicionInforme(inspeccionId);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["inspecciones"] });
      Swal.fire({
        icon: "success",
        title: "¡Edición autorizada!",
        text: data?.message || "La edición del informe ha sido autorizada.",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error: any) => {
      handleAxiosError(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo autorizar la edición.",
        confirmButtonText: "Entendido",
      });
    },
  });

  return {
    inspecciones,
    isLoading,
    isError,
    error,
    // paginación
    pagination,
    filters,
    handleFilterChange,
    handlePageChange,
    // pdf
    downloadPdf: downloadMutation.mutate,
    downloadMassivePdf: handleDownloadMassivePdf,
    isDownloading: downloadMutation.isPending,
    // imagenes
    getImagenPorTipo,
    isLoadingTipos,
    tiposImagenes,
    // autorizar edición
    autorizarEdicion: autorizarEdicionMutation.mutate,
    isAutorizando: autorizarEdicionMutation.isPending,
  };
};
