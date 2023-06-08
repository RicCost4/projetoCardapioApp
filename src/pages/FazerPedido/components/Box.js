import { Text, View, StyleSheet} from 'react-native';

export default function Box({id, nome, preco}) {

  return (
    <View key={id} style={styles.containerBox} >
      <Text style={styles.boxTextNome} >
        {nome}
      </Text>
      <Text style={styles.boxTextPreco} >
        R$ {preco}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxTextNome: {
    color: '#FFF',
    fontSize: 15,
    marginHorizontal: 10
  },
  boxTextPreco: {
    color: '#FFF',
    fontSize: 15
  }
});
