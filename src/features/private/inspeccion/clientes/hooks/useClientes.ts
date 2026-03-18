import * as clientesServices from "@/features/private/inspeccion/clientes/services/clientes.services";
import * as tiposDocumentos from "@/features/private/configuracion/tipos_documentos/services/tipoDocumentos.services";
import {
  ICliente,
  IClientes,
  IInspeccionFirma,
} from "@/features/private/inspeccion/clientes/interfaces";
import { ITipoDocumentos } from "@/features/private/configuracion/tipos_documentos/interfaces";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useClientes = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [currentCliente, setCurrentCliente] = useState<IClientes | null>(null);
  const methodsClientes = useForm<ICliente>();

  // Estado para el modal de firma
  const [openFirma, setOpenFirma] = useState(false);
  const [clienteFirma, setClienteFirma] = useState<IClientes | null>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentCliente(null);
    methodsClientes.reset();
  };

  // Handlers del modal de firma
  const openFirmaCliente = (cliente: IClientes) => {
    setClienteFirma(cliente);
    setOpenFirma(true);
  };

  const handleCloseFirma = () => {
    setOpenFirma(false);
    setClienteFirma(null);
  };

  const openCurrentCliente = (cliente: IClientes) => {
    setCurrentCliente(cliente);
    handleOpen();
  };

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery<IClientes[]>({
    queryKey: ["clientes"],
    queryFn: async () => {
      try {
        const { data } = await clientesServices.getClientes();
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // Query de inspecciones con firma (habilitado solo cuando hay un cliente seleccionado)
  const { data: inspeccionesConFirma = [], isLoading: loadingInspecciones } =
    useQuery<IInspeccionFirma[]>({
      queryKey: ["inspecciones-firma", clienteFirma?.id_cliente],
      queryFn: async () => {
        if (!clienteFirma) return [];
        const { data } = await clientesServices.getInspeccionesConFirma(
          clienteFirma.id_cliente,
        );
        return data.data;
      },
      enabled: !!clienteFirma,
      staleTime: 0,
    });

  const { data: documentos = [] } = useQuery<ITipoDocumentos[]>({
    queryKey: ["tiposDocumentos"],
    queryFn: async () => {
      try {
        const { data } = await tiposDocumentos.getTipoDocumentos();
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const clienteMutation = useMutation({
    mutationFn: (form: ICliente) => clientesServices.createCliente(form),

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
        text: "Cliente creado con éxito",
        confirmButtonText: "Aceptar",
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["clientes"] });
        handleClose();
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  //   Update cliente
  const updateClienteMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ICliente }) =>
      clientesServices.updateCliente(id, data),

    onMutate: () => {
      Swal.fire({
        title: "Actualizando...",
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
        text: "Cliente actualizado correctamente",
        confirmButtonText: "Aceptar",
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["clientes"] });
        handleClose();
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  //   Control del formulario
  const onSubmit = (form: ICliente) => {
    if (currentCliente) {
      updateClienteMutation.mutate({
        id: currentCliente.id_cliente,
        data: form,
      });
    } else {
      clienteMutation.mutate(form);
    }
  };

  // Mutation para actualizar la firma del cliente en una inspección específica
  const updateFirmaMutation = useMutation({
    mutationFn: ({
      idInspeccion,
      file,
    }: {
      idInspeccion: number;
      file: File;
    }) =>
      clientesServices.updateFirmaCliente(
        clienteFirma!.id_cliente,
        idInspeccion,
        file,
      ),

    onMutate: () => {
      Swal.fire({
        title: "Actualizando firma...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Firma actualizada",
        text: "La firma del cliente fue actualizada correctamente",
        confirmButtonText: "Aceptar",
      }).then(() => {
        handleCloseFirma();
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  const handleUpdateFirma = (idInspeccion: number, file: File) => {
    updateFirmaMutation.mutate({ idInspeccion, file });
  };

  useEffect(() => {
    if (currentCliente) {
      methodsClientes.reset({
        primer_nombre: currentCliente.primer_nombre,
        segundo_nombre: currentCliente.segundo_nombre,
        primer_apellido: currentCliente.primer_apellido,
        segundo_apellido: currentCliente.segundo_apellido,
        telefono: currentCliente.telefono,
        numero_documento: currentCliente.numero_documento,
        id_tipo_documento: currentCliente.tipo_documento?.id_tipo_documento,
        estado: currentCliente.estado,
      });
    } else {
      methodsClientes.reset({
        primer_nombre: "",
        segundo_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        telefono: "",
        numero_documento: "",
        id_tipo_documento: undefined,
        estado: true,
      });
    }
  }, [currentCliente, methodsClientes]);

  return {
    clientes: data,
    isLoading,
    isError,
    error,
    documentos,
    methodsClientes,
    open,
    handleOpen,
    handleClose,
    openCurrentCliente,
    currentCliente,
    onSubmit,
    // Firma
    openFirma,
    clienteFirma,
    openFirmaCliente,
    handleCloseFirma,
    inspeccionesConFirma,
    loadingInspecciones,
    handleUpdateFirma,
    isUpdatingFirma: updateFirmaMutation.isPending,
  };
};
