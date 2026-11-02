import type { Character } from '../types';

// Conteúdo de apresentação em PT-BR. IDs, URLs e parâmetros de consulta não mudam.
const races: Record<string, string> = {
  Saiyan: 'Saiyajin',
  Namekian: 'Namekuseijin',
  Human: 'Humano',
  Android: 'Androide',
  'Frieza Race': 'Raça de Freeza',
  Majin: 'Majin',
  God: 'Divindade',
  Angel: 'Anjo',
  'Jiren Race': 'Raça de Jiren',
  Evil: 'Demônio',
  Unknown: 'Desconhecida',
  Nucleico: 'Núcleo',
  'Nucleico benigno': 'Núcleo benigno',
};
const affiliations: Record<string, string> = {
  'Z Fighter': 'Guerreiros Z',
  'Army of Frieza': 'Exército de Freeza',
  Freelancer: 'Independente',
  'Red Ribbon Army': 'Exército Red Ribbon',
  'Namekian Warrior': 'Guerreiros de Namekusei',
  'Pride Troopers': 'Tropa do Orgulho',
  'Assistant of Beerus': 'Assistente de Bills',
  'Assistant of Vermoud': 'Assistente de Vermoud',
  'Assistant of Vermouth': 'Assistente de Vermoud',
  Villain: 'Vilões',
  Other: 'Outros',
};
const names: Record<string, string> = {
  Freezer: 'Freeza',
  Celula: 'Cell',
  Krillin: 'Kuririn',
  'Master Roshi': 'Mestre Kame',
  Launch: 'Lunch',
  'Mr. Satan': 'Sr. Satan',
  'Grand Priest': 'Grande Sacerdote',
  'Kaio del norte (Kaito)': 'Senhor Kaiô do Norte',
  'Kaio del Sur': 'Kaiô do Sul',
  'Kaio del este': 'Kaiô do Leste',
  'Kaio del Oeste': 'Kaiô do Oeste',
  'Gran Kaio': 'Grande Kaiô',
  'Kaio-shin del Este': 'Kaioshin do Leste',
  'Kaio-shin del Norte': 'Kaioshin do Norte',
  'Kaio-shin del Sur': 'Kaioshin do Sul',
  'Kaio-shin del Oeste': 'Kaioshin do Oeste',
  'Gran Kaio-shin': 'Grande Kaioshin',
};

