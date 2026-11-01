import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export async function readJSON<T>(key: string, fallback: T): Promise<T> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; }
  catch { throw new Error('Os dados salvos não puderam ser lidos. Tente abrir o aplicativo novamente.'); }
}
export const writeJSON = (key: string, value: unknown) => AsyncStorage.setItem(key, JSON.stringify(value));

// SecureStore no celular; armazenamento da sessão separado no navegador.
export const secretStorage = {
  getItem: (key: string) => Platform.OS === 'web' ? AsyncStorage.getItem(key) : SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => Platform.OS === 'web' ? AsyncStorage.setItem(key, value) : SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => Platform.OS === 'web' ? AsyncStorage.removeItem(key) : SecureStore.deleteItemAsync(key),
};
