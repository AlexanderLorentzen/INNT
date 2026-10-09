import { View, Text } from 'react-native';
import { useStyles } from '../styles/styles';

export default function AboutScreen() {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Om appen</Text>
      <Text style={styles.subtitle}>
        Lavet som en del af Godkendelsesopgave 2 (INNT). Formålet med appen er at gøre det hurtigt
        og enkelt at holde styr på en indkøbsliste.
      </Text>
      <Text style={styles.sectionTitle}>Hvad er nyt siden version 1?</Text>
      <Text style={styles.subtitle}>
        • Listen gemmes nu, også når appen lukkes{'\n'}
        • Afkrydsning i stedet for øjeblikkelig sletning{'\n'}
        • Søgning og kategorier{'\n'}
        • Historik over tidligere indkøb{'\n'}
        • Mulighed for stor tekst{'\n'}
        • Del din liste med fx din familie
      </Text>
    </View>
  );
}
