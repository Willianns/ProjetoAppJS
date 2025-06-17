// Importa o módulo AsyncStorage para armazenamento local
import AsyncStorage from '@react-native-async-storage/async-storage';
// Importa função utilitária para gerar IDs únicos
import { generateId } from '../utils/validation.js';

// Chave que será usada para salvar os dados no AsyncStorage
const STORAGE_KEY = '@barbearia_agendamentos';

// Classe responsável por lidar com o armazenamento dos agendamentos
export class DatabaseService {
  // Salva um novo agendamento
  static async salvarAgendamento(agendamentoForm) {
    try {
      // Cria um novo objeto de agendamento com ID único e data de criação
      const agendamento = {
        id: generateId(),
        ...agendamentoForm,
        createdAt: new Date(), // Marca quando o agendamento foi criado
      };

      // Obtém os agendamentos existentes no armazenamento
      const agendamentosExistentes = await this.obterAgendamentos();

      // Adiciona o novo agendamento à lista existente
      const novosAgendamentos = [...agendamentosExistentes, agendamento];
      
      // Salva todos os agendamentos atualizados no AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novosAgendamentos));
      return agendamento;
    } catch (error) {
      console.error('Erro ao salvar agendamento:', error);
      throw new Error('Não foi possível salvar o agendamento');
    }
  }

  // Retorna todos os agendamentos armazenados
  static async obterAgendamentos() {
    try {
      // Lê os agendamentos salvos como string JSON
      const agendamentosString = await AsyncStorage.getItem(STORAGE_KEY);
      if (!agendamentosString) {
        return []; // Nenhum agendamento encontrado
      }
      
      const agendamentos = JSON.parse(agendamentosString);

      // Converte a string da data de criação para objeto Date
      return agendamentos.map(agendamento => ({
        ...agendamento,
        createdAt: new Date(agendamento.createdAt),
      }));
    } catch (error) {
      console.error('Erro ao obter agendamentos:', error);
      return [];
    }
  }

  // Retorna um agendamento específico pelo ID
  static async obterAgendamentoPorId(id) {
    try {
      const agendamentos = await this.obterAgendamentos();
      // Procura o agendamento pelo ID
      return agendamentos.find(agendamento => agendamento.id === id) || null;
    } catch (error) {
      console.error('Erro ao obter agendamento por ID:', error);
      return null;
    }
  }

  // Verifica se há disponibilidade em uma data e hora específicas
  static async verificarDisponibilidade(data, hora) {
    try {
      const agendamentos = await this.obterAgendamentos();
      // Verifica se já existe um agendamento com a mesma data e hora
      const agendamentoExistente = agendamentos.find(
        agendamento => agendamento.data === data && agendamento.hora === hora
      );
      // Retorna true se estiver disponível
      return !agendamentoExistente;
    } catch (error) {
      console.error('Erro ao verificar disponibilidade:', error);
      return false;
    }
  }

  // Remove um agendamento específico pelo ID
  static async deletarAgendamento(id) {
    try {
      const agendamentos = await this.obterAgendamentos();

      // Filtra os agendamentos para remover o com o ID especificado
      const agendamentosFiltrados = agendamentos.filter(
        agendamento => agendamento.id !== id
      );
      
      // Salva os agendamentos atualizados no AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(agendamentosFiltrados));
      return true;
    } catch (error) {
      console.error('Erro ao deletar agendamento:', error);
      return false;
    }
  }

  // Remove todos os agendamentos do armazenamento (útil para testes)
  static async limparAgendamentos() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao limpar agendamentos:', error);
    }
  }
}
