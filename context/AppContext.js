import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  loadItems, saveItems, loadHistory, saveHistory,
  loadSettings, saveSettings, clearAll, DEFAULT_SETTINGS,
} from '../storage/storage';
import { guessCategory } from '../storage/categories';

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

const STARTER_ITEMS = [
  { id: '1', name: 'Mælk', done: false, category: 'mejeri' },
  { id: '2', name: 'Æg', done: false, category: 'mejeri' },
  { id: '3', name: 'Brød', done: false, category: 'broed' },
];

export function AppProvider({ children }) {
  const [items, setItems] = useState([]);
  const [history, setHistory] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  // Hent gemte data ved opstart
  useEffect(() => {
    (async () => {
      const [i, h, s] = await Promise.all([loadItems(), loadHistory(), loadSettings()]);
      setItems(i ?? STARTER_ITEMS); // første gang: start med eksempelvarer
      setHistory(h);
      setSettings({ ...DEFAULT_SETTINGS, ...s });
      setLoaded(true);
    })();
  }, []);

  // Gem automatisk når data ændres (først efter første indlæsning)
  useEffect(() => { if (loaded) saveItems(items); }, [items, loaded]);
  useEffect(() => { if (loaded) saveHistory(history); }, [history, loaded]);
  useEffect(() => { if (loaded) saveSettings(settings); }, [settings, loaded]);

  const addItem = useCallback((name) => {
    const clean = name.trim();
    if (!clean) return;
    setItems((cur) => [
      ...cur,
      { id: Date.now().toString(), name: clean, done: false, category: guessCategory(clean) },
    ]);
  }, []);

  const toggleItem = useCallback((id) => {
    setItems((cur) => cur.map((it) => (it.id === id ? { ...it, done: !it.done } : it)));
  }, []);

  const removeItem = useCallback((id) => {
    setItems((cur) => cur.filter((it) => it.id !== id));
  }, []);

  // Flytter afkrydsede varer over i historikken og fjerner dem fra listen
  const finishShopping = useCallback(() => {
    const bought = items.filter((it) => it.done);
    if (bought.length === 0) return;
    setHistory((h) => [
      {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        items: bought.map(({ name, category }) => ({ name, category })),
      },
      ...h,
    ]);
    setItems((cur) => cur.filter((it) => !it.done));
  }, [items]);

  // Genbrug en vare fra en tidligere indkøbstur
  const readdFromHistory = useCallback((name, category) => {
    setItems((cur) => [...cur, { id: Date.now().toString() + name, name, done: false, category }]);
  }, []);

  const clearHistory = useCallback(() => setHistory([]), []);
  const updateSettings = useCallback((patch) => setSettings((s) => ({ ...s, ...patch })), []);

  const resetEverything = useCallback(async () => {
    await clearAll();
    setItems(STARTER_ITEMS);
    setHistory([]);
    setSettings(DEFAULT_SETTINGS);
  }, []);

  const value = {
    items, history, settings, loaded,
    addItem, toggleItem, removeItem, finishShopping,
    readdFromHistory, clearHistory, updateSettings, resetEverything,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
