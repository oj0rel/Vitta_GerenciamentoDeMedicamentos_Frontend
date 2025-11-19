import { listarMedicamentosResumo } from "@/src/api/medicamentoApi";
import { tratamentoAtualizar, tratamentoCadastro } from "@/src/api/tratamentoApi";
import { useSession } from "@/src/contexts/authContext";
import { TipoDeAlerta } from "@/src/enums/agendamento/tipoDeAlerta";
import { TipoDeFrequencia } from "@/src/enums/tratamento/tipoDeFrequencia";
import { MedicamentoResumoResponse } from "@/src/types/medicamentoTypes";
import { TratamentoCadastroData, TratamentoResponse } from "@/src/types/tratamentoTypes";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { ActionButton } from "../actionButton/actionButton";
import { FormDatePicker } from "../formDatePicker"; // Importando o componente do Passo 3
import { FormInput } from "../formInput";
import { styles } from "./styles";

const parseDateSafe = (data: string | Date | undefined | null) => {
  if (!data) return null;
  if (data instanceof Date) return data;
  try {
    const [ano, mes, dia] = data.toString().split("T")[0].split("-").map(Number);
    return new Date(ano, mes - 1, dia, 12, 0, 0);
  } catch { return null; }
};

const formatDataApi = (date: Date) => {
  const ano = date.getFullYear();
  const mes = (date.getMonth() + 1).toString().padStart(2, '0');
  const dia = date.getDate().toString().padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
};

type FormularioProps = {
  onClose: () => void;
  onSaveSuccess: () => void;
  tratamentoParaEditar?: TratamentoResponse | null;
};

