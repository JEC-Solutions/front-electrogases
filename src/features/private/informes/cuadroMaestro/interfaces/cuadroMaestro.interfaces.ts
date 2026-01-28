export interface IResponseCuadroMaestro {
  id_inspeccion: number;
  fecha_expedicion: string;
  fecha_inspeccion: string;
  fecha_puesta_en_servicio?: string;
  tipo_gas_glp: boolean;
  hora_inicio: string;
  hora_fin: string;
  solicitud_usuario: boolean;
  numero_certificado: any;
  reemplazo_informe: boolean;
  numero_informe?: string;
  vacio_interno: boolean;
  numero_licencia_construccion: any;
  fecha_licencia_contruccion: any;
  existe_linea: boolean;
  existe_vacio: boolean;
  empresa?: string;
  version: any;
  created_at: string;
  updated_at: string;
  tipoInspeccion: TipoInspeccion;
  ruta: Ruta;
  clasesInspeccion: ClaseInspeccion[];
}

export interface TipoInspeccion {
  id_tipo_inspeccion: number;
  nombre: string;
  created_at: string;
  updated_at: string;
}

export interface Ruta {
  id_ruta: number;
  fecha: string;
  hora: string;
  numero_acta: string;
  estado: boolean;
  valor_servicio: string;
  observaciones: string;
  medio_generado: any;
  created_at: string;
  updated_at: string;
  persona: Persona;
  created_by: CreatedBy;
  cliente: Cliente;
  casa: Casa;
  resultado: Resultado;
}

export interface Persona {
  id_persona: number;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  telefono: string;
  numero_documento: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface CreatedBy {
  id_persona: number;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  telefono: string;
  numero_documento: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Cliente {
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
}

export interface Casa {
  id_casa: number;
  no_cuenta: string;
  medidor: string;
  direccion: string;
  barrio: string;
  ciudad: Ciudad;
  created_at: string;
  updated_at: string;
}

export interface Ciudad {
  codigo: number;
  nombre: string;
  created_at: string;
  updated_at: string;
}

export interface Resultado {
  id_resultado: string;
  nombre: string;
  created_at: string;
  updated_at: string;
}

export interface ClaseInspeccion {
  id_clase_inspeccion: number;
  nombre: string;
  claseUso: ClaseUso;
  created_at: string;
  updated_at: string;
}

export interface ClaseUso {
  id_clase_uso: number;
  nombre: string;
  created_at: string;
  updated_at: string;
}
