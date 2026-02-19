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
  editar_informe: boolean;
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

export interface IActa {
  id_inspeccion: number;
  fecha_expedicion: string;
  fecha_inspeccion: string;
  fecha_puesta_en_servicio: string;
  tipo_gas_glp: boolean;
  hora_inicio: string;
  fecha_solicitud: string;
  hora_fin: string;
  solicitud_usuario: boolean;
  numero_certificado: any;
  reemplazo_informe: boolean;
  numero_informe: string;
  vacio_interno: boolean;
  numero_licencia_construccion: string;
  fecha_licencia_contruccion: string;
  existe_linea: boolean;
  existe_vacio: boolean;
  empresa: string;
  version: any;
  editar_informe: boolean;
  created_at: string;
  updated_at: string;
  instalacionNueva: any;
  instalacionExistente: InstalacionExistente;
  tipoInspeccion: TipoInspeccion;
  clasesInspeccion: ClasesInspeccion[];
  evaluacionRecintos: EvaluacionRecinto[];
  evaluacionCondiciones: EvaluacionCondicione[];
  equiposUtilizados: EquiposUtilizado[];
  isometricos: any[];
  esquemaPlanta: any[];
  lineaMatriz: any;
  vacioInterno: any;
  ruta: Ruta;
  volumenRecintos: VolumenRecinto[];
  resultadoDefectologias: ResultadoDefectologia[];
  resultadoCategoriaDefectologias: ResultadoCategoriaDefectologia[];
  parametrosEvaluacion: ParametrosEvaluacion[];
  declaracionConformidad: DeclaracionConformidad[];
}

export interface ResultadoCategoriaDefectologia {
  id_resultado_categoria_defectologia: number;
  reparacion: boolean | null;
  cumple: boolean | null;
  created_at: string;
  updated_at: string;
  categoriaDefectologia: CategoriaDefectologia;
}

export interface CategoriaDefectologia {
  id_categoria_defectologia: number;
  descripcion: string;
  created_at: string;
  updated_at: string;
}

export interface InstalacionExistente {
  id_instalacion_existente: number;
  solicitudUsuario: boolean;
  numeroVisita: number;
  createdAt: string;
  updatedAt: string;
}

export interface TipoInspeccion {
  id_tipo_inspeccion: number;
  nombre: string;
  created_at: string;
  updated_at: string;
}

export interface ClasesInspeccion {
  id_clase_inspeccion: number;
  nombre: string;
  created_at: string;
  updated_at: string;
  claseUso: ClaseUso;
}

export interface ClaseUso {
  id_clase_uso: number;
  nombre: string;
  created_at: string;
  updated_at: string;
}

export interface EvaluacionRecinto {
  id_evaluacion_recintos: number;
  tipoRecinto: string;
  idRecinto: string;
  idArtefacto: string;
  potenciaInstalada: number;
  potenciaConjunta: number;
  tipoArtefacto: string;
  volumenRecinto: any;
  volumenADY1: any;
  volumenADY2: any;
  volumenADY3: any;
  volumenADY4: any;
  volumenTotal: any;
  createdAt: string;
  updatedAt: string;
}

export interface EvaluacionCondicione {
  id_evaluacion_condiciones: number;
  idRecinto: string;
  co: number;
  coDiluido: number;
  volumenRecinto: number;
  potenciaArtefactos: number;
  cumpleArtefactos: boolean;
  metodoVentilacion: any;
  tipoVentilacionSuperior: any;
  areaMinimaSuperior: any;
  areaAberturaSuperior: any;
  tipoVentilacionInferior: any;
  areaMinimaInferior: any;
  areaAberturaInferior: any;
  createdAt: string;
  updatedAt: string;
}

export interface EquiposUtilizado {
  id_equipos_utilizados: number;
  equiposUtilizados: string;
  ns: string;
  marca: string;
  modelo: string;
}

export interface Ruta {
  id_ruta: number;
  fecha: string;
  hora: string;
  numero_acta: string;
  estado: boolean;
  valor_servicio: string;
  observaciones: string;
  medio_generado: string;
  created_at: string;
  updated_at: string;
  persona: Persona;
  casa: Casa;
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
  usuario?: Usuario;
  equiposUsuarios?: EquiposUsuario[];
}

export interface EquiposUsuario {
  id_equipos_usuarios: number;
  idEquiposUtilizados: EquiposUtilizado;
}

export interface Usuario {
  id_usuario: number;
  usuario: string;
  certificado_no: string;
  competencia: string;
  firma: string;
  sello: string;
  estado: boolean;
}

export interface Casa {
  id_casa: number;
  no_cuenta: string;
  medidor: string;
  direccion: string;
  barrio: string;
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

export interface VolumenRecinto {
  id_volumen_recintos: number;
  recinto: string;
  volumenRecinto: number;
  volumenADY1: number;
  volumenADY2: number;
  volumenADY3: any;
  volumenADY4: any;
  volumenADY5: any;
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
  id_parametros_evaluacion: number;
  lecturaInicialAire: number;
  lecturaFinalAire: number;
  tiempoPruebaAire: number;
  lecturaInicialMedidor: number;
  lecturaFinalMedidor: number;
  lecturaInicialMedidor2: number;
  lecturaFinalMedidor2: number;
  tiempoPruebaMedidor: number;
  pruebaPresion: number;
  detectorFugas: number;
  createdAt: string;
  updatedAt: string;
}

export interface DeclaracionConformidad {
  id_declaracion_conformidad: number;
  declaracion1: boolean;
  declaracion2: boolean;
  declaracion3: any;
  defectos: any;
  instalacionConforme: boolean;
  continuaServicio: boolean;
  observaciones: string;
  nombreCliente: string;
  cedulaCliente: string;
  vinculoCliente: string;
  firmaCliente: string;
  cuotas: number;
}

export interface ITipoImagen {
  id: number;
  descripcion: string;
}
