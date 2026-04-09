import { Drawer } from 'expo-router/drawer';
import { AuthProvider } from '../context/AuthContext';

export default function Layout() {
  return (
    <AuthProvider>
      <Drawer>
        <Drawer.Screen name="index" options={{ title: "Inicio" }} />
        <Drawer.Screen name="login" options={{ title: "Login" }} />
        <Drawer.Screen name="registro" options={{ title: "Registro" }} />
        <Drawer.Screen name="clientes" options={{ title: "Clientes" }} />
        <Drawer.Screen name="admin-home" options={{ title: "Admin" }} />
        <Drawer.Screen name="user-home" options={{ title: "Usuario" }} />
      </Drawer>
    </AuthProvider>
  );
}