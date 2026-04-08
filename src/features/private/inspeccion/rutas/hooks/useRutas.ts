import * as rutaServices from "@/features/private/inspeccion/rutas/services/rutas.services";
import {
  IAsignar,
  IRutas,
  IPdfRuta,
} from "@/features/private/inspeccion/rutas/interfaces";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { IUsuarios } from "@/features/private/configuracion/usuarios/interfaces";
import { downloadBase64 } from "@/utils/downloadBase64";

export const useRutas = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [currentRuta, setCurrentRuta] = useState({} as IRutas);
  const methods = useForm<IAsignar>();

  // Pagination & Filters
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState<rutaServices.RutasFilters>({});

  const handleOpen = (payload: IRutas) => {
    setCurrentRuta(payload);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentRuta({} as IRutas);
    setOpen(false);
    methods.reset();
  };

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["rutas", page, limit, filters],
    queryFn: async () => {
      try {
        const { data } = await rutaServices.getRutas({
          page,
          limit,
          ...filters,
        });
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const rutas = response?.data || [];
  const pagination = response?.pagination || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  };

  // Get inspectores
  const { data: inspectores = [] } = useQuery<IUsuarios[]>({
    queryKey: ["inspectores"],
    queryFn: async () => {
      try {
        const { data } = await rutaServices.getInspectores();
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // Get asesores
  const { data: asesores = [] } = useQuery<IUsuarios[]>({
    queryKey: ["asesores"],
    queryFn: async () => {
      try {
        const { data } = await rutaServices.getAsesores();
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const asignarMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: IAsignar }) =>
      rutaServices.asignarRuta(id, data),

    onMutate: () => {
      Swal.fire({
        title: "Actualizando...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },

    onSuccess: (_, vars) => {
      Swal.fire({
        icon: "success",
        title: "Actualizado",
        text: "Cambio de inspector realizado",
        confirmButtonText: "Aceptar",
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["rutas"] });

        if (vars?.id) {
          queryClient.invalidateQueries({
            queryKey: ["historialRuta", vars.id],
          });
        }
        handleClose();
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  const onSubmit = (form: IAsignar) => {
    if (currentRuta) {
      asignarMutation.mutate({
        id: currentRuta.id_ruta,
        data: form,
      });
    }
  };

  // Mutation for update date
  const updateDateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: { fecha: any; motivo?: string };
    }) => rutaServices.updateRutaDate(id, data as any),
    onMutate: () => {
      Swal.fire({
        title: "Actualizando fecha...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Actualizado",
        text: "Fecha de ruta actualizada correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      queryClient.invalidateQueries({ queryKey: ["rutas"] });
    },
    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  const onUpdateDate = (id: number, fecha: string, motivo?: string) => {
    updateDateMutation.mutate({
      id,
      data: { fecha, motivo },
    });
  };

  const generarPdfMutation = useMutation({
    mutationFn: (payload: IPdfRuta) => rutaServices.generatePdf(payload),
    onMutate: () => {
      Swal.fire({
        title: "Descargando...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },
    onSuccess: ({ data }) => {
      Swal.close();

      const { base64, filename, mimeType } = data ?? {};
      if (!base64) {
        Swal.fire({
          icon: "error",
          title: "Sin PDF",
          text: "No llegó el base64 del PDF",
        });
        return;
      }
      downloadBase64(
        base64,
        filename || "rutero.pdf",
        mimeType || "application/pdf",
      );
    },
    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  // Exponer un método para usar desde la UI
  const generarPDF = (_payload: IPdfRuta) => {
    generarPdfMutation.mutate(_payload);
  };

  const toggleStatusMutation = useMutation({
    mutationFn: (id: number) => rutaServices.toggleStatus(id),
    onMutate: () => {
      Swal.fire({
        title: "Cambiando estado...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },
    onSuccess: (response) => {
      const { data } = response;
      Swal.fire({
        icon: "success",
        title: "Estado actualizado",
        text: `La ruta ha sido ${data.estado ? "activada" : "inactivada"} correctamente`,
        showConfirmButton: false,
        timer: 1500,
      });
      queryClient.invalidateQueries({ queryKey: ["rutas"] });
    },
    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  const onToggleStatus = (id: number, currentEstado: boolean) => {
    Swal.fire({
      title: `¿Deseas ${currentEstado ? "inactivar" : "activar"} esta ruta?`,
      text: currentEstado
        ? "La ruta ya no será visible para los inspectores."
        : "La ruta volverá a ser visible para los inspectores.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        toggleStatusMutation.mutate(id);
      }
    });
  };

  return {
    // rutas
    rutas,
    isLoading,
    isError,
    error,

    // asignar
    open,
    currentRuta,
    handleOpen,
    handleClose,
    methods,
    onSubmit,
    inspectores,
    asesores,

    // pdf
    generarPDF,

    // pagination & filters
    pagination,
    setPage,
    setLimit,
    filters,
    setFilters,

    // update date
    onUpdateDate,

    // toggle status
    onToggleStatus,
  };
};
