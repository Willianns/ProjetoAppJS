// Função para gerar ID único
export const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Função para validar formato de data (dd/mm/yyyy)
export const isValidDate = (date) => {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = date.match(regex);
  
  if (!match) return false;
  
  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);
  
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  if (year < new Date().getFullYear()) return false;
  
  // Verificar se a data é válida
  const dateObj = new Date(year, month - 1, day);
  return dateObj.getDate() === day && 
         dateObj.getMonth() === month - 1 && 
         dateObj.getFullYear() === year;
};

// Função para validar formato de hora (hh:mm)
export const isValidTime = (time) => {
  const regex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
  return regex.test(time);
};

// Função para verificar se a data/hora é futura
export const isFutureDateTime = (date, time) => {
  if (!isValidDate(date) || !isValidTime(time)) return false;
  
  const [day, month, year] = date.split("/").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  
  const appointmentDate = new Date(year, month - 1, day, hour, minute);
  const now = new Date();
  
  return appointmentDate > now;
};

// Função para formatar data para exibição
export const formatDate = (date) => {
  const [day, month, year] = date.split("/");
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  
  return `${day} de ${months[parseInt(month) - 1]} de ${year}`;
};

// Função para formatar hora para exibição
export const formatTime = (time) => {
  return `${time}h`;
};

// Função para validar nome do cliente
export const isValidName = (name) => {
  return name.trim().length >= 2;
};

