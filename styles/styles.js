import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useApp } from '../context/AppContext';

export const colors = {
  bg: '#F7F7FA',
  card: '#FFFFFF',
  primary: '#4C5FD5',
  secondary: '#A0A6C0',
  text: '#1F1F2E',
  muted: '#5A5A6E',
  border: '#DADAE6',
  danger: '#C25B5B',
  success: '#3F9B5B',
};

// Al styling ligger samlet her. Skriftstørrelsen skaleres, hvis brugeren har slået
// "Stor tekst" til (feedback fra deltager 2 + ældrestakeholder).
export function createStyles(largeText = false) {
  const s = largeText ? 1.3 : 1;
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg, padding: 20, paddingTop: 24 },
    title: { fontSize: 26 * s, fontWeight: '700', color: colors.text, marginBottom: 8 },
    subtitle: { fontSize: 15 * s, color: colors.muted, marginBottom: 20, lineHeight: 21 * s },
    sectionTitle: { fontSize: 17 * s, fontWeight: '700', color: colors.text, marginBottom: 8, marginTop: 12 },

    button: {
      backgroundColor: colors.primary, paddingVertical: 14, borderRadius: 10,
      alignItems: 'center', marginBottom: 12,
    },
    buttonSecondary: { backgroundColor: colors.secondary },
    buttonDanger: { backgroundColor: colors.danger },
    buttonSuccess: { backgroundColor: colors.success },
    buttonText: { color: '#FFFFFF', fontSize: 16 * s, fontWeight: '600' },

    inputRow: { flexDirection: 'row', marginBottom: 12, gap: 8 },
    input: {
      flex: 1, backgroundColor: colors.card, borderRadius: 10, paddingHorizontal: 14,
      paddingVertical: 10, borderWidth: 1, borderColor: colors.border, fontSize: 16 * s,
    },
    searchInput: { marginBottom: 12, flex: 0 },
    addButton: {
      backgroundColor: colors.primary, borderRadius: 10, paddingHorizontal: 16, justifyContent: 'center',
    },

    actionRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
    actionButton: {
      flex: 1, backgroundColor: colors.primary, paddingVertical: 12,
      borderRadius: 10, alignItems: 'center',
    },

    list: { flex: 1 },
    listItem: {
      backgroundColor: colors.card, padding: 14, borderRadius: 10, marginBottom: 8,
      flexDirection: 'row', alignItems: 'center', gap: 12,
    },
    listItemDone: { opacity: 0.55 },
    listItemTextWrap: { flex: 1 },
    listItemText: { fontSize: 18 * s, color: colors.text },
    listItemTextDone: { textDecorationLine: 'line-through', color: colors.muted },
    categoryText: { fontSize: 12 * s, marginTop: 2 },
    deleteButton: { padding: 6 },
    emptyText: { fontSize: 15 * s, color: colors.muted, textAlign: 'center', marginTop: 24 },

    card: { backgroundColor: colors.card, borderRadius: 12, padding: 14, marginBottom: 12 },
    cardTitle: { fontSize: 16 * s, fontWeight: '700', color: colors.text, marginBottom: 6 },
    historyRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 6 },
    historyItemText: { fontSize: 16 * s, color: colors.text, flex: 1 },

    settingRow: {
      backgroundColor: colors.card, borderRadius: 12, padding: 14, marginBottom: 12,
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12,
    },
    settingLabel: { fontSize: 16 * s, color: colors.text, fontWeight: '600' },
    settingHint: { fontSize: 13 * s, color: colors.muted, marginTop: 2 },

    progressTrack: { height: 8, backgroundColor: colors.border, borderRadius: 4, marginBottom: 14, overflow: 'hidden' },
    progressFill: { height: 8, backgroundColor: colors.success },
  });
}

// Hook så skærmene altid får de rigtige styles ud fra brugerens indstilling
export function useStyles() {
  const { settings } = useApp();
  return useMemo(() => createStyles(settings.largeText), [settings.largeText]);
}
