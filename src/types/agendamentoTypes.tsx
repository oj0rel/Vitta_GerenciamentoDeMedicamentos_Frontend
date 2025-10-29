import { AgendamentoStatus } from "../enums/agendamento/agendamentoStatus";
import { TipoDeAlerta } from "../enums/agendamento/tipoDeAlerta";
import { MedicamentoHistoricoResumoResponse } from "./medicamentoHistoricoTypes";
import { TratamentoResumoResponse } from "./tratamentoTypes";
import { UsuarioResumoResponse } from "./usuarioTypes";

export type AgendamentoData = {
  id: number;
  horarioDoAgendamento: Date;
  tipoDeAlerta: TipoDeAlerta;
  status: AgendamentoStatus;
  usuario: UsuarioResumoResponse;
  tratamento: TratamentoResumoResponse;
  historicoDoMedicamentoTomado: MedicamentoHistoricoResumoResponse;
}
