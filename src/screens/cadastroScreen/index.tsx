import { ActionButton } from "@/src/components/actionButton/actionButton";
import { FormInput } from "@/src/components/formInput";
import LogoComponent from "@/src/components/logoComponent";
import { useSession } from "@/src/contexts/ctx";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { styles } from "./styles";

export default function CadastroScreen() {
  const { signUp, signIn } = useSession();

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  const handleCadastro = async () => {
    try {
      await signUp({
        nome: nome,
        telefone: telefone,
        email: email,
        senha: senha,
      });

      await signIn({
        email: email,
        senha: senha,
      });

      router.replace('/home');
    } catch (error) {
      console.error(error);
      Alert.alert("Erro no cadastro", "Usuário ou senha inválidos. Tente novamente.");
    }
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
              titulo="Nome"
              value={nome}
              onChangeText={setNome}
              placeHolder="Digite seu nome"
            />

            <FormInput
              titulo="Telefone"
              value={telefone}
              onChangeText={setTelefone}
              placeHolder="Digite seu número de telefone"
            />

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
          titulo="CADASTRAR"
          onPress={ handleCadastro }
      />
    </ScrollView>
  );
}
