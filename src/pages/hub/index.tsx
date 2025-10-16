import { Image, StyleSheet, Text, View } from "react-native";

export default function Hub() {
    return (
        <View style={styles.container}>
            <Image source={require(`../../assets/images/logo_vitta.png`)} />

            <Text style={styles.textTittle}>Vitta</Text>
            <Text style={styles.textSubtittle}>SUA SAÚDE EM DIA</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textTittle: {
        fontFamily: 'inria-sans.bold',
        fontSize: 25, 
        marginTop: 18,
        marginBottom: 4, 
        color: '#000000ff'
    },
    textSubtittle: {
        fontFamily: 'inria-sans.bold',
        fontSize: 25, 
        marginBottom: 10, 
        color: '#1CBDCF'
    }
})