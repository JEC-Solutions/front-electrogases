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
  numero_certificado: any;
  reemplazo_informe: boolean;
  numero_informe: any;
  vacio_interno: boolean;
  numero_licencia_construccion: any;
  fecha_licencia_contruccion: any;
  existe_linea: boolean;
  existe_vacio: boolean;
  created_at: string;
  updated_at: string;
  instalacionNueva: any;
  instalacionExistente: InstalacionExistente;
  tipoInspeccion: any;
  clasesInspeccion: any[];
  evaluacionRecintos: EvaluacionRecinto[];
  evaluacionCondiciones: EvaluacionCondicione[];
  equiposUtilizados: any[];
  isometricos: any[];
  esquemaPlanta: any[];
  lineaMatriz: any;
  vacioInterno: any;
  ruta: any;
}

export interface InstalacionExistente {
  id_instalacion_existente: number;
  solicitudUsuario: boolean;
  numeroVisita: number;
  createdAt: string;
  updatedAt: string;
}

export interface EvaluacionRecinto {
  id_evaluacion_recintos: number;
  tipoRecinto: string;
  idRecinto: string;
  idArtefacto: string;
  potenciaInstalada: number;
  potenciaConjunta: number;
  tipoArtefacto: string;
  volumenRecinto?: number;
  volumenADY1: any;
  volumenADY2: any;
  volumenADY3: any;
  volumenADY4: any;
  volumenTotal?: number;
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
  metodoVentilacion?: string;
  tipoVentilacionSuperior: any;
  areaMinimaSuperior: any;
  areaAberturaSuperior: any;
  tipoVentilacionInferior: any;
  areaMinimaInferior: any;
  areaAberturaInferior: any;
  createdAt: string;
  updatedAt: string;
}
