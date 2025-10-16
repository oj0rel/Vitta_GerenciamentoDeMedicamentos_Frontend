import { StyleSheet, View } from "react-native";
import Hub from "../pages/hub";

export default function Index() {
    return (
        <View style={styles.container}>
            <Hub />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        
    }
})