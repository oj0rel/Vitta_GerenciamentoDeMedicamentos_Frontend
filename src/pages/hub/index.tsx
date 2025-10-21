import { CadastrarButton } from "@/src/components/hub/cadastrar/cadastrarButton";
import { LoginButton } from "@/src/components/hub/login/loginButton";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";

export default function Hub() {
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
