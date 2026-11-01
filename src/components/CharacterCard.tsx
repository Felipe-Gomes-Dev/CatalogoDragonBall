import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCollection } from '../contexts/CollectionContext';
import type { Character, RootStackParams } from '../types';
import { colors, font, styles } from '../theme';
import { CharacterImage } from './ui';
export function CharacterCard({ character }: { character: Character }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { entries, update } = useCollection();
  const entry = entries[character.id];
  const [error, setError] = useState(''), [busy, setBusy] = useState(false);
  async function favorite() {
    setBusy(true); setError('');
    try { await update(character, { favorite: !entry?.favorite }); }
    catch { setError('Não foi possível salvar. Toque novamente para tentar.'); }
    finally { setBusy(false); }
  }
  return <View style={card.container}>
    <Pressable onPress={() => navigation.navigate('Details', { id: character.id })} accessibilityRole="button" accessibilityLabel={`${character.name}, ${character.race || 'raça desconhecida'}${entry?.consumed ? ', conhecido' : ''}. Abrir detalhes.`} style={({ pressed }) => [{ gap: 8, opacity: pressed ? 0.7 : 1 }]}>
      <CharacterImage uri={character.image} name={character.name} />
      <View style={{ padding: 14, paddingTop: 4, gap: 7 }}><Text style={card.race}>{character.race || 'Raça desconhecida'}</Text><Text style={card.name}>{character.name}</Text>
      {entry?.consumed && <Text style={card.badge}>Conhecido {entry.rating ? `• ${entry.rating}/5 ★` : ''}</Text>}
      <Text style={{ fontFamily: font, fontSize: 12, color: colors.muted }}>{character.affiliation || 'Ver personagem'}  ↗</Text></View>
    </Pressable>
    <Pressable onPress={favorite} disabled={busy} accessibilityRole="button" accessibilityLabel={entry?.favorite ? '♥ Favorito' : '♡ Favoritar'} accessibilityState={{ selected: !!entry?.favorite, busy }} style={[card.favorite, entry?.favorite && { borderColor: colors.orange }]}>
      {busy ? <ActivityIndicator size="small" color={colors.orange} /> : <Text style={{ color: entry?.favorite ? colors.orange : colors.ink, fontSize: 23 }}>{entry?.favorite ? '♥' : '♡'}</Text>}
    </Pressable>
    {!!error && <Text style={styles.error} accessibilityRole="alert">{error}</Text>}
  </View>;
}
const card = StyleSheet.create({
  container: { flex: 1, padding: 6, borderRadius: 20, backgroundColor: colors.paper, borderColor: colors.line, borderWidth: 1, gap: 5 },
  name: { fontFamily: font, fontSize: 23, fontWeight: '800', letterSpacing: -0.6, color: colors.ink },
  race: { fontFamily: font, color: colors.cyan, fontSize: 12, fontWeight: '700' },
  badge: { fontFamily: font, color: colors.gold, fontSize: 12, fontWeight: '700' },
  favorite: { position: 'absolute', right: 12, top: 12, width: 44, height: 44, borderRadius: 22, backgroundColor: '#101C30ED', borderWidth: 1, borderColor: '#41506A', alignItems: 'center', justifyContent: 'center' },
});
