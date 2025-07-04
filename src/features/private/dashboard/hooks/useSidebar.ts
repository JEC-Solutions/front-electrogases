import * as dashboardServices from "@/features/private/dashboard/service/dashboard.services";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useQuery } from "@tanstack/react-query";
import { Permisos } from "@/features/private/dashboard/interfaces";

export const useSidebar = () => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery<Permisos[]>({
    queryKey: ["permisos"],
    queryFn: async () => {
      try {
        const { data } = await dashboardServices.getPermissionsByUser();
        return data.data;
      } catch (error: any) {
        handleAxiosError(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    permisos: data,
    isLoading,
    isError,
    error,
  };
};
