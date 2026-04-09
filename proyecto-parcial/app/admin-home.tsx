import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function AdminHome() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.role !== "admin") {
      router.replace('/login');
    }
  }, [user]);

  return null;
}