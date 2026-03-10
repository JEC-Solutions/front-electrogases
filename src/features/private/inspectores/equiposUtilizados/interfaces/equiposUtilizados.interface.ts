export interface IEquiposUtilizadosRequest {
  personas?: number[];
  equiposUtilizados: string;
  ns: string;
  marca: string;
  modelo: string;
  otroEquipo?: string | null;
}

export interface IEquiposUtilizados {
  id_equipos_utilizados: number;
  equiposUtilizados: string;
  ns: string;
  marca: string;
  modelo: string;
  otroEquipo?: string | null;
  equiposUsuarios: {
    id_equipos_usuarios: number;
    idPersona: {
      id_persona: number;
      primer_nombre: string;
      primer_apellido: string;
    };
  }[];
}
