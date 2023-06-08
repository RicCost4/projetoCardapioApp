import { useState, useEffect } from 'react';
import { 
  TextInput, 
  TouchableOpacity, 
  Text, 
  SafeAreaView, 
  StyleSheet 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cadastro() {
  const navigation = useNavigation();

  const [nomeCliente, setNomeCliente] = useState('');
  const [numeroMesa, setNumeroMesa] = useState('');
  const [isDadosArmazenado, setIsDadosArmazenado] = useState(false);

  useEffect(() => {
    recuperarDados();
  }, []);

  const recuperarDados = async () => {
    try {
      const dados = await AsyncStorage.getItem('customerData');
      if (dados !== null) {
        const { nome, mesa } = JSON.parse(dados);
        setNomeCliente(nome);
        setNumeroMesa(mesa);
        setIsDadosArmazenado(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const armazenarDados = async () => {
    try {
      const data = {
        nome: nomeCliente,
        mesa: numeroMesa,
      };

      await AsyncStorage.setItem('customerData', JSON.stringify(data));
      setIsDadosArmazenado(true);
    } catch (error) {
      console.log(error);
    }
  };

  const limparDados = async () => {
    try {
      await AsyncStorage.removeItem('customerData');
      setNomeCliente('');
      setNumeroMesa('');
      setIsDadosArmazenado(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcessar = () => {
    armazenarDados();
    navigation.navigate('Informações');
  };

  const handleSair = () => {
    limparDados();
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Insira seu nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do cliente"
        value={nomeCliente}
        onChangeText={setNomeCliente}
        editable={!isDadosArmazenado}
      />
      <Text style={styles.label}>Insira a sua mesa:</Text>
      <TextInput
        style={styles.input}
        placeholder="Número da mesa"
        value={numeroMesa}
        onChangeText={setNumeroMesa}
        editable={!isDadosArmazenado}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => { limparDados(); setNomeCliente(''); setNumeroMesa(''); }}
        disabled={isDadosArmazenado}
      >
        <Text style={styles.buttonText}>Limpar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSair}
        disabled={isDadosArmazenado}
      >
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.accessButton]}
        onPress={handleAcessar}
      >
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5DEB3',
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    width: '80%',
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#891313',
    backgroundColor: 'rgba(137, 19, 19, 0.5)',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '40%',
    height: 40,
    borderRadius: 8,
    backgroundColor: '#891313',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  accessButton: {
    position: 'absolute',
    bottom: 20,
  },
  buttonText: {
    fontSize: 20,
    color: '#F5DEB3',
  },
});