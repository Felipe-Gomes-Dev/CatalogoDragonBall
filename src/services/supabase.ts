import 'react-native-url-polyfill/auto';
import { createClient, processLock } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
export const cloudEnabled = process.env.EXPO_PUBLIC_AUTH_MODE !== 'local' && !!url && !!key;
export const supabase = cloudEnabled
  ? createClient(url!, key!, {
      global: {
        fetch: (input, init) =>
          fetch(input, { ...init, signal: init?.signal ?? AbortSignal.timeout(15000) }),
      },
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
        lock: processLock,
        storageKey: 'catalogo-z-auth',
      },
    })
  : null;
if (supabase && Platform.OS !== 'web') {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') supabase.auth.startAutoRefresh();
    else supabase.auth.stopAutoRefresh();
  });
}
