export interface IRole {
  id_rol?: number;
  nombre_rol: string;
}

export interface IRoles {
  id_rol: number;
  nombre_rol: string;
  estado: boolean;
  created_at: string;
  updated_at: string;
}

export interface IPermiso {
  id_rol: number;
  id_opciones: number[];
}

export interface IPermisosRol {
  id_permiso: number;
  id_rol: number;
  id_opcion: number;
  created_at: string;
  updated_at: string;
  opcion: Opcion;
}

export interface Opcion {
  id_opcion: number;
  nombre: string;
  link: string;
  estado: boolean;
  id_menu: number;
  created_at: string;
  updated_at: string;
  menu: Menu;
}

export interface Menu {
  id_menu: number;
  nombre: string;
  icono: string;
  estado: boolean;
  created_at: string;
  updated_at: string;
}
