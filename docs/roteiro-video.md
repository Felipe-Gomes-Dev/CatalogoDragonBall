# Roteiro de vídeo — duração alvo: 8 minutos

Todos os integrantes devem aparecer, falar e explicar uma parte que realmente implementaram ou estudaram. Preencher nomes completos iguais aos da capa. Ajustar a divisão à quantidade real de pessoas; não atribuir trabalho fictício.

| Tempo | Demonstração / fala |
|---|---|
| 0:00–0:30 | Cada integrante se apresenta com nome completo. Mostrar nome do projeto e tema Dragon Ball. |
| 0:30–2:00 | Entrar; rolar catálogo; buscar Goku; abrir detalhes; favoritar; marcar conhecido e nota; mostrar as duas listas; fechar/reabrir comprovando sessão e coleção. |
| 2:00–2:50 | Integrante 1: Axios, contrato paginado e array de busca em `services/api.ts`; relacionar RF01/RF08. |
| 2:50–3:40 | Integrante 2: `useCharacters`, FlatList, concatenação, cancelamento e falha da próxima página; RF01/RF09. |
| 3:40–4:30 | Integrante 3: Context da coleção, persistência e notas, mostrando a mesma marcação no card e detalhe; RF04–RF07. |
| 4:30–5:30 | Integrante 4: autenticação, navegação condicional, detalhe por ID e acessibilidade; RF02/RF03/RF07/RF10. |
| 5:30–8:00 | Tema técnico: estado global e persistência. Usar o fluxo abaixo e relacionar Provider do Flutter a Context no React Native. |

## Tema técnico escolhido: Context API, estado local e persistência

1. Mostrar `useState` do campo de busca. Por que outras telas não precisam desse valor?
2. Abrir `CollectionContext`. Por que favorito e conhecido precisam estar disponíveis em várias telas? Mostrar o hook `useCollection`.
3. Acompanhar `update`: enfileirar gravação, persistir no AsyncStorage, atualizar memória e pedir sincronização. Demonstrar o aviso quando a nuvem está indisponível.
4. Explicar a recuperação inicial em `useEffect`: o gate impede mostrar coleção vazia enquanto os dados são lidos.
5. Explicar sessão condicional: o logout remove a sessão e troca a árvore de navegação; não empilha Login sobre telas protegidas.
6. Comparar `ChangeNotifier/Provider` com Context e renderização dos consumidores. Explicar que o Context não é banco de dados e que a persistência está nos serviços.
7. Se a nuvem estiver retomada e validada, mostrar tabela `dragonball_items`, RLS por usuário e nota persistida em outra sessão. Sem isso, apresentar a integração como pendente; não afirmar bônus comprovado.

Publicar no YouTube como **Público**, duração entre 6 e 9 minutos. Confirmar nomes de todos na capa e inserir URL e minuto 5:30 no relatório.
