import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Box from './components/Box';
import BoxName from './components/BoxName';
import BoxValor from './components/BoxValor';

export default function ListaPedidos() {
  const [nomeCliente, setNomeCliente] = useState('');
  const [mesaCliente, setMesa] = useState('');
  const [listaPedidos, setListaPedidos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [valorTotal, setValorTotal] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    recuperarDados();
    recuperarListaPedidos();
  }, []);

  useEffect(() => {
    calcularValorTotal();
  }, [listaPedidos]);

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

  const recuperarListaPedidos = async () => {
    try {
      const pedidosString = await AsyncStorage.getItem('listaPedidos');
      
      if (pedidosString !== null) {
        const pedidosArray = JSON.parse(pedidosString);
        const pedidosFormatados = pedidosArray.map((item) => ({
          id: item.id,
          nome: item.nome,
          preco: parseFloat(item.preco).toFixed(2)
        }));
        setListaPedidos(pedidosFormatados);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calcularValorTotal = () => {
    let total = 0;
    listaPedidos.forEach((pedido) => {
      total += parseFloat(pedido.preco);
    });
    setValorTotal(total);
  };

  const fecharComanda = async () => {
    try {
      await AsyncStorage.removeItem('listaPedidos');
      await AsyncStorage.removeItem('customerData');
      setModalVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  const voltarTelaInicial = () => {
    setModalVisible(false);
    navigation.navigate('Inicio');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.containerBox}>
          <Text style={styles.title}>{nomeCliente}</Text>
          <Text style={styles.title}>Mesa: {mesaCliente}</Text>
        </View>
        <BoxName />
        {listaPedidos.map((pedido, index) => (
          <Box key={index} id={index} nome={pedido.nome} preco={pedido.preco} />
        ))}
        {listaPedidos.length === 0 && (
          <Text style={styles.emptyText}>Nenhum pedido encontrado.</Text>
        )}
        <BoxValor valor={valorTotal.toFixed(2)} />

        <TouchableOpacity style={styles.button} onPress={fecharComanda}>
          <Text style={styles.buttonText}>Fechar Comanda</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Conta fechada com sucesso!</Text>
          <Button title="Ok" onPress={voltarTelaInicial} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5deb4',
    padding: 16,
  },
  containerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  pedido: {
    fontSize: 18,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 18,
    fontStyle: 'italic',
    marginTop: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#891313',
    width: '80%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#f5deb4',
    fontSize: 20,
  },
  modalContainer: {
    backgroundColor: '#891313',
    margin: 20,
    padding: 20,
    borderRadius: 7,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
  },
});