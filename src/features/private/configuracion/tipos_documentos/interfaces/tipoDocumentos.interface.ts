export interface ITipoDocumentos {
  id_tipo_documento: number;
  nombre: string;
  abreviacion: string;
  estado: boolean;
  created_at: string;
  updated_at: string;
}

export interface ITipoDocumento {
  nombre: string;
  abreviacion: string;
}
