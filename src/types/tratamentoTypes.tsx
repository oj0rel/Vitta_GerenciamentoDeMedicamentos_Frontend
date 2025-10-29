import { TratamentoStatus } from "../enums/tratamento/tratamentoStatus";
import { MedicamentoResumoResponse } from "./medicamentoTypes";

export type TratamentoResumoResponse = {
  id: number;
  dataDeInicio: Date;
  dataDeTermino: Date;
  status: TratamentoStatus;
  medicamento: MedicamentoResumoResponse;
}
