// Função para gerar um ID único combinando timestamp e número aleatório
export const generateId = () => {
  // Date.now() retorna o timestamp atual, Math.random() adiciona aleatoriedade
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Função para validar se uma string está no formato de data dd/mm/yyyy
export const isValidDate = (date) => {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/; // Expressão regular para o formato
  const match = date.match(regex); // Testa a data contra o regex
  
  if (!match) return false; // Retorna falso se não bater o formato
  
  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);
  
  // Validações básicas de dia, mês e ano
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  if (year < new Date().getFullYear()) return false; // Só permite anos futuros ou o atual
  
  // Cria um objeto Date para checar se a data existe de fato
  const dateObj = new Date(year, month - 1, day);
  return dateObj.getDate() === day && 
         dateObj.getMonth() === month - 1 && 
         dateObj.getFullYear() === year;
};

// Função para validar o formato de hora hh:mm (24 horas)
export const isValidTime = (time) => {
  const regex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/; // Aceita de 00:00 até 23:59
  return regex.test(time); // Retorna verdadeiro se a hora for válida
};

// Função que verifica se a combinação de data e hora está no futuro
export const isFutureDateTime = (date, time) => {
  // Primeiro valida o formato da data e hora
  if (!isValidDate(date) || !isValidTime(time)) return false;
  
  // Divide data e hora em partes numéricas
  const [day, month, year] = date.split("/").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  
  // Cria um objeto Date com os valores fornecidos
  const appointmentDate = new Date(year, month - 1, day, hour, minute);
  const now = new Date(); // Pega a data e hora atual
  
  return appointmentDate > now; // Retorna verdadeiro se a data for futura
};

// Função para formatar a data para o formato "10 de Junho de 2025"
export const formatDate = (date) => {
  const [day, month, year] = date.split("/"); // Separa partes da data
  const months = [ // Lista com os nomes dos meses em português
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  
  return `${day} de ${months[parseInt(month) - 1]} de ${year}`; // Retorna string formatada
};

// Função para formatar hora para exibição, exemplo: "13:30h"
export const formatTime = (time) => {
  return `${time}h`;
};

// Função que valida se o nome do cliente tem pelo menos 2 letras
export const isValidName = (name) => {
  return name.trim().length >= 2;
};