// Descrições adaptadas da API: revisão local, sem depender de tradução online.
export const characterDescriptions: Record<number, string> = {
  1: 'Goku é o protagonista de Dragon Ball, conhecido por seu grande poder e sua personalidade amigável. Criado na Terra, cresceu com um coração bondoso, preservando a força e as habilidades dos saiyajins. Na história original, uma pancada na cabeça durante a infância altera seu comportamento; na continuidade mais recente, seus pais o enviam à Terra para protegê-lo da destruição do planeta Vegeta por Freeza. Também chamado de Kakarotto, torna-se um dos principais defensores da Terra e do Universo 7, enfrentando inúmeras ameaças ao lado dos Guerreiros Z.',
  2: 'Príncipe dos saiyajins, Vegeta começa como inimigo de Goku. Ao se rebelar contra o império de Freeza, torna-se um aliado importante dos Guerreiros Z. Com o tempo, decide viver na Terra e lutar ao lado de seus antigos adversários. Sua trajetória o transforma de vilão e anti-herói em um dos principais heróis da série.',
  3: 'Piccolo é um namekuseijin criado nos últimos momentos de vida de seu pai, de quem também é a reencarnação. Inicialmente inimigo de Goku, passa a agir com bondade e se junta aos Guerreiros Z. Desenvolve um forte vínculo com seu discípulo Gohan, por quem sente um carinho quase paternal.',
  4: 'Bulma é uma das protagonistas de Dragon Ball. Filha do Dr. Brief e de Panchy e irmã mais nova de Tights, conhece Goku durante a busca pelas Esferas do Dragão. Mais tarde, forma uma família com Vegeta e se torna mãe de Trunks e Bra. Sua inteligência e suas invenções ajudam os Guerreiros Z em inúmeras aventuras.',
  5: 'Freeza é um tirano espacial e o principal antagonista da saga de Freeza.',
  6: 'Zarbon é um dos subordinados de Freeza e um lutador poderoso.',
  7: 'Dodoria é um dos subordinados de Freeza, conhecido por sua brutalidade.',
  8: 'Ginyu lidera a tropa de mercenários de elite do Exército de Freeza. O grupo recebe o nome de Forças Especiais Ginyu em sua homenagem.',
  9: 'Cell é um bioandroide criado pelo computador do Dr. Gero. Vem de uma linha do tempo futura com o objetivo de se vingar de Goku pela destruição do Exército Red Ribbon. É o principal antagonista da saga dos Androides e de Cell.',
  10: 'Gohan é um dos personagens centrais de Dragon Ball Z, Dragon Ball Super e Dragon Ball GT. Filho de Goku e Chi-Chi, é metade humano e metade saiyajin. É o irmão mais velho de Goten, marido de Videl e pai de Pan.',
  11: 'Kuririn é o melhor amigo de Goku e um guerreiro corajoso. Discípulo do Mestre Kame e integrante dos Guerreiros Z, participa de várias aventuras desde o início de Dragon Ball. Na saga de Majin Buu, decide se dedicar à família: é marido da Androide 18 e pai de Marron.',
  12: 'Tenshinhan é um mestre de artes marciais e integrante dos Guerreiros Z. Aparece no mangá e nas séries Dragon Ball, Dragon Ball Z, Dragon Ball GT e Dragon Ball Super.',
  13: 'Yamcha é um lutador que, antes de se tornar aliado de Goku, vivia como bandido no deserto.',
  14: 'Chi-Chi é a esposa de Goku e mãe de Gohan e Goten. Filha do Rei Cutelo, conhece Goku ainda na infância. Anos depois, casa-se com ele e se torna uma mãe rigorosa, mas carinhosa.',
  15: 'Gotenks é o resultado da Dança da Fusão realizada corretamente por Goten e Trunks.',
  16: 'Trunks é filho de Vegeta e Bulma e nasceu na Terra, com ascendência humana e saiyajin. É apresentado na saga dos Androides e de Cell. Torna-se praticante de artes marciais, melhor amigo de Goten e irmão mais velho de Bra.',
  17: 'Mestre Kame é um mestre de artes marciais e mentor de Goku. Já foi considerado o humano mais forte da Terra e ficou conhecido como o Deus das Artes Marciais. Antes de conquistar esse reconhecimento, treinou com Mutaito ao lado de seu rival, o Mestre Tsuru.',
  18: 'Bardock é um saiyajin de classe baixa do planeta Vegeta, no Universo 7. Integra o exército saiyajin e lidera seu próprio esquadrão durante o domínio do império de Freeza. É marido de Gine e pai de Kakarotto, conhecido como Goku, e de Raditz.',
  19: 'Lunch é uma personagem de Dragon Ball que muda de personalidade ao espirrar. Cada uma de suas duas personalidades tem um comportamento diferente e não se lembra do que a outra fez ou disse.',
  20: 'Sr. Satan é um lutador humano famoso por receber o crédito pelas vitórias dos Guerreiros Z.',
  21: 'Dende é um jovem namekuseijin com poderes especiais. Vivia na aldeia de Moori com seu irmão Scargo e outros habitantes de Namekusei. Mais tarde, assume o posto de protetor da Terra, sucedendo Kami-Sama.',
  22: 'O Androide 17 é o irmão gêmeo da Androide 18. Ambos eram humanos antes de serem sequestrados e modificados pelo Dr. Gero para destruir Goku. Rebelando-se contra o cientista, 17 destrói o controle que poderia desativá-lo e elimina seu criador. Depois, passa a ser perseguido por Cell, que precisa absorver os dois irmãos para alcançar sua forma perfeita.',
  23: 'O Androide 16 é um androide de grande porte, conhecido por seu amor à natureza e à vida.',
  24: 'O Androide 19 é um dos androides criados pelo Dr. Gero.',
  25: 'O Dr. Gero é o cientista responsável pela criação dos Androides 17, 18 e 19. Ele próprio se transforma no Androide 20.',
  26: 'O Androide 13 é um androide perigoso que aparece em um dos filmes de Dragon Ball Z.',
  27: 'O Androide 14 aparece no mesmo filme que o Androide 13.',
  28: 'O Androide 15 aparece no mesmo filme que o Androide 13.',
  29: 'Nail é um namekuseijin que pertence à linhagem guerreira de seu povo. Está entre os membros mais poderosos dessa linhagem, ao lado de Piccolo.',
  30: 'Raditz é filho de Bardock e Gine e irmão mais velho de Goku. É um dos poucos saiyajins que sobrevivem à destruição do planeta Vegeta e faz parte do grupo de Vegeta. É o primeiro antagonista de Dragon Ball Z.',
  31: 'Babidi é um poderoso feiticeiro ligado ao mago Bibidi e à família Majin. A letra M aparece em suas roupas e na testa daqueles que passam a agir sob seu controle.',
  32: 'Esta é a forma original e pura de Majin Buu, também conhecida como Buu original. É a última forma do personagem enfrentada em Dragon Ball Z.',
  33: 'Bills é o Deus da Destruição do Universo 7, onde se passa a maior parte da história de Dragon Ball. É apresentado no filme Dragon Ball Z: A Batalha dos Deuses, inicialmente como antagonista, e depois se torna um personagem central de Dragon Ball Super.',
  34: 'Whis é um dos filhos do Grande Sacerdote e irmão de Vados, Korn e Kus. Atua como anjo-guia, assistente e mestre de artes marciais de Bills, o Deus da Destruição do Universo 7.',
  35: 'Zeno é o Rei de Tudo e o governante supremo dos universos de Dragon Ball. Apesar de sua aparência simples, possui um poder imenso e autoridade sobre tudo o que existe no multiverso.',
  37: 'Kibito-Shin é a fusão de Shin e Kibito, realizada com os brincos Potara. Mais tarde, os dois voltam a se separar graças a um desejo concedido pelas Esferas do Dragão de Namekusei.',
  38: 'Jiren é um poderoso lutador do Universo 11 e um dos adversários mais formidáveis do Torneio do Poder.',
  39: 'Toppo é o líder da Tropa do Orgulho, grupo de defensores da justiça e da paz no Universo 11. Treinado pelo anjo Marcarita, torna-se candidato ao posto de Deus da Destruição de seu universo.',
  40: 'Dyspo integra a equipe do Universo 11. Ao lado de Jiren e do líder Toppo, está entre os guerreiros mais poderosos da Tropa do Orgulho.',
  42: 'Marcarita é o anjo-guia do Universo 11. Atua como assistente e mestra de artes marciais de Vermoud, o Deus da Destruição desse universo. Aparece na saga da Sobrevivência Universal de Dragon Ball Super.',
  43: 'Vermoud ocupa o posto de Deus da Destruição do Universo 11. Antes de assumir essa função, fazia parte da Tropa do Orgulho.',
  44: 'O Grande Sacerdote é um anjo que aconselha e auxilia os dois Zenos. Supervisiona o Torneio do Poder, recebe visitantes no palácio e faz cumprir as decisões divinas. É pai de vários anjos que servem aos Deuses da Destruição e está entre os seres mais poderosos do multiverso.',
  63: 'O Senhor Kaiô do Norte administra as galáxias do norte do Universo 7. Também supervisiona os deuses dos planetas dessa região, como Kami-Sama na Terra.',
  64: 'A Androide 18 é a irmã gêmea do Androide 17. Foi transformada pelo Dr. Gero a partir de uma base humana, inicialmente com a missão de destruir Goku.',
  65: 'Gogeta é a fusão de Goku e Vegeta por meio da Dança da Fusão. Combina o poder dos dois, a astúcia de Vegeta e o talento de Goku para as artes marciais. Sua voz reúne as vozes de ambos os guerreiros, e ele está entre os combatentes mais temíveis da série.',
  66: 'Vegetto é um dos personagens mais poderosos de Dragon Ball. Sua força resulta da união dos poderes de Goku e Vegeta, ampliados pela fusão. Está entre as fusões mais fortes da franquia.',
  67: 'Janemba é um demônio formado por pura maldade. Surge quando a máquina de purificação de almas do Outro Mundo explode por falta de cuidado de seu operador, um jovem ogro. As almas malignas usam o corpo do rapaz como receptáculo e dão origem ao demônio.',
  68: 'Broly é um saiyajin com um poder gigantesco e difícil de controlar. Essa força se manifesta plenamente quando ele assume a forma de Super Saiyajin Lendário. Mesmo quando bebê, seu nível de poder já causava espanto e preocupação entre os saiyajins.',
  69: 'O Kaiô do Sul é um dos deuses responsáveis pelas regiões do universo. Ao lado do Kaiô do Norte, aparece no mangá; no anime, integra o grupo dos quatro Kaiôs supervisionados pelo Grande Kaiô.',
  70: 'A Kaiô do Leste aparece apenas no anime. Gosta de desafios e treina seus discípulos com rigor. Seus guerreiros são conhecidos pela velocidade, como Chapuchai.',
  71: 'O Kaiô do Oeste é rival do Kaiô do Norte e administra a região oeste da galáxia.',
  72: 'O Grande Kaiô supervisiona os demais Kaiôs no Outro Mundo. Tem a aparência de um idoso de barba longa e cabelos brancos e costuma usar óculos escuros. Vive em um planeta próprio, onde a gravidade é dez vezes maior que a da Terra.',
  73: 'O Kaioshin do Leste é um dos deuses da criação, responsáveis pela vida e pela proteção do Universo 7. Originalmente cuidava da região leste. Após a morte dos outros Kaioshins na luta contra Majin Buu, assume a função de principal Kaioshin do universo.',
  74: 'O Kaioshin do Norte viveu ao lado dos outros Kaioshins e do Grande Kaioshin há cerca de cinco milhões de anos. Participou da batalha contra Majin Buu.',
  75: 'O Kaioshin do Sul governava a região sul do universo e era o mais poderoso entre os Kaioshins.',
  76: 'A Kaioshin do Oeste viveu ao lado dos outros Kaioshins. Foi a primeira a morrer na batalha contra Majin Buu, há cerca de cinco milhões de anos.',
  77: 'O Grande Kaioshin era o principal Kaioshin do Universo 7 e supervisionava os demais. Depois de ser absorvido por Majin Buu, sua personalidade passou a influenciar fortemente a forma gorda do vilão. Seu espírito permanece dentro do corpo de Buu.',
  78: 'Kibito é assistente e guarda-costas do Kaioshin do Leste. Além de ser um combatente experiente, possui poderes de cura e habilidades mágicas. Sua técnica mais conhecida é o teletransporte Kai Kai.',
};

