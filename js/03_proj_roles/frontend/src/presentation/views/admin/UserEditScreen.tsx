import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';

type UsersListNavProp = StackNavigationProp<
  RootStackParamList,
  'UsersListScreen'
>;

interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  role: string;
}

const UsersListScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigation = useNavigation<UsersListNavProp>();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = await AsyncStorage.getItem('session_token');
      if (!token) {
        Alert.alert('Error', 'No token found');
        return;
      }

      const response = await axios.get(
        'http://192.168.1.34:3000/api/users',
        {
          headers: {
            Authorization: token, // ✅ El token ya incluye el "JWT ..."
          },
        }
      );

      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        Alert.alert('Error', 'Could not fetch users');
      }
    } catch (error: any) {
      console.log(error.response?.data || error.message);
      Alert.alert('Error', 'Failed to fetch users');
    }
  };

  const deleteUser = async (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('session_token');
              if (!token) {
                Alert.alert('Error', 'No token found');
                return;
              }

              await axios.delete(
                `http://192.168.1.34:3000/api/users/delete/${id}`,
                {
                  headers: {
                    Authorization: token,
                  },
                }
              );

              Alert.alert('Deleted', 'User has been deleted');
              fetchUsers();
            } catch (error: any) {
              console.log(error.response?.data || error.message);
              Alert.alert('Error', 'Failed to delete user');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        {item.name} {item.lastname}
      </Text>
      <Text style={styles.cardText}>📧 {item.email}</Text>
      <Text style={styles.cardText}>👤 {item.role}</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
          onPress={() => navigation.navigate('UserDetailScreen', { userId: item.id } as never)}
        >
          <Text style={styles.actionText}>View</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#FFC107' }]}
          onPress={() => navigation.navigate('UserEditScreen', { userId: item.id } as never)}
        >
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#E74C3C' }]}
          onPress={() => deleteUser(item.id)}
        >
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Users List</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={{ color: '#BBB', textAlign: 'center', marginTop: 20 }}>
            No users found
          </Text>
        }
      />
    </View>
  );
};

export default UsersListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 15,
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#2C2C2C',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    color: '#DDD',
    fontSize: 14,
    marginVertical: 1,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  actionButton: {
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 2,
  },
  actionText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
