import { listarMedicamentosResumo } from "@/src/api/medicamentoApi";
import {
  tratamentoAtualizar,
  tratamentoCadastro,
} from "@/src/api/tratamentoApi";
import { useSession } from "@/src/contexts/authContext";
import { TipoDeAlerta } from "@/src/enums/agendamento/tipoDeAlerta";
import { TipoDeFrequencia } from "@/src/enums/tratamento/tipoDeFrequencia";
import { MedicamentoResumoResponse } from "@/src/types/medicamentoTypes";
import {
  TratamentoCadastroData,
  TratamentoResponse,
} from "@/src/types/tratamentoTypes";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ActionButton } from "../actionButton/actionButton";
import { FormDatePicker } from "../formDatePicker";
import { FormInput } from "../formInput";
import { styles } from "./styles";

const frequenciaEnumKeys = Object.keys(TipoDeFrequencia).filter((key) =>
  isNaN(Number(key))
);
const alertaEnumKeys = Object.keys(TipoDeAlerta).filter((key) =>
  isNaN(Number(key))
);

type FormularioProps = {
  onClose: () => void;
  onSaveSuccess: () => void;
  tratamentoParaEditar?: TratamentoResponse | null;
};

const isValidTimeFormat = (time: string): boolean => {
  const regexHHmm = /^([01]\d|2[0-3]):[0-5]\d$/;

  return regexHHmm.test(time);
};

