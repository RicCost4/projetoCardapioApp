import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FazerPedido from '../pages/FazerPedido';
import FechaPedido from '../pages/FechaPedido';
import Informacoes from '../pages/Informacoes';
import Inicio from '../pages/Inicio'
import Cadastro from '../pages/Cadastro';
import Comanda from '../pages/Comanda'

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Inicio"
          component={Inicio}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{
            title: 'Cadastro',
            headerStyle: { backgroundColor: '#891313' },
            headerTintColor: '#F5DEB3',
          }}
        />
        <Stack.Screen
          name="Comanda"
          component={Comanda}
          options={{
            title: 'Comanda',
            headerStyle: { backgroundColor: '#891313' },
            headerTintColor: '#F5DEB3',
          }}
        />
        <Stack.Screen
          name="Informações"
          component={Informacoes}
          options={{
            title: 'Informações',
            headerStyle: { backgroundColor: '#891313' },
            headerTintColor: '#F5DEB3',
          }}
        />
        <Stack.Screen
          name="Pedidos"
          component={FazerPedido}
          options={{
            title: 'Pedidos',
            headerStyle: { backgroundColor: '#891313' },
            headerTintColor: '#F5DEB3',
          }}
        />
        <Stack.Screen
          name="Finalizar"
          component={FechaPedido}
          options={{
            title: 'Finalizar',
            headerStyle: { backgroundColor: '#891313' },
            headerTintColor: '#F5DEB3',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}