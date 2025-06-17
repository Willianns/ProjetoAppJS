import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateId } from '../utils/validation.js';

const STORAGE_KEY = '@barbearia_agendamentos';

export class DatabaseService {
  // Salvar um novo agendamento
  static async salvarAgendamento(agendamentoForm) {
    try {
      const agendamento = {
        id: generateId(),
        ...agendamentoForm,
        createdAt: new Date(),
      };

      const agendamentosExistentes = await this.obterAgendamentos();
      const novosAgendamentos = [...agendamentosExistentes, agendamento];
      
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novosAgendamentos));
      return agendamento;
    } catch (error) {
      console.error('Erro ao salvar agendamento:', error);
      throw new Error('Não foi possível salvar o agendamento');
    }
  }

  // Obter todos os agendamentos
  static async obterAgendamentos() {
    try {
      const agendamentosString = await AsyncStorage.getItem(STORAGE_KEY);
      if (!agendamentosString) {
        return [];
      }
      
      const agendamentos = JSON.parse(agendamentosString);
      // Converter strings de data de volta para objetos Date
      return agendamentos.map(agendamento => ({
        ...agendamento,
        createdAt: new Date(agendamento.createdAt),
      }));
    } catch (error) {
      console.error('Erro ao obter agendamentos:', error);
      return [];
    }
  }

  // Obter agendamento por ID
  static async obterAgendamentoPorId(id) {
    try {
      const agendamentos = await this.obterAgendamentos();
      return agendamentos.find(agendamento => agendamento.id === id) || null;
    } catch (error) {
      console.error('Erro ao obter agendamento por ID:', error);
      return null;
    }
  }

  // Verificar se já existe agendamento para data/hora específica
  static async verificarDisponibilidade(data, hora) {
    try {
      const agendamentos = await this.obterAgendamentos();
      const agendamentoExistente = agendamentos.find(
        agendamento => agendamento.data === data && agendamento.hora === hora
      );
      return !agendamentoExistente;
    } catch (error) {
      console.error('Erro ao verificar disponibilidade:', error);
      return false;
    }
  }

  // Deletar agendamento (para funcionalidades futuras)
  static async deletarAgendamento(id) {
    try {
      const agendamentos = await this.obterAgendamentos();
      const agendamentosFiltrados = agendamentos.filter(
        agendamento => agendamento.id !== id
      );
      
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(agendamentosFiltrados));
      return true;
    } catch (error) {
      console.error('Erro ao deletar agendamento:', error);
      return false;
    }
  }

  // Limpar todos os agendamentos (para desenvolvimento/testes)
  static async limparAgendamentos() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao limpar agendamentos:', error);
    }
  }
}

