// Objeto contendo informações gerais da barbearia
export const BARBEARIA_INFO = {
  nome: 'Barbearia Tulla', // Nome da barbearia
  slogan: 'Onde o estilo encontra a tradição', // Frase de impacto para marketing
  horarioFuncionamento: { // Horário de funcionamento por dia da semana
    segunda: '08:00 - 18:00',
    terca: '08:00 - 18:00',
    quarta: '08:00 - 18:00',
    quinta: '08:00 - 18:00',
    sexta: '08:00 - 19:00',
    sabado: '08:00 - 17:00',
    domingo: 'Fechado', // A barbearia não abre aos domingos
  },
};

// Lista de serviços oferecidos na barbearia
export const SERVICOS = [
  { value: 'corte', label: 'Corte de Cabelo' },   // Serviço apenas de corte
  { value: 'barba', label: 'Barba' },             // Serviço apenas de barba
  { value: 'ambos', label: 'Corte + Barba' },     // Serviço combinado
];

// Lista com os horários disponíveis para agendamento
export const HORARIOS_DISPONIVEIS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00' // Último horário do dia
];
