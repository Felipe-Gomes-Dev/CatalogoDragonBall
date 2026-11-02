import { test, expect } from '@playwright/test';
import fs from 'node:fs';
const fixture = (name: string) =>
  JSON.parse(fs.readFileSync(`tests/fixtures/${name}.json`, 'utf8').replace(/^\uFEFF/, ''));
const characters = fixture('characters').items;
const goku = fixture('goku');
test('cadastro, paginação, detalhes, coleção, busca, persistência e logout', async ({ page }) => {
  async function capture(filename: string) {
    await page.locator('img:visible').evaluateAll(async (images) => {
      await Promise.all(
        images.map((image) => (image as HTMLImageElement).decode().catch(() => {})),
      );
    });
    await page.screenshot({ path: `docs/screenshots/${filename}`, fullPage: true });
  }
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  let failMore = false;
  await page.route('https://dragonball-api.com/api/**', async (route) => {
    const url = new URL(route.request().url());
    if (url.pathname.endsWith('/characters/1')) {
      await route.fulfill({ json: goku });
      return;
    }
    const name = url.searchParams.get('name');
    const race = url.searchParams.get('race');
    if (name || race) {
      await route.fulfill({
        json: characters.filter(
          (c: typeof goku) =>
            (!name || c.name.toLowerCase().includes(name.toLowerCase())) &&
            (!race || c.race === race),
        ),
      });
      return;
    }
    const current = Number(url.searchParams.get('page') || 1);
    if (current > 1 && failMore) {
      await route.fulfill({ status: 500, json: { error: 'test' } });
      return;
    }
    await route.fulfill({
      json: {
        items: characters.slice((current - 1) * 12, current * 12),
        meta: { totalPages: 5, currentPage: current },
      },
    });
  });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await expect(page.getByRole('button', { name: 'Entrar', exact: true })).toBeVisible();
  await capture('01-login.png');
  await page.getByRole('button', { name: 'Quero me cadastrar' }).click();
  await page.getByRole('textbox', { name: 'E-mail', exact: true }).fill('guerreiro@example.com');
  await page
    .getByRole('textbox', { name: 'Senha, no mínimo 6 caracteres', exact: true })
    .fill('TreinoZ123!');
  await page.getByRole('textbox', { name: 'Confirme a senha', exact: true }).fill('TreinoZ123!');
  await page.getByRole('button', { name: 'Criar conta', exact: true }).click();
  await expect(page.getByRole('button', { name: /Goku, Saiyajin/ })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Imagem de Goku', exact: true })).toBeVisible();
  await page
    .getByRole('img', { name: 'Imagem de Goku', exact: true })
    .evaluate(async (image: HTMLImageElement) => {
      if (!image.complete) await image.decode().catch(() => {});
    });
  await capture('02-catalogo.png');
  // Scroll the FlatList itself: its parent is the bounded native-web scroll area.
  failMore = true;
  await page.getByRole('button', { name: /Goku, Saiyajin/ }).evaluate((el) => {
    let parent = el.parentElement;
    while (parent && parent.scrollHeight <= parent.clientHeight + 20) parent = parent.parentElement;
    if (parent) parent.scrollTop = parent.scrollHeight;
  });
  await expect(page.getByText('Não foi possível carregar mais', { exact: true })).toBeVisible();
  await capture('08-erro-rede.png');
  failMore = false;
  await page.getByRole('button', { name: 'Tentar novamente' }).click();
  await expect(page.getByRole('button', { name: /Goku, Saiyajin/ })).toHaveCount(1);
  await page.getByRole('button', { name: /Goku, Saiyajin/ }).click();
  await expect(
    page.getByRole('button', { name: '♡ Adicionar aos favoritos', exact: true }),
  ).toBeVisible();
  await expect(page.getByText('90 septilhões', { exact: true })).toBeVisible();
  await expect(page.getByText('Gênero: Masculino', { exact: true })).toBeVisible();
  await expect(page.getByText('Planeta Terra', { exact: true })).toBeVisible();
  await expect(page.getByText(/Goku é o protagonista de Dragon Ball/)).toBeVisible();
  await page.getByRole('button', { name: '♡ Adicionar aos favoritos', exact: true }).click();
  await page.getByRole('button', { name: 'Marcar como conhecido', exact: true }).click();
  await page.getByRole('button', { name: 'Dar nota 4 de 5 estrelas', exact: true }).click();
  await expect(page.getByText('Sua nota: 4 de 5', { exact: true })).toBeVisible();
  await page
    .getByRole('img', { name: 'Imagem de Goku', exact: true })
    .filter({ visible: true })
    .evaluate(async (image: HTMLImageElement) => {
      if (!image.complete) await image.decode().catch(() => {});
    });
  await capture('03-detalhes.png');
  await page.reload();
  await expect(page.getByRole('button', { name: '♥ Favoritos (1)', exact: true })).toBeVisible();
  await page.getByRole('button', { name: '♥ Favoritos (1)', exact: true }).click();
  await expect(page.getByText('Seus favoritos', { exact: true })).toBeVisible();
  await capture('04-favoritos.png');
  await page.getByRole('button', { name: '♥ Favorito', exact: true }).click();
  await expect(page.getByText('Seu time começa aqui', { exact: true })).toBeVisible();
  await page.reload();
  await page.getByRole('button', { name: '★ Conhecidos (1)', exact: true }).click();
  await expect(
    page.getByText('Conhecido • 4/5 ★', { exact: true }).filter({ visible: true }),
  ).toBeVisible();
  await capture('05-conhecidos.png');
  await page.reload();
  await page.getByRole('button', { name: 'Buscar personagens', exact: true }).click();
  await page.getByRole('textbox', { name: 'Nome do personagem', exact: true }).fill('Goku');
  await page.getByRole('button', { name: 'Buscar', exact: true }).click();
  await expect(
    page.getByRole('button', { name: /Goku, Saiyajin/ }).filter({ visible: true }),
  ).toBeVisible();
  await capture('06-busca.png');
  await page.getByRole('textbox', { name: 'Nome do personagem', exact: true }).fill('Mestre Kame');
  await page.getByRole('button', { name: 'Buscar', exact: true }).click();
  await expect(page.getByRole('button', { name: /Mestre Kame, Humano/ })).toBeVisible();
  await page
    .getByRole('textbox', { name: 'Nome do personagem', exact: true })
    .fill('personagem inexistente');
  await page.getByRole('button', { name: 'Buscar', exact: true }).click();
  await expect(page.getByText('Nenhum personagem encontrado', { exact: true })).toBeVisible();
  await capture('07-busca-vazia.png');
  await page.reload();
  const accounts = await page.evaluate(() => localStorage.getItem('catalogo-z-accounts'));
  expect(accounts).not.toContain('TreinoZ123!');
  await page.getByRole('button', { name: 'Sair', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Entrar', exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Entrar', exact: true })).toBeVisible();
  await page.getByRole('textbox', { name: 'E-mail', exact: true }).fill('guerreiro@example.com');
  await page
    .getByRole('textbox', { name: 'Senha, no mínimo 6 caracteres', exact: true })
    .fill('errada123');
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
  await expect(page.getByText('E-mail ou senha inválidos.', { exact: true })).toBeVisible();
  await page
    .getByRole('textbox', { name: 'Senha, no mínimo 6 caracteres', exact: true })
    .fill('TreinoZ123!');
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
  await expect(page.getByRole('button', { name: '★ Conhecidos (1)', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Sair', exact: true }).click();
  await page.getByRole('button', { name: 'Quero me cadastrar' }).click();
  await page.getByRole('textbox', { name: 'E-mail', exact: true }).fill('outro@example.com');
  await page
    .getByRole('textbox', { name: 'Senha, no mínimo 6 caracteres', exact: true })
    .fill('OutroTreino123!');
  await page
    .getByRole('textbox', { name: 'Confirme a senha', exact: true })
    .fill('OutroTreino123!');
  await page.getByRole('button', { name: 'Criar conta', exact: true }).click();
  await expect(page.getByRole('button', { name: '★ Conhecidos (0)', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: '♥ Favoritos (0)', exact: true })).toBeVisible();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await capture('09-desktop.png');
  await page.setViewportSize({ width: 320, height: 844 });
  await capture('10-compacto.png');
  expect(errors).toEqual([]);
});
