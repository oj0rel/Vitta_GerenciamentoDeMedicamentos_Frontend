export type UsuarioLoginData = {
  email: string;
  senha: string;
}

export type LoginResponse = {
  token: string;
}

export type UsuarioCadastroData = {
  nome: string;
  telefone: string;
  email: string;
  senha: string;
}

export type CadastroResponse = {
  token: string;
}