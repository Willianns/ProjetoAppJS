import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { formatDate, formatTime } from "../utils/validation.js";
import { SERVICOS } from '../utils/constants.js';

export default function ConfirmacaoScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  const { agendamento } = route.params;

  const getServicoLabel = () => {
    return SERVICOS.find(s => s.value === agendamento.servico)?.label || agendamento.servico;
  };

  const handleVoltarHome = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Ícone de Sucesso */}
        <View style={styles.successIcon}>
          <Text style={styles.checkmark}>✓</Text>
        </View>

        {/* Título */}
        <Text style={styles.title}>Agendamento Confirmado!</Text>
        <Text style={styles.subtitle}>
          Seu horário foi agendado com sucesso. Confira os detalhes abaixo:
        </Text>

        {/* Detalhes do Agendamento */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Cliente:</Text>
            <Text style={styles.detailValue}>{agendamento.nomeCliente}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Data:</Text>
            <Text style={styles.detailValue}>{formatDate(agendamento.data)}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Horário:</Text>
            <Text style={styles.detailValue}>{formatTime(agendamento.hora)}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Serviço:</Text>
            <Text style={styles.detailValue}>{getServicoLabel()}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>ID do Agendamento:</Text>
            <Text style={styles.detailValue}>{agendamento.id}</Text>
          </View>
        </View>

        {/* Informações Importantes */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Informações Importantes:</Text>
          <Text style={styles.infoText}>
            • Chegue com 10 minutos de antecedência
          </Text>
          <Text style={styles.infoText}>
            • Em caso de atraso superior a 15 minutos, o horário poderá ser cancelado
          </Text>
          <Text style={styles.infoText}>
            • Para cancelamentos, entre em contato com antecedência
          </Text>
          <Text style={styles.infoText}>
            • Guarde o ID do agendamento para referência
          </Text>
        </View>

        {/* Botão Voltar para Home */}
        <TouchableOpacity style={styles.voltarButton} onPress={handleVoltarHome}>
          <Text style={styles.voltarButtonText}>Voltar para Início</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkmark: {
    fontSize: 40,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  detailsContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  detailLabel: {
    fontSize: 16,
    color: '#cccccc',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    marginLeft: 10,
  },
  infoContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 8,
    lineHeight: 20,
  },
  voltarButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#4CAF50',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  voltarButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

