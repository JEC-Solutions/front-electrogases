import * as rutasServices from "@/features/private/inspeccion/rutas/services/rutas.services";
import {
  IRuta,
  IRutas,
  ICasa,
  ICliente,
  Casa,
  Cliente,
  Inspector,
  Ciudad,
  TipoDocumento,
} from "@/features/private/inspeccion/rutas/interfaces";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useRutas = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [openCasa, setOpenCasa] = useState(false);
  const [openCliente, setOpenCliente] = useState(false);
  const [currentRuta, setCurrentRuta] = useState<IRutas | null>(null);
  const methodsRutas = useForm<IRuta>();
  const methodsCasa = useForm<ICasa>();
  const methodsCliente = useForm<ICliente>();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentRuta(null);
    methodsRutas.reset();
  };

  const handleOpenCasa = () => {
    setOpenCasa(true);
  };

  const handleCloseCasa = () => {
    setOpenCasa(false);
    methodsCasa.reset();
  };

  const handleOpenCliente = () => {
    setOpenCliente(true);
  };

  const handleCloseCliente = () => {
    setOpenCliente(false);
    methodsCliente.reset();
  };

  const openCurrentRuta = (ruta: IRutas) => {
    setCurrentRuta(ruta);
    handleOpen();
  };

  // Query para obtener rutas
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery<IRutas[]>({
    queryKey: ["rutas"],
    queryFn: async () => {
      try {
        const { data } = await rutasServices.getRutas();
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // Query para obtener casas
  const {
    data: casas = [],
    isLoading: isLoadingCasas,
  } = useQuery<Casa[]>({
    queryKey: ["casas"],
    queryFn: async () => {
      try {
        const { data } = await rutasServices.getCasas();
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // Query para obtener inspectores
  const {
    data: inspectores = [],
    isLoading: isLoadingInspectores,
  } = useQuery<Inspector[]>({
    queryKey: ["inspectores"],
    queryFn: async () => {
      try {
        const { data } = await rutasServices.getInspectores();
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // Query para obtener ciudades
  const {
    data: ciudades = [],
    isLoading: isLoadingCiudades,
  } = useQuery<Ciudad[]>({
    queryKey: ["ciudades"],
    queryFn: async () => {
      try {
        const { data } = await rutasServices.getCiudades();
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // Query para obtener clientes
  const {
    data: clientes = [],
    isLoading: isLoadingClientes,
  } = useQuery<Cliente[]>({
    queryKey: ["clientes"],
    queryFn: async () => {
      try {
        const { data } = await rutasServices.getClientes();
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // Query para obtener tipos de documento
  const {
    data: tiposDocumento = [],
    isLoading: isLoadingTiposDocumento,
  } = useQuery<TipoDocumento[]>({
    queryKey: ["tipos-documento"],
    queryFn: async () => {
      try {
        const { data } = await rutasServices.getTiposDocumento();
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // Mutación para crear ruta
  const rutaMutation = useMutation({
    mutationFn: (form: IRuta) => rutasServices.createRuta(form),

    onMutate: () => {
      Swal.fire({
        title: "Cargando...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Creado",
        text: "Ruta de inspección creada exitosamente",
        confirmButtonText: "Aceptar",
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["rutas"] });
        handleClose();
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  // Mutación para crear casa
  const casaMutation = useMutation({
    mutationFn: (form: ICasa) => rutasServices.createCasa(form),

    onMutate: () => {
      Swal.fire({
        title: "Cargando...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Creado",
        text: "Casa registrada exitosamente",
        confirmButtonText: "Aceptar",
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["casas"] });
        handleCloseCasa();
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  // Mutación para crear cliente
  const clienteMutation = useMutation({
    mutationFn: (form: ICliente) => rutasServices.createCliente(form),

    onMutate: () => {
      Swal.fire({
        title: "Cargando...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Creado",
        text: "Cliente registrado exitosamente",
        confirmButtonText: "Aceptar",
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["clientes"] });
        handleCloseCliente();
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  // Control del formulario de ruta
  const onSubmitRuta = (form: IRuta) => {
    rutaMutation.mutate(form);
  };

  // Control del formulario de casa
  const onSubmitCasa = (form: ICasa) => {
    casaMutation.mutate(form);
  };

  // Control del formulario de cliente
  const onSubmitCliente = (form: ICliente) => {
    clienteMutation.mutate(form);
  };

  // Eliminar ruta
  const deleteRutaMutation = useMutation({
    mutationFn: (id: number) => rutasServices.deleteRuta(id),

    onMutate: () => {
      Swal.fire({
        title: "Eliminando...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "Ruta eliminada correctamente",
        confirmButtonText: "Aceptar",
      });
      queryClient.invalidateQueries({ queryKey: ["rutas"] });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRutaMutation.mutate(id);
      }
    });
  };

  // Actualizar estado de la ruta
  const toggleStatusMutation = useMutation({
    mutationFn: (id: number) => rutasServices.toggleStatusRuta(id),

    onMutate: () => {
      Swal.fire({
        title: "Actualizando estado...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Estado actualizado",
        text: "El estado de la ruta fue actualizado correctamente",
        confirmButtonText: "Aceptar",
      });
      queryClient.invalidateQueries({ queryKey: ["rutas"] });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  const toggleRutaStatus = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas activar o desactivar esta ruta?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        toggleStatusMutation.mutate(id);
      }
    });
  };

  return {
    // Estados de rutas
    rutas: data,
    isLoading,
    isError,
    error,
    
    // Estados de casas
    casas,
    isLoadingCasas,
    
    // Estados de inspectores
    inspectores,
    isLoadingInspectores,
    
    // Estados de ciudades
    ciudades,
    isLoadingCiudades,
    
    // Estados de clientes
    clientes,
    isLoadingClientes,
    
    // Estados de tipos de documento
    tiposDocumento,
    isLoadingTiposDocumento,
    
    // Métodos de formularios
    methodsRutas,
    methodsCasa,
    methodsCliente,
    
    // Handlers de formularios
    onSubmitRuta,
    onSubmitCasa,
    onSubmitCliente,
    
    // Estados de modales
    open,
    openCasa,
    openCliente,
    currentRuta,
    
    // Handlers de modales
    handleOpen,
    handleClose,
    handleOpenCasa,
    handleCloseCasa,
    handleOpenCliente,
    handleCloseCliente,
    openCurrentRuta,
    
    // Handlers de acciones
    handleDelete,
    toggleRutaStatus,
  };
};
