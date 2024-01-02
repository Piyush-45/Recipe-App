import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { DataContextProvider } from './context/useFetch';
import { AppNavigator } from './Navigation';
import {  AppAuthenticationProvider } from './context/useAuth';

export default function App() {
  return (
    <DataContextProvider>

      <AppAuthenticationProvider>
        <AppNavigator />
      </AppAuthenticationProvider>

    </DataContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
