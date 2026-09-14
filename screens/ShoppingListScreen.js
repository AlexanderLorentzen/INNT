import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { styles } from '../styles/styles';

export default function ShoppingListScreen() {
  const [items, setItems] = useState([
    { id: '1', name: 'Mælk' },
    { id: '2', name: 'Æg' },
    { id: '3', name: 'Brød' },
  ]);
  const [text, setText] = useState('');

  const addItem = () => {
    if (text.trim().length === 0) return;
    const newItem = { id: Date.now().toString(), name: text.trim() };
    setItems((current) => [...current, newItem]);
    setText('');
  };

  const removeItem = (id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Tilføj vare..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.buttonText}>Tilføj</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => removeItem(item.id)}
          >
            <Text style={styles.listItemText}>{item.name}</Text>
            <Text style={styles.listItemHint}>tryk for at fjerne</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.subtitle}>Listen er tom — tilføj en vare ovenfor.</Text>
        }
      />
    </View>
  );
}
