// Interfaces para Rutas de Inspección
export interface IRuta {
  fecha: string;
  hora: string;
  id_casa: number;
  id_inspector: number;
}

export interface IRutas {
  id_ruta: number;
  fecha: string;
  hora: string;
  estado: boolean;
  created_at: string;
  updated_at: string;
  casa: Casa;
  inspector: Inspector;
}

// Interfaces para Casa
export interface ICasa {
  medidor: string;
  direccion: string;
  barrio: string;
  telefono: string;
  codigo_ciudad: string;
  id_cliente: number;
}

export interface Casa {
  id_casa: number;
  medidor: string;
  direccion: string;
  barrio: string;
  telefono: string;
  estado: boolean;
  created_at: string;
  updated_at: string;
  ciudad: Ciudad;
  cliente: Cliente;
}

// Interfaces para Cliente (reutilizando la existente pero con algunos ajustes)
export interface ICliente {
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  telefono: string;
  id_tipo_documento: number;
  numero_documento: string;
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
  tipo_documento: TipoDocumento;
}

// Interfaces para Inspector (usando usuarios con rol de inspector)
export interface Inspector {
  id_usuario: number;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  email: string;
  estado: boolean;
  created_at: string;
  updated_at: string;
  tipo_documento: TipoDocumento;
}

// Interfaces para Ciudad
export interface Ciudad {
  codigo: string;
  nombre: string;
  created_at: string;
  updated_at: string;
  departamento: Departamento;
}

// Interfaces para Departamento
export interface Departamento {
  codigo: string;
  nombre: string;
  created_at: string;
  updated_at: string;
}

// Interfaces para Tipo de Documento
export interface TipoDocumento {
  id_tipo_documento: number;
  nombre: string;
  abreviacion: string;
  estado: boolean;
  created_at: string;
  updated_at: string;
}

// Interfaces para Usuarios (inspectores)
export interface IUsuario {
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  email: string;
  telefono: string;
  id_tipo_documento: number;
  numero_documento: string;
  id_rol: number;
}

export interface Usuario {
  id_usuario: number;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  email: string;
  telefono: string;
  numero_documento: string;
  estado: boolean;
  created_at: string;
  updated_at: string;
  tipo_documento: TipoDocumento;
  rol: Rol;
}

export interface Rol {
  id_rol: number;
  nombre: string;
  descripcion: string;
  estado: boolean;
  created_at: string;
  updated_at: string;
}
