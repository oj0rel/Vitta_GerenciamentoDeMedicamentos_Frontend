import { Pressable, Text } from "react-native";
import { styles } from "./syles";

export const CadastrarButton = ( {  } ) => {
    return (
        <Pressable style={styles.pressable}>
            <Text style={styles.text}>CADASTRAR</Text>
        </Pressable>
    )
}