import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Velkommen 👋</Text>
      <Text style={styles.subtitle}>
        Denne app hjælper dig med at holde styr på din indkøbsliste.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ShoppingList')}
      >
        <Text style={styles.buttonText}>Gå til min liste</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonSecondary]}
        onPress={() => navigation.navigate('About')}
      >
        <Text style={styles.buttonText}>Om appen</Text>
      </TouchableOpacity>
    </View>
  );
}
