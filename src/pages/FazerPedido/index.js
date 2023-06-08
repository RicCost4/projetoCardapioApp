import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import Api from '../../services/api.json';
import Box from './components/Box';
import Constants from 'expo-constants';

export default function FazerPedido() {
  const navigation = useNavigation();

  const [apiData, setApiData] = React.useState({
    cervejas: [],
    semAlcool: [],
    destilados: [],
    porcoes: [],
    feijoada: [],
  });
  const [expandirCategoria, setExpandirCategoria] = React.useState('');
  const [pedido, setPedido] = React.useState([]);
  const [pedidoRecuperado, setPedidoRecuperado] = React.useState([]);

  React.useEffect(() => {
    setApiData(Api);
    recuperarMesclarPedido();
  }, []);

  const recuperarMesclarPedido = async () => {
    try {
      const armazenaPedido = await AsyncStorage.getItem('listaPedidos');
      if (armazenaPedido !== null) {
        const analisarPedido = JSON.parse(armazenaPedido);
        setPedidoRecuperado((prevPedido) => [...prevPedido, ...analisarPedido]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const salvarPedido = async () => {
    try {
      
      if (pedidoRecuperado !== null) {
        const juntarListas = [...pedido, ...pedidoRecuperado];
        const pedidosString = JSON.stringify(juntarListas);

        await AsyncStorage.setItem('listaPedidos', pedidosString);
      }else{
        const pedidosString = JSON.stringify(pedido);

        await AsyncStorage.setItem('listaPedidos', pedidosString);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Erro ao salvar pedido', 'Ocorreu um erro ao salvar a lista de pedidos.');
    }
  };

  function expandirBox(categoria) {
    setExpandirCategoria((prevCategory) => (prevCategory === categoria ? '' : categoria));
  }

  const adicionarItem = (id, nome, preco) => {
    const novoItem = { id: id, nome: nome, preco: preco };
    setPedido((prevPedido) => [...prevPedido, novoItem]);
  };

  function removerItem(id) {
    setPedido((prevPedido) => prevPedido.filter((item) => item.id !== id));
  }

  function verificarPedido(id) {
    return pedido.find((item) => item.id === id);
  }

  function fazerPedido() {
    if (pedido.length === 0) {
      Alert.alert('Lista de pedidos vazia', 'Adicione itens antes de fazer o pedido.');
      return;
    }
    salvarPedido();
    navigation.navigate('Finalizar');
  }

  function renderizarItens(categoria) {
    if (expandirCategoria === categoria) {
      return apiData[categoria].map((opc) => (
        <View style={styles.boxReder} key={opc.id}>
          <Box id={opc.id} nome={opc.nome} preco={opc.preço} />
          <View style={styles.buttons}>
            {verificarPedido(opc.id) && (
              <TouchableOpacity onPress={() => removerItem(opc.id)}>
                <AntDesign name="minuscircle" size={24} color="red" />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => adicionarItem(opc.id, opc.nome, opc.preço)}>
              <AntDesign name="pluscircle" size={24} color="green" />
            </TouchableOpacity>
          </View>
        </View>
      ));
    }
    return null;
  }

  function renderizarIcone(categoria) {
    if (expandirCategoria === categoria) {
      return <AntDesign name="up" size={48} color="black" />;
    }
    return <AntDesign name="down" size={48} color="black" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/*Box das Cervejas*/}
        <View>
          <View style={styles.box}>
            <Text style={styles.boxText}>Cerveja</Text>
            <TouchableOpacity onPress={() => expandirBox('cervejas')}>
              {renderizarIcone('cervejas')}
            </TouchableOpacity>
          </View>
          {renderizarItens('cervejas')}
        </View>
        {/* Box dos Sem Álcool's*/}
        <View>
          <View style={styles.box}>
            <Text style={styles.boxText}>Sem Álcool</Text>
            <TouchableOpacity onPress={() => expandirBox('semAlcool')}>
              {renderizarIcone('semAlcool')}
            </TouchableOpacity>
          </View>
          {renderizarItens('semAlcool')}
        </View>
        {/* Box dos Destilados*/}
        <View>
          <View style={styles.box}>
            <Text style={styles.boxText}>Destilados</Text>
            <TouchableOpacity onPress={() => expandirBox('destilados')}>
              {renderizarIcone('destilados')}
            </TouchableOpacity>
          </View>
          {renderizarItens('destilados')}
        </View>
        {/* Box dos Porções*/}
        <View>
          <View style={styles.box}>
            <Text style={styles.boxText}>Porções</Text>
            <TouchableOpacity onPress={() => expandirBox('porcoes')}>
              {renderizarIcone('porcoes')}
            </TouchableOpacity>
          </View>
          {renderizarItens('porcoes')}
        </View>
        {/* Box dos Sem Álcool's*/}
        <View>
          <View style={styles.box}>
            <Text style={styles.boxText}>Feijoada</Text>
            <TouchableOpacity onPress={() => expandirBox('feijoada')}>
              {renderizarIcone('feijoada')}
            </TouchableOpacity>
          </View>
          {renderizarItens('feijoada')}
        </View>

        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.button} onPress={fazerPedido}>
            <Text style={styles.buttonText}>Fazer Pedido</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#F5DEB3',
    padding: 8,
  },
  box: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#AA8800',
    padding: 10,
    marginTop: 4
  },
  boxText: {
    color: '#891313',
    fontSize: 24
  },
  containerButton: {
    marginTop: 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '80%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#891313',
    borderRadius: 8
  },
  buttonText: {
    color: "#F5DEB3",
    fontSize: 20
  },
  boxReder: {
    backgroundColor: '#D9D9D9',
    marginBottom: 4,
    marginTop: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row'
  }
});