import { AgendamentoStatus } from "../enums/agendamento/agendamentoStatus";
import { TipoDeAlerta } from "../enums/agendamento/tipoDeAlerta";
import { MedicamentoHistoricoResumoResponse } from "./medicamentoHistoricoTypes";
import { TratamentoResumoResponse } from "./tratamentoTypes";
import { UsuarioResumoResponse } from "./usuarioTypes";

export type AgendamentoResponse = {
  id: number;
  horarioDoAgendamento: Date;
  tipoDeAlerta: TipoDeAlerta;
  status: AgendamentoStatus;
  usuario: UsuarioResumoResponse;
  tratamento: TratamentoResumoResponse;
  historicoDoMedicamentoTomado: MedicamentoHistoricoResumoResponse;
}

export type AgendamentoResumoResponse = {
  id: number;
  horarioDoAgendamento: Date;
  tipoDeAlerta: TipoDeAlerta;
  status: AgendamentoStatus;
}