# Indkøbsliste-app (version 2)

React Native-app (Expo) til at holde styr på en indkøbsliste.
Lavet til **Godkendelsesopgave 2 (INNT)** – individuel opgave. Al kode er skrevet af Alexander Lorentzen (ingen gruppemedlemmer).
Version 1 (Godkendelsesopgave 1) er videreudviklet med udgangspunkt i feedback fra to interviews og fra anden runde af stakeholder-interviews.

## Funktioner
| Funktion | Kommer fra |
|---|---|
| **Gemmer data med AsyncStorage** (liste, historik, indstillinger huskes efter app-lukning) | Interview 1 og 2 i opgave 1 |
| **Flueben** i stedet for øjeblikkelig sletning (sletning kræver bekræftelse) | Deltager 1 i opgave 1 |
| **Søgning** i listen + **kategorier** (automatisk ud fra nøgleord) | Deltager 1 i opgave 1, dagligvare-stakeholder |
| **Ny knap: "Del liste"** – deler åbne varer via telefonens delings-menu | Familie-stakeholder |
| **Ny knap: "Afslut indkøb"** – flytter afkrydsede varer til historik | Dagligvare-stakeholder |
| **Ny skærm: Historik** – tidligere indkøb, tryk + for at genbruge en vare | Familie-stakeholder |
| **Ny skærm: Indstillinger** – "Stor tekst" + nulstil data | Deltager 2 + ældre-stakeholder |
| **Navigation:** bundmenu (tab) med Forside / Liste / Historik / Indstillinger + stack til "Om appen" | Kravspecifikation |

Skærme i alt: 5 (Forside, Liste, Historik, Indstillinger, Om appen).

## Struktur
```
App.js                      Navigation (tab + stack)
context/AppContext.js       Global state + automatisk gem/hent
storage/storage.js          AsyncStorage-funktioner
storage/categories.js       Kategorisering ud fra nøgleord
screens/                    Skærmene
styles/styles.js            ALL styling (separat fil)
INTERVIEW_GUIDE.md          Interviewguide (runde 1 + runde 2 stakeholders)
```

## Kør appen lokalt
```
npm install
npx expo start
```
Scan QR-koden med Expo Go (iOS/Android).

## Demovideo
https://www.youtube.com/shorts/aVlYhl3t8eo

## Brugerinddragelse
Se `INTERVIEW_GUIDE.md` og rapporten.

## GitHub
https://github.com/AlexanderLorentzen/INNT
