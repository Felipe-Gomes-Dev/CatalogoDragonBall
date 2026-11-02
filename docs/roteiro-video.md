# Roteiro do vídeo — Catálogo Z

**Duração alvo: 8 minutos. A apresentação e a demonstração do aplicativo serão conduzidas por você.** Os demais integrantes devem ler principalmente as seções 1, 4 e 5 para preparar suas falas.

Este roteiro segue os itens 7.1–7.3 do [enunciado](ENUNCIADO.txt). Os horários dos quatro blocos abaixo vêm do professor. As falas sugeridas e a distribuição de arquivos são uma proposta de organização do grupo.

## 1. O que o professor exige de todos

- O vídeo deve durar **entre 6 e 9 minutos** e estar no YouTube como **Público**.
- **Todos os integrantes precisam aparecer e falar.** No início, cada um deve dizer seu **nome completo**, igual ao que consta na capa do PDF.
- **Cada integrante precisa explicar pelo menos uma parte que implementou**, relacionando o código aos requisitos funcionais (RF). Apenas se apresentar ou mostrar uma tela não substitui essa explicação.
- O grupo deve demonstrar o aplicativo funcionando e dedicar um bloco a uma explicação técnica em profundidade, ligada ao próprio código.
- Não haverá defesa técnica individual: o vídeo é a evidência de que os conceitos foram compreendidos e aplicados por todos.

**Atenção para quem fará a apresentação:** conduzir a demonstração não dispensa sua participação na explicação de código. Reserve também um trecho técnico, conforme a divisão da seção 4.

| Horário exigido | Bloco | Responsabilidade neste roteiro |
|---|---|---|
| 0:00–0:30 | Apresentação | Todos dizem o nome completo; você introduz o projeto. |
| 0:30–2:00 | Demonstração | Você mostra o aplicativo funcionando. |
| 2:00–5:30 | Explicação de código | Cada integrante explica sua parte e cita os RF correspondentes. |
| 5:30–8:00 | Explicação técnica | O grupo aprofunda o tema escolhido usando exemplos do projeto. |

Antes de gravar, preencham os nomes dos responsáveis e confirmem quais contribuições reais cada pessoa apresentará. A divisão abaixo considera quatro integrantes; se o grupo for menor, redistribuam os trechos mantendo os blocos exigidos.

## 2. Preparação da sua demonstração

Faça um ensaio seguindo a sequência da seção 3. Ela precisa caber em **90 segundos**, sem pular a comprovação da persistência.

1. Deixe o app aberto na tela de entrada, com uma conta de teste já cadastrada e sem marcações em Goku. Use o mesmo modo de autenticação durante toda a gravação.
2. Prefira demonstrar no celular ou emulador Android com o app já carregado. Se usarem a versão web, identifiquem-na como versão web e comprovem a persistência fechando e reabrindo a aba; não apresentem isso como teste nativo.
3. Confirme a conexão com a API. Se forem demonstrar o bônus de nuvem, usem o modo Supabase e verifiquem a sincronização antes de gravar.
4. Saiba voltar dos detalhes até o catálogo e abrir Favoritos e Conhecidos. Esses deslocamentos também consomem o tempo da demonstração.
5. Separe a gravação da tela e a imagem de quem fala, de forma que os nomes, botões e resultados fiquem legíveis. Essa é uma sugestão de apresentação; o requisito do professor é que todos apareçam e falem.

O cadastro, a troca de filtros, a simulação de erro e o teste de acessibilidade podem ser mostrados nos trechos técnicos, se houver tempo. Na sua demonstração, priorize os fluxos que o professor listou expressamente.

## 3. Sua parte — apresentação e demonstração, passo a passo

### 0:00–0:30 — Apresentação do grupo

**Todos participam deste início.** Cada integrante aparece e diz:

> “Meu nome é [NOME COMPLETO].”

Em um grupo de quatro pessoas, reservem aproximadamente 12–16 segundos para os nomes. Você usa o restante para introduzir o projeto:

> “Este é o Catálogo Z, nosso projeto de Desenvolvimento Mobile Híbrido, feito com React Native e Expo. Escolhemos a Dragon Ball API para explorar personagens e montar uma coleção pessoal.”

Mostre o nome do aplicativo. Não explique arquitetura nesse momento: o próximo bloco é uma demonstração de uso.

### 0:30–2:00 — Demonstração conduzida por você

As falas abaixo são sugestões curtas. Ensaiem com o carregamento real do aplicativo; uma ação só fica comprovada quando o resultado aparece na tela.

