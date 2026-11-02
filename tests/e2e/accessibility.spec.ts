import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
const fixture = (name: string) =>
  JSON.parse(fs.readFileSync(`tests/fixtures/${name}.json`, 'utf8').replace(/^\uFEFF/, ''));

test('RF10: contraste, semântica, teclado e alvos de toque', async ({ page }) => {
  await page.route('https://dragonball-api.com/api/**', (route) =>
    route.fulfill({
      json: route.request().url().includes('/characters/1')
        ? fixture('goku')
        : fixture('characters'),
    }),
  );
  const audit = async () => {
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
      })),
    ).toEqual([]);
  };
  const targets = async () => {
    const invalid = await page.getByRole('button').evaluateAll((elements) =>
      elements
        .filter((el) => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0 && (rect.width < 43.5 || rect.height < 43.5);
        })
        .map((el) => ({
          label: el.getAttribute('aria-label'),
          width: el.getBoundingClientRect().width,
          height: el.getBoundingClientRect().height,
        })),
    );
    expect(invalid).toEqual([]);
  };
  await page.goto('/');
  await page.getByRole('button', { name: 'Entrar', exact: true }).waitFor();
  await audit();
  await targets();
  await page.getByRole('button', { name: 'Quero me cadastrar' }).click();
  await page
    .getByRole('textbox', { name: 'E-mail', exact: true })
    .fill('acessibilidade@example.com');
  await page
    .getByRole('textbox', { name: 'Senha, no mínimo 6 caracteres', exact: true })
    .fill('AcessoZ123!');
  await page.getByRole('textbox', { name: 'Confirme a senha', exact: true }).fill('AcessoZ123!');
  await page.getByRole('button', { name: 'Criar conta' }).press('Enter');
  await page.getByRole('button', { name: /Goku, Saiyajin/ }).waitFor();
  await audit();
  await targets();
  await page.getByRole('button', { name: /Goku, Saiyajin/ }).press('Enter');
  await page.getByRole('button', { name: 'Marcar como conhecido' }).waitFor();
  await page.getByRole('button', { name: 'Marcar como conhecido' }).press('Enter');
  await page.getByRole('button', { name: 'Dar nota 5 de 5 estrelas' }).press('Space');
  await expect(page.getByRole('button', { name: 'Dar nota 5 de 5 estrelas' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await audit();
  await targets();
  await page.getByRole('button', { name: '♡ Adicionar aos favoritos' }).press('Enter');
  await page.getByRole('button', { name: 'Voltar', exact: true }).press('Enter');
  await page.getByRole('button', { name: '♥ Favoritos (1)', exact: true }).press('Enter');
  await page.getByText('Seus favoritos', { exact: true }).waitFor();
  await audit();
  await targets();
  await page.getByRole('button', { name: 'Voltar', exact: true }).press('Enter');
  await page.getByRole('button', { name: '★ Conhecidos (1)', exact: true }).press('Enter');
  await page.getByText('Guerreiros conhecidos', { exact: true }).waitFor();
  await audit();
  await targets();
  await page.getByRole('button', { name: 'Voltar', exact: true }).press('Enter');
  await page.getByRole('button', { name: 'Buscar personagens' }).press('Enter');
  await page.getByRole('textbox', { name: 'Nome do personagem' }).fill('Goku');
  await page.getByRole('button', { name: 'Saiyajins', exact: true }).press('Enter');
  await expect(page.getByRole('button', { name: 'Saiyajins', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.getByRole('button', { name: 'Buscar', exact: true }).press('Enter');
  await page.getByText('1 personagem encontrado', { exact: true }).waitFor();
  await audit();
  await targets();
  await page.getByRole('textbox', { name: 'Nome do personagem' }).fill('inexistente');
  await page.getByRole('button', { name: 'Buscar', exact: true }).press('Enter');
  await page.getByText('Nenhum personagem encontrado', { exact: true }).waitFor();
  await audit();
  await targets();
});
