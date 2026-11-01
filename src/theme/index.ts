import { Platform, StyleSheet } from 'react-native';
export const font = Platform.select({ web: 'Arial', android: 'sans-serif', default: 'System' });
export const colors = {
  navy: '#101C30', blue: '#FF912F', orange: '#FF912F', gold: '#FFD572',
  background: '#0D1626', paper: '#18263B', ink: '#F5F7FC', muted: '#A9B8CD',
  line: '#2D3D55', danger: '#FF9B94', pale: '#202F47', cyan: '#78CEF4',
};
export const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, gap: 18, width: '100%', maxWidth: 880, alignSelf: 'center' },
  title: { fontFamily: font, color: colors.ink, fontSize: 32, letterSpacing: -1, fontWeight: '900', flexShrink: 1 },
  subtitle: { fontFamily: font, color: colors.muted, fontSize: 15, lineHeight: 23 },
  section: { fontFamily: font, fontSize: 21, fontWeight: '800', color: colors.ink, letterSpacing: -0.4 },
  text: { fontFamily: font, color: colors.ink, fontSize: 16, lineHeight: 26 },
  label: { fontFamily: font, color: colors.ink, fontSize: 14, fontWeight: '700' },
  input: { fontFamily: font, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.background, borderRadius: 12, minHeight: 54, padding: 16, fontSize: 16, color: colors.ink },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 10 },
  panel: { backgroundColor: colors.paper, padding: 22, borderRadius: 20, gap: 14, borderWidth: 1, borderColor: colors.line },
  error: { fontFamily: font, color: colors.danger, fontSize: 15, lineHeight: 22 },
});
