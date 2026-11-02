import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { colors } from './src/theme';
export default function App() {
  useEffect(() => {
    if (Platform.OS === 'web') document.documentElement.lang = 'pt-BR';
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.navy }} edges={['top', 'bottom']}>
        <StatusBar style="light" />
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
