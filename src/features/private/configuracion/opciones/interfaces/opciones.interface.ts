export interface IOpciones {
  id_opcion: number;
  nombre: string;
  link: string;
  estado: boolean;
  id_menu: number;
  created_at: string;
  updated_at: string;
  menu: Menu;
  permisos: Permiso[];
}

export interface Menu {
  id_menu: number;
  nombre: string;
  icono: string;
  estado: boolean;
  created_at: string;
  updated_at: string;
}

export interface Permiso {
  id_permiso: number;
  id_rol: number;
  id_opcion: number;
  created_at: string;
  updated_at: string;
}

export interface IOpcion {
  nombre: string;
  link: string;
  id_menu: number;
}
