# Dragon Ball — Catálogo Z

Projeto de Desenvolvimento Mobile Híbrido (BSI), em **React Native + Expo + TypeScript**. Tema diferente do somativo Flutter (Pokémon), com organização inspirada naquele projeto.

## Executar

Requer Node.js LTS, npm e Expo Go compatível com o SDK indicado no `package.json` (SDK 57). Também é possível usar uma development build compatível ou o navegador.

```bash
npm ci
npx expo start
```

Leia o QR code com Expo Go. `a` abre Android com emulador configurado; `w` abre web. Para testar imediatamente com cadastro e login locais, independentemente do Supabase:

```bash
npm run start:local
# Também aceita: npm run start:local -- --web
```

## Mesmo Supabase do Flutter

O `.env` local foi preenchido com `SUPABASE_URL` e `SUPABASE_ANON_KEY` do `../CatalogoInterativoFlutter/env.json`, convertidos para as variáveis abaixo. O arquivo é ignorado pelo Git. Em outra máquina, copie `.env.example` para `.env`.

```dotenv
EXPO_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua-chave-publica
EXPO_PUBLIC_AUTH_MODE=cloud
```

1. **Retome o projeto pausado** no dashboard do Supabase.
2. No SQL Editor do **mesmo projeto**, execute `supabase/schema.sql`.
3. Reinicie o Expo. As contas do Supabase criadas pelo Flutter funcionam neste app; contas locais do Flutter não são contas do Supabase.
4. Se a confirmação de e-mail estiver habilitada, confirme o e-mail antes de entrar. O aplicativo informa esse fluxo; não é necessário desativar a proteção.

O app usa a nova tabela `dragonball_items`, com RLS por `auth.uid()`. A tabela `user_items` de Pokémon permanece independente. A chave pública não permite criar tabelas: executar a migração exige uma sessão administrativa no painel. Nunca coloque service_role, senha do banco ou token administrativo em `EXPO_PUBLIC_*`.

**Nuvem validada:** o proprietário retomou o projeto e executou a migração. O teste real com duas contas QA confirmou cadastro/login, gravação e recuperação em outra sessão, renovação da sessão, desmarcações e bloqueio RLS de leitura/escrita entre contas. As linhas da coleção usadas no teste foram removidas. Duas contas com prefixo `catalogoz.qa.` permanecem no Auth; não são contas de demonstração do app. Nenhum dado Pokémon foi alterado. Não há fallback silencioso de login remoto para local.

## API

API pública gratuita, sem chave: https://dragonball-api.com/api

- `GET /characters?page=1&limit=12`: catálogo paginado.
- `GET /characters?name=Goku&race=Saiyan`: busca/filtro no servidor.
- `GET /characters/1`: detalhe completo, planeta e transformações.

As respostas filtradas podem ser arrays; o serviço normaliza esse formato e o formato `{items, meta}`. A busca usa o comportamento do endpoint (não promete busca parcial). A interface e a apresentação dos dados estão em **PT-BR**: `src/locales/pt-BR.ts` adapta descrições dos 58 personagens e 20 planetas consultados, atributos, nomes localizados, transformações e unidades de Ki. A busca aceita nomes como Mestre Kame, Freeza, Kuririn e Androide 18 e os converte para os termos exigidos pelo endpoint. IDs, imagens e parâmetros de raça permanecem no formato da API. Novos itens sem descrição traduzida mostram aviso em português. Timeout de 15 segundos e cancelamento no cleanup dos hooks.

## Fluxos e persistência

Login/cadastro → catálogo → busca/detalhes/favoritos/conhecidos. **Conhecido** é o equivalente a “consumido” do enunciado; ao marcar, o usuário pode dar uma nota de 1 a 5 estrelas. Desmarcar remove a nota. Os detalhes recebem apenas o ID e fazem outra requisição; o título do header usa `navigation.setOptions`.

- `AuthContext`: sessão, restauração, logout e navegação condicional.
- `CollectionContext`: favoritos, conhecidos, notas, recuperação inicial e sincronização.
- AsyncStorage: coleção separada pelo ID do usuário, contas locais com hash e sessão do SDK Supabase.
- SecureStore: sessão local no Android/iOS. Na web, o adaptador usa armazenamento do navegador.
- Senhas locais: PBKDF2-HMAC-SHA256, 100.000 iterações e salt aleatório por conta; senha nunca é persistida em texto puro.
- Gravações locais serializadas para evitar sobrescritas. A UI só confirma a marcação depois de gravar no aparelho.
- Nuvem: reconciliação pelo `updated_at`, vence a alteração mais recente; desmarcações são mantidas como registros para não reaparecerem em outro aparelho. O relógio dos dispositivos deve estar correto.
- Falha na nuvem mantém a coleção local e mostra aviso com nova tentativa. Sincroniza ao abrir a coleção, após alterações e ao voltar ao app. Não há sincronização realtime contínua.

