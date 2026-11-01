# Validação e pendências

## Verificado automaticamente

- TypeScript em modo strict.
- 19 testes unitários: resposta paginada/filtrada, busca no endpoint, erros 404/rede, limpeza de HTML, conflitos por timestamp/fuso, desmarcações, notas e apresentação PT-BR. A cobertura da localização inclui os 58 personagens, 20 planetas e todas as transformações da resposta consultada.
- Fluxo web em Chrome, viewport 390 × 844: cadastro local com hash PBKDF2, paginação com erro e nova tentativa, detalhe, favorito, conhecido, nota 4, reabertura, desfavoritar, listas, busca e resultado vazio, logout, senha incorreta e outra conta com coleção vazia.
- Screenshots geradas pelo teste em `docs/screenshots/`, usando fixtures baixadas da API real. Não são evidência de execução nativa nem de nuvem.
- Exportação web, bundle Android Hermes no SDK 57, lint e checagem de compatibilidade dos pacotes Expo.

## Conferir no dispositivo antes de entregar

- [ ] Abrir com Expo Go compatível ou development build e realizar todos os fluxos.
- [ ] Fechar o processo e reabrir: sessão, favorito, conhecido e nota permanecem.
- [ ] Fonte do sistema em 200%: grade troca para uma coluna e textos não cortam.
- [ ] TalkBack/VoiceOver anuncia imagens, botões e estado selecionado.
- [ ] Sem conexão: carga inicial, busca e detalhe apresentam nova tentativa.
- [ ] Falha na próxima página preserva itens anteriores.
- [ ] Pull-to-refresh volta à primeira página.

## Supabase do Flutter

Projeto retomado e migração aplicada pelo proprietário. `npm run test:cloud` passou em 01/11/2026 com duas contas QA: cadastro, sessão, gravação de favorito/conhecido/nota, recuperação por novo login, renovação do token, desmarcação entre sessões e RLS rejeitando leitura e escrita entre usuários. Acesso anônimo também foi negado. As linhas de teste foram removidas; duas contas `catalogoz.qa.` permanecem no Auth. O teste não alterou Pokémon.

Os passos abaixo documentam como reproduzir manualmente no aplicativo:

1. Retomar o projeto no dashboard.
2. Executar `supabase/schema.sql` no SQL Editor desse projeto. Não altera `user_items`.
3. Iniciar em modo cloud, entrar com uma conta remota já usada no Flutter ou criar outra e confirmar e-mail se solicitado.
4. Marcar Goku favorito, conhecido e nota. Conferir a linha em `dragonball_items`.
5. Entrar em outro dispositivo com a mesma conta e conferir sincronização.
6. Entrar com outra conta e confirmar coleção vazia e isolamento via RLS.
7. Desmarcar no segundo aparelho; sincronizar novamente no primeiro e conferir a remoção.
8. Cortar a rede, alterar a coleção, restaurar a conexão e tocar em Sincronizar novamente.

Sem sessão administrativa disponível, a chave pública do aplicativo não pode executar o SQL. Não se deve reaproveitar `pokemon_id` para personagens Dragon Ball: isso misturaria as coleções.

## Entrega

- [ ] Preencher turma e nome completo de todos os integrantes.
- [ ] Criar/publicar repositório público sem `.env`.
- [ ] Gravar vídeo de 6–9 minutos, com todos aparecendo e falando; publicar no YouTube como Público.
- [ ] Atualizar links no relatório e indicar minuto do tema técnico.
- [ ] Acrescentar capturas nativas após validação em aparelho, se necessário.
- [ ] Gerar PDF final e enviar pelo campo oficial até 02/11/2026.
