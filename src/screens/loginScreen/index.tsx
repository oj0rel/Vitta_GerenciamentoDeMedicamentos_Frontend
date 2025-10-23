import { ActionButton } from "@/src/components/actionButton/actionButton";
import { FormInput } from "@/src/components/formInput";
import LogoComponent from "@/src/components/logoComponent";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { styles } from "../cadastroScreen/styles";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    console.log("Email: ", email);
    console.log("Senha: ", senha);
  };

  return (
    <ScrollView
      style={{ flex: 1, marginTop: 30, marginBottom: 40 }}
      contentContainerStyle={styles.container}
    >
      <LogoComponent />

      <View style={styles.formBox}>
        <View style={styles.formBody}>

          <FormInput
            titulo="Email"
            value={email}
            onChangeText={setEmail}
            placeHolder="Digite seu email: ..@gmail.com"
          />

          <FormInput
              titulo="Senha"
              value={senha}
              onChangeText={setSenha}
              placeHolder="Digite uma senha"
            />

        </View>
      </View>

      <ActionButton 
        titulo="LOGIN"
        onPress={ () => router.push('/(tabs)/home')}
      />
    </ScrollView>
  );
}
