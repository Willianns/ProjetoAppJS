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
import { DatabaseService } from "../services/database.js"; // Serviço para lidar com o banco de dados local
import { formatDate, formatTime } from "../utils/validation.js"; // Funções para formatar data e hora
import { SERVICOS } from "../utils/constants.js"; // Lista de serviços disponíveis

export default function MeusAgendamentosScreen() {
  const navigation = useNavigation(); // Hook para navegação entre telas
  const [agendamentos, setAgendamentos] = useState([]); // Lista de agendamentos
  const [loading, setLoading] = useState(true); // Estado de carregamento inicial
  const [refreshing, setRefreshing] = useState(false); // Estado de "puxar para atualizar"

  // Função para carregar os agendamentos do banco de dados
  const carregarAgendamentos = async () => {
    try {
      const agendamentosCarregados = await DatabaseService.obterAgendamentos();
      
      // Ordena do mais recente para o mais antigo
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

  // Executa carregarAgendamentos toda vez que a tela for focada
  useFocusEffect(
    useCallback(() => {
      carregarAgendamentos();
    }, [])
  );

  // Função para o refresh com pull
  const onRefresh = () => {
    setRefreshing(true);
    carregarAgendamentos();
  };

  // Retorna o nome do serviço com base no value
  const getServicoLabel = (servico) => {
    return SERVICOS.find(s => s.value === servico)?.label || servico;
  };

  // Função para confirmar e cancelar um agendamento
  const handleCancelarAgendamento = (agendamento) => {
    Alert.alert(
      'Cancelar Agendamento',
      `Deseja realmente cancelar o agendamento de ${agendamento.nomeCliente} para ${agendamento.data} às ${agendamento.hora}?`,
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim, Cancelar',
          style: 'destructive',
          onPress: async () => {
            try {
              const sucesso = await DatabaseService.deletarAgendamento(agendamento.id);
              if (sucesso) {
                Alert.alert('Sucesso', 'Agendamento cancelado com sucesso!');
                carregarAgendamentos(); // Recarrega após deletar
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

  // Função para exibir cada cartão de agendamento
  const renderAgendamento = (agendamento) => {
    // Converte a data e hora para objeto Date
    const dataAgendamento = agendamento.data.split('/');
    const horaAgendamento = agendamento.hora.split(':');
    const dataCompleta = new Date(
      parseInt(dataAgendamento[2]),
      parseInt(dataAgendamento[1]) - 1,
      parseInt(dataAgendamento[0]),
      parseInt(horaAgendamento[0]),
      parseInt(horaAgendamento[1])
    );

    // Verifica se o agendamento já passou
    const agora = new Date();
    const isPassado = dataCompleta < agora;

    return (
      <View key={agendamento.id} style={[styles.agendamentoCard, isPassado && styles.agendamentoPassado]}>
        {/* Cabeçalho do agendamento */}
        <View style={styles.agendamentoHeader}>
          <Text style={styles.nomeCliente}>{agendamento.nomeCliente}</Text>
          <Text style={[styles.statusText, isPassado ? styles.statusPassado : styles.statusFuturo]}>
            {isPassado ? 'Realizado' : 'Agendado'}
          </Text>
        </View>
        
        {/* Detalhes do agendamento */}
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

        {/* Botão para cancelar, se o agendamento ainda for futuro */}
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

  // Tela de carregamento
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando agendamentos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Tela principal
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#4CAF50" />
        }
      >
        <Text style={styles.title}>Meus Agendamentos</Text>
        
        {/* Caso não existam agendamentos */}
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
          // Lista de agendamentos
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
