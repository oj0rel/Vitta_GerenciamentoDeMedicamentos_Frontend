import { AgendamentoResponse } from "../types/agendamentoTypes";
import apiManager from "./apiManager";

export const listarAgendamentos = async (token: string): Promise<AgendamentoResponse[]> => {
  try {
    const response = await apiManager.get<AgendamentoResponse[]>('api/agendamentos/listar', {

      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Erro ao listar agendamentos para o token: ${token}`, error);
    throw error;
  }
};
