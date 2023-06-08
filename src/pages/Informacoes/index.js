import { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';

export default function Informacoes() {
  const navigation = useNavigation();

  const [nomeCliente, setNomeCliente] = useState('');
  const [mesaCliente, setMesa] = useState('');

  useEffect(() => {
    recuperarDados();
  }, []);

  const recuperarDados = async () => {
    try {
      const dados = await AsyncStorage.getItem('customerData');
      if (dados !== null) {
        const { nome, mesa } = JSON.parse(dados);
        setNomeCliente(nome);
        setMesa(mesa);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fazerPedido = () => {
    navigation.navigate('Pedidos');
  };

  const visualizarComanda = () => {
    navigation.navigate('Comanda');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.input}>
        Nome do cliente: {nomeCliente}
      </Text>

      <Text style={styles.mesa}>
        Mesa: {mesaCliente}
      </Text>

      <TouchableOpacity style={styles.botaoFazerPedido} onPress={fazerPedido}>
        <Text style={styles.textoBotaoFazerPedido}>
          Fazer pedido
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoVisualizarComanda} onPress={visualizarComanda}>
        <Text style={styles.textoBotaoVisualizarComanda}>
          Visualizar comanda
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: Constants.statusBarHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5DEB3',
  },
  input: {
    width: '100%',
    height: 50,
    padding: 10,
    fontSize: 20,
    marginTop: 60,
    marginBottom: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  mesa: {
    width: '100%',
    height: 50,
    padding: 10,
    fontSize: 20,
    marginTop: 20,
    marginBottom: 50,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  botaoFazerPedido: {
    width: '100%',
    height: 50,
    backgroundColor: '#891313',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    marginBottom: 10,
  },
  textoBotaoFazerPedido: {
    color: '#F5DEB3',
    fontSize: 16,
  },
  botaoVisualizarComanda: {
    width: '100%',
    height: 50,
    backgroundColor: '#891313',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
  textoBotaoVisualizarComanda: {
    color: '#F5DEB3',
    fontSize: 16,
  },
});