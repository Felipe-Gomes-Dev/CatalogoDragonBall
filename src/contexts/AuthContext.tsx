import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authenticate, restoreUser, logout, authMessage } from '../services/auth';
import { supabase } from '../services/supabase';
import type { AppUser } from '../types';
interface AuthValue {
  user: AppUser | null; restoring: boolean; restoreError: string;
  retry: () => void; login: (email: string, password: string, register: boolean) => Promise<void>; signOut: () => Promise<void>;
}
const AuthContext = createContext<AuthValue | null>(null);
export function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [restoring, setRestoring] = useState(true);
  const [restoreError, setRestoreError] = useState('');
  const retry = useCallback(() => {
    setRestoring(true); setRestoreError('');
    restoreUser().then(setUser).catch(e => setRestoreError(authMessage(e))).finally(() => setRestoring(false));
  }, []);
  useEffect(() => {
    retry();
    const subscription = supabase?.auth.onAuthStateChange((_event, session) => {
      const u = session?.user;
      setUser(u ? { id: u.id, email: u.email ?? '', remote: true } : null);
    });
    return () => subscription?.data.subscription.unsubscribe();
  }, [retry]);
  return <AuthContext.Provider value={{ user, restoring, restoreError, retry,
    login: async (email, password, register) => { setUser(await authenticate(email, password, register)); },
    signOut: async () => { await logout(); setUser(null); },
  }}>{children}</AuthContext.Provider>;
}
export function useAuth() { const value = useContext(AuthContext); if (!value) throw new Error('AuthProvider ausente'); return value; }
