import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../../App';

type AdminNavProp = StackNavigationProp<RootStackParamList, 'AdminHomeScreen'>;

const AdminHomeScreen = () => {
  const navigation = useNavigation<AdminNavProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('UsersListScreen')}
      >
        <Text style={styles.textButton}>📋 List Users</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('UserDetailScreen')}
      >
        <Text style={styles.textButton}>🔍 Get User by ID</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('UserCreateScreen')}
      >
        <Text style={styles.textButton}>➕ Create User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('UserEditScreen')}
      >
        <Text style={styles.textButton}>✏️ Update User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('UserDeleteScreen' as never)}
      >
        <Text style={styles.textButton}>🗑️ Delete User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#E74C3C' }]}
        onPress={() => navigation.navigate('HomeScreen')}
      >
        <Text style={styles.textButton}>🚪 Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FF8C00',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
