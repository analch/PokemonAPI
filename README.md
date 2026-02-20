# 🎮 Pokémon Explorer

Une application web pour explorer, rechercher et sauvegarder vos Pokémon favoris, construite avec **TypeScript**, **Tailwind CSS** et **DaisyUI**.

---

## ✨ Fonctionnalités

- 📋 Affichage des 150 premiers Pokémon via l'API PokéAPI
- 🔍 Recherche par nom de Pokémon
- ❤️ Système de favoris persistant (localStorage)
- 🌙 Mode sombre / clair
- 🎨 Carte colorée selon le type du Pokémon
- 📄 Popup de détail au clic sur une carte
- 📭 Message d'erreur si un Pokémon est introuvable

---

## 🚀 Lancer le projet

### Prérequis

- [Node.js](https://nodejs.org/) (version 16 ou supérieure)
- npm

### Installation

```bash
# Cloner le projet
git clone https://github.com/votre-username/pokemon-explorer.git
cd pokemon-explorer

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

### Build pour la production

```bash
npm run build
```

---

## 🌐 API utilisée

Ce projet utilise **[PokéAPI](https://pokeapi.co/)** — une API publique et gratuite, **aucune clé API n'est requise**.

| Info | Détail |
|------|--------|
| URL de base | `https://pokeapi.co/api/v2` |
| Authentification | ❌ Aucune |
| Limite | 150 Pokémon chargés au démarrage |
| Documentation | [pokeapi.co/docs/v2](https://pokeapi.co/docs/v2) |

---

## 🔑 Si vous ajoutez une API avec clé (ex: future authentification)

Si vous intégrez une API nécessitant une clé (comme une API d'authentification utilisateur), voici comment procéder :

### 1. Créer un fichier `.env` à la racine du projet

```bash
touch .env
```

### 2. Ajouter votre clé dans `.env`

```env
VITE_API_KEY=votre_clé_ici
VITE_API_URL=https://api.exemple.com
```

> ⚠️ Ne jamais commiter ce fichier ! Il est déjà ignoré si vous avez un `.gitignore` avec `*.env`.

### 3. Utiliser la clé dans le code TypeScript

```ts
const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
```

### 4. Où trouver une clé API ?

Selon le service utilisé, rendez-vous sur le site du fournisseur → section **"Developers"**, **"API"** ou **"Mon compte"** → **"Générer une clé"**.

---

## 🗂️ Structure du projet

```
pokemon-explorer/
├── index.html          # Page principale
├── src/
│   ├── main.ts         # Logique principale (fetch, cartes, favoris, navigation)
│   └── style.css       # Styles globaux (Tailwind)
├── public/
│   └── pokemon.svg     # Logo
├── .env                # Variables d'environnement (non commité)
├── package.json
└── vite.config.ts
```

---

## 🛠️ Stack technique

| Technologie | Usage |
|-------------|-------|
| TypeScript | Langage principal |
| Vite | Bundler / dev server |
| Tailwind CSS | Styles utilitaires |
| DaisyUI | Composants UI (boutons, modals, thème) |
| PokéAPI | Source des données Pokémon |
| localStorage | Persistance des favoris |

---

## 📌 Notes

- Les favoris sont sauvegardés localement dans le navigateur via `localStorage`, ils persistent entre les sessions.
- Le thème clair/sombre est géré par DaisyUI avec l'attribut `data-theme`.
