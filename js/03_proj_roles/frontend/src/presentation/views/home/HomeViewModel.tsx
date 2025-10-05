import { useState } from 'react';
import axios from 'axios';

interface LoginResult {
  success: boolean;
  data?: any;
  error?: string;
}

const useViewModel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = (property: string, value: string) => {
    if (property === 'email') setEmail(value);
    if (property === 'password') setPassword(value);
  };

  const login = async (): Promise<LoginResult> => {
    try {
      const response = await axios.post('http://192.168.1.34:3000/api/users/login', {
        email,
        password,
      });

      console.log('✅ Login exitoso:', response.data);
      return { success: true, data: response.data };

    } catch (error: any) {
      console.log('❌ Error en login:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  };

  return {
    email,
    password,
    onChange,
    login,
  };
};

export default useViewModel;
