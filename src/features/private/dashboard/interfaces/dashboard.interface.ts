export interface Permisos {
  id_permiso: number;
  id_rol: number;
  id_opcion: number;
  created_at: string;
  updated_at: string;
  rol: Rol;
  opcion: Opcion;
}

export interface Rol {
  id_rol: number;
  nombre_rol: string;
  created_at: string;
  updated_at: string;
}

export interface Opcion {
  id_opcion: number;
  nombre: string;
  link: string;
  id_menu: number;
  created_at: string;
  updated_at: string;
  menu: Menu;
}

export interface Menu {
  id_menu: number;
  nombre: string;
  icono: string;
  created_at: string;
  updated_at: string;
}
