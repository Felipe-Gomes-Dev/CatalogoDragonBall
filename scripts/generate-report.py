"""Gera rascunho de entrega; completar docs/entrega.json antes da versão final."""
from pathlib import Path
import json
from xml.sax.saxutils import escape
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Image, KeepTogether
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4

ROOT = Path(__file__).resolve().parents[1]
config = json.loads((ROOT / 'docs/entrega.json').read_text(encoding='utf-8-sig'))
out = ROOT / 'output/pdf/relatorio-rascunho.pdf'
out.parent.mkdir(parents=True, exist_ok=True)
navy, orange = colors.HexColor('#142F56'), colors.HexColor('#A93C0C')
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='TitleZ', fontName='Helvetica-Bold', fontSize=29, leading=35, textColor=navy, spaceAfter=18))
styles.add(ParagraphStyle(name='BodyZ', fontSize=10, leading=15, spaceAfter=10, textColor=navy))
styles.add(ParagraphStyle(name='HeadingZ', fontName='Helvetica-Bold', fontSize=16, leading=21, spaceBefore=12, spaceAfter=10, textColor=navy))
styles.add(ParagraphStyle(name='SmallZ', fontSize=8, leading=11, textColor=navy))
styles.add(ParagraphStyle(name='CaptionZ', fontSize=10, leading=14, alignment=TA_CENTER, textColor=navy, spaceAfter=10))
story = []
def p(text, style='BodyZ'):
    return Paragraph(escape(text).replace('\n', '<br/>'), styles[style])
def add(text, style='BodyZ'):
    story.append(p(text, style))
def heading(text): add(text, 'HeadingZ')
def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(navy); canvas.line(40, 40, A4[0]-40, 40)
    canvas.setFont('Helvetica', 8); canvas.setFillColor(navy)
    canvas.drawString(40, 27, 'Catálogo Z | Rascunho - revisar dados e links antes da submissão')
    canvas.drawRightString(A4[0]-40, 27, str(doc.page)); canvas.restoreState()