export default function FormularioTratamento({
  onClose,
  onSaveSuccess,
  tratamentoParaEditar,
}: FormularioProps) {
  const { session } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  const valorEnumDaApi = tratamentoParaEditar?.tipoDeFrequencia.toString();

  const valorInicialPicker = (
    valorEnumDaApi
      ? TipoDeFrequencia[valorEnumDaApi as keyof typeof TipoDeFrequencia]
      : null
  ) as TipoDeFrequencia | null;

  const [medicamentoSelecionado, setMedicamentoSelecionado] =
    useState<MedicamentoResumoResponse | null>(
      tratamentoParaEditar?.medicamento || null
    );

  const [nome, setNome] = useState(tratamentoParaEditar?.nome || "");

  const [dosagem, setDosagem] = useState(
    tratamentoParaEditar?.dosagem.toString() || ""
  );

  const [instrucoes, setInstrucoes] = useState(
    tratamentoParaEditar?.instrucoes || ""
  );

  const [dataDeInicio, setDataDeInicio] = useState<Date | null>(
    tratamentoParaEditar?.dataDeInicio
      ? new Date(tratamentoParaEditar.dataDeInicio)
      : null
  );
  const [dataDeTermino, setDataDeTermino] = useState<Date | null>(
    tratamentoParaEditar?.dataDeTermino
      ? new Date(tratamentoParaEditar.dataDeTermino)
      : null
  );

  const [tipoDeFrequencia, setTipoDeFrequencia] =
    useState<TipoDeFrequencia | null>(
      tratamentoParaEditar?.tipoDeFrequencia || null
    );

  const [intervaloEmHoras, setIntervaloEmHoras] = useState(
    tratamentoParaEditar?.intervaloEmHoras.toString() || ""
  );

  const [horariosEspecificos, setHorariosEspecificos] = useState(
    tratamentoParaEditar?.horariosEspecificos || ""
  );

  const [tipoDeAlerta, setTipoDeAlerta] = useState<TipoDeAlerta | null>(
    tratamentoParaEditar?.tipoDeAlerta || null
  );

  const [listaDeMedicamentos, setListaDeMedicamentos] = useState<
    MedicamentoResumoResponse[]
  >([]);
  const [isLoadingMedicamentos, setIsLoadingMedicamentos] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateForm = () => {
    if (!medicamentoSelecionado) {
      return "É obrigatório selecionar um medicamento.";
    }

    if (!nome.trim()) {
      return "O campo Nome do Tratamento é obrigatório.";
    }

    const dosagemNum = parseFloat(dosagem);
    if (!dosagem.trim() || isNaN(dosagemNum) || dosagemNum <= 0) {
      return "O campo Dosagem é obrigatório e deve ser um número maior que zero.";
    }

    if (!dataDeInicio) {
      return "A Data de Início é obrigatória.";
    }

    if (!dataDeTermino) {
      return "A Data de Término é obrigatória.";
    }

    if (dataDeTermino && dataDeInicio && dataDeTermino < dataDeInicio) {
      return "A Data de Término não pode ser anterior à Data de Início.";
    }

    if (!tipoDeFrequencia) {
      return "O Tipo de Frequência é obrigatório.";
    }

    if (tipoDeFrequencia === TipoDeFrequencia.INTERVALO_HORAS) {
      const intervaloNum = parseInt(intervaloEmHoras);
      if (
        !intervaloEmHoras.trim() ||
        isNaN(intervaloNum) ||
        intervaloNum <= 0
      ) {
        return "O Intervalo em Horas é obrigatório para esta frequência.";
      }
    }

    if (tipoDeFrequencia === TipoDeFrequencia.HORARIOS_ESPECIFICOS) {
      const horarios = horariosEspecificos.trim();

      if (!horarios) {
        return "Os Horários Específicos são obrigatórios para esta frequência.";
      }

      const listaDeHorarios = horarios.split(",");

      for (const horario of listaDeHorarios) {
        const horarioLimpo = horario.trim();

        if (!horarioLimpo) {
          return "Formato inválido. Verifique se não há vírgulas extras (ex: 08:00,,14:00).";
        }

        if (!isValidTimeFormat(horarioLimpo)) {
          return `O horário '${horarioLimpo}' é inválido. Use o formato HH:mm.`;
        }
      }
    }

    if (!tipoDeAlerta) {
      return "O Tipo de Alerta é obrigatório.";
    }

    return null;
  };

  const handleSalvar = async () => {
    setErrorMessage(null);

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    if (!session) {
      setErrorMessage("Usuário não autenticado. Faça login novamente.");
      return;
    }

    if (
      !medicamentoSelecionado ||
      !dataDeInicio ||
      !dataDeTermino ||
      !tipoDeFrequencia ||
      !tipoDeAlerta
    ) {
      setErrorMessage("Erro interno: Campos obrigatórios não preenchidos.");
      return;
    }

    setIsLoading(true);

    const dadosDoTratamento: TratamentoCadastroData = {
      nome: nome.trim(),
      dosagem: parseFloat(dosagem),
      instrucoes: instrucoes.trim(),
      dataDeInicio: dataDeInicio,
      dataDeTermino: dataDeTermino,
      tipoDeFrequencia: tipoDeFrequencia,

      intervaloEmHoras:
        tipoDeFrequencia === TipoDeFrequencia.INTERVALO_HORAS
          ? parseInt(intervaloEmHoras)
          : 0,

      horariosEspecificos:
        tipoDeFrequencia === TipoDeFrequencia.HORARIOS_ESPECIFICOS
          ? horariosEspecificos.trim()
          : "",

      tipoDeAlerta: tipoDeAlerta,
      medicamentoId: medicamentoSelecionado.id,
    };

    try {
      if (tratamentoParaEditar) {
        const resposta = await tratamentoAtualizar(
          session,
          tratamentoParaEditar.id,
          dadosDoTratamento
        );
        console.log("Tratamento atualizado com sucesso!", resposta);
      } else {
        const resposta = await tratamentoCadastro(session, dadosDoTratamento);
        console.log("Tratamento cadastrado com sucesso!", resposta);
      }

      console.log("Formulário salvo com sucesso!");
      onSaveSuccess();
      onClose();
    } catch (error) {
      console.error("Erro na chamada de salvar tratamento: ", error);

      const verbo = tratamentoParaEditar ? "atualizar" : "cadastrar";
      setErrorMessage(`Falha ao ${verbo} o tratamento. Tente novamente.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMedicamentoSelecionadoChange = (
    medicamento: MedicamentoResumoResponse | null
  ) => {
    setMedicamentoSelecionado(medicamento);
    if (errorMessage) setErrorMessage(null);
  };

  const handleNomeChange = (text: string) => {
    setNome(text);
    if (errorMessage) setErrorMessage(null);
  };

  const handleDosagemChange = (text: string) => {
    setDosagem(text);
    if (errorMessage) setErrorMessage(null);
  };

  const handleInstrucoesChange = (text: string) => {
    setInstrucoes(text);
    if (errorMessage) setErrorMessage(null);
  };

  const handleDataDeInicioChange = (date: Date | null) => {
    setDataDeInicio(date);
    if (errorMessage) setErrorMessage(null);
  };

  const handleDataDeTerminoChange = (date: Date | null) => {
    setDataDeTermino(date);
    if (errorMessage) setErrorMessage(null);
  };

  const handleTipoDeFrequenciaChange = (itemValue: TipoDeFrequencia | null) => {
    setTipoDeFrequencia(itemValue);
    if (errorMessage) setErrorMessage(null);
  };

  const handleIntervaloEmHorasChange = (text: string) => {
    setIntervaloEmHoras(text);
    if (errorMessage) setErrorMessage(null);
  };

  const handleHorariosEspecificosChange = (text: string) => {
    setHorariosEspecificos(text);
    if (errorMessage) setErrorMessage(null);
  };

  const handleTipoDeAlertaChange = (itemValue: TipoDeAlerta | null) => {
    setTipoDeAlerta(itemValue);
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  useEffect(() => {
    const fetchMedicamentos = async () => {
      if (!session) return;

      setIsLoadingMedicamentos(true);
      try {
        const resposta = await listarMedicamentosResumo(session);
        setListaDeMedicamentos(resposta);
      } catch (error) {
        console.error("Erro ao buscar medicamentos:", error);
        setErrorMessage("Falha ao carregar a lista de medicamentos. Tente fechar e abrir novamente.");
      } finally {
        setIsLoadingMedicamentos(false);
      }
    };

    fetchMedicamentos();
  }, [session]);

  return (
    <View style={styles.modalContent}>
    <View style={styles.formBody}>
      <View style={styles.formRequestBody}>
        
        {errorMessage && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}

        <FormInput
          titulo="Nome do Tratamento"
          value={nome}
          onChangeText={handleNomeChange}
          placeHolder="Ex: Antibiótico 7 dias"
          autoCapitalize="sentences"
        />

        <Text style={styles.tittle}>Medicamento</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={medicamentoSelecionado?.id}
            
            onValueChange={(itemId: number | null) => {
              if (itemId === null) {
                handleMedicamentoSelecionadoChange(null);
              } else {
                const medSelecionado = listaDeMedicamentos.find(
                  (m) => m.id === itemId
                );
                handleMedicamentoSelecionadoChange(medSelecionado || null);
              }
            }}
            style={styles.picker}
            enabled={!isLoadingMedicamentos} 
          >
            <Picker.Item label="Selecione um medicamento..." value={null} />
            
            {listaDeMedicamentos.map((med) => (
              <Picker.Item
                key={med.id}
                label={med.nome}
                value={med.id}
              />
            ))}
          </Picker>
        </View>

        <FormInput
          titulo="Dosagem"
          value={dosagem}
          onChangeText={handleDosagemChange}
          placeHolder="Ex: 500"
          keyboardType="numeric" 
        />

        <FormInput
          titulo="Instruções"
          value={instrucoes}
          onChangeText={handleInstrucoesChange}
          placeHolder="Ex: Tomar com água, após refeição"
          autoCapitalize="sentences"
        />

        <Text style={styles.tittle}>Data de Início</Text>
        <FormDatePicker
          value={dataDeInicio}
          onChange={handleDataDeInicioChange}
        />
        
        <Text style={styles.tittle}>Data de Término</Text>
        <FormDatePicker
          value={dataDeTermino}
          onChange={handleDataDeTerminoChange}
        />

        <Text style={styles.tittle}>Tipo de Frequência</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={tipoDeFrequencia}
            onValueChange={handleTipoDeFrequenciaChange}
            style={styles.picker}
          >
            <Picker.Item label="Selecione a frequência..." value={null} />
            {frequenciaEnumKeys.map((key) => (
              <Picker.Item
                key={key}
                label={key}
                value={
                  TipoDeFrequencia[key as keyof typeof TipoDeFrequencia]
                }
              />
            ))}
          </Picker>
        </View>

        {tipoDeFrequencia === TipoDeFrequencia.INTERVALO_HORAS && (
          <FormInput
            titulo="Intervalo (em horas)"
            value={intervaloEmHoras}
            onChangeText={handleIntervaloEmHorasChange}
            placeHolder="Ex: 8 (para de 8 em 8 horas)"
            keyboardType="numeric"
          />
        )}

        {tipoDeFrequencia === TipoDeFrequencia.HORARIOS_ESPECIFICOS && (
          <FormInput
            titulo="Horários Específicos"
            value={horariosEspecificos}
            onChangeText={handleHorariosEspecificosChange}
            placeHolder="Ex: 08:00, 14:00, 22:00"
            autoCapitalize="none"
          />
        )}

        <Text style={styles.tittle}>Tipo de Alerta</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={tipoDeAlerta}
            onValueChange={handleTipoDeAlertaChange}
            style={styles.picker}
          >
            <Picker.Item label="Selecione o tipo de alerta..." value={null} />
            {alertaEnumKeys.map((key) => (
              <Picker.Item
                key={key}
                label={key}
                value={TipoDeAlerta[key as keyof typeof TipoDeAlerta]}
              />
            ))}
          </Picker>
        </View>

      </View>
    </View>

    <ActionButton
      titulo={tratamentoParaEditar ? "ATUALIZAR" : "CADASTRAR"}
      onPress={handleSalvar}
      disabled={isLoading || isLoadingMedicamentos} 
    />

    <ActionButton
      titulo="CANCELAR"
      onPress={onClose}
      disabled={isLoading}
    />
  </View>
  );
}
