// Opt-in integration check. Uses test accounts only; never asks for personal credentials.
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'node:crypto';
import assert from 'node:assert/strict';
const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) throw new Error('Preencha o .env com a configuração pública do Supabase.');
const response = await fetch(`${url}/auth/v1/settings`, { headers: { apikey: key }, signal: AbortSignal.timeout(15000) });
const settings = await response.json();
if (!settings.mailer_autoconfirm || settings.disable_signup) throw new Error('Teste interrompido: exige cadastro sem envio de e-mail de confirmação.');
const makeClient = () => createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (input, init) => fetch(input, { ...init, signal: AbortSignal.timeout(15000) }) } });
const first = makeClient(), second = makeClient(), reopened = makeClient();
const tag = randomUUID();
const password = `Z!${randomUUID()}`;
const emails = [`catalogoz.qa.a.${tag}@example.com`, `catalogoz.qa.b.${tag}@example.com`];
let firstId;
try {
  const a = await first.auth.signUp({ email: emails[0], password });
  assert.ifError(a.error); assert.ok(a.data.session); firstId = a.data.user.id;
  const b = await second.auth.signUp({ email: emails[1], password });
  assert.ifError(b.error); assert.ok(b.data.session);
  console.log('PASS: cadastro e sessão de duas contas de teste (sem envio de e-mail).');
  const row = { user_id: firstId, character_id: 1, character: { id: 1, name: 'Goku', race: 'Saiyan', image: '' }, is_favorite: true, is_consumed: true, rating: 4, updated_at: new Date().toISOString() };
  const write = await first.from('dragonball_items').upsert(row);
  assert.ifError(write.error);
  const stored = await first.from('dragonball_items').select('*').eq('character_id', 1).single();
  assert.ifError(stored.error); assert.equal(stored.data.rating, 4); assert.equal(stored.data.is_favorite, true);
  console.log('PASS: favorito, conhecido e nota persistidos no servidor.');
  const hidden = await second.from('dragonball_items').select('*').eq('user_id', firstId);
  assert.ifError(hidden.error); assert.deepEqual(hidden.data, []);
  const forbidden = await second.from('dragonball_items').upsert({ ...row, rating: 1 });
  assert.ok(forbidden.error, 'RLS precisa rejeitar escrita para outro usuário.');
  console.log('PASS: RLS impede leitura e escrita entre contas.');
  const login = await reopened.auth.signInWithPassword({ email: emails[0], password });
  assert.ifError(login.error);
  const persisted = await reopened.from('dragonball_items').select('rating').eq('character_id', 1).single();
  assert.ifError(persisted.error); assert.equal(persisted.data.rating, 4);
  const refresh = await reopened.auth.refreshSession(); assert.ifError(refresh.error); assert.ok(refresh.data.session);
  console.log('PASS: novo login recupera a coleção e renova a sessão.');
  const unmark = await reopened.from('dragonball_items').upsert({ ...row, is_favorite: false, is_consumed: false, rating: 0, updated_at: new Date().toISOString() });
  assert.ifError(unmark.error);
  const cleared = await first.from('dragonball_items').select('*').eq('character_id', 1).single();
  assert.ifError(cleared.error); assert.equal(cleared.data.is_favorite, false); assert.equal(cleared.data.rating, 0);
  console.log('PASS: desmarcação propagada entre sessões.');
} finally {
  if (firstId) {
    const result = await first.from('dragonball_items').delete().eq('user_id', firstId).eq('character_id', 1);
    if (result.error) console.log('Limpeza da linha de teste pendente.');
  }
  await Promise.all([first.auth.signOut(), second.auth.signOut(), reopened.auth.signOut()]);
  console.log('Linhas de coleção de teste removidas. Contas QA ficam no Auth com prefixo catalogoz.qa.; nenhum dado Pokémon foi alterado.');
}
