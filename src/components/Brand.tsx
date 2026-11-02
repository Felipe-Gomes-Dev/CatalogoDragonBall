import React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { colors, font, styles } from '../theme';

export function DragonBallMark({ size = 42 }: { size?: number }) {
  const { fontScale } = useWindowDimensions();
  const dimension = size * Math.max(1, fontScale);
  return <View accessible accessibilityRole="image" accessibilityLabel="Esfera de quatro estrelas" style={{ width: dimension, height: dimension, borderRadius: dimension / 2, backgroundColor: colors.orange, borderWidth: 2, borderColor: colors.gold, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ fontFamily: font, color: '#7C2700', fontSize: size * 0.25, lineHeight: size * 0.28, textAlign: 'center', fontWeight: '900' }}>★ ★{'\n'}★ ★</Text>
  </View>;
}
export function Brand() {
  return <View style={{ flexDirection: 'row', alignItems: 'center', gap: 11, flexShrink: 1 }}><DragonBallMark /><View style={{ flexShrink: 1 }}><Text style={{ fontFamily: font, color: colors.ink, fontSize: 21, fontWeight: '900', letterSpacing: -0.7 }}>Catálogo <Text style={{ color: colors.orange }}>Z</Text></Text><Text style={{ fontFamily: font, color: colors.muted, fontSize: 12 }}>O universo Dragon Ball</Text></View></View>;
}
export function WarriorHero({ login = false }: { login?: boolean }) {
  const { width, fontScale } = useWindowDimensions();
  const compact = width < 600;
  return <View style={[hero.container, { minHeight: compact ? (login ? 190 : 260) : 310 }]}>
    <View style={[hero.copy, { width: fontScale > 1.4 ? '100%' : compact ? '64%' : '70%' }]}>
      {!(login && compact) && <Text style={hero.tag}>Sua jornada começa aqui</Text>}
      <Text style={[hero.title, compact && { fontSize: 29, lineHeight: 32 }]}>{login ? 'Sua história\ncomeça aqui.' : 'Um universo.\nSem limites.'}</Text>
      {!(login && compact) && <Text style={[styles.subtitle, { maxWidth: fontScale > 1.4 ? undefined : compact ? 180 : 280, color: '#D1DBEA', fontSize: 14 }]}>{login ? 'Entre, descubra seus personagens e monte sua própria coleção.' : 'Explore as histórias e reúna seus guerreiros favoritos.'}</Text>}
      {!(login && compact) && <View style={hero.signature}><View style={{ width: 24, height: 3, backgroundColor: colors.orange }} /><Text style={{ color: colors.gold, fontFamily: font, fontSize: 11, fontWeight: '700' }}>Dragon Ball, do seu jeito</Text></View>}
    </View>
    {fontScale <= 1.4 && <View pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={hero.art}>
      <View style={[hero.orbit, !compact && { right: 30 }]} /><View style={[hero.orbitInner, !compact && { right: 10 }]} />
      <Image source={{ uri: 'https://dragonball-api.com/characters/goku_normal.webp' }} style={[hero.goku, { width: compact ? '110%' : '80%', right: compact ? -12 : '5%', height: compact ? (login ? 185 : 240) : 275 }]} resizeMode="contain" accessible={false} />
    </View>}
  </View>;
}
const hero = StyleSheet.create({
  container: { minHeight: 280, backgroundColor: '#1B3150', borderRadius: 24, padding: 26, overflow: 'hidden', justifyContent: 'center', borderWidth: 1, borderColor: '#304766' },
  copy: { gap: 14, zIndex: 2, width: '76%' },
  // A arte fica restrita à sua região: nenhuma letra pode cair sobre o laranja.
  art: { position: 'absolute', left: '64%', right: 0, top: 0, bottom: 0, overflow: 'hidden' },
  tag: { fontFamily: font, color: colors.gold, fontSize: 12, fontWeight: '700' },
  title: { fontFamily: font, color: 'white', fontSize: 35, lineHeight: 39, fontWeight: '900', letterSpacing: -1.4 },
  orbit: { position: 'absolute', width: 290, height: 290, borderRadius: 145, backgroundColor: '#EF7523', right: -110, top: 35, transform: [{ rotate: '-15deg' }] },
  orbitInner: { position: 'absolute', width: 330, height: 330, borderRadius: 165, borderWidth: 1, borderColor: '#E4AD5966', right: -130, top: 15 },
  goku: { position: 'absolute', right: -36, bottom: -18, width: '48%', height: 275, opacity: 0.95 },
  signature: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4, flexWrap: 'wrap' },
});
