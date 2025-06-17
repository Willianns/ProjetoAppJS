// Importações necessárias do React e React Native
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Modal,
  FlatList,
} from 'react-native';

// Hook para navegação entre telas
import { useNavigation } from '@react-navigation/native';

// Importa constantes e funções auxiliares
import { SERVICOS, HORARIOS_DISPONIVEIS } from "../utils/constants.js";
import { isValidDate, isValidTime, isFutureDateTime, isValidName } from "../utils/validation.js";
import { DatabaseService } from "../services/database.js";

// Componente principal da tela de agendamento
export default function AgendamentoScreen() {
  const navigation = useNavigation(); // Para navegação entre telas

  // Estado para armazenar dados do formulário
  const [formData, setFormData] = useState({
    nomeCliente: '',
    data: '',
    hora: '',
    servico: 'corte',
  });

  // Estado para loading e visibilidade dos modais
  const [loading, setLoading] = useState(false);
  const [showServicoModal, setShowServicoModal] = useState(false);
  const [showHorarioModal, setShowHorarioModal] = useState(false);

  // Função para atualizar os campos do formulário
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Validação do formulário
  const validateForm = () => {
    if (!isValidName(formData.nomeCliente)) {
      Alert.alert('Erro', 'Por favor, insira um nome válido (mínimo 2 caracteres).');
      return false;
    }

    if (!isValidDate(formData.data)) {
      Alert.alert('Erro', 'Por favor, insira uma data válida no formato dd/mm/yyyy.');
      return false;
    }

    if (!isValidTime(formData.hora)) {
      Alert.alert('Erro', 'Por favor, insira um horário válido no formato hh:mm.');
      return false;
    }

    if (!isFutureDateTime(formData.data, formData.hora)) {
      Alert.alert('Erro', 'Por favor, selecione uma data e horário futuros.');
      return false;
    }

    return true;
  };

  // Função chamada ao confirmar o agendamento
  const handleConfirmarAgendamento = async () => {
    if (!validateForm()) return; // Se não for válido, cancela

    setLoading(true); // Mostra carregamento

    try {
      // Verifica se o horário está disponível
      const disponivel = await DatabaseService.verificarDisponibilidade(formData.data, formData.hora);
      
      if (!disponivel) {
        Alert.alert('Horário Indisponível', 'Este horário já está ocupado. Por favor, escolha outro.');
        setLoading(false);
        return;
      }

      // Salva o agendamento no banco
      const agendamento = await DatabaseService.salvarAgendamento(formData);

      // Mostra alerta de sucesso e navega para tela de confirmação
      Alert.alert(
        'Sucesso!',
        'Agendamento realizado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Confirmacao', { agendamento }),
          },
        ]
      );
    } catch (error) {
      // Erro na tentativa de agendamento
      Alert.alert('Erro', 'Não foi possível realizar o agendamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Função para retornar o nome do serviço a partir do valor
  const getServicoLabel = (servico) => {
    return SERVICOS.find(s => s.value === servico)?.label || servico;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Agendar Horário</Text>

        {/* Campo Nome do Cliente */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome do Cliente</Text>
          <TextInput
            style={styles.input}
            value={formData.nomeCliente}
            onChangeText={(text) => handleInputChange('nomeCliente', text)}
            placeholder="Digite seu nome completo"
            placeholderTextColor="#666"
          />
        </View>

        {/* Campo Data */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Data (dd/mm/yyyy)</Text>
          <TextInput
            style={styles.input}
            value={formData.data}
            onChangeText={(text) => handleInputChange('data', text)}
            placeholder="Ex: 25/12/2024"
            placeholderTextColor="#666"
            maxLength={10}
          />
        </View>

        {/* Campo Horário */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Horário</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setShowHorarioModal(true)}
          >
            <Text style={[styles.selectButtonText, formData.hora && styles.selectedText]}>
              {formData.hora || 'Selecione um horário'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Campo Serviço */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Serviço</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setShowServicoModal(true)}
          >
            <Text style={[styles.selectButtonText, styles.selectedText]}>
              {getServicoLabel(formData.servico)}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Botão Confirmar Agendamento */}
        <TouchableOpacity
          style={[styles.confirmarButton, loading && styles.disabledButton]}
          onPress={handleConfirmarAgendamento}
          disabled={loading}
        >
          <Text style={styles.confirmarButtonText}>
            {loading ? 'Agendando...' : 'Confirmar Agendamento'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal para seleção de serviço */}
      <Modal
        visible={showServicoModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowServicoModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione o Serviço</Text>
            {SERVICOS.map((servico) => (
              <TouchableOpacity
                key={servico.value}
                style={styles.modalOption}
                onPress={() => {
                  handleInputChange('servico', servico.value);
                  setShowServicoModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>{servico.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setShowServicoModal(false)}
            >
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para seleção de horário */}
      <Modal
        visible={showHorarioModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowHorarioModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione o Horário</Text>
            <FlatList
              data={HORARIOS_DISPONIVEIS}
              keyExtractor={(item) => item}
              numColumns={3}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.horarioOption}
                  onPress={() => {
                    handleInputChange('hora', item);
                    setShowHorarioModal(false);
                  }}
                >
                  <Text style={styles.horarioOptionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setShowHorarioModal(false)}
            >
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Estilos da interface
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  selectButton: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  selectButtonText: {
    fontSize: 16,
    color: '#666',
  },
  selectedText: {
    color: '#ffffff',
  },
  confirmarButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#666',
  },
  confirmarButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  horarioOption: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    alignItems: 'center',
  },
  horarioOptionText: {
    fontSize: 14,
    color: '#ffffff',
  },
  modalCancelButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f44336',
    borderRadius: 8,
  },
  modalCancelText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
