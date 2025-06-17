import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Importar as telas
import HomeScreen from './app/HomeScreen';
import AgendamentoScreen from './app/AgendamentoScreen';
import ConfirmacaoScreen from './app/ConfirmacaoScreen';
import MeusAgendamentosScreen from './app/MeusAgendamentosScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#1a1a1a" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerBackTitleVisible: false,
          contentStyle: {
            backgroundColor: '#1a1a1a',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Barbearia Tulla',
            headerShown: false, // Esconder header na home para design mais limpo
          }}
        />
        <Stack.Screen
          name="Agendamento"
          component={AgendamentoScreen}
          options={{
            title: 'Novo Agendamento',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Confirmacao"
          component={ConfirmacaoScreen}
          options={{
            title: 'Confirmação',
            headerShown: true,
            headerLeft: () => null, // Remover botão de voltar
            gestureEnabled: false, // Desabilitar gesto de voltar
          }}
        />
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

