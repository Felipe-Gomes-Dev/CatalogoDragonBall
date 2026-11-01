import * as Crypto from 'expo-crypto';
import { pbkdf2Async } from '@noble/hashes/pbkdf2.js';
import { sha256 } from '@noble/hashes/sha2.js';
import { bytesToHex } from '@noble/hashes/utils.js';
import { secretStorage, readJSON, writeJSON } from './storage';
import { supabase } from './supabase';
import type { AppUser } from '../types';

interface LocalAccount { salt: string; hash: string }
const accountKey = 'catalogo-z-accounts';
const sessionKey = 'catalogo-z-local-session';
const hashPassword = (password: string, salt: string) => pbkdf2Async(sha256, password, salt, { c: 100000, dkLen: 32 }).then(bytesToHex);
export function authMessage(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  if (/invalid login credentials/i.test(message)) return 'E-mail ou senha inválidos.';
  if (/email not confirmed/i.test(message)) return 'Confirme seu e-mail antes de entrar.';
  if (/already registered/i.test(message)) return 'Esse e-mail já está cadastrado.';
  if (/fetch|network/i.test(message)) return 'Não foi possível conectar. Verifique sua internet.';
  if (/rate limit/i.test(message)) return 'Muitas tentativas. Aguarde antes de tentar novamente.';
  if (/invalid email|email address.*invalid/i.test(message)) return 'Digite um e-mail válido.';
  if (/password.*(weak|least|characters)/i.test(message)) return 'Escolha uma senha mais forte, com pelo menos 6 caracteres.';
  if (/signup.*disabled|signups.*not allowed/i.test(message)) return 'O cadastro está temporariamente indisponível. Tente novamente mais tarde.';
  if (/^(Não|Digite|A senha|As senhas|Esse e-mail|E-mail|Conta criada|Confirme)/.test(message)) return message;
  return 'Não foi possível concluir a autenticação. Tente novamente.';
}
export async function authenticate(email: string, password: string, register: boolean): Promise<AppUser> {
  email = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Digite um e-mail válido.');
  if (password.length < 6) throw new Error('A senha deve ter pelo menos 6 caracteres.');
  if (supabase) {
    const { data, error } = register
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(authMessage(error));
    if (!data.session || !data.user) throw new Error('Conta criada! Confirme o e-mail recebido e depois entre.');
    return { id: data.user.id, email: data.user.email ?? email, remote: true };
  }
  const accounts = await readJSON<Record<string, LocalAccount>>(accountKey, {});
  if (register) {
    if (accounts[email]) throw new Error('Esse e-mail já está cadastrado neste aparelho.');
    const salt = Crypto.randomUUID();
    accounts[email] = { salt, hash: await hashPassword(password, salt) };
    await writeJSON(accountKey, accounts);
  } else {
    const account = accounts[email];
    if (!account || await hashPassword(password, account.salt) !== account.hash) throw new Error('E-mail ou senha inválidos.');
  }
  const user: AppUser = { id: email, email, remote: false };
  await secretStorage.setItem(sessionKey, JSON.stringify(user));
  return user;
}
export async function restoreUser(): Promise<AppUser | null> {
  if (supabase) {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    const user = data.session?.user;
    return user ? { id: user.id, email: user.email ?? '', remote: true } : null;
  }
  const raw = await secretStorage.getItem(sessionKey);
  return raw ? JSON.parse(raw) : null;
}
export async function logout() {
  if (supabase) {
    const { error } = await supabase.auth.signOut({ scope: 'local' });
    if (error) throw error;
  }
  await secretStorage.removeItem(sessionKey);
}
