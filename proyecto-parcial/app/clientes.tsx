import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useState, useCallback } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { getClientes } from '../services/clienteService';

export default function Clientes() {
  const router = useRouter();
  const [clientes, setClientes] = useState<any[]>([]);

 
  useFocusEffect(
    useCallback(() => {
      const data = getClientes();
      setClientes([...data]); // nueva referencia real
    }, [])
  );

  return (
    <LinearGradient
      colors={['#4c669f', '#4f51be', '#e6ebfa']}
      style={styles.container}
    >
    
      <View style={styles.headerContainer}>
        <MaterialIcons name="groups" size={28} color="white" />
        <Text style={styles.header}>Clientes</Text>
      </View>

      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              router.push({
                pathname: '/cliente-detalle',
                params: { id: item.id },
              })
            }
          >
            <View style={styles.row}>
              {/* ICONO */}
              <View style={styles.iconContainer}>
                <MaterialIcons name="person" size={26} color="#4f51be" />
              </View>

              {/* INFO */}
              <View style={{ flex: 1 }}>
                <Text style={styles.nombre}>{item.nombre}</Text>
                <Text style={styles.correo}>{item.correo}</Text>

                <Text style={styles.dinero}>
                  ${item.dinero}
                </Text>
              </View>

              {/* FLECHA */}
              <MaterialIcons name="chevron-right" size={24} color="#999" />
            </View>
          </TouchableOpacity>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  // 🔥 HEADER PRO
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },

  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },

 
  card: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
    elevation: 6,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },

  iconContainer: {
    backgroundColor: '#eef0ff',
    padding: 10,
    borderRadius: 50,
  },

  nombre: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  correo: {
    color: 'gray',
    fontSize: 13,
  },

  dinero: {
    marginTop: 6,
    fontWeight: 'bold',
    color: '#4f51be',
  },
});