export const planets: Record<string, { name: string; description: string }> = {
  Namek: {
    name: 'Namekusei',
    description:
      'Planeta natal dos namekuseijins, palco de grandes batalhas e lar das Esferas do Dragão de Namekusei.',
  },
  Tierra: {
    name: 'Terra',
    description:
      'A Terra é o principal cenário de Dragon Ball e o lar dos humanos e dos Guerreiros Z. Fica no Sistema Solar, na Via Láctea, na região norte do Universo 7, supervisionada pelo Senhor Kaiô do Norte. Ao longo da história, é atacada diversas vezes por inimigos poderosos.',
  },
  Vegeta: {
    name: 'Vegeta',
    description:
      'Antigo planeta natal dos saiyajins, antes chamado de planeta Plant. Localizava-se na região norte do Universo 7 e foi destruído por Freeza.',
  },
  'Freezer No. 79': {
    name: 'Freeza nº 79',
    description: 'Planeta usado por Freeza como base de operações e centro de clonagem.',
  },
  Kanassa: {
    name: 'Kanassa',
    description:
      'Planeta habitado pelos kanassans, conhecido pela batalha entre Bardock e seus habitantes.',
  },
  Monmar: {
    name: 'Monmar',
    description:
      'Planeta relacionado à busca de Gohan e Kuririn pelas Esferas do Dragão para ressuscitar seus amigos durante a saga de Namekusei.',
  },
  Yardrat: {
    name: 'Yardrat',
    description: 'Planeta onde Goku aprende a técnica de teletransporte durante sua estadia.',
  },
  'Kaiō del Norte': {
    name: 'Kaiô do Norte',
    description:
      'Planeta localizado no fim do Caminho da Serpente. É o lar do Senhor Kaiô do Norte, de Bubbles e de Gregory, que participam de seus treinamentos.',
  },
  Makyo: {
    name: 'Makyo',
    description:
      'Planeta que serve como fonte de poder para Garlic Jr. e seus aliados. Aparece na saga de Garlic Jr. de Dragon Ball Z.',
  },
  Babari: {
    name: 'Babari',
    description:
      'Planeta rochoso do Universo 10, habitado pelos babarianos. Aparece em Dragon Ball Super e é associado ao refúgio de Tarble, irmão de Vegeta.',
  },
  'Tsufur (Universo 6)': {
    name: 'Tsufur (Universo 6)',
    description: 'Planeta natal dos tsufurujins, povo ao qual pertencia o Dr. Raichi.',
  },
  Desconocido: {
    name: 'Desconhecido',
    description: 'Não há informações disponíveis sobre este planeta.',
  },
  'Otro Mundo': {
    name: 'Outro Mundo',
    description:
      'O Outro Mundo é a dimensão para onde vão os personagens depois da morte. Também abriga divindades superiores do universo e se distingue do mundo dos vivos.',
  },
  'Planeta de Bills': {
    name: 'Planeta de Bills',
    description:
      'Planeta situado no mundo dos vivos do Universo 7, apresentado no filme Dragon Ball Z: A Batalha dos Deuses.',
  },
  'Planeta del Gran Kaio': {
    name: 'Planeta do Grande Kaiô',
    description:
      'Local onde acontece o Torneio de Artes Marciais do Outro Mundo, realizado em homenagem ao Senhor Kaiô do Norte e disputado por guerreiros poderosos.',
  },
  'Nucleo del Mundo': {
    name: 'Núcleo do Mundo',
    description:
      'Planeta de origem da espécie dos Kaiôs e Kaioshins. Dele surgem tanto divindades benevolentes quanto suas contrapartes demoníacas.',
  },
  'Planeta sagrado': {
    name: 'Planeta Sagrado',
    description:
      'Planeta localizado no Reino dos Kaioshins, onde vivem os Kaioshins do Universo 7. Esse reino é separado do Outro Mundo, do mundo dos vivos e do Reino Demoníaco.',
  },
  'Nuevo Planeta Tsufrui': {
    name: 'Novo Planeta Tsufuru',
    description:
      'Também chamado de Novo Planeta Plant, é o novo lar dos tsufurujins controlados por Baby Vegeta. Surge após um desejo às Esferas do Dragão de Estrelas Negras para restaurar o planeta Plant na órbita da Terra.',
  },
  'Templo móvil del Rey de Todo': {
    name: 'Templo Móvel do Rei de Tudo',
    description:
      'Templo móvel que abriga os tronos dos dois Zenos no local onde acontece o Torneio do Poder de Dragon Ball Super.',
  },
  'Universo 11': {
    name: 'Universo 11',
    description:
      'Um dos doze universos de Dragon Ball. É o universo gêmeo do Universo 2 e o local de origem da Tropa do Orgulho.',
  },
};

