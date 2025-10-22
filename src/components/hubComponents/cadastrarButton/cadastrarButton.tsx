import { Pressable, Text } from "react-native";
import { styles } from "./syles";

type CadastrarButtonProps = {
    titulo: string;
    onPress: () => void;
}

export const CadastrarButton = ( { onPress, titulo }: CadastrarButtonProps ) => {

    return (
        <Pressable
        style={styles.pressable}
        onPress={ onPress }
        >
            <Text style={styles.text}>{titulo}</Text>
        </Pressable>
    )
}