import type { Collection, CollectionEntry, Character } from '../types';
import { supabase } from './supabase';
export function mergeCollections(local: Collection, remote: Collection): Collection {
  const merged = { ...local };
  for (const [id, entry] of Object.entries(remote)) {
    if (!merged[id] || Date.parse(entry.updatedAt) > Date.parse(merged[id].updatedAt)) merged[id] = entry;
  }
  return merged;
}
export function changeEntry(previous: CollectionEntry | undefined, character: Character, changes: Partial<Pick<CollectionEntry, 'favorite' | 'consumed' | 'rating'>>): CollectionEntry {
  const entry = { favorite: false, consumed: false, rating: 0, ...previous, character, ...changes, updatedAt: new Date().toISOString() };
  if (!entry.consumed) entry.rating = 0;
  if (entry.rating < 0 || entry.rating > 5 || !Number.isInteger(entry.rating)) throw new Error('Nota inválida.');
  return entry;
}
export async function fetchCloud(userId: string): Promise<Collection> {
  if (!supabase) return {};
  const { data, error } = await supabase.from('dragonball_items').select('*').eq('user_id', userId);
  if (error) throw error;
  return Object.fromEntries((data ?? []).map(row => [String(row.character_id), {
    character: row.character as Character, favorite: row.is_favorite, consumed: row.is_consumed,
    rating: row.rating, updatedAt: row.updated_at,
  }]));
}
export async function pushCloud(userId: string, entries: CollectionEntry[]) {
  if (!supabase || !entries.length) return;
  const { error } = await supabase.from('dragonball_items').upsert(entries.map(entry => ({
    user_id: userId, character_id: entry.character.id, character: entry.character,
    is_favorite: entry.favorite, is_consumed: entry.consumed, rating: entry.rating, updated_at: entry.updatedAt,
  })), { onConflict: 'user_id,character_id' });
  if (error) throw error;
}
