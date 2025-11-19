import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type FormDatePickerProps = {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
};

export function FormDatePicker({
  value,
  onChange,
  placeholder = "Selecione uma data...",
}: FormDatePickerProps) {
  const [show, setShow] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false);
    
    if (event.type === 'set' && selectedDate) {
      const dataSegura = new Date(selectedDate);
      dataSegura.setHours(12, 0, 0, 0);
      onChange(dataSegura);
    }
  };

  const displayText = value 
    ? value.toLocaleDateString("pt-BR") 
    : placeholder;

  return (
    <View>
      <TouchableOpacity 
        style={styles.pickerContainer} 
        onPress={() => setShow(true)}
      >
        <Text style={[styles.picker, styles.pickerText]}>
          {displayText}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
}
