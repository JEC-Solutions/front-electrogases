export interface IUsuario {
  username: string;
  password: string;
  id_rol: number;
  persona: Persona;
}

export interface Persona {
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  telefono: string;
  id_tipo_documento: number;
  numero_documento: string;
  email: string;
}

export interface IUsuarios {
  id_usuario: number;
  usuario: string;
  change_password: boolean;
  firma: string;
  sello: string;
  estado: boolean;
  created_at: string;
  updated_at: string;
  rol: Rol;
  persona: IPersona;
}

export interface Rol {
  id_rol: number;
  nombre_rol: string;
  estado: boolean;
  created_at: string;
  updated_at: string;
}

export interface IPersona {
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

export interface IUser {
  id_persona: number;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  telefono: string;
  numero_documento: string;
  email: string;
  tipo_documento: TipoDocumento;
  usuario: Usuario;
  created_at: string;
  updated_at: string;
}

export interface Usuario {
  id_usuario: number;
  rol: Rol;
}
