// Importa a função que registra o componente principal do app no ambiente do Expo
import { registerRootComponent } from 'expo';

// Importa o componente principal da aplicação
import App from './App';

/*
 * A função registerRootComponent faz duas coisas importantes:
 * 1. Chama AppRegistry.registerComponent('main', () => App), que é necessário para que o React Native saiba qual é o componente principal do app.
 * 2. Garante que o ambiente esteja corretamente configurado, tanto ao rodar o app no Expo Go quanto em builds nativas (Android/iOS).
 * 
 * Essa é a forma recomendada pelo Expo para iniciar sua aplicação.
 */
registerRootComponent(App);
