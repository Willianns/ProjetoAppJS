import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BARBEARIA_INFO } from '../utils/constants.js';

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleAgendar = () => {
    navigation.navigate('Agendamento');
  };

  const handleMeusAgendamentos = () => {
    navigation.navigate('MeusAgendamentos');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{BARBEARIA_INFO.nome}</Text>
          <Text style={styles.slogan}>{BARBEARIA_INFO.slogan}</Text>
        </View>

        {/* Horários de Funcionamento */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Horários de Funcionamento</Text>
          <View style={styles.horariosContainer}>
            <View style={styles.horarioItem}>
              <Text style={styles.diaText}>Segunda-feira</Text>
              <Text style={styles.horarioText}>{BARBEARIA_INFO.horarioFuncionamento.segunda}</Text>
            </View>
            <View style={styles.horarioItem}>
              <Text style={styles.diaText}>Terça-feira</Text>
              <Text style={styles.horarioText}>{BARBEARIA_INFO.horarioFuncionamento.terca}</Text>
            </View>
            <View style={styles.horarioItem}>
              <Text style={styles.diaText}>Quarta-feira</Text>
              <Text style={styles.horarioText}>{BARBEARIA_INFO.horarioFuncionamento.quarta}</Text>
            </View>
            <View style={styles.horarioItem}>
              <Text style={styles.diaText}>Quinta-feira</Text>
              <Text style={styles.horarioText}>{BARBEARIA_INFO.horarioFuncionamento.quinta}</Text>
            </View>
            <View style={styles.horarioItem}>
              <Text style={styles.diaText}>Sexta-feira</Text>
              <Text style={styles.horarioText}>{BARBEARIA_INFO.horarioFuncionamento.sexta}</Text>
            </View>
            <View style={styles.horarioItem}>
              <Text style={styles.diaText}>Sábado</Text>
              <Text style={styles.horarioText}>{BARBEARIA_INFO.horarioFuncionamento.sabado}</Text>
            </View>
            <View style={styles.horarioItem}>
              <Text style={styles.diaText}>Domingo</Text>
              <Text style={[styles.horarioText, styles.fechado]}>{BARBEARIA_INFO.horarioFuncionamento.domingo}</Text>
            </View>
          </View>
        </View>

        {/* Serviços */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nossos Serviços</Text>
          <View style={styles.servicosContainer}>
            <View style={styles.servicoItem}>
              <Text style={styles.servicoNome}>✂️ Corte de Cabelo</Text>
              <Text style={styles.servicoDescricao}>Cortes modernos e clássicos</Text>
            </View>
            <View style={styles.servicoItem}>
              <Text style={styles.servicoNome}>🪒 Barba</Text>
              <Text style={styles.servicoDescricao}>Aparar e modelar barba</Text>
            </View>
            <View style={styles.servicoItem}>
              <Text style={styles.servicoNome}>💫 Corte + Barba</Text>
              <Text style={styles.servicoDescricao}>Pacote completo</Text>
            </View>
          </View>
        </View>

        {/* Botões de Ação */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.agendarButton} onPress={handleAgendar}>
            <Text style={styles.agendarButtonText}>Agendar Horário</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.meusAgendamentosButton} onPress={handleMeusAgendamentos}>
            <Text style={styles.meusAgendamentosButtonText}>Meus Agendamentos</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  slogan: {
    fontSize: 16,
    color: '#cccccc',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
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
    color: '#4CAF50',
    fontWeight: '500',
  },
  fechado: {
    color: '#f44336',
  },
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
  buttonsContainer: {
    marginTop: 20,
    gap: 15,
  },
  agendarButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  agendarButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
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

