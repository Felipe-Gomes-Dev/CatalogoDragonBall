# Roteiro do vídeo — Catálogo Z

Grupo: Rogério, Alex, Logan e Felipe. Substituir pelos nomes completos na apresentação e na capa do PDF.

Este roteiro parte dos dois vídeos já gravados por Rogério e preserva integralmente suas falas. Após a breve apresentação coletiva, cada integrante tem uma única participação contínua. Rogério fica com seus dois vídeos consecutivos; Felipe explica detalhes, busca e feedback; Alex e Logan dividem entre si os dois blocos restantes. Quem assumir o último bloco encerra com autenticação, acessibilidade e aprofundamento técnico, sem passar a palavra novamente. A divisão abaixo organiza os assuntos; cada integrante deve confirmar que apresentará uma contribuição real sua, como exige o enunciado.

## 1. Material já gravado — manter na montagem

### Rogério — apresentação e demonstração (2min53,7s)

Arquivo: `2026-11-02 13-42-49.mkv`.

Conteúdo identificado por transcrição automática, com tempos aproximados:

- 0:01–0:09: apresentação pessoal e introdução ao Catálogo Z em React Native.
- 0:09–0:25: autenticação com Supabase e entrada no catálogo.
- 0:25–0:38: catálogo e rolagem infinita.
- 0:38–0:59: busca, filtro de raça e resultado antes de abrir o personagem.
- 0:59–1:19: detalhes, imagem, atributos, história, planeta e transformações.
- 1:19–1:35: favorito, conhecido e avaliação de cinco estrelas.
- 1:35–1:54: listas de favoritos e conhecidos com a nota.
- 1:54–2:54: fechamento/reabertura, sessão restaurada e favorito preservado.

Não pedir que os outros três repitam essa demonstração. A transcrição ajuda a localizar os assuntos, mas não substitui uma conferência visual da montagem. A pronúncia do nome completo de Rogério deve ser conferida no vídeo; não usar a transcrição automática como fonte para preencher a capa.

### Rogério — explicação de RF01 e RF02 (1min14,3s)

Arquivo: `2026-11-02 14-09-49.mkv`.

Manter a explicação já gravada:

- `CatalogScreen.tsx`: `useCharacters` fornece os dados e eles seguem para a grade por props.
- `CharacterGrid.tsx`: `FlatList`, colunas adaptadas à tela/fonte, `keyExtractor` pelo ID e `renderItem` criando os cards.
- `CharacterCard.tsx`: dados por props e navegação para `Details`, passando apenas o ID.
- Eventos da grade para carregar mais e atualizar.

RF01 e RF02 ficam sob responsabilidade de Rogério. Os demais podem citar esses fluxos como ligação com suas partes, sem refazer a explicação.

## 2. Ordem de montagem e limite de tempo

Os dois arquivos somam **4min08s**. A proposta abaixo mantém os vídeos completos e termina em aproximadamente **8min50s**, com apenas 10 segundos de margem até o limite de 9 minutos. Transições e títulos também entram nessa conta: usar cortes diretos e ensaiar as novas falas.

1. **0:00–0:15 — Alex, Logan e Felipe:** cada um aparece e diz “Meu nome é [NOME COMPLETO]”.
2. **0:15–3:09 — Rogério:** inserir o primeiro vídeo completo, que começa com a apresentação dele.
3. **3:09–4:23 — Rogério:** inserir o segundo vídeo completo, explicando RF01 e RF02.
4. **4:23–5:02 — Felipe:** RF03, RF08 e exemplo de RF09.
5. **5:02–5:41 — Alex ou Logan (bloco A):** RF04, RF05, RF06 e conhecidos/notas do RF07.
6. **5:41–8:50 — Alex ou Logan (bloco B), participação contínua:** autenticação/sessão do RF07 e RF10 até aproximadamente 6:20; em seguida, sem trocar de apresentador, aprofundamento técnico em Context API versus estado local até 8:50.

A apresentação dos nomes no início é uma exigência do professor. Depois dela, a ordem de fala é simplesmente **Rogério → Felipe → responsável pelo bloco A → responsável pelo bloco B**, sem retornos. Os dois vídeos de Rogério formam um único bloco. O enunciado não exige que todos participem do aprofundamento técnico: O responsável pelo bloco B conduz esse aprofundamento inteiro e terá mais tempo de fala. Alex e Logan devem combinar quem assume cada bloco: uma pessoa fica com A e a outra com B, preservando uma participação contínua por integrante.

