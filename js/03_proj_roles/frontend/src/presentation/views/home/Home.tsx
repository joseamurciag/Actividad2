import React from 'react';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import HomeStyles from './Styles';
import { RoundedButton } from '../../components/RoundedButton';
import { CustomTextInput } from '../../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import useViewModel from './ViewModel';

export const HomeScreen = () => {
  const { email, password, onChange, login } = useViewModel();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    const result = await login();

    if (result?.success === false) {
      Alert.alert('Error', result.error || 'Login failed');
    }
  };

  return (
    <View style={HomeStyles.container}>
      <Image
        source={require('../../../../assets/chef.jpg')}
        style={HomeStyles.imageBackground}
      />
      <View style={HomeStyles.logoContainer}>
        <Image
          source={require('../../../../assets/logo.png')}
          style={HomeStyles.logoImage}
        />
        <Text style={HomeStyles.logoText}>FOOD APP</Text>
      </View>
      <View style={HomeStyles.form}>
        <Text style={HomeStyles.formText}>INGRESAR</Text>
        <CustomTextInput
          image={require('../../../../assets/email.png')}
          placeholder='Correo Electrónico'
          keyboardType='email-address'
          property='email'
          onChangeText={onChange}
          value={email}
        />
        <CustomTextInput
          image={require('../../../../assets/password.png')}
          placeholder='Contraseña'
          keyboardType='default'
          property='password'
          onChangeText={onChange}
          value={password}
          secureTextEntry={true}
        />
        <View style={{ marginTop: 30 }}>
          <RoundedButton text='ENVIAR' onPress={handleLogin} />
        </View>
        <View style={HomeStyles.formRegister}>
          <Text>¿No tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={HomeStyles.formRegisterText}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
