Pokémon Explorer 🎮
Un petit projet perso pour explorer le monde des Pokémon — recherche, favoris, mode sombre, tout y est.

C'est quoi ?
Une app web qui affiche les 150 premiers Pokémon avec leurs types, leurs couleurs et leurs stats. Tu peux liker ceux que t'aimes bien et les retrouver dans une page Favoris. Si tu fermes le navigateur, tes likes sont sauvegardés.

Fonctionnalités

🔍 Recherche par nom (avec message d'erreur si t'écris n'importe quoi)
❤️ Système de favoris persistant
🌙 Mode sombre / clair
🎨 Couleurs des cartes selon le type du Pokémon
📄 Popup de détail au clic


Lancer le projet
T'as besoin de Node.js sur ta machine, ensuite c'est rapide :
bashnpm install
npm run dev
Ouvre http://localhost:5173 et c'est parti. Pour build en prod :
bashnpm run build

L'API
J'utilise PokéAPI — gratuite, sans compte, sans clé. Tu fetch et ça marche, c'est tout.

Ajouter une clé API (si besoin un jour)
Crée un fichier .env à la racine :
envVITE_API_KEY=ta_clé_ici
Et dans le code :
tsconst apiKey = import.meta.env.VITE_API_KEY;
```

## Structure du projet
```
pokemon-explorer/
├── index.html        → la page principale
├── src/
│   ├── main.ts       → toute la logique
│   └── style.css     → styles Tailwind
└── public/
    └── pokemon.svg   → le logo

Stack

TypeScript + Vite
Tailwind CSS + DaisyUI
PokéAPI
localStorage pour les favoris
