import { CadastrarButton } from "@/src/components/hubComponents/cadastrarButton/cadastrarButton";
import LogoComponent from "@/src/components/logoComponent";
import { router } from "expo-router";
import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";

export default function CadastroScreen() {
  return (
    <View style={styles.container}>
      <LogoComponent />

      <View style={styles.formBox}>
        <View style={styles.formBody}>

            <View style={styles.formRequestBody}>
                <Text style={styles.tittle}>Nome</Text>
                <TextInput style={styles.inputBox} />
            </View>

            <View style={styles.formRequestBody}>
                <Text style={styles.tittle}>Telefone</Text>
                <TextInput style={styles.inputBox} />
            </View>

            <View style={styles.formRequestBody}>
                <Text style={styles.tittle}>Email</Text>
                <TextInput style={styles.inputBox} />
            </View>


        </View>
      </View>

        <CadastrarButton
            titulo="CADASTRAR"
            onPress={ () => router.push('/') } //colocar a rota para a outra tela
        />
    </View>
  );
}
