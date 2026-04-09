import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import MyButton from '../components/Button';
import { useAuth } from '../context/AuthContext';

export default function UserHome() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <LinearGradient colors={['#4c669f', '#4f51be', '#e6ebfa']} style={styles.container}>
      <View style={styles.card}>
        <Text>Bienvenido {user?.email}</Text>

        <MyButton title="Ver Clientes" onPress={() => router.push('/clientes')} />
        <MyButton title="Cerrar sesión" onPress={logout} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  card: { backgroundColor: 'white', padding: 25, borderRadius: 20 },
});