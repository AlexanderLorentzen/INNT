import { View, Text, TouchableOpacity } from 'react-native';
import { useStyles } from '../styles/styles';
import { useApp } from '../context/AppContext';

export default function HomeScreen({ navigation }) {
  const styles = useStyles();
  const { items } = useApp();
  const open = items.filter((i) => !i.done).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Velkommen 👋</Text>
      <Text style={styles.subtitle}>
        Denne app hjælper dig med at holde styr på din indkøbsliste.{' '}
        {open > 0
          ? `Du mangler ${open} ${open === 1 ? 'vare' : 'varer'}.`
          : 'Din liste er klar til nye varer.'}
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Liste')}>
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
