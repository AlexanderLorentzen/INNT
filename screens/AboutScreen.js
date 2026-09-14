import { View, Text } from 'react-native';
import { styles } from '../styles/styles';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Om appen</Text>
      <Text style={styles.subtitle}>
        Lavet som en del af Godkendelsesopgave 1 (INNT). Formålet med appen er
        at gøre det hurtigt og enkelt at holde styr på en indkøbsliste.
      </Text>
    </View>
  );
}
