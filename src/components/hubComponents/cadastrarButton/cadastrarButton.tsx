import { router } from "expo-router";
import { Pressable, Text } from "react-native";
import { styles } from "./syles";

export const CadastrarButton = ( { } ) => {
    
    function cadastrar() {
        router.push('/cadastro')
    }

    return (
        <Pressable
        style={styles.pressable}
        onPress={ cadastrar }
        >
            <Text style={styles.text}>CADASTRAR</Text>
        </Pressable>
    )
}