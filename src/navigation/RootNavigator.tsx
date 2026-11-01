import React from 'react';
import { View } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import { CollectionProvider, useCollection } from '../contexts/CollectionContext';
import { LoginScreen } from '../screens/LoginScreen';
import { CatalogScreen } from '../screens/CatalogScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { CollectionScreen } from '../screens/CollectionScreen';
import { StateView } from '../components/ui';
import { colors, styles } from '../theme';
import type { RootStackParams } from '../types';
const Stack = createNativeStackNavigator<RootStackParams>();
function AppStack() {
  const { loading, loadError, reload } = useCollection();
  if (loading || loadError) return <View style={styles.page}><StateView title={loading ? 'Recuperando sua coleção…' : 'Falha ao recuperar coleção'} busy={loading} message={loadError} retry={loadError ? reload : undefined} /></View>;
  return <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.navy }, headerTintColor: 'white', headerTitleStyle: { fontWeight: '800' }, contentStyle: { backgroundColor: colors.background } }}>
    <Stack.Screen name="Catalog" component={CatalogScreen} options={{ title: 'Dragon Ball', headerShown: false }} /><Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Buscar' }} /><Stack.Screen name="Details" component={DetailScreen} options={{ title: 'Personagem' }} /><Stack.Screen name="Favorites" component={CollectionScreen} options={{ title: 'Favoritos' }} /><Stack.Screen name="Consumed" component={CollectionScreen} options={{ title: 'Conhecidos' }} />
  </Stack.Navigator>;
}
export function RootNavigator() {
  const { user, restoring, restoreError, retry } = useAuth();
  if (restoring || restoreError) return <View style={styles.page}><StateView title={restoring ? 'Preparando sua jornada…' : 'Não foi possível recuperar a sessão'} busy={restoring} message={restoreError} retry={restoreError ? retry : undefined} /></View>;
  return <NavigationContainer theme={{ ...DarkTheme, colors: { ...DarkTheme.colors, primary: colors.orange, background: colors.background, card: colors.navy, text: colors.ink, border: colors.line } }}>{user ? <CollectionProvider key={user.id}><AppStack /></CollectionProvider> : <Stack.Navigator><Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} /></Stack.Navigator>}</NavigationContainer>;
}