add('Dragon Ball\nCatálogo Z', 'TitleZ')
add('Desenvolvimento Mobile Híbrido\nBacharelado em Sistemas de Informação (BSI)\nProfessor: Mark Joselli')
add(f"Turma: {config['turma']}\nData de entrega: 02/11/2026")
heading('Integrantes')
for name in config['integrantes']: add(name)
add('RASCUNHO: faltam dados do grupo e link do vídeo público. Capturas obtidas na versão web em viewport móvel. Supabase validado com duas contas de teste.', 'SmallZ')
heading('1. Links')
add('Repositório GitHub público: ' + config['repositorio'])
add('Vídeo YouTube público: ' + config['video'])
heading('2. Tema e configuração')
add('Tema: personagens de Dragon Ball. API: https://dragonball-api.com/api. Framework: React Native com Expo e TypeScript. Tema do somativo Flutter: Pokémon, portanto diferente deste projeto.')
add('Persistência obrigatória: AsyncStorage. Login local: PBKDF2-HMAC-SHA256 com salt e sessão em SecureStore no celular. Itens consumidos são chamados de conhecidos, com avaliação de 1 a 5 estrelas.')
add('Extras implementados e validados: Supabase Auth e coleção em dragonball_items no mesmo projeto Supabase do Flutter. A tabela Pokémon user_items permanece separada. Teste real confirmou cadastro/login, gravação e recuperação da coleção, renovação de sessão, desmarcações e isolamento RLS entre duas contas QA.')
story.append(PageBreak())
heading('3. Autoavaliação RF01-RF10')
rows = [['RF', 'Implementado', 'Arquivo principal']]
reqs = [
 ('RF01', 'Sim', 'src/hooks/useCharacters.ts\nsrc/components/CharacterGrid.tsx'),
 ('RF02', 'Sim', 'src/navigation/RootNavigator.tsx'),
 ('RF03', 'Sim', 'src/screens/DetailScreen.tsx'),
 ('RF04', 'Sim', 'src/contexts/CollectionContext.tsx'),
 ('RF05', 'Sim', 'src/screens/CollectionScreen.tsx'),
 ('RF06', 'Sim (local + nuvem)', 'src/contexts/CollectionContext.tsx\nsrc/services/storage.ts'),
 ('RF07', 'Sim (local + Auth real)', 'src/services/auth.ts\nsrc/contexts/AuthContext.tsx'),
 ('RF08', 'Sim', 'src/screens/SearchScreen.tsx'),
 ('RF09', 'Sim', 'src/components/ui.tsx\nsrc/hooks/useCharacters.ts'),
 ('RF10', 'Parcial: validar leitor nativo', 'src/components/\nsrc/theme/index.ts'),
]
rows += [[p(a, 'SmallZ'), p(b, 'SmallZ'), p(c, 'SmallZ')] for a,b,c in reqs]
table = Table(rows, colWidths=[48, 115, 330], repeatRows=1, hAlign='LEFT')
table.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),navy),('TEXTCOLOR',(0,0),(-1,0),colors.white),('FONTNAME',(0,0),(-1,0),'Helvetica-Bold'),('VALIGN',(0,0),(-1,-1),'TOP'),('TOPPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),8),('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.HexColor('#F3F6FC'),colors.white]),('LINEBELOW',(0,0),(-1,0),1,navy)]))
story.append(table)
add('Autoavaliação baseada no código, testes web e teste real do Supabase. RF10 tem labels, roles, estados e adaptação de fonte implementados; TalkBack/VoiceOver em aparelho ainda deve ser validado. Bônus RF06/RF07: autenticação, persistência e RLS validados no servidor.', 'SmallZ')
heading('4. Flutter × React Native')
add('A Pokédex Flutter separava serviços, providers e widgets; o Catálogo Z preserva as responsabilidades usando serviços, Context e componentes. ChangeNotifier e notifyListeners dão lugar a createContext/useContext e estados React. Favoritos e sessão são globais; o texto da busca fica em useState local, evitando espalhar atualizações que só interessam à tela de busca.')
add('GridView dá lugar à FlatList virtualizada, com numColumns, keyExtractor e rolagem infinita. Em vez do botão de carregar mais do Flutter, onEndReached busca a página seguinte. Uma falha preserva os itens e oferece nova tentativa no rodapé. Ao contrário da busca Flutter que abria diretamente um detalhe, a busca React Native mostra uma lista de resultados.')
story.append(PageBreak())
heading('4. Comparação (continuação)')
add('FutureBuilder e providers assíncronos foram adaptados para useEffect/useState. O cleanup usa AbortController para cancelar consultas antigas. Gravações locais são serializadas e a sincronização remota reconcilia alterações pela data. O gate inicial aguarda recuperar a sessão e a coleção, evitando mostrar dados zerados.')
add('Hot reload e ferramentas Dart são comparáveis ao Fast Refresh e ao fluxo de QR code do Expo. TypeScript ajuda a verificar modelos e rotas antes de executar. A produtividade percebida deve ser complementada com a experiência real dos integrantes. Testes de navegador não substituem validação em Android/iOS.')
heading('5. Tema da explicação técnica')
add('Tema: Context API, estado local e persistência. Minuto: ' + config['minutoTema'])
add('Mostrar o caminho UI -> CollectionContext -> AsyncStorage -> Supabase. Explicar por que favoritos e sessão são globais, como useEffect restaura a coleção e como o logout altera a árvore de navegação. Comparar com Provider do Flutter e discutir renderizações dos consumidores. Roteiro completo em docs/roteiro-video.md, duração alvo de 8 minutos.')
heading('Evidências e limites da verificação')
add('19 testes unitários aprovados: contrato paginado/filtrado, busca, falhas, HTML, conflitos/fusos, desmarcações, notas e apresentação PT-BR dos personagens, planetas e transformações. Fluxo web aprovado com cadastro, login, paginação com falha e recuperação, favoritos, conhecido, nota, busca, reabertura, logout e isolamento de contas. TypeScript, lint, compatibilidade Expo e bundles web/Android verificados. Integração Supabase testada com duas contas QA.')
add('As próximas páginas apresentam screenshots reais da interface web em viewport 390 × 844. Dados da API foram reproduzidos por fixtures no teste e imagens vêm dos URLs públicos originais. Não representam evidência de autenticação remota, leitor de tela nativo ou execução Android.')
heading('Pendências antes da submissão')
add('Preencher integrantes, turma e link do vídeo. Executar no dispositivo, testar leitor de tela e fonte ampliada. Gravar todos os integrantes falando. Publicar o código no repositório indicado quando autorizado, revisar o PDF final e enviar pelo campo oficial do AVA.')
for pair in [
 [('01-login.png','Login e cadastro'),('02-catalogo.png','Catálogo paginado')],
 [('03-detalhes.png','Detalhes, favorito e nota'),('06-busca.png','Busca por personagem')],
 [('04-favoritos.png','Favoritos'),('05-conhecidos.png','Conhecidos e avaliações')],
]:
    story.append(PageBreak()); heading('6. Screenshots das telas principais')
    cells=[]
    for filename, label in pair:
        file=ROOT/'docs/screenshots'/filename
        image=Image(str(file), width=236, height=236*844/390)
        cells.append([p(label,'CaptionZ'),image])
    t=Table([cells],colWidths=[248,248],hAlign='CENTER')
    t.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),5),('RIGHTPADDING',(0,0),(-1,-1),5)]))
    story.append(t)
    story.append(Spacer(1,16)); add('Execução web em viewport móvel. Screenshots geradas pelo teste automatizado.', 'SmallZ')
doc=SimpleDocTemplate(str(out),pagesize=A4,rightMargin=48,leftMargin=48,topMargin=45,bottomMargin=58,title='Catálogo Z - Relatório de entrega (rascunho)',author='Grupo BSI')
doc.build(story,onFirstPage=footer,onLaterPages=footer)
print(out)
