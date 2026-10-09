import { View, Text, Switch, TouchableOpacity, Alert } from 'react-native';
import { useStyles } from '../styles/styles';
import { useApp } from '../context/AppContext';

// Skærm 5: indstillinger. Stor tekst kommer direkte fra interviewene (deltager 2 + ældrestakeholder).
export default function SettingsScreen() {
  const styles = useStyles();
  const { settings, updateSettings, resetEverything } = useApp();

  const confirmReset = () =>
    Alert.alert('Nulstil appen', 'Alle varer, historik og indstillinger slettes. Er du sikker?', [
      { text: 'Annuller', style: 'cancel' },
      { text: 'Nulstil', style: 'destructive', onPress: resetEverything },
    ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Indstillinger</Text>

      <View style={styles.settingRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.settingLabel}>Stor tekst</Text>
          <Text style={styles.settingHint}>Gør al tekst i appen større og lettere at læse.</Text>
        </View>
        <Switch
          value={settings.largeText}
          onValueChange={(v) => updateSettings({ largeText: v })}
        />
      </View>

      <TouchableOpacity style={[styles.button, styles.buttonDanger]} onPress={confirmReset}>
        <Text style={styles.buttonText}>Nulstil app og slet data</Text>
      </TouchableOpacity>
    </View>
  );
}