| Tempo | O que você faz na tela | Sugestão de fala | O que precisa ficar visível |
|---|---|---|---|
| **0:30–0:40** | Informe os dados da conta e toque em **Entrar**. | “O acesso exige login. Depois de entrar, o aplicativo carrega os personagens da API.” | Tela de entrada e transição para o catálogo. **RF07**. |
| **0:40–0:52** | Role até o fim da primeira página e aguarde os próximos personagens. | “O catálogo usa rolagem infinita: novas páginas são acrescentadas conforme chegamos ao final da lista.” | Novos itens entrando sem substituir os anteriores. Não basta rolar apenas a primeira página. **RF01**. |
| **0:52–1:04** | Abra a busca, digite **Goku**, toque em **Buscar** e depois no resultado. | “A busca apresenta uma lista de resultados. Ao escolher Goku, abrimos seus detalhes.” | Resultado da busca antes de abrir o detalhe. **RF08, RF02 e RF03**. |
| **1:04–1:18** | Mostre imagem e atributos. Toque em **Adicionar aos favoritos**, marque **Conhecido** e selecione **5 estrelas**. | “Nos detalhes vemos a história e os atributos. Podemos favoritar, marcar como conhecido e dar uma nota pessoal.” | Coração/estado de favorito, conhecido selecionado e nota 5. “Conhecido” corresponde ao item consumido do enunciado. **RF03, RF04 e RF07**. |
| **1:18–1:32** | Volte ao catálogo; abra **Favoritos** e depois **Conhecidos**. | “Os favoritos ficam nesta lista. Os personagens conhecidos aparecem em outra, com a nota que atribuímos.” | Goku nas duas listas e a nota em Conhecidos. **RF05 e RF07**. |
| **1:32–1:48** | Feche o app, remova-o dos aplicativos recentes e abra novamente. | “Agora vou fechar e reabrir o aplicativo para mostrar que a sessão e a coleção foram preservadas.” | Fechamento e reabertura reais; entrada direta no catálogo, sem novo login. **RF06 e RF07**. |
| **1:48–2:00** | Mostre os contadores restaurados, abra **Conhecidos** para conferir a nota e volte para **Sair**. | “A coleção e a nota continuam salvas. Ao sair da conta, o aplicativo volta à tela de entrada.” | Marcação/nota restaurada e logout retornando à autenticação. **RF06 e RF07**. |

**Frase de passagem para a explicação de código:**

> “Agora vamos mostrar os trechos que implementam essas funções e relacioná-los aos requisitos do trabalho.”

Se o ensaio ultrapassar 2:00, encurte as falas e os deslocamentos. Mantenha os resultados na tela tempo suficiente para serem reconhecidos, especialmente a próxima página, a lista da busca e a nota após a reabertura.

## 4. Parte de código — orientação para os demais integrantes

**O professor quer que cada pessoa mostre e explique seu trecho de código, ligando-o a um RF.** A demonstração anterior mostrou o resultado; agora é preciso explicar como ele acontece.

Cada participante deve preparar uma fala que responda a estas quatro perguntas:

1. Qual funcionalidade este trecho implementa e qual RF atende?
2. Qual componente, hook, contexto ou serviço é responsável por ela?
3. Como os dados passam por esse trecho até aparecerem na interface?
4. Qual decisão ou tratamento importante existe ali, como paginação, erro, persistência ou isolamento por usuário?

Mostrem os trechos relevantes no editor com tamanho de fonte legível. Expliquem os identificadores concretos do projeto; não se limitem a ler nomes de arquivos ou a recitar definições de React.

### Divisão sugerida para quatro pessoas

| Horário | Responsável a preencher | Arquivos e pontos para explicar | RF |
|---|---|---|---|
| **2:00–2:50** | Você: [NOME COMPLETO] | `src/components/CharacterGrid.tsx`, `src/components/CharacterCard.tsx` e a ligação com `src/screens/CatalogScreen.tsx`. Mostrar `FlatList`, `numColumns`, `keyExtractor`, card recebendo dados por props e navegação pelo ID. É uma sugestão para sua participação técnica; confirmem a contribuição que você apresentará. | RF01 e RF02 |
| **2:50–3:40** | Integrante 2: [NOME COMPLETO] | `src/hooks/useCharacters.ts`, `src/services/api.ts` e `src/screens/SearchScreen.tsx`. Explicar Axios, página atual, concatenação dos resultados, campo controlado e consulta ao endpoint de busca. Mostrar cancelamento com `AbortController` e erro da próxima página preservando a lista. | RF01, RF08 e RF09 |
| **3:40–4:30** | Integrante 3: [NOME COMPLETO] | `src/contexts/CollectionContext.tsx`, `src/services/collection.ts` e `src/services/storage.ts`. Explicar `createContext`/`useCollection`, favorito compartilhado, conhecido e nota; gravação no AsyncStorage e recuperação inicial em `useEffect`. Se tratar do bônus, mostrar sincronização com `dragonball_items` e separação por usuário. | RF04, RF05, RF06 e RF07 |
| **4:30–5:30** | Integrante 4: [NOME COMPLETO] | `src/contexts/AuthContext.tsx`, `src/services/auth.ts`, `src/navigation/RootNavigator.tsx` e `src/screens/DetailScreen.tsx`. Explicar login local com hash, Supabase Auth, sessão e troca condicional dos stacks; detalhe por ID e `navigation.setOptions`. Mostrar também um exemplo de rótulo/estado acessível em `src/components/ui.tsx`. | RF02, RF03, RF07 e RF10 |

