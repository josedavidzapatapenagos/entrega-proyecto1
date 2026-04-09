import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import Input from '../components/Input';
import MyButton from '../components/Button';
import { registerUser } from '../services/authService';
import { addCliente } from '../services/clienteService';

export default function RegistroScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const manejarRegistro = () => {
    if (!email || !password) {
      Alert.alert("Error", "Campos obligatorios");
      return;
    }

    if (!email.includes('@')) {
      Alert.alert("Error", "Correo inválido");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Mínimo 6 caracteres");
      return;
    }

    const userRole = role === 'admin' ? 'admin' : 'user';

    
    registerUser({
      id: Date.now().toString(),
      email,
      password,
      role: userRole,
    });

   
    if (userRole === "user") {
      addCliente({
        id: Date.now().toString(),
        nombre: email.split('@')[0],
        correo: email,
        dinero: 0,
        historial: [0, 200, 400, 300, 600],
      });
    }

    Alert.alert("Éxito", `Registrado como ${userRole}`);

    router.replace('/login');
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#4f51be', '#e6ebfa']}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>
          Registro {role === 'admin' ? 'Admin' : 'Cliente'}
        </Text>

        <Input
          label="Correo"
          value={email}
          onChangeText={setEmail}
          placeholder="correo@test.com"
        />

        <Input
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="******"
        />

        <MyButton
          title="Registrarse"
          onPress={manejarRegistro}
        />

        <MyButton
          title="Volver"
          variant="outline"
          onPress={() => router.back()}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 20,
    elevation: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
