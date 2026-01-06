import * as rutaServices from "@/features/private/inspeccion/rutas/services/rutas.services";
import {
  IRuta,
  ITipoVisita,
} from "@/features/private/inspeccion/rutas/interfaces";
import { IUsuarios } from "@/features/private/configuracion/usuarios/interfaces";
import { IUser } from "@/features/private/configuracion/usuarios/interfaces";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatErrors } from "@/utils/formatErrors";
import { useEffect, useState } from "react";

export const useCrearRutas = () => {
  const [numeroDoc, setNumeroDoc] = useState("");
  const queryClient = useQueryClient();
  const methodsRutas = useForm<IRuta>();

  // Get tipos visitas
  const { data: dataTipoVisita = [] } = useQuery<ITipoVisita[]>({
    queryKey: ["tiposVisita"],
    queryFn: async () => {
      try {
        const { data } = await rutaServices.getTiposVisita();
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

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

  // Crear ruta
  const rutaMutation = useMutation({
    mutationFn: (form: IRuta) => rutaServices.createRuta(form),

    onMutate: () => {
      Swal.fire({
        title: "Cargando...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });
    },

    onSuccess: async ({ data }) => {
      Swal.close();

      if (data?.error) {
        const errors = data?.error?.errors ?? {};
        await Swal.fire({
          icon: "warning",
          title: "Revisa los campos",
          html: formatErrors(errors),
          confirmButtonText: "Aceptar",
        });
        return;
      }

      await Swal.fire({
        icon: "success",
        title: "Creado",
        text: data?.message || "Ruta creada exitosamente",
        confirmButtonText: "Aceptar",
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["rutas"] });
        window.location.reload();
      });
    },

    onError: (error: any) => {
      Swal.close();

      const responseData = error.response?.data;

      const conflictData = responseData?.data || responseData;

      if (error.response?.status === 409 && conflictData?.conflicto) {
        const { no_cuenta, diferencias } = conflictData;

        const tablaDiferencias = diferencias
          .map(
            (diff: any) => `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px; text-align: left; font-weight: bold;">${diff.campo}</td>
              <td style="padding: 8px; color: #16a34a;">${diff.valor_registrado}</td>
              <td style="padding: 8px; color: #dc2626;">${diff.valor_ingresado}</td>
            </tr>
          `
          )
          .join("");

        Swal.fire({
          icon: "warning",
          title: "Conflicto de Datos",
          width: "600px",
          html: `
            <div style="text-align: left; margin-bottom: 10px;">
              El número de cuenta <b>${no_cuenta}</b> ya existe, pero la información física no coincide. 
              <br/><small>Verifique si digitó bien la cuenta o los datos de la casa.</small>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 10px;">
              <thead style="background-color: #f3f4f6;">
                <tr>
                  <th style="padding: 8px; text-align: left;">Campo</th>
                  <th style="padding: 8px; text-align: left;">En Base de Datos</th>
                  <th style="padding: 8px; text-align: left;">Ingresado</th>
                </tr>
              </thead>
              <tbody>
                ${tablaDiferencias}
              </tbody>
            </table>
          `,
          confirmButtonText: "Entendido, voy a revisar",
        });
        return;
      }

      handleAxiosError(error);
    },

    onSettled: () => {
      if (Swal.isLoading()) Swal.close();
    },
  });

  // Obtener cliente por documento
  const { data: usuario } = useQuery<IUser>({
    queryKey: ["usuario", numeroDoc],
    enabled: !!numeroDoc,
    queryFn: async () => {
      try {
        const { data } = await rutaServices.getClienteByDocument(numeroDoc!);

        if (data?.message) {
          const isWarning = Boolean(data?.error);
          Swal.fire({
            icon: isWarning ? "warning" : "info",
            title: data.message,

            timer: 2200,
            showConfirmButton: !isWarning,
          });
        }

        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const getUserDocument = (documento: string) => {
    setNumeroDoc(documento);
  };

  const onSubmit = (form: IRuta) => {
    rutaMutation.mutate(form);
  };

  useEffect(() => {
    if (usuario?.numero_documento) {
      methodsRutas.setValue("cliente.primer_nombre", usuario.primer_nombre);
      methodsRutas.setValue("cliente.segundo_nombre", usuario.segundo_nombre);
      methodsRutas.setValue("cliente.primer_apellido", usuario.primer_apellido);
      methodsRutas.setValue(
        "cliente.segundo_apellido",
        usuario.segundo_apellido
      );
      methodsRutas.setValue("cliente.telefono", usuario.telefono);
      methodsRutas.setValue(
        "cliente.id_tipo_documento",
        usuario.tipo_documento.id_tipo_documento
      );
    }
  }, [usuario]);

  return {
    methods: methodsRutas,
    onSubmit,
    dataTipoVisita,
    getUserDocument,
    inspectores,
  };
};
