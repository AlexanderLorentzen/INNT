import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStyles, colors } from '../styles/styles';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../storage/categories';

// NY SKÆRM (individuel opgave): historik over tidligere indkøb.
// Gør det hurtigt at genbruge faste varer – og giver et overblik over, hvad man køber.
export default function HistoryScreen() {
  const styles = useStyles();
  const { history, readdFromHistory, clearHistory } = useApp();

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('da-DK', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });

  const confirmClear = () =>
    Alert.alert('Ryd historik', 'Vil du slette al historik?', [
      { text: 'Annuller', style: 'cancel' },
      { text: 'Ryd', style: 'destructive', onPress: clearHistory },
    ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historik</Text>
      <Text style={styles.subtitle}>
        Tidligere indkøb. Tryk på + for at lægge en vare på listen igen.
      </Text>

      <FlatList
        data={history}
        keyExtractor={(trip) => trip.id}
        style={styles.list}
        renderItem={({ item: trip }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              {formatDate(trip.date)} · {trip.items.length} {trip.items.length === 1 ? 'vare' : 'varer'}
            </Text>
            {trip.items.map((it, idx) => (
              <View key={idx} style={styles.historyRow}>
                <Text style={styles.historyItemText}>
                  {it.name}{' '}
                  <Text style={{ color: (CATEGORIES[it.category] ?? CATEGORIES.andet).color }}>
                    ({(CATEGORIES[it.category] ?? CATEGORIES.andet).label})
                  </Text>
                </Text>
                <TouchableOpacity onPress={() => readdFromHistory(it.name, it.category)}>
                  <Ionicons name="add-circle" size={30} color={colors.primary} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Ingen tidligere indkøb endnu. Afkryds varer og tryk "Afslut indkøb" på listen.
          </Text>
        }
      />

      {history.length > 0 && (
        <TouchableOpacity style={[styles.button, styles.buttonDanger]} onPress={confirmClear}>
          <Text style={styles.buttonText}>Ryd historik</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
