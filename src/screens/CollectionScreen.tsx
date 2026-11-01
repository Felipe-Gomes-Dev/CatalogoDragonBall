import React from 'react';
import { Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCollection } from '../contexts/CollectionContext';
import { CharacterGrid } from '../components/CharacterGrid';
import { StateView } from '../components/ui';
import { styles } from '../theme';
import type { RootStackParams } from '../types';
export function CollectionScreen({ route }: NativeStackScreenProps<RootStackParams, 'Favorites' | 'Consumed'>) {
  const { entries } = useCollection();
  const favorites = route.name === 'Favorites';
  const items = Object.values(entries).filter(e => favorites ? e.favorite : e.consumed).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).map(e => e.character);
  return <CharacterGrid items={items} header={<View style={{ gap: 8, paddingBottom: 12 }}><Text style={styles.title} accessibilityRole="header">{favorites ? 'Seus favoritos' : 'Guerreiros conhecidos'}</Text><Text style={styles.subtitle}>{favorites ? 'Os personagens que fazem parte do seu time.' : 'Sua coleção de personagens conhecidos e suas notas pessoais.'}</Text></View>}
    empty={<StateView title={favorites ? 'Seu time começa aqui' : 'Uma nova jornada começa'} message={favorites ? 'Explore o catálogo e toque em Favoritar para montar sua coleção.' : 'Abra os detalhes de um personagem, marque como conhecido e dê sua nota.'} />} />;
}
