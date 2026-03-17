export interface ICliente {
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  telefono: string;
  id_tipo_documento: number;
  numero_documento: string;
}

export interface IClientes{
  id_cliente: number;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  telefono: string;
  numero_documento: string;
  estado: boolean;
  created_at: string;
  updated_at: string;
  tipo_documento: TipoDocumento;
}

export interface TipoDocumento {
  id_tipo_documento: number;
  nombre: string;
  abreviacion: string;
  estado: boolean;
  created_at: string;
  updated_at: string;
}

export interface IInspeccionFirma {
  id_inspeccion: number;
  numero_certificado: string | null;
  fecha_inspeccion: string;
  tiene_firma: boolean;
  id_imagen_firma: number | null;
}

export interface IFirmaActualizada {
  id_imagen: number;
  nombre_archivo: string;
  tamanio_archivo: number;
  tipo_mime: string;
  inspeccion: {
    id_inspeccion: number;
    numero_certificado: string | null;
  };
}

