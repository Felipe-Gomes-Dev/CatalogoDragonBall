import React, { useState } from 'react';
import { ActivityIndicator, Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, font, styles } from '../theme';
export function Button({ title, onPress, secondary = false, busy = false, disabled = false, selected, compact = false }: {
  title: string; onPress: () => void; secondary?: boolean; busy?: boolean; disabled?: boolean; selected?: boolean; compact?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return <Pressable accessible accessibilityRole="button" accessibilityLabel={title} accessibilityState={{ disabled: disabled || busy, busy, selected: Platform.OS === 'web' ? undefined : selected }} {...(Platform.OS === 'web' && selected !== undefined ? { 'aria-pressed': selected } : {})} disabled={disabled || busy} onPress={onPress}
    onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
    style={({ pressed }) => [ui.button, compact && { minHeight: 44, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 24 }, { backgroundColor: secondary ? (selected ? '#3C3024' : colors.paper) : colors.orange, borderColor: focused ? colors.cyan : selected ? colors.orange : secondary ? colors.line : colors.orange, borderWidth: focused ? 3 : 1, opacity: pressed || disabled || busy ? 0.65 : 1 }]}>
    {busy && <ActivityIndicator color={secondary ? colors.orange : colors.navy} />}<Text style={[ui.buttonText, { color: secondary ? (selected ? colors.gold : colors.ink) : colors.navy }]}>{title}</Text>
  </Pressable>;
}
export function StateView({ title, message, busy, retry }: { title: string; message?: string; busy?: boolean; retry?: () => void }) {
  return <View style={ui.state} accessibilityLiveRegion="polite">
    {busy && <ActivityIndicator size="large" color={colors.blue} accessibilityLabel="Carregando" />}<Text style={styles.section} accessibilityRole="header">{title}</Text>
    {!!message && <Text style={[styles.subtitle, { textAlign: 'center' }]}>{message}</Text>}{retry && <Button title="Tentar novamente" onPress={retry} />}
  </View>;
}
export function CharacterImage({ uri, name, large = false }: { uri?: string; name: string; large?: boolean }) {
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  return <View style={[ui.imageBox, large && { height: 310 }]}>
    {large && <View pointerEvents="none" style={{ position: 'absolute', width: 240, height: 240, borderRadius: 120, backgroundColor: '#C76B2D', borderWidth: 14, borderColor: '#EE974A', transform: [{ rotate: '-20deg' }] }} />}
    {uri && !failed ? <><Image source={{ uri }} style={ui.image} resizeMode="contain" accessible accessibilityLabel={`Imagem de ${name}`} onLoad={() => setLoading(false)} onError={() => { setFailed(true); setLoading(false); }} />{loading && <ActivityIndicator style={{ position: 'absolute' }} color={colors.blue} accessibilityLabel={`Carregando imagem de ${name}`} />}</> : <Text style={ui.placeholder} accessible accessibilityLabel={`Imagem de ${name} indisponível`}>★</Text>}
  </View>;
}
export function Stars({ value, onChange, disabled = false }: { value: number; onChange: (rating: number) => void; disabled?: boolean }) {
  return <View style={styles.row}>{[1, 2, 3, 4, 5].map(star => <Pressable accessible key={star} disabled={disabled} onPress={() => onChange(star)} accessibilityRole="button" accessibilityLabel={`Dar nota ${star} de 5 estrelas`} accessibilityState={{ selected: Platform.OS === 'web' ? undefined : value === star, disabled }} {...(Platform.OS === 'web' ? { 'aria-pressed': value === star } : {})} style={ui.star}>
    <Text style={{ fontSize: 32, color: star <= value ? colors.orange : colors.muted }}>{star <= value ? '★' : '☆'}</Text></Pressable>)}</View>;
}
const ui = StyleSheet.create({
  button: { minHeight: 48, paddingHorizontal: 18, paddingVertical: 13, borderWidth: 1, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  buttonText: { fontFamily: font, fontSize: 14, fontWeight: '700', flexShrink: 1, textAlign: 'center' },
  state: { padding: 28, gap: 16, alignItems: 'center', justifyContent: 'center', flexGrow: 1 },
  imageBox: { height: 210, backgroundColor: colors.pale, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', borderRadius: 14 },
  image: { width: '100%', height: '100%' }, placeholder: { fontSize: 60, color: colors.orange },
  star: { minWidth: 48, minHeight: 48, padding: 4, alignItems: 'center', justifyContent: 'center' },
});
