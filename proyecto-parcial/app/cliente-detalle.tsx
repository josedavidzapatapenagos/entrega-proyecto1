import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LineChart } from 'react-native-chart-kit';

import MyButton from '../components/Button';
import { getClientes, deleteCliente } from '../services/clienteService';
import { useAuth } from '../context/AuthContext';

export default function Detalle() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const router = useRouter();

  const cliente = getClientes().find(c => c.id === id);

  if (!cliente) return <Text>No encontrado</Text>;

  return (
    <LinearGradient colors={['#4c669f', '#4f51be', '#e6ebfa']} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{cliente.nombre}</Text>
        <Text>{cliente.correo}</Text>
        <Text style={styles.saldo}>Saldo: ${cliente.dinero}</Text>

        <LineChart
          data={{
            labels: cliente.historial.map((_, i) => `${i + 1}`),
            datasets: [{ data: cliente.historial }]
          }}
          width={Dimensions.get("window").width - 60}
          height={200}
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            color: () => "#4f51be",
            labelColor: () => "#333",
          }}
        />

        {/* 🔥 EDITAR */}
        {user?.role === "admin" && (
          <MyButton
            title="Editar"
            onPress={() =>
              router.push({ pathname: '/editar-cliente', params: { id } })
            }
          />
        )}

        {/* 🔥 ELIMINAR */}
        {user?.role === "admin" && (
          <MyButton
            title="Eliminar"
            onPress={() =>
              Alert.alert("Confirmar", "¿Eliminar cliente?", [
                { text: "Cancelar", style: "cancel" },
                {
                  text: "Eliminar",
                  style: "destructive",
                  onPress: () => {
                    deleteCliente(cliente.id);
                    router.back();
                  },
                },
              ])
            }
          />
        )}

        <MyButton title="Volver" variant="outline" onPress={() => router.back()} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  card: { backgroundColor: 'white', padding: 25, borderRadius: 20 },
  title: { fontSize: 22, fontWeight: 'bold' },
  saldo: { marginVertical: 10 },
});