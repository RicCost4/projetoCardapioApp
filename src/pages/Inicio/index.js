import { Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import Logo from '../../assets/logo.png';

export default function Inicio() {
  const navigation = useNavigation();

  const acessar = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <Image style={styles.logo}
        source={Logo}/>
      
      <TouchableOpacity style={styles.btnAcessar} onPress={acessar}>
        <Text style={styles.txtAcessar}>Acessar</Text>
      </TouchableOpacity>
           
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#F5DEB3',
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    height:300,
    width:300,
    margin:20,
    overlayColor: '#F5DEB3',
  },
  btnAcessar: {
      backgroundColor: "#891313",
      width: "100%",
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      marginTop: 60,
      marginBottom: 10,
    },
  txtAcessar: {
    color: "#F5DEB3",
    fontSize: 16,
  },    
});