**Diferença em relação ao enunciado:** o professor determina apresentação em 0:00–0:30, demonstração em 0:30–2:00, código em 2:00–5:30 e aprofundamento em 5:30–8:00. Esta montagem respeita a duração total de 6 a 9 minutos, mas não esses horários internos, porque a demonstração já gravada dura quase três minutos. Não é possível preservar os dois clipes completos e encaixá-los exatamente nessas janelas. Para cumprir os horários exatos, seria necessário condensar o material do Rogério, o que não foi adotado neste roteiro.

## 3. Felipe — detalhes, busca e feedback (39 segundos)

**Abrir antes de gravar:** `src/screens/DetailScreen.tsx`, `src/screens/SearchScreen.tsx` e `src/components/ui.tsx`. Deixar os trechos selecionados; evitar procurar código durante a fala.

**Mostrar:** `getCharacter(route.params.id, controller.signal)`; depois `value`, `onChangeText` e `submit` na busca; por fim `StateView`.

**Fala sugerida:**

> “Continuando a navegação mostrada pelo Rogério, no RF03 a DetailScreen recebe o ID e faz outra requisição para carregar os dados completos. O useEffect cancela a requisição ao sair da tela. No RF08, a busca tem um campo controlado: value exibe o texto e onChangeText atualiza o estado. O botão Buscar confirma os parâmetros, e os resultados aparecem em uma lista. Para o RF09, tratamos carregamento, erro e resultado vazio; o StateView apresenta o indicador ou a opção de tentar novamente.”

Não repetir FlatList, props e navegação já explicados pelo Rogério. Ensaiar para caber em 39 segundos, com leitura legível do código.

## 4. Alex ou Logan (bloco A) — coleção e persistência (39 segundos)

**Abrir antes de gravar:** `src/contexts/CollectionContext.tsx` e `src/screens/CollectionScreen.tsx`.

**Mostrar:** `useCollection`, `update`, `writeJSON`, `setEntries` e o filtro entre `favorite` e `consumed`.

**Fala sugerida:**

> “Nos RF04 e RF05, os favoritos ficam no CollectionContext. O hook useCollection permite que detalhes, cards e listas consultem a mesma coleção. A CollectionScreen filtra os registros para mostrar favoritos ou conhecidos, incluindo as notas do RF07. No RF06, update grava a alteração localmente antes de atualizar a interface com setEntries. Ao abrir o aplicativo, um useEffect recupera os dados do AsyncStorage. A chave inclui o ID do usuário, mantendo as coleções locais separadas por conta.”

O funcionamento aprofundado do Context fica para o bloco final. Aqui explicar o caminho dos dados e apontar o código.

## 5. Alex ou Logan (bloco B) — início da participação contínua: autenticação e acessibilidade (39 segundos)

**Abrir antes de gravar:** `src/navigation/RootNavigator.tsx`, `src/services/auth.ts` e `src/components/ui.tsx`.

**Mostrar:** condição `user` no navegador; autenticação local/remota no serviço; `accessibilityLabel`, `accessibilityRole` e `accessibilityState` no botão.

**Fala sugerida:**

> “No RF07, o AuthContext centraliza a sessão. O RootNavigator consulta user para renderizar o login ou as telas do aplicativo. Quando a sessão é restaurada, o usuário entra direto; ao sair, o estado muda e o login volta. O serviço suporta Supabase Auth e login local com hash e salt, sem salvar a senha em texto puro. No RF10, os componentes têm rótulos, papéis e estados acessíveis. Botões e estrelas usam áreas de toque adequadas, e o layout considera a escala da fonte.”

A gravação do Rogério usa Supabase. Apresentar o login local como alternativa implementada no código, sem atribuir esse modo à demonstração dele.

## 6. Mesmo responsável pelo bloco B — continuação da mesma participação: aprofundamento técnico (2min30s)

Este bloco explica decisões e consequências no código. Não repetir a lista de RF nem refazer a demonstração. O integrante que apresentou a seção 5 continua falando e aparece com o código legível. Não é uma terceira tarefa a distribuir: as seções 5 e 6 pertencem à mesma pessoa. Os subtópicos abaixo são apenas uma sequência de raciocínio, sem troca de integrante. Pode gravar toda a participação de 5:41 a 8:50 de uma vez.

