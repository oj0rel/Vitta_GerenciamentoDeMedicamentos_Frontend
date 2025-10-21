import { CadastrarButton } from "@/src/components/hubComponents/cadastrarButton/cadastrarButton";
import { LoginButton } from "@/src/components/hubComponents/loginButton/loginButton";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";

export default function HubScreen() {
    return (
        <View style={styles.container}>
            <Image source={require(`../../assets/images/logo_vitta.png`)} />

            <Text style={styles.textTittle}>Vitta</Text>
            <Text style={styles.textSubtittle}>SUA SAÚDE EM DIA</Text>

            <View style={styles.pressablesContainer}>
                <CadastrarButton />
                <LoginButton />
            </View>
        </View>
    )
}
