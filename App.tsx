import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { colors } from './src/theme';
export default function App() {
  return <SafeAreaProvider><SafeAreaView style={{ flex: 1, backgroundColor: colors.navy }} edges={['top', 'bottom']}>
    <StatusBar style="light" /><AuthProvider><RootNavigator /></AuthProvider>
  </SafeAreaView></SafeAreaProvider>;
}
