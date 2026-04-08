import { electroApi } from "@/api";
import {
  IAsignar,
  IRuta,
  IPdfRuta,
} from "@/features/private/inspeccion/rutas/interfaces";

export interface RutasFilters {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  inspectorId?: number;
  asesorId?: number;
  clienteId?: number;
  clienteDocumento?: string;
  estado_inspeccion?: string;
}

export const getRutas = async (filters?: RutasFilters) => {
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });
  }
  return await electroApi.get(`/ruta?${params.toString()}`);
};

export const getMyRutas = async (filters?: RutasFilters) => {
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });
  }
  return await electroApi.get(`/ruta/my-rutas?${params.toString()}`);
};

export const createRuta = async (data: IRuta) => {
  return await electroApi.post("/ruta", data);
};

export const updateruta = async (idRuta: number, data: IRuta) => {
  return await electroApi.put(`/ruta/${idRuta}`, data);
};

export const deleteRuta = async (idRuta: number) => {
  return await electroApi.delete(`/ruta/${idRuta}`);
};

export const toggleStatus = async (idRuta: number) => {
  return await electroApi.patch(`/ruta/${idRuta}/estado`);
};

export const getTiposVisita = async () => {
  return await electroApi.get("/tipo-visita");
};

export const getInspectores = async () => {
  return await electroApi.get("/usuarios/inspectores");
};

export const getAsesores = async () => {
  return await electroApi.get("/usuarios/asesores");
};

export const getClienteByDocument = async (documento: string) => {
  return await electroApi.get(`/cliente/documento/${documento}`);
};

export const asignarRuta = async (id: number, payload: IAsignar) => {
  return await electroApi.patch(`/ruta/${id}/asignar`, payload);
};

export const historialRuta = async (id: number) => {
  return await electroApi.get(`/ruta/${id}/historial`);
};

export const generatePdf = async (data: IPdfRuta) => {
  return await electroApi.post("/ruta/pdf", data);
};

export const searchCasas = async (query: string) => {
  return await electroApi.get(`/casa/search?q=${encodeURIComponent(query)}`);
};

export const updateRutaDate = async (idRuta: number, data: IRuta) => {
  return await electroApi.patch(`/ruta/${idRuta}/update-date`, data);
};
