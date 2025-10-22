import { Pressable, Text } from "react-native";
import { styles } from "./syles";

type ActionButtonProps = {
    titulo: string;
    onPress: () => void;
}

export const ActionButton = ( { onPress, titulo }: ActionButtonProps ) => {

    return (
        <Pressable
        style={styles.pressable}
        onPress={ onPress }
        >
            <Text style={styles.text}>{titulo}</Text>
        </Pressable>
    )
}