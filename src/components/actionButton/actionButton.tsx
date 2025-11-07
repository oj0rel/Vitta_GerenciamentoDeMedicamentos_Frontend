import { ReactNode } from "react";
import { Pressable, Text } from "react-native";
import { styles } from "./syles";

type ActionButtonProps = {
    titulo: string;
    onPress: () => void;
    disabled?: boolean;
    icon?: ReactNode;
}

export const ActionButton = ( { onPress, titulo, disabled, icon }: ActionButtonProps ) => {

    return (
        <Pressable
        style={styles.pressable}
        onPress={ onPress }
        disabled={ disabled }
        >
            {icon}
            <Text style={[styles.text, icon ? {marginLeft: 8}: {} ]}>{titulo}</Text>
        </Pressable>
    )
}