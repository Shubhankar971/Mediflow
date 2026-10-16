import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const C = {
  ink: '#183247', muted: '#728493', teal: '#087F8C', tealDark: '#06636D',
  bg: '#F4F8FB', white: '#FFFFFF', border: '#E4EBF0', green: '#1C9B78',
  pale: '#E5F5F3', orange: '#E99539', red: '#D95C5C'
};

export function Screen({ children, style }) {
  return <View style={[styles.screen, style]}>{children}</View>;
}
export function Header({ title, subtitle, right, onBack }) {
  return <View style={styles.header}>
    {onBack ? <TouchableOpacity onPress={onBack} style={styles.back}><Ionicons name="arrow-back" size={22} color={C.ink}/></TouchableOpacity> : null}
    <View style={{ flex: 1 }}>
      <Text style={styles.headerTitle}>{title}</Text>
      {subtitle ? <Text style={styles.headerSub}>{subtitle}</Text> : null}
    </View>
    {right || <View style={styles.avatar}><Ionicons name="person" size={18} color={C.teal}/></View>}
  </View>;
}
export function SectionTitle({ title, action, onPress }) {
  return <View style={styles.sectionTitle}><Text style={styles.sectionText}>{title}</Text>
    {action ? <TouchableOpacity onPress={onPress}><Text style={styles.action}>{action}</Text></TouchableOpacity> : null}
  </View>;
}
export function PrimaryButton({ title, onPress, icon, style, disabled }) {
  return <TouchableOpacity disabled={disabled} onPress={onPress} activeOpacity={0.85} style={[styles.primary, disabled && { opacity: .45 }, style]}>
    {icon ? <Ionicons name={icon} size={18} color="#fff" style={{ marginRight: 8 }} /> : null}<Text style={styles.primaryText}>{title}</Text>
  </TouchableOpacity>;
}
export function Chip({ label, active, onPress }) {
  return <TouchableOpacity onPress={onPress} style={[styles.chip, active && styles.chipActive]}><Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text></TouchableOpacity>;
}
export function StatCard({ label, value, icon, tint, note }) {
  return <View style={styles.statCard}>
    <View style={[styles.statIcon, { backgroundColor: tint || C.pale }]}><Ionicons name={icon} size={19} color={C.teal}/></View>
    <Text style={styles.statValue}>{value}</Text><Text style={styles.statLabel}>{label}</Text>
    {note ? <Text style={styles.statNote}>{note}</Text> : null}
  </View>;
}
export function RemoteImage({ uri, style, icon = 'image-outline' }) {
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  return <View style={[styles.imageWrap, style]}>
    {!failed ? <Image source={{ uri }} style={StyleSheet.absoluteFillObject} resizeMode="cover" onLoad={() => setLoading(false)} onError={() => { setLoading(false); setFailed(true); }} /> : null}
    {loading && !failed ? <View style={styles.imagePlaceholder}><ActivityIndicator color={C.teal}/></View> : null}
    {failed ? <View style={styles.imagePlaceholder}><Ionicons name={icon} size={26} color={C.teal}/><Text style={styles.fallbackText}>Image unavailable</Text></View> : null}
  </View>;
}
export function EmptyState({ title, body, icon = 'search-outline' }) {
  return <View style={styles.empty}><Ionicons name={icon} size={32} color="#9AAAB5"/><Text style={styles.emptyTitle}>{title}</Text><Text style={styles.emptyBody}>{body}</Text></View>;
}
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg, paddingHorizontal: 18 },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 12, paddingBottom: 18, gap: 10 },
  headerTitle: { color: C.ink, fontSize: 23, fontWeight: '800', letterSpacing: -.4 },
  headerSub: { color: C.muted, fontSize: 12, marginTop: 3 },
  back: { width: 38, height: 38, borderRadius: 13, backgroundColor: C.white, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.border },
  avatar: { width: 40, height: 40, borderRadius: 14, backgroundColor: C.pale, alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, marginBottom: 12 },
  sectionText: { fontSize: 16, fontWeight: '800', color: C.ink },
  action: { color: C.teal, fontWeight: '700', fontSize: 12 },
  primary: { minHeight: 48, borderRadius: 15, backgroundColor: C.teal, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingHorizontal: 16 },
  primaryText: { color: '#fff', fontSize: 14, fontWeight: '800' },
  chip: { borderRadius: 22, borderWidth: 1, borderColor: C.border, backgroundColor: C.white, paddingHorizontal: 14, paddingVertical: 9, marginRight: 8 },
  chipActive: { backgroundColor: C.teal, borderColor: C.teal },
  chipText: { color: C.muted, fontSize: 12, fontWeight: '700' },
  chipTextActive: { color: '#fff' },
  statCard: { backgroundColor: C.white, borderRadius: 18, padding: 13, width: '48.5%', marginBottom: 10, borderWidth: 1, borderColor: C.border },
  statIcon: { width: 35, height: 35, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 9 },
  statValue: { fontSize: 23, color: C.ink, fontWeight: '800' },
  statLabel: { fontSize: 12, color: C.muted, fontWeight: '600', marginTop: 2 },
  statNote: { fontSize: 10, color: C.green, marginTop: 6, fontWeight: '700' },
  imageWrap: { backgroundColor: '#E5EEF2', overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  imagePlaceholder: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E8F2F4' },
  fallbackText: { fontSize: 9, color: C.muted, marginTop: 4 },
  empty: { alignItems: 'center', paddingVertical: 28, paddingHorizontal: 20 },
  emptyTitle: { color: C.ink, fontWeight: '800', marginTop: 10, fontSize: 15 },
  emptyBody: { color: C.muted, fontSize: 12, textAlign: 'center', marginTop: 5, lineHeight: 18 }
});