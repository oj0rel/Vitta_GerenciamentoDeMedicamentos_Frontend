import { formatarData, listarAgendamentos } from "@/src/api/agendamentoApi";
import { ActionButton } from "@/src/components/actionButton/actionButton";
import Calendario from "@/src/components/agendaCalendar";
import { AuthContext, useSession } from "@/src/contexts/authContext";
import { AgendamentoResponse } from "@/src/types/agendamentoTypes";
import { endOfMonth, format, isWithinInterval, startOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (!loading) {
      return;
    }

    const carregarAgendamentosDoMes = async () => {
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
    };

    carregarAgendamentosDoMes();
  }, [session, mesVisivel, loading]);

  const agendamentosParaExibir = useMemo(() => {
    if (diaSelecionado) {
      return agendamentosDoMes.filter((ag) => {
        const diaDoAgendamento = format(
          new Date(ag.horarioDoAgendamento),
          "yyyy-MM-dd"
        );
        return diaDoAgendamento === diaSelecionado;
      });
    }

    const hoje = new Date();
    const dataFimFiltro = new Date();
    dataFimFiltro.setDate(hoje.getDate() + 4);

    return agendamentosDoMes.filter((ag) => {
      const dataDoAgendamento = new Date(ag.horarioDoAgendamento);
      return isWithinInterval(dataDoAgendamento, {
        start: hoje,
        end: dataFimFiltro,
      });
    });
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
    setLoading(true);
    setDiaSelecionado(null);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <FlatList
        style={{ flex: 1,  }}
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

                <Pressable style={styles.concluirPressable}>
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
