export interface IResponse {
  success: boolean;
  message: string;
  data: IInspecciones[];
  error: any;
}

export interface IInspecciones {
  id_inspeccion: number;
  fecha_expedicion: string;
  fecha_inspeccion: string;
  fecha_puesta_en_servicio: string;
  tipo_gas_glp: boolean;
  hora_inicio: string;
  hora_fin: string;
  solicitud_usuario: boolean;
  numero_certificado: string;
  reemplazo_informe: boolean;
  numero_informe: string;
  vacio_interno: boolean;
  numero_licencia_construccion: string;
  fecha_licencia_contruccion: string;
  existe_linea: boolean;
  existe_vacio: boolean;
  created_at: string;
  updated_at: string;
  tipoInspeccion: TipoInspeccion;
  ruta: Ruta;
}

export interface TipoInspeccion {
  id_tipo_inspeccion: number;
  nombre: string;
  created_at: string;
  updated_at: string;
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

export interface IActa {
  id_inspeccion: number;
  fecha_expedicion: string;
  fecha_inspeccion: string;
  fecha_puesta_en_servicio: string;
  tipo_gas_glp: boolean;
  hora_inicio: string;
  hora_fin: string;
  solicitud_usuario: boolean;
  numero_certificado: string;
  reemplazo_informe: boolean;
  numero_informe: string;
  vacio_interno: boolean;
  numero_licencia_construccion: string;
  fecha_licencia_contruccion: string;
  existe_linea: boolean;
  existe_vacio: boolean;
  created_at: string;
  updated_at: string;
  instalacionNueva: any;
  instalacionExistente: InstalacionExistente;
  tipoInspeccion: TipoInspeccion;
  clasesInspeccion: any[];
  evaluacionRecintos: any[];
  evaluacionCondiciones: any[];
  equiposUtilizados: EquiposUtilizado[]
  isometricos: any[];
  esquemaPlanta: any[];
  lineaMatriz: any;
  vacioInterno: VacioInterno;
  ruta: Ruta;
  volumenRecintos: VolumenRecinto[];
  resultadoDefectologias: ResultadoDefectologia[];
  parametrosEvaluacion: ParametrosEvaluacion[]
}

export interface InstalacionExistente {
  id_instalacion_existente: number;
  solicitudUsuario: boolean;
  numeroVisita: number;
  createdAt: string;
  updatedAt: string;
}

export interface Ruta {
  id_ruta: number;
  fecha: string;
  hora: string;
  numero_acta: string;
  estado: boolean;
  created_at: string;
  updated_at: string;
  casa: Casa;
  persona: Persona;
}

export interface Casa {
  id_casa: number;
  no_cuenta: string;
  medidor: string;
  direccion: string;
  barrio: string;
  valor_servicio: string;
  observaciones: string;
  created_at: string;
  updated_at: string;
  cliente: Cliente;
  ciudad: Ciudad;
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

export interface Ciudad {
  codigo: string;
  nombre: string;
  created_at: string;
  updated_at: string;
  departamento: Departamento;
}

export interface Departamento {
  codigo: string;
  nombre: string;
  created_at: string;
  updated_at: string;
}

export interface VacioInterno {
  id_vacio_interno: number;
  ventilacion: boolean;
  area_planta: string;
  lado_minimo: string;
  nro_pisos: number;
  cubierto: boolean;
  area_cubierta: string;
  cumple: boolean;
  forma: number;
  id_documento_legal: string;
  fecha: string;
  created_at: string;
  updated_at: string;
}

export interface VolumenRecinto {
  id_volumen_recintos: number;
  volumenRecinto: number;
  volumenADY1: number;
  volumenADY2: number;
  volumenADY3: any;
  volumenADY4: any;
  volumenTotal: number;
  createdAt: string;
  updatedAt: string;
}

export interface ResultadoDefectologia {
  id_resultado_defectologia: number;
  resultado: boolean;
  created_at: string;
  updated_at: string;
  defectologia: Defectologia;
}

export interface Defectologia {
  id_defectologia: number;
  codigo: string;
  descripcion: string;
  created_at: string;
  updated_at: string;
}

export interface ParametrosEvaluacion {
  id_parametros_evaluacion: number
  lecturaInicialAire: number
  lecturaFinalAire: number
  tiempoPruebaAire: number
  lecturaInicialMedidor: number
  lecturaFinalMedidor: number
  lecturaInicialMedidor2: number
  lecturaFinalMedidor2: number
  tiempoPruebaMedidor: number
  pruebaPresion: number
  detectorFugas: number
  createdAt: string
  updatedAt: string
}

export interface EquiposUtilizado {
  id_equipos_utilizados: number
  equiposUtilizados: string
  ns: string
  marca: string
  modelo: string
}