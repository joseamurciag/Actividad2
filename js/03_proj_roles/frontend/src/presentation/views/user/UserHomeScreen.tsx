import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const UserHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome User</Text>
      <Text style={styles.subtitle}>Enjoy the app experience.</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20
  },
  button: {
    backgroundColor: '#2ECC71',
    padding: 10,
    borderRadius: 8
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  }
});
