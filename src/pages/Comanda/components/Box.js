import { Text, View, StyleSheet } from 'react-native';

export default function Box({ nome, preco }) {
  return (
    <View style={styles.containerBox}>
      <View style={styles.nomeBox}>
        <Text style={styles.boxTextNome}>{nome}</Text>
      </View>
      <View style={styles.precoBox}>
        <Text style={styles.boxTextPreco}>R$ {preco}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  nomeBox: {
    flex: 7,
    backgroundColor: '#AA8800',
    borderRadius: 5,
    marginRight: 10,
    padding: 10,
  },
  precoBox: {
    flex: 3,
    backgroundColor: 'rgba(170, 136, 0, 0.5)',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  boxTextNome: {
    color: '#FFF',
    fontSize: 15,
  },
  boxTextPreco: {
    color: '#FFF',
    fontSize: 15,
  },
});