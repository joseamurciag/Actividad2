import { useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';

const useViewModel = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = (property: string, value: string) => {
    if (property === 'email') setEmail(value);
    if (property === 'password') setPassword(value);
  };

  const login = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Both fields are required');
      return { success: false };
    }

    try {
      const response = await axios.post(
        'http://192.168.1.34:3000/api/users/login',
        { email, password }
      );

      console.log('✅ Login exitoso:', response.data);

      const user = response.data.data;
      const token = user.session_token;

      await AsyncStorage.setItem('session_token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'admin') {
        navigation.navigate('AdminHomeScreen');
      } else {
        navigation.navigate('UserHomeScreen');
      }

      return { success: true };
    } catch (error: any) {
      console.log('❌ Error en login:', error.response?.data || error.message);
      Alert.alert('Login failed', 'Invalid credentials');
      return { success: false, error: 'Login failed' };
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
