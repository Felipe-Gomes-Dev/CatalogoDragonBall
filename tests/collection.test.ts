import { describe, expect, it, vi } from 'vitest';
vi.mock('../src/services/supabase', () => ({ supabase: null }));
import { changeEntry, mergeCollections } from '../src/services/collection';
import type { Character, CollectionEntry } from '../src/types';
const goku: Character = { id: 1, name: 'Goku', image: '', race: 'Saiyan' };
const entry = (time: string, favorite = true): CollectionEntry => ({ character: goku, favorite, consumed: false, rating: 0, updatedAt: time });
describe('coleção pessoal e conflitos de sincronização', () => {
  it('a marcação mais recente vence independentemente da origem', () => {
    const old = entry('2026-10-01T00:00:00.000Z');
    const recent = entry('2026-11-01T00:00:00.000Z', false);
    expect(mergeCollections({ 1: recent }, { 1: old })[1]).toEqual(recent);
    expect(mergeCollections({ 1: old }, { 1: recent })[1]).toEqual(recent);
  });
  it('preserva desmarcações para não ressuscitar favoritos de outro aparelho', () => {
    const removed = changeEntry(entry('2026-01-01'), goku, { favorite: false });
    expect(mergeCollections({}, { 1: removed })[1].favorite).toBe(false);
  });
  it('compara instantes mesmo quando o servidor usa outro formato de fuso', () => {
    const local = entry('2026-11-01T12:00:00.000Z');
    const remote = entry('2026-11-01T09:00:00.100-03:00', false);
    expect(mergeCollections({ 1: local }, { 1: remote })[1]).toEqual(remote);
  });
  it('desmarcar conhecido limpa a nota sem remover o favorito', () => {
    const previous = { ...entry('2026-01-01'), consumed: true, rating: 5 };
    expect(changeEntry(previous, goku, { consumed: false })).toMatchObject({ favorite: true, consumed: false, rating: 0 });
  });
  it('rejeita notas fora do intervalo e notas fracionadas', () => {
    for (const rating of [-1, 6, 2.5]) expect(() => changeEntry(undefined, goku, { consumed: true, rating })).toThrow('Nota inválida');
  });
  it('mantém notas e favoritos ao atualizar metadados do personagem', () => {
    const result = changeEntry({ ...entry('2026-01-01'), consumed: true, rating: 4 }, { ...goku, ki: '60.000.000' }, { favorite: false });
    expect(result.rating).toBe(4); expect(result.character.ki).toBe('60.000.000');
  });
});
