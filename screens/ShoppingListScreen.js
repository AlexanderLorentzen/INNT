import { useState, useMemo } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList, Share, Alert, Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStyles, colors } from '../styles/styles';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../storage/categories';

export default function ShoppingListScreen() {
  const styles = useStyles();
  const { items, addItem, toggleItem, removeItem, finishShopping } = useApp();
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');

  // NY FUNKTIONALITET: søgning/filtrering i listen
  // Åbne varer først, derefter afkrydsede; sorteret efter kategori så listen følger butikken.
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((it) => it.name.toLowerCase().includes(q))
      .sort((a, b) => Number(a.done) - Number(b.done) || a.category.localeCompare(b.category));
  }, [items, query]);

  const doneCount = items.filter((i) => i.done).length;
  const progress = items.length === 0 ? 0 : doneCount / items.length;

  const onAdd = () => {
    if (!text.trim()) return;
    addItem(text);
    setText('');
    Keyboard.dismiss();
  };

  // NY KNAP 1: Del listen (fx med partner/familie) via telefonens delings-menu
  const onShare = async () => {
    const open = items.filter((i) => !i.done);
    if (open.length === 0) {
      Alert.alert('Intet at dele', 'Der er ingen åbne varer på listen.');
      return;
    }
    const message = 'Indkøbsliste:\n' + open.map((i) => `• ${i.name}`).join('\n');
    try {
      await Share.share({ message });
    } catch (e) {
      Alert.alert('Kunne ikke dele listen');
    }
  };

  // NY KNAP 2: Afslut indkøb – flytter afkrydsede varer til historik
  const onFinish = () => {
    if (doneCount === 0) {
      Alert.alert('Ingen varer afkrydset', 'Tryk på de varer, du har købt, først.');
      return;
    }
    finishShopping();
  };

  const confirmDelete = (item) => {
    Alert.alert('Slet vare', `Vil du slette "${item.name}" fra listen?`, [
      { text: 'Annuller', style: 'cancel' },
      { text: 'Slet', style: 'destructive', onPress: () => removeItem(item.id) },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Tilføj vare..."
          value={text}
          onChangeText={setText}
          onSubmitEditing={onAdd}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={onAdd}>
          <Text style={styles.buttonText}>Tilføj</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={[styles.input, styles.searchInput]}
        placeholder="🔍 Søg i listen..."
        value={query}
        onChangeText={setQuery}
        clearButtonMode="while-editing"
      />

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionButton} onPress={onShare}>
          <Text style={styles.buttonText}>Del liste</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.success }]} onPress={onFinish}>
          <Text style={styles.buttonText}>Afslut indkøb</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={visible}
        keyExtractor={(item) => item.id}
        style={styles.list}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => {
          const cat = CATEGORIES[item.category] ?? CATEGORIES.andet;
          return (
            <TouchableOpacity
              style={[styles.listItem, item.done && styles.listItemDone]}
              onPress={() => toggleItem(item.id)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: item.done }}
            >
              <Ionicons
                name={item.done ? 'checkmark-circle' : 'ellipse-outline'}
                size={28}
                color={item.done ? colors.success : colors.secondary}
              />
              <View style={styles.listItemTextWrap}>
                <Text style={[styles.listItemText, item.done && styles.listItemTextDone]}>{item.name}</Text>
                <Text style={[styles.categoryText, { color: cat.color }]}>{cat.label}</Text>
              </View>
              <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item)}>
                <Ionicons name="trash-outline" size={22} color={colors.danger} />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {query ? 'Ingen varer matcher din søgning.' : 'Listen er tom — tilføj en vare ovenfor.'}
          </Text>
        }
      />
    </View>
  );
}