### 6:20–7:00 — responsável pelo bloco B: estado local e estado compartilhado

**Mostrar:** `text`, `race` e `submitted` em `SearchScreen.tsx`; depois os consumidores de `useCollection` em detalhes e coleção.

> “A escolha depende de quem precisa do dado. O texto digitado na busca fica no useState da SearchScreen porque serve àquela tela. Separar text de submitted também evita consultar a API a cada tecla: a consulta usa os parâmetros confirmados no botão Buscar. Já os favoritos precisam aparecer nos detalhes, nos cards e na coleção. Se cada tela guardasse uma cópia independente, seria necessário sincronizá-las. O CollectionContext oferece uma fonte compartilhada, acessada pelo hook useCollection. A sessão segue a mesma lógica no AuthContext, porque determina quais telas podem ser exibidas.”

### 7:00–7:55 — responsável pelo bloco B: alteração, persistência e recuperação

**Mostrar:** `update` e `useEffect` no `CollectionContext.tsx`; bloqueio por `loading` em `AppStack`, no `RootNavigator.tsx`.

> “Context compartilha estado em memória, mas sozinho não preserva nada quando o aplicativo fecha. Na atualização da coleção, o código cria o próximo registro, espera writeJSON terminar e só então chama setEntries. Assim, a interface não confirma uma gravação local que falhou. Uma fila serializa as alterações para evitar que duas gravações sobrescrevam uma à outra. Na abertura, o useEffect lê a coleção pela chave do usuário. Enquanto isso, AppStack mostra o carregamento, em vez de apresentar uma coleção vazia. Para contas remotas, a sincronização reconcilia os dados com a nuvem. Se a nuvem falhar, a coleção local é mantida e o aplicativo informa a falha.”

### 7:55–8:50 — responsável pelo bloco B: renderizações e comparação com Flutter

**Mostrar:** objeto `value` do `Context.Provider` e função `update` no `CollectionContext.tsx`.

> “Compartilhar estado também tem um custo. Quando o valor do Provider muda, os componentes que consomem esse contexto podem renderizar novamente. Aqui, o objeto value e a função update são recriados em cada renderização do Provider. Uma melhoria possível seria estabilizar funções com useCallback e o objeto com useMemo, ou separar contextos conforme os dados consumidos. Isso não elimina as renderizações necessárias quando a coleção muda e deve ser avaliado antes de otimizar. No Flutter, Provider com ChangeNotifier permite compartilhar estado e notificar os consumidores; aqui usamos Context e atualizações de estado do React. Nos dois casos, compartilhar o estado e persistir os dados são responsabilidades diferentes.”

As otimizações citadas são propostas, não mudanças já implementadas. Ajustar as pausas durante o ensaio para completar a janela sem ultrapassar o limite total.

## 7. Conferência antes de publicar

- [ ] Manter os dois vídeos de Rogério completos e na ordem indicada.
- [ ] Os quatro aparecem e dizem seus nomes completos no início; conferir os nomes com a capa do PDF.
- [ ] Alex e Logan definiram entre si os responsáveis pelos blocos A e B, uma pessoa em cada bloco.
- [ ] Alex, Logan e Felipe explicam contribuições que realmente implementaram e citam os RF.
- [ ] Conferir visualmente os fluxos do primeiro vídeo, especialmente reabertura e dados restaurados. A transcrição menciona sessão e favorito; conferir também se a nota restaurada está legível. Se faltar essa evidência, gravar um complemento e recalcular a duração.
- [ ] As novas gravações mostram o código com fonte legível, sem credenciais ou senhas na tela.
- [ ] A duração final, incluindo cortes e transições, fica entre 6 e 9 minutos.
- [ ] Registrar no relatório o início real do aprofundamento técnico; nesta proposta é aproximadamente 6:20.
- [ ] Estar ciente de que preservar os clipes completos desloca os horários internos exigidos pelo professor.
- [ ] Publicar o vídeo no YouTube como Público, conferir o link e incluí-lo no PDF.

Não é necessário repetir a demonstração completa. Se um ensaio estourar o tempo, encurtar primeiro as novas falas e transições, preservando os vídeos de Rogério conforme solicitado.
