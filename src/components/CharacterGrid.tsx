import React from 'react';
import { FlatList, View, useWindowDimensions } from 'react-native';
import type { Character } from '../types';
import { CharacterCard } from './CharacterCard';
import { styles } from '../theme';
export function CharacterGrid({ items, header, empty, footer, refreshing = false, onRefresh, onEndReached }: {
  items: Character[]; header?: React.ReactElement; empty?: React.ReactElement; footer?: React.ReactElement;
  refreshing?: boolean; onRefresh?: () => void; onEndReached?: () => void;
}) {
  const { width, fontScale } = useWindowDimensions();
  const columns = width < 350 || fontScale > 1.4 ? 1 : width > 1100 ? 4 : width > 700 ? 3 : 2;
  const itemWidth = (Math.min(width, 1200) - 40 - 14 * (columns - 1)) / columns;
  return <FlatList key={columns} style={styles.page} contentContainerStyle={{ padding: 20, gap: 18, maxWidth: 1200, width: '100%', alignSelf: 'center', flexGrow: 1 }} data={items} numColumns={columns} keyExtractor={item => String(item.id)}
    columnWrapperStyle={columns > 1 ? { gap: 14, alignItems: 'flex-start' } : undefined}
    renderItem={({ item }) => <View style={{ width: itemWidth }}><CharacterCard character={item} /></View>}
    ListHeaderComponent={header} ListEmptyComponent={empty} ListFooterComponent={footer} refreshing={refreshing} onRefresh={onRefresh} onEndReached={onEndReached} onEndReachedThreshold={0.35} keyboardShouldPersistTaps="handled" />;
}
