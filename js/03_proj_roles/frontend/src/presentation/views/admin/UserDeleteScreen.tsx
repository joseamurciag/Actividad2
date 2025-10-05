import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../../App';

type DeleteUserNavProp = StackNavigationProp<RootStackParamList, 'UserDeleteScreen'>;

const UserDeleteScreen = () => {
  const [userId, setUserId] = useState('');
  const navigation = useNavigation<DeleteUserNavProp>();

  const deleteUser = async () => {
    if (!userId) {
      Alert.alert('Error', 'Please enter a User ID');
      return;
    }

    try {
      const response = await axios.delete(`http://192.168.1.34:3000/api/users/${userId}`);
      Alert.alert('Success', response.data.message);
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Error deleting user');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delete User</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter User ID"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={userId}
        onChangeText={setUserId}
      />

      <TouchableOpacity style={styles.button} onPress={deleteUser}>
        <Text style={styles.buttonText}>🗑️ Delete User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#555' }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>⬅️ Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserDeleteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FF8C00',
    borderRadius: 10,
    padding: 10,
    color: 'white',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF4500',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
