import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import { apiSearchName, characterDescriptions, localizeCharacter, planets, powerLabel, transformationName } from '../src/locales/pt-BR';
import type { Character } from '../src/types';
const fixture = (name: string) => JSON.parse(fs.readFileSync(`tests/fixtures/${name}.json`, 'utf8').replace(/^\uFEFF/, ''));
describe('apresentação em português do Brasil', () => {
  it('cobre todos os personagens e planetas do catálogo consultado', () => {
    for (const character of fixture('characters').items as Character[]) {
      expect(characterDescriptions[character.id], `Descrição de ${character.name}`).toBeTruthy();
      expect(localizeCharacter(character).race).not.toBe('Não informada');
      expect(localizeCharacter(character).affiliation).not.toBe('Não informada');
    }
    for (const planet of fixture('planets').items) expect(planets[planet.name.trim()], planet.name).toBeTruthy();
  });
  it('traduz o detalhe completo sem alterar IDs e imagens', () => {
    const goku = fixture('goku');
    const result = localizeCharacter(goku);
    expect(result).toMatchObject({ id: 1, image: goku.image, race: 'Saiyajin', gender: 'Masculino', affiliation: 'Guerreiros Z', maxKi: '90 septilhões', originPlanet: { name: 'Terra' } });
    expect(result.description).toContain('Goku é o protagonista');
    expect(result.originPlanet?.description).toContain('A Terra é');
    expect(result.transformations?.[0].name).toBe('Goku Super Saiyajin');
  });
  it('traduz unidades sem perder o valor e trata dados ausentes', () => {
    expect(powerLabel('1 Billion')).toBe('1 bilhão');
    expect(powerLabel('19.84 Septillion')).toBe('19,84 septilhões');
    expect(powerLabel('160,000,000')).toBe('160.000.000');
    expect(powerLabel('37.4 septllion')).toBe('37,4 septilhões');
    expect(powerLabel('unknown')).toBe('Não informado');
  });
  it('adapta a busca pelo nome exibido sem mudar os parâmetros da API', () => {
    expect(apiSearchName('mestre kame')).toBe('Master Roshi');
    expect(apiSearchName('Freeza')).toBe('Freezer');
    expect(apiSearchName('Androide 18')).toBe('Android 18');
    expect(apiSearchName(' Goku ')).toBe('Goku');
  });
  it('não deixa nomes de formas ou atributos em inglês', () => {
    for (const form of fixture('transformations')) {
      expect(transformationName(form.name)).not.toMatch(/SSJ|\bForm\b|Golden|Monster|Ultimate|Beast|Rage|Pure|Legendary|Instinc|Evolved|Namekian|Orange/);
      expect(powerLabel(form.ki)).not.toBe('Não informado');
    }
  });
  it('reabrir dados já traduzidos é idempotente e futuros itens usam fallback PT-BR', () => {
    const once = localizeCharacter(fixture('goku'));
    expect(localizeCharacter(once)).toEqual(once);
    expect(localizeCharacter({ id: 9999, name: 'Novo', race: 'New Race', image: '' }).description).toContain('português');
  });
});
