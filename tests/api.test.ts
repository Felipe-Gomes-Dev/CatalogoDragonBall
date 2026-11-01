import { describe, expect, it, vi, afterEach } from 'vitest';
import { api, cleanText, getCharacters, normalizePage, errorMessage } from '../src/services/api';
import { AxiosError } from 'axios';
afterEach(() => vi.restoreAllMocks());
describe('contrato da Dragon Ball API', () => {
  it('normaliza paginação e detecta a última página', () => {
    expect(normalizePage({ items: [{ id: 1 }], meta: { totalPages: 3 } }, 1).hasMore).toBe(true);
    expect(normalizePage({ items: [], meta: { totalPages: 3 } }, 3).hasMore).toBe(false);
  });
  it('busca filtrada pode retornar array sem metadados', () => {
    expect(normalizePage([{ id: 1, name: 'Goku' }], 1)).toEqual({ items: [{ id: 1, name: 'Goku' }], hasMore: false });
  });
  it('não transforma resposta malformada em coleção vazia', () => {
    expect(() => normalizePage({ message: 'invalid' }, 1)).toThrow('dados inesperados');
  });
  it('envia busca e raça ao endpoint em vez de filtrar só a página local', async () => {
    const get = vi.spyOn(api, 'get').mockResolvedValue({ data: [] });
    await getCharacters(2, ' Goku ', 'Saiyan');
    expect(get).toHaveBeenCalledWith('/characters', expect.objectContaining({ params: { page: 2, limit: 12, name: 'Goku', race: 'Saiyan' } }));
  });
  it('404 da busca representa ausência de resultados; 500 continua sendo falha', async () => {
    vi.spyOn(api, 'get').mockRejectedValueOnce({ isAxiosError: true, response: { status: 404 } }).mockRejectedValueOnce(new Error('offline'));
    await expect(getCharacters(1, 'inexistente')).resolves.toEqual({ items: [], hasMore: false });
    await expect(getCharacters()).rejects.toThrow('offline');
  });
  it('limpa HTML e entidades básicas', () => { expect(cleanText('<p>Goku &amp; Vegeta&nbsp;</p>')).toBe('Goku & Vegeta'); });
  it('traduz falhas de conexão para mensagem compreensível', () => { expect(errorMessage(new AxiosError('Network Error'))).toContain('conexão'); });
});
