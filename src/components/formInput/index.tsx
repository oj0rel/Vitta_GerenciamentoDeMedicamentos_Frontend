import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";
import { styles } from "./styles";

type FormInputProps = {
    titulo: string;
    value: string;
    onChangeText?: ((text: string) => void) | undefined
    placeHolder: string;
    secureTextEntry?: true;
    keyboardType?: KeyboardTypeOptions;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
};

export const FormInput = ({ titulo, value, onChangeText, placeHolder, secureTextEntry, keyboardType, autoCapitalize }: FormInputProps) => {
  return (
    <View style={styles.formRequestBody}>
        <Text style={styles.tittle}>{titulo}</Text>
        <TextInput
          style={styles.inputBox}
          value={ value }
          onChangeText={ onChangeText }
          placeholder={ placeHolder }
          secureTextEntry={ secureTextEntry }
          keyboardType={ keyboardType }
          autoCapitalize={ autoCapitalize }
        />
    </View>
  );
};
