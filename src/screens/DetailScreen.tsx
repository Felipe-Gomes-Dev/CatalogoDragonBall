import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import axios from 'axios';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { cleanText, errorMessage, getCharacter } from '../services/api';
import { useCollection } from '../contexts/CollectionContext';
import { Button, CharacterImage, Stars, StateView } from '../components/ui';
import type { Character, RootStackParams } from '../types';
import { colors, styles } from '../theme';
import { localizeCharacter } from '../locales/pt-BR';
export function DetailScreen({ route, navigation }: NativeStackScreenProps<RootStackParams, 'Details'>) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true), [error, setError] = useState(''), [saveError, setSaveError] = useState('');
  const [busy, setBusy] = useState(false), [attempt, setAttempt] = useState(0);
  const { entries, update } = useCollection();
  useEffect(() => {
    const controller = new AbortController(); setLoading(true); setError('');
    getCharacter(route.params.id, controller.signal).then(data => { if (!controller.signal.aborted) { const translated = localizeCharacter(data); setCharacter(translated); navigation.setOptions({ title: translated.name }); } })
      .catch(e => { if (!axios.isCancel(e) && !controller.signal.aborted) setError(errorMessage(e)); }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [route.params.id, navigation, attempt]);
  if (loading) return <View style={styles.page}><StateView title="Carregando personagem…" busy /></View>;
  if (error || !character) return <View style={styles.page}><StateView title="Falha ao carregar detalhes" message={error} retry={() => setAttempt(v => v + 1)} /></View>;
  const entry = entries[character.id];
  async function save(changes: Parameters<typeof update>[1]) {
    if (busy || !character) return; setBusy(true); setSaveError('');
    try { await update(character, changes); } catch { setSaveError('Não foi possível salvar no aparelho. Tente novamente.'); } finally { setBusy(false); }
  }
  return <ScrollView style={styles.page} contentContainerStyle={styles.content}>
    <CharacterImage key={character.id} uri={character.image} name={character.name} large /><Text style={styles.title} accessibilityRole="header">{character.name}</Text>
    <View style={styles.row}><Text style={[styles.label, { color: colors.cyan, backgroundColor: colors.pale, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8 }]}>{character.race}</Text><Text style={styles.subtitle}>{character.affiliation}</Text></View>
    <View style={styles.panel}><Button title={entry?.favorite ? '♥ Remover dos favoritos' : '♡ Adicionar aos favoritos'} selected={!!entry?.favorite} busy={busy} onPress={() => save({ favorite: !entry?.favorite })} />
      <Button secondary title={entry?.consumed ? '✓ Conhecido — desmarcar' : 'Marcar como conhecido'} selected={!!entry?.consumed} disabled={busy} onPress={() => save({ consumed: !entry?.consumed })} />
      {!!entry?.consumed && <><Text style={styles.label}>Sua nota: {entry.rating ? `${entry.rating} de 5` : 'ainda sem avaliação'}</Text><View pointerEvents={busy ? 'none' : 'auto'}><Stars value={entry.rating} onChange={rating => save({ rating })} /></View></>}
      {!!saveError && <Text style={styles.error} accessibilityRole="alert">{saveError}</Text>}
    </View>
    <View style={styles.panel}><Text style={styles.section} accessibilityRole="header">Poder e origem</Text><View style={[styles.row, { alignItems: 'flex-start', gap: 24 }]}><View style={{ flex: 1, minWidth: 110, gap: 6 }}><Text style={styles.subtitle}>Ki</Text><Text style={[styles.section, { color: colors.gold }]}>{character.ki || 'Não informado'}</Text></View><View style={{ flex: 1, minWidth: 110, gap: 6 }}><Text style={styles.subtitle}>Ki máximo</Text><Text style={[styles.section, { color: colors.gold }]}>{character.maxKi || 'Não informado'}</Text></View></View><Text style={styles.subtitle}>Gênero: {character.gender || 'Não informado'}</Text></View>
    <Text style={styles.section} accessibilityRole="header">História</Text><Text style={styles.text}>{cleanText(character.description) || 'Descrição indisponível.'}</Text>
    {character.originPlanet && <View style={styles.panel}><Text style={styles.section} accessibilityRole="header">Planeta {character.originPlanet.name}</Text><CharacterImage uri={character.originPlanet.image} name={character.originPlanet.name} /><Text style={styles.text}>{cleanText(character.originPlanet.description)}</Text><Text style={styles.subtitle}>{character.originPlanet.isDestroyed ? 'Planeta destruído' : 'Planeta preservado'}</Text></View>}
    {!!character.transformations?.length && <><Text style={styles.section} accessibilityRole="header">Transformações</Text>{character.transformations.map(form => <View key={form.id} style={styles.panel}><CharacterImage uri={form.image} name={form.name} /><Text style={styles.section}>{form.name}</Text><Text style={styles.text}>Ki: {form.ki}</Text></View>)}</>}
  </ScrollView>;
}
