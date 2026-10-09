// Simpel nøgleords-kategorisering. Deltager 1 efterlyste kategorier (frugt, mejeri),
// og stakeholder-interviewet med en dagligvarekæde pegede på samme behov (sortering efter butiksgang).
export const CATEGORIES = {
  frugt: { label: 'Frugt & grønt', color: '#3F9B5B' },
  mejeri: { label: 'Mejeri & æg', color: '#4C8FD5' },
  koed: { label: 'Kød & fisk', color: '#C25B5B' },
  broed: { label: 'Brød & kolonial', color: '#C98B3A' },
  andet: { label: 'Andet', color: '#8A8FA8' },
};

const KEYWORDS = {
  frugt: ['æble', 'banan', 'gulerod', 'agurk', 'tomat', 'salat', 'løg', 'kartoffel', 'frugt', 'grønt', 'citron', 'pære', 'peber', 'broccoli'],
  mejeri: ['mælk', 'æg', 'ost', 'smør', 'yoghurt', 'fløde', 'skyr', 'creme'],
  koed: ['kød', 'kylling', 'hakket', 'bacon', 'pølse', 'laks', 'fisk', 'skinke', 'flæsk'],
  broed: ['brød', 'ris', 'pasta', 'mel', 'sukker', 'havregryn', 'müsli', 'rugbrød', 'kaffe', 'te', 'bolle'],
};

export function guessCategory(name) {
  const n = name.toLowerCase();
  for (const [cat, words] of Object.entries(KEYWORDS)) {
    if (words.some((w) => n.includes(w))) return cat;
  }
  return 'andet';
}
