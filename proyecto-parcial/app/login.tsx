import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import Input from '../components/Input';
import MyButton from '../components/Button';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { role: roleParam } = useLocalSearchParams();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const manejarLogin = () => {
    const user = loginUser(email, password);

    if (!user) {
      Alert.alert("Error", "Credenciales inválidas");
      return;
    }

    // 🔥 validar rol seleccionado
    if (roleParam && user.role !== roleParam) {
      Alert.alert("Error", "Rol incorrecto");
      return;
    }

    login(user);

    if (user.role === "admin") {
      router.replace('/admin-home');
    } else {
      router.replace('/user-home');
    }
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#4f51be', '#e6ebfa']}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <Input label="Correo" value={email} onChangeText={setEmail} />
        <Input label="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />

        <MyButton title="Ingresar" onPress={manejarLogin} />
        <MyButton title="Volver" variant="outline" onPress={() => router.back()} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  card: { backgroundColor: 'white', padding: 25, borderRadius: 20 },
  title: { textAlign: 'center', fontSize: 22, marginBottom: 20 },
});