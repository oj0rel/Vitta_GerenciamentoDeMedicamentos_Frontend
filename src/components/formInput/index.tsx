import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";

type FormInputProps = {
    titulo: string;
    value: string;
    onChangeText?: ((text: string) => void) | undefined
    placeHolder: string;
};

export const FormInput = ({ titulo, value, onChangeText, placeHolder }: FormInputProps) => {
  return (
    <View style={styles.formRequestBody}>
        <Text style={styles.tittle}>{titulo}</Text>
        <TextInput
          style={styles.inputBox}
          value={ value }
          onChangeText={ onChangeText }
          placeholder={ placeHolder }
        />
    </View>
  );
};
