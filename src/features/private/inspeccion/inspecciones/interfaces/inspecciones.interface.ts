export interface IResponse {
  success: boolean;
  message: string;
  data: IInspecciones[];
  error: any;
}

export interface IInspecciones {
  id_inspeccion: number
  fecha_expedicion: string
  fecha_inspeccion: string
  fecha_puesta_en_servicio: string
  tipo_gas_glp: boolean
  hora_inicio: string
  hora_fin: string
  solicitud_usuario: boolean
  numero_certificado: string
  reemplazo_informe: boolean
  numero_informe: string
  vacio_interno: boolean
  numero_licencia_construccion: string
  fecha_licencia_contruccion: string
  existe_linea: boolean
  existe_vacio: boolean
  created_at: string
  updated_at: string
  tipoInspeccion: TipoInspeccion
  ruta: Ruta
}

export interface TipoInspeccion {
  id_tipo_inspeccion: number
  nombre: string
  created_at: string
  updated_at: string
}

export interface Ruta {
  id_ruta: number
  fecha: string
  hora: string
  numero_acta: string
  estado: boolean
  created_at: string
  updated_at: string
  persona: Persona
}

export interface Persona {
  id_persona: number
  primer_nombre: string
  segundo_nombre: string
  primer_apellido: string
  segundo_apellido: string
  telefono: string
  numero_documento: string
  email: string
  created_at: string
  updated_at: string
}
