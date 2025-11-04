import { AgendamentoResponse } from '@/src/types/agendamentoTypes';
import { format } from 'date-fns';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.',],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  today: "Hoje"
};
LocaleConfig.defaultLocale = 'pt-br';

interface CalendarioProps {
  agendamentos: AgendamentoResponse[];
  diaSelecionado: string | null;
  onDiaPressionado: (data: string) => void;
  onMesMudou: (data: Date) => void;
}

const Calendario: React.FC<CalendarioProps> = ({
  agendamentos,
  diaSelecionado,
  onDiaPressionado,
  onMesMudou
}) => {
  const markedDates = useMemo(() => {
    const marks: MarkedDates = {};

    agendamentos.forEach(agendamento => {
      const dateString = format(new Date(agendamento.horarioDoAgendamento), 'yyyy-MM-dd');
      marks[dateString] = {
        marked: true,
        dotColor: 'blue',
        selected: dateString === diaSelecionado
      };
    });

    if (diaSelecionado && !marks[diaSelecionado]) {
      marks[diaSelecionado] = { selected: true, selectedColor: '#007bff' };
    }

    return marks;
  }, [agendamentos, diaSelecionado]);

  return (
    <View style={{ width: 350 ,height: 350 ,marginHorizontal:10, marginBottom: 40}}>
      <Calendar
        markedDates={markedDates}
        onDayPress={(day) => {
          onDiaPressionado(day.dateString);
        }}
        onMonthChange={(month) => {
          onMesMudou(new Date(month.timestamp));
        }}

        theme={{
          todayTextColor: '#007bff',
          arrowColor: '#007bff',
          selectedDayBackgroundColor: '#007bff',
        }}
      />
    </View>
  );
}

export default Calendario;