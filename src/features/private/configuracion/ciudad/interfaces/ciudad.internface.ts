export interface ICiudad {
  codigo_municipio: string;
  nombre: string;
  id_departamento: string;
}

export interface ICiudades {
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
