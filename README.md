# Barbearia Tulla - Aplicativo React Native (JavaScript)

Um aplicativo completo de agendamento para barbearias, desenvolvido em React Native com JavaScript.

## 📱 Sobre o Aplicativo

O **Barbearia Tulla** é um aplicativo móvel moderno que permite aos clientes agendar horários de forma prática e eficiente. Com uma interface elegante e tema escuro, oferece uma experiência de usuário intuitiva e profissional.

## ✨ Funcionalidades

- **Página Home**: Apresentação da barbearia com informações completas
  - Nome e slogan da barbearia
  - Horários de funcionamento detalhados
  - Apresentação dos serviços oferecidos
  - Navegação para agendamento e visualização de agendamentos

- **Página de Agendamento**: Sistema completo de reservas
  - Campo para nome do cliente
  - Seleção de data (formato dd/mm/yyyy)
  - Seleção de horário através de modal interativo
  - Escolha de serviços (Corte, Barba, Ambos)
  - Validação completa de dados
  - Verificação de disponibilidade de horários

- **Página de Confirmação**: Detalhes do agendamento realizado
  - Exibição de todos os dados do agendamento
  - ID único para referência
  - Informações importantes para o cliente
  - Navegação de retorno à home

- **Página Meus Agendamentos**: Histórico completo
  - Lista de todos os agendamentos realizados
  - Status visual (Agendado/Realizado)
  - Funcionalidade de cancelamento para agendamentos futuros
  - Atualização por pull-to-refresh
  - Ordenação por data de criação

## 🛠️ Tecnologias Utilizadas

- **React Native**: Framework principal
- **JavaScript**: Linguagem de programação (sem TypeScript)
- **Expo**: Plataforma de desenvolvimento
- **React Navigation**: Navegação entre telas
- **AsyncStorage**: Persistência de dados local
- **React Native Safe Area Context**: Suporte a áreas seguras
- **React Native Screens**: Otimização de performance

## 📁 Estrutura do Projeto

```
barbearia-app/
├── app/                    # Telas do aplicativo
│   ├── HomeScreen.js
│   ├── AgendamentoScreen.js
│   ├── ConfirmacaoScreen.js
│   └── MeusAgendamentosScreen.js
├── services/               # Lógica de banco de dados
│   └── database.js
├── utils/                  # Funções auxiliares
│   ├── constants.js
│   └── validation.js
├── App.jsx                 # Componente principal
├── index.js               # Ponto de entrada
└── package.json           # Dependências e scripts
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- Expo Go (para testar no dispositivo móvel)

### Instalação

1. **Clone ou extraia o projeto**:
   ```bash
   cd barbearia-app
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm start
   # ou
   npx expo start
   ```

4. **Execute o aplicativo**:
   - **No dispositivo móvel**: Escaneie o QR code com o Expo Go
   - **No simulador iOS**: Pressione `i` no terminal
   - **No emulador Android**: Pressione `a` no terminal
   - **No navegador web**: Pressione `w` no terminal

### Scripts Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento
- `npm run android`: Executa no emulador Android
- `npm run ios`: Executa no simulador iOS
- `npm run web`: Executa no navegador web

## 📖 Como Usar

### 1. Tela Inicial
- Visualize as informações da barbearia
- Confira os horários de funcionamento
- Conheça os serviços oferecidos
- Escolha entre "Agendar Horário" ou "Meus Agendamentos"

### 2. Agendamento
- Preencha seu nome completo
- Selecione a data desejada (dd/mm/yyyy)
- Escolha um horário disponível
- Selecione o serviço (Corte, Barba ou Ambos)
- Confirme o agendamento

### 3. Confirmação
- Visualize os detalhes do agendamento
- Anote o ID do agendamento para referência
- Leia as informações importantes
- Retorne à tela inicial

### 4. Meus Agendamentos
- Visualize todos os seus agendamentos
- Veja o status (Agendado/Realizado)
- Cancele agendamentos futuros se necessário
- Atualize a lista puxando para baixo

## 🎨 Design e Interface

- **Tema escuro moderno**: Interface elegante e profissional
- **Layout responsivo**: Adaptável a diferentes tamanhos de tela
- **Navegação intuitiva**: Fluxo de uso simples e direto
- **Feedback visual**: Estados de loading e confirmações
- **Acessibilidade**: Cores contrastantes e textos legíveis

## 💾 Armazenamento de Dados

O aplicativo utiliza **AsyncStorage** para persistir os dados localmente no dispositivo:

- **Agendamentos**: Salvos com ID único, data de criação e todos os detalhes
- **Validação**: Verificação de conflitos de horário
- **Sincronização**: Dados mantidos entre sessões do aplicativo

## 🔧 Funcionalidades Técnicas

### Validação de Dados
- Formato de data (dd/mm/yyyy)
- Formato de horário (hh:mm)
- Validação de datas futuras
- Verificação de disponibilidade

### Navegação
- Stack Navigator para transições suaves
- Parâmetros entre telas
- Controle de gestos e botões de voltar

### Performance
- Lazy loading de componentes
- Otimização de re-renderizações
- Gerenciamento eficiente de estado

## 🚀 Próximas Funcionalidades

- [ ] Notificações push para lembretes
- [ ] Integração com calendário do dispositivo
- [ ] Sistema de avaliação e feedback
- [ ] Histórico de serviços realizados
- [ ] Integração com sistemas de pagamento
- [ ] Modo offline com sincronização

## 🐛 Solução de Problemas

### Problemas Comuns

1. **Erro de dependências**:
   ```bash
   npm install
   npx expo install --fix
   ```

2. **Cache do Metro**:
   ```bash
   npx expo start --clear
   ```

3. **Problemas de navegação**:
   - Verifique se todas as telas estão importadas corretamente
   - Confirme os nomes das rotas na navegação

## 📄 Licença

Este projeto é de uso educacional e demonstrativo.

## 👨‍💻 Desenvolvido por

**Willian**, **Maicon** e **Vinicius**. 

---

**apk do Projeto**
https://expo.dev/artifacts/eas/R63F7wEvcbNKmeNfszN41.apk

**Versão**: 1.0.0  
**Última atualização**: Dezembro 2024  
**Compatibilidade**: React Native 0.79.3, Expo SDK 53

