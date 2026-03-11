export interface LoginForm {
  username: string;
  password: string;
  numero_documento?: string;
  nuevaContrasena?: string;
}

export interface IChangePassword {
  numero_documento: string;
  nuevaContrasena: string;
}

export interface IRecoverPassword {
  numero_documento: string;
}

export interface IChangeExpiredPassword {
  username: string;
  contrasena_actual: string;
  nueva_contrasena: string;
}
