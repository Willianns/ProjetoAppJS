// Importa React e componentes nativos
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

// Hook de navegação
import { useNavigation } from '@react-navigation/native';

// Informações fixas da barbearia (nome, slogan, horários…)
import { BARBEARIA_INFO } from '../utils/constants.js';

// Componente principal da tela inicial
export default function HomeScreen() {
  const navigation = useNavigation();          // Permite navegar entre telas

  // Navega para a tela de agendamento
  const handleAgendar = () => {
    navigation.navigate('Agendamento');
  };

  // Navega para a lista de agendamentos do usuário
  const handleMeusAgendamentos = () => {
    navigation.navigate('MeusAgendamentos');
  };

  return (
    // SafeAreaView garante que o conteúdo não fique atrás do notch ou barra de status
    <SafeAreaView style={styles.container}>
      {/* ScrollView permite rolar caso haja muito conteúdo */}
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* ---------- Cabeçalho ---------- */}
        <View style={styles.header}>
          {/* Nome da barbearia */}
          <Text style={styles.title}>{BARBEARIA_INFO.nome}</Text>
          {/* Slogan */}
          <Text style={styles.slogan}>{BARBEARIA_INFO.slogan}</Text>
        </View>

        {/* ---------- Horários de funcionamento ---------- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Horários de Funcionamento</Text>

          {/* Lista de dias/horários */}
          <View style={styles.horariosContainer}>

            {/* Repetição manual para cada dia da semana */}
            <View style={styles.horarioItem}>
              <Text style={styles.diaText}>Segunda-feira</Text>
              <Text style={styles.horarioText}>
                {BARBEARIA_INFO.horarioFuncionamento.segunda}
              </Text>
            </View>

            <View style={styles.horarioItem}>
              <Text style={styles.diaText}>Terça-feira</Text>
              <Text style={styles.horarioText}>
                {BARBEARIA_INFO.horarioFuncionamento.terca}
              </Text>
            </View>

            <View style={styles.horarioItem}>
              <Text style={styles.diaText}>Quarta-feira</Text>
              <Text style={styles.horarioText}>
                {BARBEARIA_INFO.horarioFuncionamento.quarta}
              </Text>
            </View>

            <View style={styles.horarioItem}>
              <Text style={styles.diaText}>Quinta-feira</Text>
              <Text style={styles.horarioText}>
                {BARBEARIA_INFO.horarioFuncionamento.quinta}
              </Text>
            </View>

            <View style={styles.horarioItem}>
              <Text style={styles.diaText}>Sexta-feira</Text>
              <Text style={styles.horarioText}>
                {BARBEARIA_INFO.horarioFuncionamento.sexta}
              </Text>
            </View>

            <View style={styles.horarioItem}>
              <Text style={styles.diaText}>Sábado</Text>
              <Text style={styles.horarioText}>
                {BARBEARIA_INFO.horarioFuncionamento.sabado}
              </Text>
            </View>

            <View style={styles.horarioItem}>
              <Text style={styles.diaText}>Domingo</Text>
              {/* Domingo recebe cor vermelha caso esteja “Fechado” */}
              <Text style={[styles.horarioText, styles.fechado]}>
                {BARBEARIA_INFO.horarioFuncionamento.domingo}
              </Text>
            </View>
          </View>
        </View>

        {/* ---------- Serviços oferecidos ---------- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nossos Serviços</Text>

          <View style={styles.servicosContainer}>
            {/* Serviço 1 */}
            <View style={styles.servicoItem}>
              <Text style={styles.servicoNome}>✂️ Corte de Cabelo</Text>
              <Text style={styles.servicoDescricao}>
                Cortes modernos e clássicos
              </Text>
            </View>

            {/* Serviço 2 */}
            <View style={styles.servicoItem}>
              <Text style={styles.servicoNome}>🪒 Barba</Text>
              <Text style={styles.servicoDescricao}>
                Aparar e modelar barba
              </Text>
            </View>

            {/* Serviço 3 */}
            <View style={styles.servicoItem}>
              <Text style={styles.servicoNome}>💫 Corte + Barba</Text>
              <Text style={styles.servicoDescricao}>Pacote completo</Text>
            </View>
          </View>
        </View>

        {/* ---------- Botões de ação ---------- */}
        <View style={styles.buttonsContainer}>
          {/* Botão verde – Agendar */}
          <TouchableOpacity style={styles.agendarButton} onPress={handleAgendar}>
            <Text style={styles.agendarButtonText}>Agendar Horário</Text>
          </TouchableOpacity>
          
          {/* Botão contornado – Ver meus agendamentos */}
          <TouchableOpacity
            style={styles.meusAgendamentosButton}
            onPress={handleMeusAgendamentos}
          >
            <Text style={styles.meusAgendamentosButtonText}>
              Meus Agendamentos
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- Estilos ---------- */
const styles = StyleSheet.create({
  /* Container principal */
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',          // Fundo escuro
  },
  /* Conteúdo do ScrollView */
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  /* Cabeçalho */
  header: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 20,
  },
  /* Nome da barbearia */
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  /* Slogan */
  slogan: {
    fontSize: 16,
    color: '#cccccc',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  /* Seções (“Horários”, “Serviços”) */
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  /* Cartão com horários */
  horariosContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 15,
  },
  horarioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  diaText: {
    fontSize: 16,
    color: '#ffffff',
  },
  horarioText: {
    fontSize: 16,
    color: '#4CAF50',      // Verde para indicar aberto
    fontWeight: '500',
  },
  fechado: {
    color: '#f44336',      // Vermelho para fechado
  },
  /* Cartão com serviços */
  servicosContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 15,
  },
  servicoItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  servicoNome: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 4,
  },
  servicoDescricao: {
    fontSize: 14,
    color: '#cccccc',
  },
  /* Área dos botões */
  buttonsContainer: {
    marginTop: 20,
    gap: 15,               // Espaço vertical entre botões
  },
  /* Botão verde – Agendar */
  agendarButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    // Sombras (Android: elevation / iOS: shadow*)
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  agendarButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  /* Botão invertido – Meus Agendamentos */
  meusAgendamentosButton: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  meusAgendamentosButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});
