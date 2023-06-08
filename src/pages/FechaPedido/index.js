import { Text, View, StyleSheet, Button, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FechaPedido() {
  const navigation = useNavigation();

  const [mesa, setMesa] = useState('');

  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    recuperarMesa();
  }, []);

  async function recuperarMesa() {
    try {
      const storedData = await AsyncStorage.getItem('customerData');
      if (storedData !== null) {
        const { mesa } = JSON.parse(storedData);
        setMesa(mesa);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function concluir() {
    setVisivel(true);
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#f5deb4', height: '100%' }}>
      <Modal animationType='slide' transparent={true} visible={visivel}>
        <View style={styles.bxModal}>
          <Text style={styles.txModal}>Pedido enviado para a cozinha.</Text>
          <Button
            title='Fechar'
            onPress={() => {
            setVisivel(false);
            navigation.navigate('Informações');
            }}
          />
        </View>
      </Modal>
      <View style={styles.container}>
        <Text style={styles.paragraph}>Seu pedido foi realizado com sucesso.</Text>
        <Text style={styles.mesa}>Mesa: {mesa}</Text>
        <View style={styles.botoes}>
          <TouchableOpacity style={styles.btn} onPress={concluir}>
            <Text style={styles.btnTxt}>Concluir</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
            navigation.navigate('Pedidos');
            }}
          >
            <Text style={styles.btnTxt}>Fazer outro pedido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mesa: {
    fontSize: 21,
    fontWeight: 'bold',
  },
  botoes: {
    alignItems: 'center',
  },
  btn: {
    marginTop: 10,
    backgroundColor: '#891313',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  btnTxt: {
    color: '#f5deb4',
    fontSize: 20,
  },
  bxModal: {
    backgroundColor: '#891313',
    margin: 20,
    padding: 20,
    borderRadius: 7,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txModal: {
    fontSize: 17,
    fontWeight: 'bold',
    padding: 20,
    color: '#f5deb4',
  },
});