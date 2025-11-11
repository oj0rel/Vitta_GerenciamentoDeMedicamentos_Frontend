import { TipoDeFrequencia } from "../enums/tratamento/tipoDeFrequencia";
import { TratamentoStatus } from "../enums/tratamento/tratamentoStatus";
import { AgendamentoResumoResponse } from "./agendamentoTypes";
import { MedicamentoResumoResponse } from "./medicamentoTypes";
import { UsuarioResumoResponse } from "./usuarioTypes";

export type TratamentoResumoResponse = {
  id: number;
  nome: string;
  dataDeInicio: Date;
  dataDeTermino: Date;
  status: TratamentoStatus;
  medicamento: MedicamentoResumoResponse;
}

export type TratamentoResponse = {
  id: number;
  nome: string;
  dosagem: number;
  instrucoes: string;
  dataDeInicio: Date;
  dataDeTermino: Date;
  tipoDeFrequencia: TipoDeFrequencia;
  intervaloEmHoras: number;
  horariosEspecificos: string;
  status: TratamentoStatus;
  agendamentos: AgendamentoResumoResponse[];
  usuario: UsuarioResumoResponse;
  medicamento: MedicamentoResumoResponse;
}