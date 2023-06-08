import { View, StyleSheet } from 'react-native';
import Routes from './src/routes/Routes'

export default function App() {

  return (
    <View style={styles.container}>
      <Routes />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5DEB3',
    padding: 8,
  }
});
