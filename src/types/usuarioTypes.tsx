import { UsuarioStatus } from "../enums/usuario/usuarioStatus";

export type UsuarioResumoResponse = {
  id: number;
  nome: string;
  status: UsuarioStatus
}
