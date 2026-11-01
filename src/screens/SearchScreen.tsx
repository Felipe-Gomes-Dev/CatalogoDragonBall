import React, { useState } from 'react';
import { ActivityIndicator, Text, TextInput, View } from 'react-native';
import { useCharacters } from '../hooks/useCharacters';
import { CharacterGrid } from '../components/CharacterGrid';
import { Button, StateView } from '../components/ui';
import { colors, styles } from '../theme';
const races = [{ label: 'Todas', value: '' }, { label: 'Saiyajins', value: 'Saiyan' }, { label: 'Humanos', value: 'Human' }, { label: 'Namekuseijins', value: 'Namekian' }, { label: 'Androides', value: 'Android' }, { label: 'Majins', value: 'Majin' }];
export function SearchScreen() {
  const [text, setText] = useState(''), [race, setRace] = useState('');
  const [submitted, setSubmitted] = useState<{ name: string; race: string } | null>(null);
  const search = useCharacters(submitted?.name ?? '', submitted?.race ?? '', !!submitted);
  function submit() { if (submitted?.name === text.trim() && submitted.race === race) void search.retry(); else setSubmitted({ name: text.trim(), race }); }
  return <CharacterGrid items={search.items} refreshing={search.refreshing} onRefresh={submitted ? search.refresh : undefined} onEndReached={search.loadMore}
    header={<View style={{ gap: 14, paddingBottom: 10 }}><Text style={styles.title} accessibilityRole="header">Encontre seu guerreiro</Text><Text style={styles.subtitle}>Busque pelo nome e filtre pela raça.</Text>
      <TextInput style={styles.input} accessibilityLabel="Nome do personagem" placeholder="Ex.: Goku, Vegeta, Bulma" placeholderTextColor={colors.muted} value={text} onChangeText={setText} returnKeyType="search" onSubmitEditing={submit} />
      <Text style={styles.label}>Filtrar por raça</Text>
      <View style={styles.row}>{races.map(option => <Button compact key={option.value} title={option.label} secondary={race !== option.value} selected={race === option.value} onPress={() => setRace(option.value)} />)}</View><Button title="Buscar" busy={search.loading && !!submitted} onPress={submit} />
      {!!submitted && !search.loading && !search.error && <Text style={styles.subtitle} accessibilityLiveRegion="polite">{search.items.length === 1 ? '1 personagem encontrado' : `${search.items.length} personagens encontrados`}</Text>}
      {!!search.error && search.items.length > 0 && <StateView title="Não foi possível atualizar" message={search.error} retry={search.retry} />}
    </View>}
    empty={<StateView title={!submitted ? 'Quem você quer conhecer?' : search.loading ? 'Buscando personagens…' : search.error ? 'Falha na busca' : 'Nenhum personagem encontrado'} message={!submitted ? 'Digite um nome ou escolha uma raça e toque em Buscar.' : search.error || (!search.loading ? 'Tente outro nome ou altere o filtro.' : undefined)} busy={!!submitted && search.loading} retry={search.error ? search.retry : undefined} />}
    footer={search.loadingMore ? <ActivityIndicator color={colors.blue} style={{ padding: 20 }} /> : search.moreError ? <StateView title="Falha ao carregar mais" message={search.moreError} retry={search.retryMore} /> : undefined} />;
}
