import { GeralStatus } from "../enums/geralStatus";

export type MedicamentoResumoResponse = {
  id: number;
  nome: string;
  status: GeralStatus;
}