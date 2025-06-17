import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { DatabaseService } from "../services/database.js";
import { formatDate, formatTime } from "../utils/validation.js";
import { SERVICOS } from "../utils/constants.js";

export default function MeusAgendamentosScreen() {
  const navigation = useNavigation();
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const carregarAgendamentos = async () => {
    try {
      const agendamentosCarregados = await DatabaseService.obterAgendamentos();
      // Ordenar por data e hora (mais recentes primeiro)
      const agendamentosOrdenados = agendamentosCarregados.sort((a, b) => {
        const dataA = new Date(a.createdAt);
        const dataB = new Date(b.createdAt);
        return dataB.getTime() - dataA.getTime();
      });
      setAgendamentos(agendamentosOrdenados);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os agendamentos.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Carregar agendamentos quando a tela ganhar foco
  useFocusEffect(
    useCallback(() => {
      carregarAgendamentos();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    carregarAgendamentos();
  };

  const getServicoLabel = (servico) => {
    return SERVICOS.find(s => s.value === servico)?.label || servico;
  };

  const handleCancelarAgendamento = (agendamento) => {
    Alert.alert(
      'Cancelar Agendamento',
      `Deseja realmente cancelar o agendamento de ${agendamento.nomeCliente} para ${agendamento.data} às ${agendamento.hora}?`,
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim, Cancelar',
          style: 'destructive',
          onPress: async () => {
            try {
              const sucesso = await DatabaseService.deletarAgendamento(agendamento.id);
              if (sucesso) {
                Alert.alert('Sucesso', 'Agendamento cancelado com sucesso!');
                carregarAgendamentos(); // Recarregar a lista
              } else {
                Alert.alert('Erro', 'Não foi possível cancelar o agendamento.');
              }
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível cancelar o agendamento.');
            }
          },
        },
      ]
    );
  };

  const renderAgendamento = (agendamento) => {
    const dataAgendamento = agendamento.data.split('/');
    const horaAgendamento = agendamento.hora.split(':');
    const dataCompleta = new Date(
      parseInt(dataAgendamento[2]),
      parseInt(dataAgendamento[1]) - 1,
      parseInt(dataAgendamento[0]),
      parseInt(horaAgendamento[0]),
      parseInt(horaAgendamento[1])
    );
    
    const agora = new Date();
    const isPassado = dataCompleta < agora;

    return (
      <View key={agendamento.id} style={[styles.agendamentoCard, isPassado && styles.agendamentoPassado]}>
        <View style={styles.agendamentoHeader}>
          <Text style={styles.nomeCliente}>{agendamento.nomeCliente}</Text>
          <Text style={[styles.statusText, isPassado ? styles.statusPassado : styles.statusFuturo]}>
            {isPassado ? 'Realizado' : 'Agendado'}
          </Text>
        </View>
        
        <View style={styles.agendamentoDetalhes}>
          <View style={styles.detalheItem}>
            <Text style={styles.detalheLabel}>📅 Data:</Text>
            <Text style={styles.detalheValor}>{formatDate(agendamento.data)}</Text>
          </View>
          
          <View style={styles.detalheItem}>
            <Text style={styles.detalheLabel}>🕐 Horário:</Text>
            <Text style={styles.detalheValor}>{formatTime(agendamento.hora)}</Text>
          </View>
          
          <View style={styles.detalheItem}>
            <Text style={styles.detalheLabel}>✂️ Serviço:</Text>
            <Text style={styles.detalheValor}>{getServicoLabel(agendamento.servico)}</Text>
          </View>
          
          <View style={styles.detalheItem}>
            <Text style={styles.detalheLabel}>🆔 ID:</Text>
            <Text style={styles.detalheValor}>{agendamento.id}</Text>
          </View>
        </View>

        {!isPassado && (
          <TouchableOpacity
            style={styles.cancelarButton}
            onPress={() => handleCancelarAgendamento(agendamento)}
          >
            <Text style={styles.cancelarButtonText}>Cancelar Agendamento</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando agendamentos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#4CAF50" />
        }
      >
        <Text style={styles.title}>Meus Agendamentos</Text>
        
        {agendamentos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>📅</Text>
            <Text style={styles.emptyTitle}>Nenhum agendamento encontrado</Text>
            <Text style={styles.emptySubtitle}>
              Você ainda não fez nenhum agendamento. Que tal agendar um horário agora?
            </Text>
            <TouchableOpacity
              style={styles.agendarButton}
              onPress={() => navigation.navigate('Agendamento')}
            >
              <Text style={styles.agendarButtonText}>Agendar Horário</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.agendamentosContainer}>
            <Text style={styles.totalText}>
              Total: {agendamentos.length} agendamento{agendamentos.length !== 1 ? 's' : ''}
            </Text>
            {agendamentos.map(renderAgendamento)}
          </View>
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#cccccc',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  totalText: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  agendarButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  agendarButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  agendamentosContainer: {
    flex: 1,
  },
  agendamentoCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  agendamentoPassado: {
    borderLeftColor: '#666',
    opacity: 0.7,
  },
  agendamentoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  nomeCliente: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    textTransform: 'uppercase',
  },
  statusFuturo: {
    backgroundColor: '#4CAF50',
    color: '#ffffff',
  },
  statusPassado: {
    backgroundColor: '#666',
    color: '#ffffff',
  },
  agendamentoDetalhes: {
    marginBottom: 15,
  },
  detalheItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  detalheLabel: {
    fontSize: 14,
    color: '#cccccc',
    flex: 1,
  },
  detalheValor: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
    textAlign: 'right',
    flex: 2,
  },
  cancelarButton: {
    backgroundColor: '#f44336',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  cancelarButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
});

