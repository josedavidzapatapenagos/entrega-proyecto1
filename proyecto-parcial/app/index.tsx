import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

import MyButton from '../components/Button';

export default function Index() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#4c669f', '#4f51be', '#e6ebfa']}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Bienvenido</Text>

        <MyButton
          title="Registrarse como Cliente"
          onPress={() => router.push({ pathname: '/registro', params: { role: 'user' } })}
        />

        <MyButton
          title="Registrarse como Admin"
          onPress={() => router.push({ pathname: '/registro', params: { role: 'admin' } })}
        />

        <MyButton
          title="Login Cliente"
          onPress={() => router.push({ pathname: '/login', params: { role: 'user' } })}
        />

        <MyButton
          title="Login Admin"
          onPress={() => router.push({ pathname: '/login', params: { role: 'admin' } })}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  card: { backgroundColor: 'white', padding: 30, borderRadius: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
});