import * as empresaServices from "@/features/private/configuracion/empresa/services/empresa.services";
import { IOrganismo } from "@/features/private/configuracion/empresa/interfaces";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useEmpresa = () => {
  const queryClient = useQueryClient();
  const methodsEmpresa = useForm<IOrganismo>();

  const {
    data: organismo,
    isLoading,
    isError,
    error,
  } = useQuery<IOrganismo>({
    queryKey: ["organismo"],
    queryFn: async () => {
      try {
        const { data } = await empresaServices.getOrganismo();
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const updateOrganismoMutation = useMutation({
    mutationFn: (data: IOrganismo) => empresaServices.updateOrganismo(data),

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
        text: "Datos del organismo actualizados correctamente",
        confirmButtonText: "Aceptar",
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["organismo"] });
      });
    },

    onError: (error: any) => {
      Swal.close();
      handleAxiosError(error);
    },
  });

  const onSubmit = (form: IOrganismo) => {
    updateOrganismoMutation.mutate(form);
  };

  useEffect(() => {
    if (organismo) {
      methodsEmpresa.setValue("nit", organismo.nit);
      methodsEmpresa.setValue("empresa", organismo.empresa);
      methodsEmpresa.setValue("direccion", organismo.direccion);
      methodsEmpresa.setValue("telefono1", organismo.telefono1);
      methodsEmpresa.setValue("telefono2", organismo.telefono2 || "");
      methodsEmpresa.setValue("acreditacion", organismo.acreditacion);
      methodsEmpresa.setValue("version_app", organismo.version_app || "1.0.0");
    }
  }, [organismo]);

  return {
    organismo,
    isLoading,
    isError,
    error,
    methodsEmpresa,
    onSubmit,
  };
};