Os tempos são de aproximadamente 50 segundos por pessoa, como sugerido pelo professor. O último trecho tem 60 segundos para completar a janela de 3min30s. Se essa divisão não corresponder às contribuições reais, troquem os responsáveis ou os assuntos antes de gravar.

**Modelo de fala para cada integrante adaptar:**

> “Eu implementei [CONTRIBUIÇÃO REAL], que atende ao RF[XX]. Neste arquivo, [FUNÇÃO/HOOK/COMPONENTE] recebe [DADO], executa [OPERAÇÃO] e atualiza [ESTADO/TELA]. Esta verificação serve para [DECISÃO OU TRATAMENTO].”

## 5. Explicação técnica — 5:30–8:00

**Tema escolhido: Context API versus estado local (`useState`).** É um dos temas sugeridos pelo professor. Persistência e sincronização entram como exemplos do nosso fluxo, mantendo o foco na escolha e no funcionamento do estado.

Neste bloco, o professor espera uma explicação **em profundidade e relacionada ao próprio código**. Não basta repetir o que cada botão faz. A participação pode ser dividida entre os integrantes; o requisito individual de todos explicarem uma contribuição deve estar cumprido no bloco anterior.

| Tempo | Questão a responder | Trecho concreto para mostrar |
|---|---|---|
| **5:30–6:05** | O que fica local e o que precisa ser global? | `text` em `SearchScreen.tsx` é estado local de digitação. Sessão em `AuthContext` e marcações em `CollectionContext` precisam ser compartilhadas. |
| **6:05–6:45** | Como favoritar no detalhe muda o card e a lista de favoritos? | A chamada a `update`, a gravação local, `setEntries` e os consumidores de `useCollection`. São telas diferentes lendo a mesma coleção. |
| **6:45–7:25** | Como Context se relaciona com persistência e com a primeira renderização? | Context mantém o estado em memória; AsyncStorage preserva os dados entre execuções. Mostrar o `useEffect` de recuperação e o bloqueio de carregamento em `AppStack`, que evita mostrar a coleção vazia antes da leitura local. |
| **7:25–8:00** | Quando o Context causa renderizações desnecessárias? Como isso se compara ao Flutter? | O Provider passa um valor aos consumidores; quando esse valor muda, eles podem renderizar novamente. No código atual, `update` e o objeto `value` são recriados na renderização. Discutir separar contextos e estabilizar valores/funções como possíveis melhorias, sem afirmar que já foram aplicadas. Comparar com `ChangeNotifier`/Provider do Flutter. |

Uma conclusão possível, dentro dos segundos finais:

> “Usamos estado local para a digitação e Context para dados compartilhados. A persistência fica nos serviços. Assim, as telas consultam a mesma coleção e conseguimos restaurá-la quando o aplicativo é aberto novamente.”

Se o grupo escolher outro tema, substitua este bloco inteiro por um tema da lista do professor ou previamente combinado com ele. Atualizem também o tema e o minuto no relatório.

## 6. Conferência antes de publicar

- [ ] Todos apareceram e disseram seus nomes completos no início.
- [ ] Cada integrante explicou ao menos uma parte que implementou e citou os RF atendidos.
- [ ] A demonstração mostrou login, rolagem infinita, busca com resultados, detalhes, favoritos, conhecidos com nota e reabertura com persistência.
- [ ] A explicação técnica começa por volta de 5:30 e usa o código do projeto.
- [ ] O vídeo completo tem entre 6 e 9 minutos. O professor prevê desconto de 5% por minuto fora desse intervalo.
- [ ] O vídeo foi publicado no YouTube como **Público** e o link foi conferido sem depender da conta de quem publicou.
- [ ] O PDF tem os nomes completos de todos, o link do vídeo, o tema técnico e o minuto real em que ele aparece. O enunciado prevê nota zero para o integrante cujo nome não constar na capa.

**Para citar os bônus:** a integração Supabase já foi testada com duas contas, mas a gravação deve corresponder ao modo que estiver rodando. Se estiverem usando login local, não apresentem essa sessão como Supabase Auth. Relacionem a nuvem à tabela `dragonball_items`, que mantém a coleção Dragon Ball separada da tabela Pokémon do projeto Flutter.
