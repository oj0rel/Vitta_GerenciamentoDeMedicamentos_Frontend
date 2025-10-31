import { ActionButton } from "@/src/components/actionButton/actionButton";
import { FormInput } from "@/src/components/formInput";
import LogoComponent from "@/src/components/logoComponent";
import { useSession } from "@/src/contexts/authContext";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import Wave from "react-native-waves";
import { styles } from "./styles";

export default function LoginScreen() {
  const { signIn } = useSession();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      await signIn({
        email: email,
        senha: senha,
      });

      router.replace('/home');
    } catch (error) {
      console.error(error);
      Alert.alert("Erro no login", "Usuário ou senha inválidos. Tente novamente.");
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, marginTop: 30, }}
      contentContainerStyle={styles.container}
    >

      <View style={styles.screenContent}>
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
                secureTextEntry
              />

          </View>
        </View>

        <ActionButton 
          titulo="LOGIN"
          onPress={ handleLogin }
        />
      </View>

      <Wave
        placement="bottom"
        gap={80}
        speed={4}
        maxPoints={5}
        delta={36}
        color="#1CBDCF" />
    </ScrollView>
  );
}
