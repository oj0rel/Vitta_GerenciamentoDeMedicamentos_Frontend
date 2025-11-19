import { concluirAgendamento, formatarData, listarAgendamentos } from "@/src/api/agendamentoApi";
import { ActionButton } from "@/src/components/actionButton/actionButton";
import Calendario from "@/src/components/agendaCalendar";
import { AuthContext, useSession } from "@/src/contexts/authContext";
import { AgendamentoStatus } from "@/src/enums/agendamento/agendamentoStatus";
import { AgendamentoResponse } from "@/src/types/agendamentoTypes";
import { endOfMonth, format, isWithinInterval, startOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useFocusEffect } from "expo-router";
import { useCallback, useContext, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { styles } from "./styles";

export default function HomeScreen() {
  const { signOut, session } = useSession();
  const [agendamentos, setAgendamentos] = useState<AgendamentoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [agendamentosDoMes, setAgendamentosDoMes] = useState<
    AgendamentoResponse[]
  >([]);
  const [diaSelecionado, setDiaSelecionado] = useState<string | null>(null);
  const [mesVisivel, setMesVisivel] = useState(new Date());

  const insets = useSafeAreaInsets();

  const { usuario } = useContext(AuthContext);

  const carregarAgendamentosDoMes = useCallback(async () => {
    if (session) {
      try {
        setError(null);

        const inicioDoMes = startOfMonth(mesVisivel);
        const fimDoMes = endOfMonth(mesVisivel);

        const dataInicio = formatarData(inicioDoMes);
        const dataFim = formatarData(fimDoMes);

        const data = await listarAgendamentos(session, dataInicio, dataFim);

        setAgendamentosDoMes(data);
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
  }, [session, mesVisivel]);

  useFocusEffect(
    useCallback(() => {
      carregarAgendamentosDoMes();
    }, [carregarAgendamentosDoMes])
  );

  const agendamentosParaExibir = useMemo(() => {
    const pendentes = agendamentosDoMes.filter((ag) => ag.status === AgendamentoStatus.PENDENTE);
    
    if (diaSelecionado) {
      return pendentes.filter((ag) => format(new Date(ag.horarioDoAgendamento), "yyyy-MM-dd") === diaSelecionado);
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataFim = new Date();
    dataFim.setDate(hoje.getDate() + 4);
    dataFim.setHours(23, 59, 59, 999);

    return pendentes.filter((ag) => isWithinInterval(new Date(ag.horarioDoAgendamento), { start: hoje, end: dataFim }));
  }, [diaSelecionado, agendamentosDoMes]);

  const handleDiaPressionado = useCallback(
    (dia: string) => {
      if (dia === diaSelecionado) {
        setDiaSelecionado(null);
      } else {
        setDiaSelecionado(dia);
      }
    },
    [diaSelecionado]
  );

  const handleMesMudou = useCallback((novoMes: Date) => {
    setMesVisivel(novoMes);
    setDiaSelecionado(null);
  }, []);

  const handleConcluir = async (agendamentoItem: AgendamentoResponse) => {
    if (!session) return;
    try {
      setAgendamentosDoMes((prev) => prev.map((ag) => 
         ag.id === agendamentoItem.id ? { ...ag, status: AgendamentoStatus.TOMADO } : ag
      ));

      const dadosConclusao = {
        horaDoUso: new Date().toISOString(),
        doseTomada: Number(agendamentoItem.tratamento.dosagem) || 1,
        observacao: "Concluído via App",
      };
      
      await concluirAgendamento(session, agendamentoItem.id, dadosConclusao);
      Alert.alert("Sucesso", "Medicamento tomado!");
    } catch (error: any) {
      Alert.alert("Erro", error.response?.data?.message || "Falha ao registrar.");
      carregarAgendamentosDoMes();
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: "red" }}>{error}</Text>
        <View style={[styles.button, { marginTop: 20 }]}>
            <ActionButton
              titulo="SAIR (LOGOUT)"
              onPress={() => {
                signOut();
              }}
            />
          </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        style={{ flex: 1 }}
        data={agendamentosParaExibir}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <>
            <Calendario
              agendamentos={agendamentosDoMes}
              diaSelecionado={diaSelecionado}
              onDiaPressionado={handleDiaPressionado}
              onMesMudou={handleMesMudou}
            />

            <Text style={styles.headerTextFlatList}>
              {diaSelecionado
                ? `AGENDAMENTOS PARA ${format(
                    new Date(diaSelecionado + "T00:00:00"),
                    "dd/MM/yyyy",
                    { locale: ptBR }
                  )}`
                : "SEUS PRÓXIMOS AGENDAMENTOS"}
            </Text>
          </>
        }
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

                <Pressable
                  style={styles.concluirPressable}
                  onPress={() => handleConcluir(item)}
                >
                  <Text style={styles.textPressableContent}>CONCLUIR</Text>
                </Pressable>
              </View>

              <View>
                <Text
                  style={[
                    styles.textContent,
                    { fontWeight: "bold", fontSize: 18 },
                  ]}
                >
                  {format(item.horarioDoAgendamento, "HH:mm", {
                    locale: ptBR,
                  })}
                </Text>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View style={[styles.button, { marginTop: 20 }]}>
            <ActionButton
              titulo="SAIR (LOGOUT)"
              onPress={() => {
                signOut();
              }}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
}