## Organização

```text
src/
  components/  # cards, FlatList, imagem com fallback, estrelas, botões e estados
  contexts/    # AuthContext e CollectionContext
  hooks/       # useCharacters: paginação, refresh, busca e cancelamento
  navigation/  # Stack condicional e rotas tipadas
  screens/     # Login, Catalog, Search, Detail e Collection
  services/    # Axios, autenticação, armazenamento, Supabase e sincronização
  theme/       # cores e estilos compartilhados
  types/       # personagem, coleção, usuário e parâmetros de navegação
supabase/schema.sql
docs/          # roteiro, comparação, validação e relatório
tests/         # testes de contrato, conflitos e fluxo web
```

## Requisitos

| RF | Implementação | Arquivo principal |
|---|---|---|
| RF01 | Grade, rolagem infinita, refresh, chaves estáveis, imagem alternativa | `src/components/CharacterGrid.tsx`, `src/hooks/useCharacters.ts` |
| RF02 | Native Stack, ID em params, título dinâmico | `src/navigation/RootNavigator.tsx` |
| RF03 | Segunda requisição e detalhe completo | `src/screens/DetailScreen.tsx` |
| RF04 | Favoritos globais no Context | `src/contexts/CollectionContext.tsx` |
| RF05 | Lista de favoritos e estado vazio | `src/screens/CollectionScreen.tsx` |
| RF06 | AsyncStorage, hidratação inicial e Supabase com RLS validado | `src/contexts/CollectionContext.tsx` |
| RF07 | Cadastro/login local e Supabase Auth, sessão, logout, conhecidos e notas | `src/services/auth.ts`, `src/contexts/AuthContext.tsx` |
| RF08 | Campo controlado, botão Buscar, lista e filtro de raça | `src/screens/SearchScreen.tsx` |
| RF09 | Indicadores, erros e nova tentativa, inclusive no rodapé | `src/components/ui.tsx`, `src/hooks/useCharacters.ts` |
| RF10 | Labels, roles, seleção, toque mínimo de 44/48 e grade adaptável à escala de fonte | `src/components/`, `src/theme/index.ts` |

## Verificar

```bash
npm run check                 # TypeScript + 19 testes unitários
npm run lint                  # ESLint
npx expo install --check      # compatibilidade do SDK
npm run export:web            # bundle web
npx expo export --platform android --output-dir dist-android
```

O último comando verifica o bundle Hermes; **não gera APK nem comprova execução em aparelho**.

Para o teste completo de navegador (usa Chrome instalado e fixtures reais da API; não acessa Supabase):

```powershell
$env:EXPO_PUBLIC_AUTH_MODE='local'
npx expo export --platform web --output-dir dist-local
npm run test:e2e
Remove-Item Env:EXPO_PUBLIC_AUTH_MODE
```

O teste cobre cadastro, paginação com falha e recuperação, detalhes, nota, desfavoritar, busca, resultado vazio, reabertura, senha inválida, logout e isolamento de contas. Gera capturas em `docs/screenshots/`. Fixtures de dados não substituem teste real de conectividade. As imagens são carregadas dos URLs públicos originais.

O comando opcional `npm run test:cloud` cria duas contas QA no mesmo Supabase, testa Auth/persistência/RLS e remove as linhas de coleção ao final. Ele só executa se a confirmação de e-mail estiver desabilitada, para não enviar mensagens. As contas QA ficam no Auth; não repita o comando sem necessidade.

Antes da entrega, validar em Android/iOS com TalkBack/VoiceOver e fonte ampliada. Consulte `docs/VALIDACAO.md`.

## Entrega acadêmica

`docs/roteiro-video.md`: roteiro cronometrado; `docs/flutter-vs-react-native.md`: comparação. `output/pdf/relatorio-rascunho.pdf`: rascunho com seções e screenshots web. Preencher nomes completos, turma e links públicos antes de entregar. As capturas documentam execução web em viewport móvel, não um emulador Android.

Os testes e builds não publicam repositório, vídeo nem enviam trabalho ao AVA. Publicar o GitHub, gravar todos os integrantes, publicar o vídeo e enviar o PDF no campo oficial são etapas da entrega do grupo.
