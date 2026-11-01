import axios from 'axios';
import type { Character } from '../types';
export const api = axios.create({ baseURL: 'https://dragonball-api.com/api', timeout: 15000 });
export interface Page { items: Character[]; hasMore: boolean }
export function normalizePage(data: unknown, page: number): Page {
  if (Array.isArray(data)) return { items: data, hasMore: false };
  const result = data as { items?: Character[]; meta?: { totalPages?: number } };
  if (!result || !Array.isArray(result.items)) throw new Error('A API retornou dados inesperados. Tente novamente.');
  return { items: result.items, hasMore: page < (result.meta?.totalPages ?? page) };
}
export async function getCharacters(page = 1, query = '', race = '', signal?: AbortSignal): Promise<Page> {
  try {
    const { data } = await api.get('/characters', { params: { page, limit: 12, ...(query ? { name: query.trim() } : {}), ...(race ? { race } : {}) }, signal });
    return normalizePage(data, page);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) return { items: [], hasMore: false };
    throw error;
  }
}
export async function getCharacter(id: number, signal?: AbortSignal): Promise<Character> {
  const { data } = await api.get<Character>(`/characters/${id}`, { signal });
  return data;
}
export function cleanText(text = '') {
  return text.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
}
export function errorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) return error.response?.status === 429
    ? 'Muitas consultas. Aguarde um momento e tente novamente.'
    : 'Não foi possível carregar os dados. Verifique sua conexão e tente novamente.';
  return error instanceof Error ? error.message : 'Algo deu errado. Tente novamente.';
}
