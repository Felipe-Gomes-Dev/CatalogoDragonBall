import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { authMessage } from '../services/auth';
import { Button } from '../components/ui';
import { styles } from '../theme';
import { Brand, WarriorHero } from '../components/Brand';
export function LoginScreen() {
  const { width } = useWindowDimensions();
  const { login } = useAuth();
  const [register, setRegister] = useState(false),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false),
    [error, setError] = useState('');
  async function submit() {
    setError('');
    if (register && password !== confirm) {
      setError('As senhas precisam ser iguais.');
      return;
    }
    setBusy(true);
    try {
      await login(email, password, register);
    } catch (e) {
      setError(authMessage(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <KeyboardAvoidingView
      style={styles.page}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            flexGrow: 1,
            justifyContent: 'center',
            maxWidth: 1080,
            gap: width > 800 ? 30 : 20,
            paddingVertical: width > 800 ? 36 : 24,
          },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <Brand />
        <View
          style={{ flexDirection: width > 800 ? 'row' : 'column', gap: 32, alignItems: 'stretch' }}
        >
          <View style={{ flex: width > 800 ? 1 : undefined, justifyContent: 'center', gap: 18 }}>
            <WarriorHero login />
            {width > 800 && (
              <Text style={[styles.subtitle, { paddingHorizontal: 6 }]}>
                Personagens, transformações e histórias. Tudo em um só lugar.
              </Text>
            )}
          </View>
          <View
            style={[
              styles.panel,
              {
                flex: width > 800 ? 1 : undefined,
                maxWidth: width > 800 ? 420 : undefined,
                padding: 26,
              },
            ]}
          >
            <Text style={styles.section} accessibilityRole="header">
              {register ? 'Crie sua conta' : 'Entre no Catálogo Z'}
            </Text>
            <Text style={styles.subtitle}>
              {register
                ? 'Seu próximo time começa com você.'
                : 'Que bom ter você por aqui. Vamos continuar sua jornada?'}
            </Text>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              accessibilityLabel="E-mail"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              editable={!busy}
            />
            <Text style={styles.label}>Senha</Text>
            <TextInput
              accessibilityLabel="Senha, no mínimo 6 caracteres"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete={register ? 'new-password' : 'current-password'}
              editable={!busy}
              onSubmitEditing={!register ? submit : undefined}
            />
            {register && (
              <>
                <Text style={styles.label}>Confirme a senha</Text>
                <TextInput
                  accessibilityLabel="Confirme a senha"
                  style={styles.input}
                  value={confirm}
                  onChangeText={setConfirm}
                  secureTextEntry
                  editable={!busy}
                  onSubmitEditing={submit}
                />
              </>
            )}
            {!!error && (
              <Text style={styles.error} accessibilityRole="alert">
                {error}
              </Text>
            )}
            <Button title={register ? 'Criar conta' : 'Entrar'} busy={busy} onPress={submit} />
            <Button
              secondary
              title={register ? 'Já tenho uma conta' : 'Quero me cadastrar'}
              disabled={busy}
              onPress={() => {
                setRegister(!register);
                setError('');
              }}
            />
          </View>
        </View>
        <Text style={[styles.subtitle, { textAlign: 'center', fontSize: 12 }]}>
          Feito para explorar o universo de Akira Toriyama.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
