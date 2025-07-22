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
