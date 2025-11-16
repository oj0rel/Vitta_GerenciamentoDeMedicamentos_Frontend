import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import { styles } from "./styles";

LocaleConfig.locales["pt-br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan.",
    "Fev.",
    "Mar.",
    "Abr.",
    "Mai.",
    "Jun.",
    "Jul.",
    "Ago.",
    "Set.",
    "Out.",
    "Nov.",
    "Dez.",
  ],
  dayNames: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ],
  dayNamesShort: ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"],
  today: "Hoje",
};
LocaleConfig.defaultLocale = "pt-br";

type FormDatePickerProps = {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
};

export function FormDatePicker({
  value,
  onChange,
  placeholder = "Selecione uma data...",
}: FormDatePickerProps) {
  const [showCalendar, setShowCalendar] = useState(false);

  const selectedDateString = value ? value.toISOString().split("T")[0] : "";

  const onDayPress = (day: { dateString: string }) => {
    const selectedDate = new Date(day.dateString + "T00:00:00");
    onChange(selectedDate);
    setShowCalendar(false);
  };

  const displayText = value ? value.toLocaleDateString("pt-BR") : placeholder;

  const markedDatesConfig: MarkedDates = {};

  if (selectedDateString) {
    markedDatesConfig[selectedDateString] = {
      selected: true,
      disableTouchEvent: true,
      selectedColor: '#1CBDCF',
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.pickerContainer}
        onPress={() => setShowCalendar(!showCalendar)}
      >
        <Text style={[styles.picker, styles.pickerText]}>{displayText}</Text>
      </TouchableOpacity>

      {showCalendar && (
        <View style={styles.calendarContainer}>
          <Calendar
            current={selectedDateString || undefined}
            onDayPress={onDayPress}
            markedDates={markedDatesConfig}
            theme={{
              todayTextColor: "#1CBDCF",
              arrowColor: "#1CBDCF",
            }}
          />
        </View>
      )}
    </View>
  );
}
