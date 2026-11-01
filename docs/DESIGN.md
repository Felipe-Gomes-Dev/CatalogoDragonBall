# Direção visual — Catálogo Z

Referências pesquisadas: elenco oficial de Dragon Ball Sparking! ZERO, https://en.bandainamcoent.eu/dragon-ball/dragon-ball-sparking-zero/fighters, e página oficial https://dbsz.bn-ent.net/character/. As referências orientam a valorização dos personagens; o layout do aplicativo é próprio e as imagens continuam vindo da Dragon Ball API.

Paleta: fundo azul profundo `#0D1626`, superfícies `#18263B`, laranja do uniforme `#FF912F`, dourado das esferas `#FFD572`, azul de energia `#78CEF4`, texto `#F5F7FC`. A ação principal usa texto escuro sobre laranja para manter contraste.

Tipografia: sans-serif do sistema no celular e Arial na web, títulos fortes e espaçamento mais contido. Fonte de corpo de 15–16, sem desabilitar escala do sistema.

Composição: marca com esfera de quatro estrelas, destaque do Goku com círculo laranja, busca visível e dois atalhos para a coleção. No desktop, login em duas colunas e catálogo com até quatro cards por linha. No celular, duas colunas; uma coluna em larguras pequenas ou fonte ampliada.

Cards priorizam a arte, raça, nome e afiliação. Favoritar é uma ação sobreposta com área de 44×44 e estado anunciado. Detalhes usam destaque circular e atributos de poder agrupados. Filtros de raça usam controles compactos de pelo menos 44 pontos.

Não há animação automática. Feedback de toque, estados selecionados, carregamento e erros continuam disponíveis em todas as telas.

Textos da interface, descrições, raças, afiliações, gêneros, planetas, transformações e unidades de Ki são apresentados em português do Brasil. A camada `src/locales/pt-BR.ts` adapta o conteúdo público da API; IDs e valores de filtros usados nas requisições não são traduzidos. Nomes próprios permanecem, com adaptações usuais como Mestre Kame, Freeza e Kuririn.
