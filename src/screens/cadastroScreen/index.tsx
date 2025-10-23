import { ActionButton } from "@/src/components/actionButton/actionButton";
import { FormInput } from "@/src/components/formInput";
import LogoComponent from "@/src/components/logoComponent";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { styles } from "./styles";

export default function CadastroScreen() {

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  const handleCadastro = () => {
    console.log("Nome: ", nome)
    console.log("Telefone: ", telefone)
    console.log("Email: ", email)
    console.log("Senha: ", senha)
  }

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
          // onPress={ () => router.push('/') } //colocar a rota para a outra tela
          onPress={ () => router.push('/(tabs)/home') }
      />
    </ScrollView>
  );
}
