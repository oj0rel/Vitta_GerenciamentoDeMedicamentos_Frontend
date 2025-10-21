import { Pressable, Text } from "react-native"
import { styles } from "./styles"

export const LoginButton = ( { } ) => {
    return (
        <Pressable style={styles.pressable}>
            <Text style={styles.text}>LOGIN</Text>
        </Pressable>
    )
}