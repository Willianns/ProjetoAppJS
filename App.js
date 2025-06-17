// Importações básicas do React e de bibliotecas de navegação
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Container principal da navegação
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Navegação estilo stack (pilha)
import { StatusBar } from 'expo-status-bar'; // Barra de status do topo do app

// Importação das telas do aplicativo
import HomeScreen from './app/HomeScreen';
import AgendamentoScreen from './app/AgendamentoScreen';
import ConfirmacaoScreen from './app/ConfirmacaoScreen';
import MeusAgendamentosScreen from './app/MeusAgendamentosScreen';

// Cria o objeto Stack Navigator, responsável pela navegação entre telas
const Stack = createNativeStackNavigator();

// Componente principal do aplicativo
export default function App() {
  return (
    <NavigationContainer> {/* Gerencia o estado da navegação em todo o app */}
      <StatusBar style="light" backgroundColor="#1a1a1a" /> {/* Define a cor e estilo da barra de status */}
      
      <Stack.Navigator
        initialRouteName="Home" // Tela inicial ao abrir o app
        screenOptions={{ // Estilização padrão para todas as telas do stack
          headerStyle: {
            backgroundColor: '#1a1a1a', // Cor de fundo do cabeçalho
          },
          headerTintColor: '#ffffff', // Cor do texto e ícones no cabeçalho
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerBackTitleVisible: false, // Esconde o texto do botão de voltar
          contentStyle: {
            backgroundColor: '#1a1a1a', // Cor de fundo do conteúdo das telas
          },
        }}
      >

        {/* Tela inicial - Home */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Barbearia Tulla', // Título da tela (não aparece pois está escondido)
            headerShown: false, // Esconde o cabeçalho para um visual mais limpo
          }}
        />

        {/* Tela de agendamento */}
        <Stack.Screen
          name="Agendamento"
          component={AgendamentoScreen}
          options={{
            title: 'Novo Agendamento', // Título mostrado no cabeçalho
            headerShown: true,
          }}
        />

        {/* Tela de confirmação após agendar */}
        <Stack.Screen
          name="Confirmacao"
          component={ConfirmacaoScreen}
          options={{
            title: 'Confirmação',
            headerShown: true,
            headerLeft: () => null, // Remove o botão de voltar
            gestureEnabled: false, // Impede o gesto de "voltar" no iOS/Android
          }}
        />

        {/* Tela que lista os agendamentos do usuário */}
        <Stack.Screen
          name="MeusAgendamentos"
          component={MeusAgendamentosScreen}
          options={{
            title: 'Meus Agendamentos',
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
