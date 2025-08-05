export interface IRuta {
  cliente: Cliente;
  casa: Casa;
  ruta: Ruta;
}

export interface Cliente {
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  telefono: string;
  numero_documento: string;
  id_tipo_documento: number;
}

export interface Casa {
  medidor: string;
  direccion: string;
  barrio: string;
  cuenta: string;
  tipo_vivienda: string;
  telefono: string;
  id_ciudad: string;
}

export interface Ruta {
  fecha: string;
  hora: string;
  fecha_solicitud: string;
  estado: boolean;
  id_persona: number;
}

export interface IRutas {
  id_ruta: number;
  fecha: string;
  hora: string;
  fecha_solicitud: string;
  estado: boolean;
  created_at: string;
  updated_at: string;
  inspeccion: any;
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
}

export interface Casa {
  id_casa: number;
  medidor: string;
  direccion: string;
  barrio: string;
  cuenta: string;
  tipo_vivienda: string;
  telefono: string;
  created_at: string;
  updated_at: string;
  cliente: Cliente;
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
