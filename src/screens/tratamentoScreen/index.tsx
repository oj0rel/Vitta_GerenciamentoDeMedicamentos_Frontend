import { listarTratamentos, tratamentoDeletar } from "@/src/api/tratamentoApi";
import { ActionButton } from "@/src/components/actionButton/actionButton";
import { AlertModal } from "@/src/components/alertModal";
import { DeletePressable } from "@/src/components/deletePressable";
import FormularioTratamento from "@/src/components/formTratamento";
import { useSession } from "@/src/contexts/authContext";
import { TratamentoResponse } from "@/src/types/tratamentoTypes";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { styles } from "./styles";

export default function TratamentoScreen() {
  const { session } = useSession();
  const [tratamentos, setTratamentos] = useState<TratamentoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalVisivel, setModalVisivel] = useState(false);

  const [alertVisivel, setAlertVisivel] = useState(false);
  const [itemParaDeletar, setItemParaDeletar] = useState<number | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);

  const [itemEmEdicao, setItemEmEdicao] = useState<TratamentoResponse | null>(
    null
  );

  const carregarTratamentosCadastrados = useCallback(async () => {
    if (!session) return;

    setLoading(true);
    setError(null);

    try {
      const data = await listarTratamentos(session);
      setTratamentos(data);
    } catch (error) {
      setError("Falha ao carregar tratamentos.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    carregarTratamentosCadastrados();
  }, [carregarTratamentosCadastrados]);

  const executarDelete = async (tratamentoId: number) => {
    if (!session) {
      setError("Sessão expirada. Faça login novamente.");
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await tratamentoDeletar(session, tratamentoId);

      setTratamentos((tratamentosAnteriores) =>
        tratamentosAnteriores.filter(
          (tratamentos) => tratamentos.id !== tratamentoId
        )
      );
    } catch (error) {
      console.error("Erro ao deletar tratamento: ", error);
      setError("Falha ao deletar o tratamento. Tente novamente.");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatarData = (dataString: string | Date): string => {
    if (!dataString) return "Data não definida";

    try {
      const data = new Date(dataString);
      return data.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "UTC",
      });
    } catch (error) {
      return "Data inválida";
    }
  };

  const handleDeletarTratamento = (tratamentoId: number) => {
    console.log("FUNÇÃO handleDeletarTratamento FOI CHAMADA");
    if (isDeleting) {
      console.log("Retornando porque isDeleting é true");
      return;
    }

    setItemParaDeletar(tratamentoId);
    setAlertVisivel(true);
  };

  const onConfirmarDelete = () => {
    // se não tiver um item selecionado, não faz nada
    if (itemParaDeletar === null) {
      setAlertVisivel(false);
      return;
    }

    // chama função de deletar que já funciona
    executarDelete(itemParaDeletar);

    // limpa o estado
    setAlertVisivel(false);
    setItemParaDeletar(null);
  };

  // função para o botão "Cancelar" do AlertModal
  const onCancelarDelete = () => {
    setAlertVisivel(false);
    setItemParaDeletar(null);
  };

  const abrirModalCadastro = () => {
    setItemEmEdicao(null);
    setModalVisivel(true);
  };

  const abrirModalEdicao = (medicamento: TratamentoResponse) => {
    setItemEmEdicao(medicamento);
    setModalVisivel(true);
  };

  const isTratamentoVencido = (dataTerminoString: string | Date): boolean => {
    if (!dataTerminoString) {
      return false;
    }

    try {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      const [ano, mes, dia] = String(dataTerminoString).split('T')[0].split('-').map(Number);
      const dataTermino = new Date(ano, mes - 1, dia);

      return dataTermino < hoje;
    } catch (error) {
      console.error("Erro ao processar data de término: ", error);
      return false;
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>TELA DE TRATAMENTOS</Text>

      <ActionButton
        style={{ width: 320 }}
        titulo="ADICIONAR TRATAMENTO"
        onPress={abrirModalCadastro}
        icon={
          <MaterialCommunityIcons name="plus-circle" size={36} color="white" />
        }
      />

      <Modal
        visible={modalVisivel}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalContainer}>
          {modalVisivel && (
            <FormularioTratamento
              onClose={() => setModalVisivel(false)}
              onSaveSuccess={carregarTratamentosCadastrados}
              tratamentoParaEditar={itemEmEdicao}
            />
          )}
        </View>
      </Modal>

      <Text style={styles.title}>SEUS TRATAMENTOS</Text>

      <FlatList
        style={styles.flatList}
        contentContainerStyle={{ alignItems: "center" }}
        data={tratamentos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (

          <View style={styles.cardsContainer}>
            <View style={styles.cardContent}>
              <View style={styles.cardTopRow}>
                <View>
                  <Ionicons name={"medical"} size={36} color="white" />
                </View>

                <View>
                  <Text style={[styles.textContent, { fontSize: 16 }]}>
                    {item.nome}
                  </Text>

                  <Text style={[styles.textContent, { fontSize: 16 }]}>
                    {item.medicamento.nome}
                  </Text>

                  <Text style={[styles.textContent, { fontSize: 16 }]}>
                    {item.instrucoes}
                  </Text>

                  {isTratamentoVencido(item.dataDeTermino) ? (
                    <View style={styles.dateContainer}>
                      <Text style={styles.concluidoText}>
                        <MaterialCommunityIcons name="check-circle" size={20} color="#fff" />
                        {" "}Concluído
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.dateContainer}>
                      <Text style={styles.dateText}>
                        {formatarData(item.dataDeInicio)}
                      </Text>

                      <Text style={styles.dateText}>
                        {formatarData(item.dataDeTermino)}
                      </Text>


                    </View>
                  )}
                </View>
              </View>

              <View style={styles.cardBottomRow}>
                <Pressable
                  style={styles.pressableButton}
                  onPress={() => {
                    console.log("DADO DA API:", item.tipoDeAlerta);
                    console.log("TIPO DO DADO:", typeof item.tipoDeAlerta);
                    abrirModalEdicao(item);
                  }}
                  disabled={isDeleting}
                >
                  <MaterialCommunityIcons
                    name="pencil"
                    size={24}
                    color="black"
                  />
                </Pressable>

                <DeletePressable
                  onPress={() => handleDeletarTratamento(item.id)}
                  disabled={isDeleting}
                />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.container}>
            <Text>Nenhum tratamento cadastrado.</Text>
          </View>
        }
      />

      <AlertModal
        visible={alertVisivel}
        title="CONFIRMAR EXCLUSÃO"
        message="Tem certeza que deseja excluir este tratamento ?"
        onClose={onCancelarDelete}
        onConfirm={onConfirmarDelete}
        confirmText="Excluir"
        isDestructive={true}
      />
    </View>
  );
}
