import React, { useState } from 'react';
import { Button, Modal, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { styles } from './styles';

LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan.','Fev.','Mar.','Abr.','Mai.','Jun.','Jul.','Ago.','Set.','Out.','Nov.','Dez.'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['DOM','SEG','TER','QUA','QUI','SEX','SÁB'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

type FormDatePickerProps = {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
};

export function FormDatePicker({
  value,
  onChange,
  placeholder = "Selecione uma data..."
}: FormDatePickerProps) {
  
  const [showModal, setShowModal] = useState(false);

  const selectedDateString = value ? value.toISOString().split('T')[0] : '';

  const onDayPress = (day: { dateString: string }) => {
    const selectedDate = new Date(day.dateString + 'T00:00:00');
    onChange(selectedDate);
    setShowModal(false);
  };

  const displayText = value 
    ? value.toLocaleDateString('pt-BR') 
    : placeholder;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.pickerContainer}
        onPress={() => setShowModal(true)}
      >
        <Text style={[styles.picker, styles.pickerText]}>
          {displayText}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalBackdrop} 
          activeOpacity={1} 
          onPressOut={() => setShowModal(false)}
        >
          <View style={styles.modalView}>
            <Calendar
              current={selectedDateString || undefined}
              onDayPress={onDayPress}
              markedDates={{
                [selectedDateString]: { 
                  selected: true, 
                  disableTouchEvent: true, 
                  selectedColor: '#1CBDCF'
                }
              }}
              theme={{
                todayTextColor: '#1CBDCF',
                arrowColor: '#1CBDCF',
              }}
            />
            <Button title="Cancelar" onPress={() => setShowModal(false)} color="#D8000C" />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
