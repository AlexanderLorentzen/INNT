// Lokal lagring med AsyncStorage, så data huskes selv efter appen lukkes.
// Besvarer feedback fra interview 1 og 2: "Jeg er nervøs for, at listen forsvinder."
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  items: 'innt:items',
  history: 'innt:history',
  settings: 'innt:settings',
};

export const DEFAULT_SETTINGS = { largeText: false };

async function load(key, fallback) {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn('Kunne ikke hente', key, e);
    return fallback;
  }
}

async function save(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Kunne ikke gemme', key, e);
  }
}

export const loadItems = () => load(KEYS.items, null);
export const saveItems = (items) => save(KEYS.items, items);
export const loadHistory = () => load(KEYS.history, []);
export const saveHistory = (history) => save(KEYS.history, history);
export const loadSettings = () => load(KEYS.settings, DEFAULT_SETTINGS);
export const saveSettings = (settings) => save(KEYS.settings, settings);

export async function clearAll() {
  try {
    await AsyncStorage.multiRemove(Object.values(KEYS));
  } catch (e) {
    console.warn('Kunne ikke rydde data', e);
  }
}
