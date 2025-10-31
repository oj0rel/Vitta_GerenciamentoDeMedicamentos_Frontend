import { TratamentoStatus } from "../enums/tratamento/tratamentoStatus";
import { MedicamentoResumoResponse } from "./medicamentoTypes";

export type TratamentoResumoResponse = {
  id: number;
  nome: string;
  dataDeInicio: Date;
  dataDeTermino: Date;
  status: TratamentoStatus;
  medicamento: MedicamentoResumoResponse;
}
