import axios from 'axios';
import { Platform } from 'react-native';

// ✅ Si usas emulador Android: usar 10.0.2.2
// ✅ Si estás en dispositivo físico o Expo Go: usar la IP local
const API_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:3000/api/users'
    : 'http://192.168.1.34:3000/api/users';

export const registerUser = async (userData: any) => {
  try {
    console.log("📤 Enviando datos a backend:", userData);

    const response = await axios.post(`${API_URL}/create`, userData);
    console.log("✅ Respuesta del backend:", response.data);

    return response.data;
  } catch (error: any) {
    console.log("❌ Error en registerUser:", error);
    throw error;
  }
};