export default function FormularioTratamento({
  onClose,
  onSaveSuccess,
  tratamentoParaEditar,
}: FormularioProps) {
  const { session } = useSession();
  
  const [etapa, setEtapa] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [listaMedicamentos, setListaMedicamentos] = useState<MedicamentoResumoResponse[]>([]);

  const [medIdSelecionado, setMedIdSelecionado] = useState<string>(
    tratamentoParaEditar?.medicamento?.id ? String(tratamentoParaEditar.medicamento.id) : ""
  );
  const [nome, setNome] = useState(tratamentoParaEditar?.nome ?? "");
  const [dosagem, setDosagem] = useState(
    tratamentoParaEditar?.dosagem ? String(tratamentoParaEditar.dosagem) : ""
  );
  const [instrucoes, setInstrucoes] = useState(tratamentoParaEditar?.instrucoes ?? "");
  const [dataInicio, setDataInicio] = useState<Date | null>(parseDateSafe(tratamentoParaEditar?.dataDeInicio));
  const [dataTermino, setDataTermino] = useState<Date | null>(parseDateSafe(tratamentoParaEditar?.dataDeTermino));
  const [freqTipo, setFreqTipo] = useState<string>(
    tratamentoParaEditar?.tipoDeFrequencia ? String(tratamentoParaEditar.tipoDeFrequencia) : ""
  );
  const [intervalo, setIntervalo] = useState(
    tratamentoParaEditar?.intervaloEmHoras ? String(tratamentoParaEditar.intervaloEmHoras) : ""
  );
  const [horarios, setHorarios] = useState(tratamentoParaEditar?.horariosEspecificos ?? "");
  const [alertaTipo, setAlertaTipo] = useState<string>(
    tratamentoParaEditar?.tipoDeAlerta ? String(tratamentoParaEditar.tipoDeAlerta) : ""
  );

  useEffect(() => {
    if (session) {
      listarMedicamentosResumo(session)
        .then(setListaMedicamentos)
        .catch(() => setErrorMessage("Erro ao carregar medicamentos."));
    }
  }, [session]);

  const validarEAvancar = () => {
    setErrorMessage(null);
    if (etapa === 1) {
      if (!medIdSelecionado) return setErrorMessage("Selecione um medicamento.");
      if (!nome.trim()) return setErrorMessage("Nome é obrigatório.");
      if (!dosagem.trim()) return setErrorMessage("Dosagem é obrigatória.");
      setEtapa(2);
    } else if (etapa === 2) {
      if (!dataInicio) return setErrorMessage("Data Início obrigatória.");
      if (!dataTermino) return setErrorMessage("Data Término obrigatória.");
      if (dataTermino < dataInicio) return setErrorMessage("Data término menor que início.");
      setEtapa(3);
    }
  };

  const handleSalvar = async () => {
    if (!freqTipo) return setErrorMessage("Selecione a frequência.");
    if (!alertaTipo) return setErrorMessage("Selecione o alerta.");

    const freqEnum = Number(freqTipo);
    if (freqEnum === TipoDeFrequencia.INTERVALO_HORAS && !intervalo) return setErrorMessage("Informe o intervalo.");
    if (freqEnum === TipoDeFrequencia.HORARIOS_ESPECIFICOS && !horarios) return setErrorMessage("Informe os horários.");

    setIsLoading(true);
    try {
      const payload: TratamentoCadastroData = {
        nome,
        dosagem: parseFloat(dosagem.replace(',', '.')),
        instrucoes,
        dataDeInicio: formatDataApi(dataInicio!),
        dataDeTermino: formatDataApi(dataTermino!),
        tipoDeFrequencia: freqEnum,
        intervaloEmHoras: freqEnum === TipoDeFrequencia.INTERVALO_HORAS ? parseInt(intervalo) : 0,
        horariosEspecificos: freqEnum === TipoDeFrequencia.HORARIOS_ESPECIFICOS ? horarios : "",
        tipoDeAlerta: Number(alertaTipo),
        medicamentoId: Number(medIdSelecionado)
      };

      if (tratamentoParaEditar) {
        await tratamentoAtualizar(session!, tratamentoParaEditar.id, payload);
      } else {
        await tratamentoCadastro(session!, payload);
      }
      onSaveSuccess();
      onClose();
    } catch (e) {
      console.error(e);
      setErrorMessage("Erro ao salvar.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.modalContent}>
      <View style={styles.formBody}>
        <ScrollView style={styles.formRequestBody} keyboardShouldPersistTaps="handled">
          {errorMessage && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}

          {etapa === 1 && (
            <>
              <FormInput titulo="Nome" value={nome} onChangeText={setNome} placeHolder="Ex: Tratamento Gripe" />
              <Text style={styles.tittle}>Medicamento</Text>
              <View style={styles.pickerContainer}>
                <Picker selectedValue={medIdSelecionado} onValueChange={setMedIdSelecionado} style={styles.picker}>
                  <Picker.Item label="Selecione..." value="" />
                  {listaMedicamentos.map((med) => (
                    <Picker.Item key={med.id} label={med.nome} value={String(med.id)} />
                  ))}
                </Picker>
              </View>
              <FormInput titulo="Dosagem" value={dosagem} onChangeText={setDosagem} placeHolder="Ex: 1" keyboardType="numeric" />
              <FormInput titulo="Instruções" value={instrucoes} onChangeText={setInstrucoes} placeHolder="Ex: Com água" />
            </>
          )}

          {etapa === 2 && (
            <>
              <Text style={styles.tittle}>Data Início</Text>
              <FormDatePicker value={dataInicio} onChange={setDataInicio} />
              <Text style={styles.tittle}>Data Término</Text>
              <FormDatePicker value={dataTermino} onChange={setDataTermino} />
            </>
          )}

          {etapa === 3 && (
            <>
              <Text style={styles.tittle}>Frequência</Text>
              <View style={styles.pickerContainer}>
                <Picker selectedValue={freqTipo} onValueChange={setFreqTipo} style={styles.picker}>
                  <Picker.Item label="Selecione..." value="" />
                  {Object.keys(TipoDeFrequencia).filter(k => isNaN(Number(k))).map(k => (
                      <Picker.Item key={k} label={k} value={String(TipoDeFrequencia[k as keyof typeof TipoDeFrequencia])} />
                  ))}
                </Picker>
              </View>
              {Number(freqTipo) === TipoDeFrequencia.INTERVALO_HORAS && (
                <FormInput titulo="Intervalo (Horas)" value={intervalo} onChangeText={setIntervalo} keyboardType="numeric" />
              )}
              {Number(freqTipo) === TipoDeFrequencia.HORARIOS_ESPECIFICOS && (
                <FormInput titulo="Horários" value={horarios} onChangeText={setHorarios} />
              )}
              <Text style={styles.tittle}>Alerta</Text>
              <View style={styles.pickerContainer}>
                 <Picker selectedValue={alertaTipo} onValueChange={setAlertaTipo} style={styles.picker}>
                  <Picker.Item label="Selecione..." value="" />
                  {Object.keys(TipoDeAlerta).filter(k => isNaN(Number(k))).map(k => (
                      <Picker.Item key={k} label={k} value={String(TipoDeAlerta[k as keyof typeof TipoDeAlerta])} />
                  ))}
                </Picker>
              </View>
            </>
          )}
        </ScrollView>
      </View>

      {etapa < 3 ? (
         <>
           <ActionButton titulo="PROSSEGUIR" onPress={validarEAvancar} />
           <ActionButton titulo={etapa === 1 ? "CANCELAR" : "VOLTAR"} onPress={() => etapa === 1 ? onClose() : setEtapa(etapa - 1)} />
         </>
      ) : (
        <>
          <ActionButton titulo="SALVAR" onPress={handleSalvar} disabled={isLoading} />
          <ActionButton titulo="VOLTAR" onPress={() => setEtapa(2)} disabled={isLoading} />
        </>
      )}
    </View>
  );
}