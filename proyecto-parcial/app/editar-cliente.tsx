import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import Input from '../components/Input';
import MyButton from '../components/Button';
import { getClientes, updateCliente } from '../services/clienteService';

export default function EditarCliente() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // 🔥 asegurar id correcto
  const realId = Array.isArray(id) ? id[0] : id;

  const cliente = getClientes().find(c => c.id === realId);

  const [nombre, setNombre] = useState(cliente?.nombre || '');
  const [dinero, setDinero] = useState(String(cliente?.dinero || 0));

  const manejarGuardar = () => {
    if (!nombre || !dinero) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    const dineroNumero = parseFloat(dinero);

    if (isNaN(dineroNumero)) {
      Alert.alert("Error", "El dinero debe ser un número válido");
      return;
    }

    updateCliente(realId as string, {
      nombre,
      dinero: dineroNumero,
    });

    Alert.alert("Éxito", "Cliente actualizado");

    router.back();
  };

  if (!cliente) {
    return <Text>Cliente no encontrado</Text>;
  }

  return (
    <LinearGradient
      colors={['#4c669f', '#4f51be', '#e6ebfa']}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Editar Cliente</Text>

        <Input
          label="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />

        <Input
          label="Dinero"
          value={dinero}
          onChangeText={setDinero}
          placeholder="Ej: 1000"
        />

        <MyButton
          title="Guardar"
          onPress={manejarGuardar}
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
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});