export function characterName(name: string): string {
  const trimmed = name.trim();
  return names[trimmed] ?? trimmed.replace(/\bAndroid\b/g, 'Androide');
}
export function apiSearchName(query: string): string {
  const trimmed = query.trim();
  const original = Object.entries(names).find(
    ([, translated]) =>
      translated.toLocaleLowerCase('pt-BR') === trimmed.toLocaleLowerCase('pt-BR'),
  );
  return original?.[0] ?? trimmed.replace(/\bAndroide\b/gi, 'Android');
}
export const raceLabel = (value = '') =>
  races[value.trim()] ?? (Object.values(races).includes(value) ? value : 'Não informada');
export const affiliationLabel = (value = '') =>
  affiliations[value.trim()] ??
  (Object.values(affiliations).includes(value) ? value : 'Não informada');
export function powerLabel(value = ''): string {
  const trimmed = value.trim();
  if (!trimmed || /^(unknown|desconocido)$/i.test(trimmed)) return 'Não informado';
  const units: Record<string, [string, string]> = {
    million: ['milhão', 'milhões'],
    billion: ['bilhão', 'bilhões'],
    trillion: ['trilhão', 'trilhões'],
    quadrillion: ['quadrilhão', 'quadrilhões'],
    quintillion: ['quintilhão', 'quintilhões'],
    sextillion: ['sextilhão', 'sextilhões'],
    septillion: ['septilhão', 'septilhões'],
    septllion: ['septilhão', 'septilhões'],
    octillion: ['octilhão', 'octilhões'],
    googolplex: ['googolplex', 'googolplex'],
  };
  const match = trimmed.match(/^([\d.]+)\s+([a-z]+)$/i);
  if (match && units[match[2].toLowerCase()]) {
    const number = Number(match[1]);
    return `${number.toLocaleString('pt-BR', { maximumFractionDigits: 12 })} ${units[match[2].toLowerCase()][number === 1 ? 0 : 1]}`;
  }
  if (/^[\d.,]+$/.test(trimmed)) return trimmed.replace(/,/g, '.');
  // Já localizado: permite reabrir itens persistidos sem traduzir duas vezes.
  if (
    /^[\d.,]+ (milhão|milhões|bilhão|bilhões|trilhão|trilhões|quadrilhão|quadrilhões|quintilhão|quintilhões|sextilhão|sextilhões|septilhão|septilhões|octilhão|octilhões|googolplex)$/.test(
      trimmed,
    )
  )
    return trimmed;
  return 'Não informado';
}
export function transformationName(name: string): string {
  return characterName(name)
    .replace(/Freezer/g, 'Freeza')
    .replace(/SSJB Evolved/g, 'Super Saiyajin Azul Evoluído')
    .replace(/SSJB/g, 'Super Saiyajin Azul')
    .replace(/SSJ(\d*)/g, (_match, level: string) => `Super Saiyajin${level ? ` ${level}` : ''}`)
    .replace(/Ultra Instinc(?:t)?/g, 'Instinto Superior')
    .replace(/Mega Instinc Evil/g, 'Instinto Maligno')
    .replace(/Super Namekian/g, 'Super Namekuseijin')
    .replace(/Orange/g, 'Laranja')
    .replace(/2nd Form/g, 'Segunda Forma')
    .replace(/3rd Form/g, 'Terceira Forma')
    .replace(/Super Perfect Form/g, 'Forma Superperfeita')
    .replace(/Semi Perfect Form/g, 'Forma Semiperfeita')
    .replace(/Imperfect Form/g, 'Forma Imperfeita')
    .replace(/Perfect Form/g, 'Forma Perfeita')
    .replace(/Golden/g, 'Dourada')
    .replace(/Monster/g, 'Monstro')
    .replace(/Ultimate/g, 'Supremo')
    .replace(/Beast/g, 'Fera')
    .replace(/Rage/g, 'Fúria')
    .replace(/Pure/g, 'Puro')
    .replace(/Legendary/g, 'Lendário');
}
export function localizeCharacter(character: Character): Character {
  const planet = character.originPlanet;
  const translatedPlanet = planet
    ? (planets[planet.name.trim()] ??
      Object.values(planets).find((p) => p.name === planet.name.trim()))
    : undefined;
  const genders: Record<string, string> = {
    Male: 'Masculino',
    Female: 'Feminino',
    Other: 'Outro',
    Unknown: 'Não informado',
  };
  return {
    ...character,
    name: characterName(character.name),
    race: raceLabel(character.race),
    affiliation: affiliationLabel(character.affiliation),
    gender:
      genders[character.gender ?? ''] ??
      (['Masculino', 'Feminino', 'Outro'].includes(character.gender ?? '')
        ? character.gender
        : 'Não informado'),
    ki: powerLabel(character.ki),
    maxKi: powerLabel(character.maxKi),
    description:
      characterDescriptions[character.id] ??
      'A descrição deste personagem ainda não está disponível em português.',
    originPlanet: planet
      ? {
          ...planet,
          name: translatedPlanet?.name ?? 'Origem desconhecida',
          description:
            translatedPlanet?.description ??
            'A descrição deste planeta ainda não está disponível em português.',
        }
      : undefined,
    transformations: character.transformations?.map((form) => ({
      ...form,
      name: transformationName(form.name),
      ki: powerLabel(form.ki),
    })),
  };
}
