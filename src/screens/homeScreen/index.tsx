import { listarAgendamentos } from "@/src/api/agendamentoApi";
import { ActionButton } from "@/src/components/actionButton/actionButton";
import { AuthContext, useSession } from "@/src/contexts/authContext";
import { AgendamentoResponse } from "@/src/types/agendamentoTypes";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useContext, useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";

export default function HomeScreen() {
  
  const { signOut, session } = useSession();
  const [agendamentos, setAgendamentos] = useState<AgendamentoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { usuario } = useContext(AuthContext);
  const usuarioId = usuario?.id;

  useEffect(() => {
    const carregarAgendamentos = async () => {
      
      if (session) {
        try {
          setError(null);

          const data = await listarAgendamentos(session);
          
          setAgendamentos(data);
        } catch (error) {
          setError("Falha ao carregar agendamentos.");
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else if (!session) {
        setLoading(false);
        setError("Usuário não autenticado.");
      }
    };

    carregarAgendamentos();
    
  }, [session]);


  return (
    <ScrollView
      style={{ flex: 1, padding: 20 }}
      >

      <View>

        <Text
          style={styles.headerTextFlatList}>
          SEUS AGENDAMENTOS
        </Text>
        
        <FlatList
        data={agendamentos}
        keyExtractor={ (item) => item.id.toString() }
        renderItem={({ item }) => (

          <View style={styles.cardsContainer}>
            <View style={styles.cardContent}>

              <View>
                <Text style={[styles.textContent, { fontSize: 16 }]}>
                  {item.tratamento.nome}
                </Text>

                <Text style={[styles.textContent, { fontSize: 13 }]}>
                  Medicamento: {item.tratamento.medicamento.nome}
                </Text>

                <Pressable style={styles.concluirPressable}>
                  <Text style={styles.textPressableContent}>
                    CONCLUIR
                  </Text>
                </Pressable>
              </View>

              <View>
                <Text style={[styles.textContent, {fontWeight: 'bold', fontSize: 18}]}>
                  {format(item.horarioDoAgendamento, 'HH:mm', {
                    locale: ptBR
                  })}
                </Text>
              </View>

            </View>

          </View>
        )}
      />
      
      <View style={styles.button}>
        <ActionButton
          titulo="SAIR (LOGOUT)"
          onPress={() => {
            signOut();
          }}
        />
      </View>

      </View>
      

    </ScrollView>
  );
}