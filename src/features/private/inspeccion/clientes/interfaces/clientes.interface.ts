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
