import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/presentation/views/home/Home';
import { RegisterScreen } from './src/presentation/views/register/Register';

import AdminHomeScreen from './src/presentation/views/admin/AdminHomeScreen';
import UserHomeScreen from './src/presentation/views/user/UserHomeScreen';

import UsersListScreen from './src/presentation/views/admin/UsersListScreen';
//import UserCreateScreen from './src/presentation/views/admin/UserCreateScreen';
//import UserEditScreen from './src/presentation/views/admin/UserEditScreen';
//import UserDetailScreen from './src/presentation/views/admin/UserDetailScreen';
        // <Stack.Screen name="UserCreateScreen" component={UserCreateScreen} />
        // <Stack.Screen name="UserEditScreen" component={UserEditScreen} />
        // <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} />
import UserDeleteScreen from './src/presentation/views/admin/UserDeleteScreen';


export type RootStackParamList = {
  HomeScreen: undefined;
  RegisterScreen: undefined;
  AdminHomeScreen: undefined;
  UserHomeScreen: undefined;
  UsersListScreen: undefined;
  UserCreateScreen: undefined;
  UserEditScreen: undefined;
  UserDetailScreen: undefined;
  UserDeleteScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: true, title: 'Registro' }}
        />

        <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen} />
        <Stack.Screen name="UserHomeScreen" component={UserHomeScreen} />

        <Stack.Screen name="UsersListScreen" component={UsersListScreen} />

        <Stack.Screen name="UserDeleteScreen" component={UserDeleteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
