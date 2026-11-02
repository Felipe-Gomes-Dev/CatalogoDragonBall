"""Verificação RF10 no emulador de teste, com ADB/UI Automator.

Requer aplicativo já aberto em modo local. Não usa contas Supabase.
Fases separadas permitem inspecionar cada resultado antes de continuar.
"""
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
ADB = Path(os.environ['LOCALAPPDATA']) / 'Android/Sdk/platform-tools/adb.exe'
SERIAL = 'emulator-5554'
OUTPUT = ROOT / 'docs/accessibility'
OUTPUT.mkdir(parents=True, exist_ok=True)

def adb(*args):
    return subprocess.check_output([str(ADB), '-s', SERIAL, *args], text=True, encoding='utf-8', errors='replace', creationflags=0x08000000)

def tree():
    adb('shell', 'uiautomator', 'dump', '/sdcard/rf10.xml')
    return ET.fromstring(adb('shell', 'cat', '/sdcard/rf10.xml'))

def find(label, scroll=False):
    for _ in range(6 if scroll else 10):
        for node in tree().iter('node'):
            if node.get('content-desc') == label and node.get('enabled') == 'true':
                return node
        if scroll:
            adb('shell', 'input', 'swipe', '540', '1900', '540', '700', '400')
    raise RuntimeError(f'Alvo acessível não encontrado: {label}')

def tap(label, scroll=False):
    node = find(label, scroll)
    x1,y1,x2,y2 = map(int, re.findall(r'\d+', node.get('bounds')))
    adb('shell', 'input', 'tap', str((x1+x2)//2), str((y1+y2)//2))

def fill(label, value):
    if find(label, True).get('text') == value:
        return
    tap(label, True)
    tree()  # Aguarda a abertura do teclado antes de digitar.
    adb('shell', 'input', 'text', value)
    tree()
    if 'mInputShown=true' in adb('shell', 'dumpsys', 'input_method'):
        adb('shell', 'input', 'keyevent', '4')

def save(name):
    snapshot = tree()
    ET.ElementTree(snapshot).write(OUTPUT / f'{name}.xml', encoding='utf-8', xml_declaration=True)
    adb('shell', 'screencap', '-p', '/sdcard/rf10.png')
    adb('pull', '/sdcard/rf10.png', str(OUTPUT / f'{name}.png'))
    print(json.dumps([{'text': n.get('text'), 'label': n.get('content-desc'), 'selected': n.get('selected'), 'bounds': n.get('bounds')} for n in snapshot.iter('node') if n.get('text') or n.get('content-desc')], ensure_ascii=False))

phase = sys.argv[1]
if phase == 'signup':
    if any(n.get('content-desc') == 'Quero me cadastrar' for n in tree().iter('node')):
        tap('Quero me cadastrar', True)
    tap('E-mail', True)
    tree()
    for index, (label, value) in enumerate([
        ('E-mail', 'rf10.native@example.com'),
        ('Senha, no mínimo 6 caracteres', 'AcessoZ123'),
        ('Confirme a senha', 'AcessoZ123'),
    ]):
        focused = [n for n in tree().iter('node') if n.get('focused') == 'true' and n.get('class') == 'android.widget.EditText']
        assert focused and focused[0].get('content-desc') == label, f'Foco esperado: {label}'
        adb('shell', 'input', 'keycombination', '113', '29')
        adb('shell', 'input', 'text', value)
        if index < 2:
            adb('shell', 'input', 'keyevent', '61')
    adb('shell', 'input', 'keyevent', '111')
    tap('Criar conta', True)
    find('Buscar personagens')
    save('android-catalogo')
elif phase == 'detail':
    tap('Goku, Saiyajin. Abrir detalhes.', True)
    tap('Marcar como conhecido', True)
    tap('Dar nota 5 de 5 estrelas', True)
    assert find('Dar nota 5 de 5 estrelas').get('selected') == 'true'
    save('android-nota-selecionada')
elif phase == 'large':
    adb('shell', 'settings', 'put', 'system', 'font_scale', '2.0')
    save('android-fonte-200-detalhes')
elif phase == 'large-detail':
    tap('Goku, Saiyajin, conhecido, nota 5 de 5. Abrir detalhes.', True)
    find('Voltar')
    save('android-fonte-200-detalhes')
    find('Dar nota 5 de 5 estrelas', True)
    save('android-fonte-200-estrelas')
elif phase == 'reader':
    service = 'com.google.android.marvin.talkback/com.google.android.marvin.talkback.TalkBackService'
    adb('shell', 'settings', 'put', 'secure', 'enabled_accessibility_services', service)
    adb('shell', 'settings', 'put', 'secure', 'accessibility_enabled', '1')
    save('android-talkback-ativo')
elif phase == 'snapshot':
    save(sys.argv[2])
elif phase == 'restore':
    adb('shell', 'settings', 'put', 'system', 'font_scale', '1.0')
    adb('shell', 'settings', 'delete', 'secure', 'enabled_accessibility_services')
    adb('shell', 'settings', 'put', 'secure', 'accessibility_enabled', '0')
    print('Configuração original do emulador restaurada: fonte 1.0, TalkBack desativado.')
else:
    raise ValueError('Fase desconhecida')
