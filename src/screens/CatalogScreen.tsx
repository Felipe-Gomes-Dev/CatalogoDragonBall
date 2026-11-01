import React, { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import { useCollection } from '../contexts/CollectionContext';
import { useCharacters } from '../hooks/useCharacters';
import { CharacterGrid } from '../components/CharacterGrid';
import { Button, StateView } from '../components/ui';
import { colors, font, styles } from '../theme';
import { Brand, WarriorHero } from '../components/Brand';
import type { RootStackParams } from '../types';
export function CatalogScreen({ navigation }: NativeStackScreenProps<RootStackParams, 'Catalog'>) {
  const { signOut } = useAuth();
  const { entries, warning, sync, syncing } = useCollection();
  const catalog = useCharacters();
  const [error, setError] = useState(''), [leaving, setLeaving] = useState(false);
  const favorites = Object.values(entries).filter(e => e.favorite).length, consumed = Object.values(entries).filter(e => e.consumed).length;
  const header = <View style={{ gap: 16, paddingBottom: 10 }}>
    <View style={[styles.row, { justifyContent: 'space-between', marginBottom: 8 }]}><Brand /><Pressable accessibilityRole="button" accessibilityLabel="Sair" disabled={leaving} onPress={async () => { setLeaving(true); try { await signOut(); } catch { setError('Não foi possível sair. Tente novamente.'); setLeaving(false); } }} style={{ padding: 12, minWidth: 44, minHeight: 44 }}><Text style={[styles.label, { color: colors.muted }]}>{leaving ? 'Saindo…' : 'Sair ↗'}</Text></Pressable></View>
    <WarriorHero />
    <Pressable onPress={() => navigation.navigate('Search')} accessibilityRole="button" accessibilityLabel="Buscar personagens" style={{ backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.line, borderRadius: 14, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 14 }}><Text style={{ fontSize: 25, color: colors.orange }}>⌕</Text><Text style={[styles.subtitle, { flex: 1 }]}>Qual personagem você procura?</Text><Text style={{ color: colors.muted, fontSize: 20 }}>↗</Text></Pressable>
    <View style={{ flexDirection: 'row', gap: 12 }}>
      {[{ title: 'Favoritos', count: favorites, icon: '♥', route: 'Favorites' as const }, { title: 'Conhecidos', count: consumed, icon: '★', route: 'Consumed' as const }].map(item => <Pressable key={item.route} accessibilityRole="button" accessibilityLabel={`${item.icon} ${item.title} (${item.count})`} onPress={() => navigation.navigate(item.route)} style={{ flex: 1, padding: 16, borderRadius: 14, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.paper, gap: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}><Text style={{ color: colors.orange, fontSize: 20 }}>{item.icon}</Text><Text style={{ fontFamily: font, color: colors.ink, fontSize: 24, fontWeight: '800' }}>{item.count}</Text></View><Text style={styles.label}>{item.title}</Text>
      </Pressable>)}
    </View>
    {!!error && <Text style={styles.error} accessibilityRole="alert">{error}</Text>}
    {!!warning && <View style={styles.panel}><Text style={styles.text} accessibilityLiveRegion="polite">{warning}</Text><Button title="Sincronizar novamente" busy={syncing} onPress={sync} /></View>}
    <View style={[styles.row, { justifyContent: 'space-between', marginTop: 12 }]}><Text style={styles.section} accessibilityRole="header">Explore os personagens</Text><Text style={[styles.subtitle, { fontSize: 12 }]}>Sua próxima descoberta</Text></View>
    {!!catalog.error && catalog.items.length > 0 && <StateView title="Não foi possível atualizar" message={catalog.error} retry={catalog.refresh} />}
  </View>;
  return <CharacterGrid items={catalog.items} header={header} refreshing={catalog.refreshing} onRefresh={catalog.refresh} onEndReached={catalog.loadMore}
    empty={<StateView title={catalog.loading ? 'Reunindo os guerreiros…' : catalog.error ? 'Falha ao carregar' : 'Nenhum personagem disponível'} busy={catalog.loading} message={catalog.error} retry={catalog.error ? catalog.retry : undefined} />}
    footer={catalog.loadingMore ? <ActivityIndicator style={{ padding: 24 }} color={colors.blue} accessibilityLabel="Carregando próxima página" /> : catalog.moreError ? <StateView title="Não foi possível carregar mais" message={catalog.moreError} retry={catalog.retryMore} /> : <View style={{ height: 20 }} />} />;
}
