import React, { useState } from 'react';
import styles from './Styles';
import { Text, View, Image, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { CustomTextInput } from '../../components/CustomTextInput';
import { RoundedButton } from '../../components/RoundedButton';
// ❌ ELIMINADO: import { Picker } from '@react-native-picker/picker';
import useViewModel from './ViewModel';

export const RegisterScreen = () => {

  const {
    name,
    lastname,
    phone,
    email,
    password,
    confirmPassword,
    role,
    errors,
    onChange,
    register
  } = useViewModel();

  // ✅ Declaramos el estado para el modal
  const [showRoleModal, setShowRoleModal] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/chef.jpg')}
        style={styles.imageBackground}
      />
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../../assets/logo.png')}
          style={styles.logoImage}
        />
        <Text style={styles.logoText}>FOOD APP</Text>
      </View>
      <View style={styles.form}>
        <ScrollView>
          <Text style={styles.formText}>REGÍSTRATE</Text>

          <CustomTextInput
            image={require('../../../../assets/user.png')}
            placeholder="Nombres"
            keyboardType="default"
            property="name"
            onChangeText={onChange}
            value={name}
            error={errors.name}
          />

          <CustomTextInput
            image={require('../../../../assets/my_user.png')}
            placeholder="Apellidos"
            keyboardType="default"
            property="lastname"
            onChangeText={onChange}
            value={lastname}
            error={errors.lastname}
          />

          <CustomTextInput
            image={require('../../../../assets/email.png')}
            placeholder="Correo Electrónico"
            keyboardType="email-address"
            property="email"
            onChangeText={onChange}
            value={email}
            error={errors.email}
          />

          <CustomTextInput
            image={require('../../../../assets/phone.png')}
            placeholder="Teléfono"
            keyboardType="numeric"
            property="phone"
            onChangeText={onChange}
            value={phone}
            error={errors.phone}
          />

          <CustomTextInput
            image={require('../../../../assets/password.png')}
            placeholder="Contraseña"
            keyboardType="default"
            property="password"
            onChangeText={onChange}
            value={password}
            secureTextEntry={true}
            error={errors.password}
          />

          <CustomTextInput
            image={require('../../../../assets/confirm_password.png')}
            placeholder="Confirmar Contraseña"
            keyboardType="default"
            property="confirmPassword"
            onChangeText={onChange}
            value={confirmPassword}
            secureTextEntry={true}
            error={errors.confirmPassword}
          />

          <TouchableOpacity
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginTop: 15,
    paddingVertical: 8,
  }}
  onPress={() => setShowRoleModal(true)}
>
  <Image
    source={require('../../../../assets/user.png')}
    style={{ width: 25, height: 25, marginRight: 10 }}
  />
  <Text style={{ fontSize: 16, color: '#666' }}>
    {role === 'admin' ? 'Admin' : 'User'}
  </Text>
</TouchableOpacity>

<Modal transparent={true} visible={showRoleModal} animationType="fade">
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    }}
  >
    <View
      style={{
        backgroundColor: 'white',
        padding: 20,
        width: '80%',
        borderRadius: 8,
      }}
    >
      <Text style={{ fontSize: 18, marginBottom: 15 }}>Select Role</Text>

      <TouchableOpacity
        style={{ paddingVertical: 10 }}
        onPress={() => {
          onChange('role', 'user');
          setShowRoleModal(false);
        }}
      >
        <Text>User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ paddingVertical: 10 }}
        onPress={() => {
          onChange('role', 'admin');
          setShowRoleModal(false);
        }}
      >
        <Text>Admin</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setShowRoleModal(false)}
        style={{ marginTop: 10 }}
      >
        <Text style={{ color: 'red' }}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>




          <View style={{ marginTop: 10 }}>
            <RoundedButton text="CONFIRMAR" onPress={() => register()} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
