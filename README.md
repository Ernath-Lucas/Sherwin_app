# Sherwin-Williams Customer Portal

Application web de commande de produits Sherwin-Williams avec interface bilingue (FR/EN).

## 🚀 Fonctionnalités

- **Authentification utilisateur** avec gestion de session
- **Catalogue de produits** avec recherche par référence et nom
- **Panier d'achat** avec calcul dynamique des prix
- **Système de remises** personnalisables par produit
- **Interface bilingue** (Français/Anglais)
- **Gestion des cookies RGPD** avec consentement granulaire
- **Pages légales** (Politique de confidentialité, Mentions légales)
- **Design responsive** adapté mobile et desktop

## 🛠️ Technologies

- **React 18.3.1** - Framework JavaScript
- **Vite 5.4.11** - Bundler et serveur de développement
- **React Router DOM 6.28.0** - Gestion des routes
- **CSS Variables** - Système de design tokens
- **Context API** - Gestion d'état globale

## 📋 Prérequis

- Node.js 18.19.1 ou supérieur
- npm ou yarn

## 🔧 Installation

```bash
# Cloner le dépôt
git clone git@github.com:Ernath-Lucas/Sherwin_app.git
cd sherwin-williams-app

# Installer les dépendances
npm install
```

## 🚀 Démarrage

```bash
# Mode développement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview
```

L'application sera accessible sur [http://localhost:5173](http://localhost:5173)

## 👤 Compte de test

```
Email: l.pinte@ernath.eu
Mot de passe: test
```

## 📁 Structure du projet

```
sherwin-williams-app/
├── src/
│   ├── components/         # Composants réutilisables
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── CookieBanner.jsx
│   │   └── CookieButton.jsx
│   ├── context/           # Contextes React
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   ├── LanguageContext.jsx
│   │   └── CookieContext.jsx
│   ├── pages/             # Pages de l'application
│   │   ├── LoginPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── CartPage.jsx
│   │   ├── PrivacyPolicyPage.jsx
│   │   └── TermsOfUsePage.jsx
│   ├── data/              # Données statiques
│   │   ├── products.js
│   │   └── translations.js
│   ├── styles/            # Styles globaux
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Système de design

L'application utilise des CSS variables pour maintenir une cohérence visuelle:

- **Couleurs principales**: Bleu Sherwin-Williams (#0067A0)
- **Typographie**: System fonts pour des performances optimales
- **Espacements**: Système d'espacement standardisé (--space-xs à --space-xl)
- **Ombres**: Système d'ombres à 3 niveaux (sm, md, lg, xl)
- **Animations**: Transitions fluides avec durées standardisées

## 🔒 RGPD & Cookies

L'application est conforme au RGPD avec:
- Bannière de consentement des cookies
- Gestion granulaire des préférences (nécessaires, analytiques, marketing)
- Pages légales complètes
- Stockage local des préférences utilisateur
- Bouton d'accès rapide aux paramètres

## 🌐 Internationalisation

Support complet des langues:
- **Français** (par défaut)
- **Anglais**

La langue est persistée dans le localStorage et peut être changée via le sélecteur dans le header.

## 🛒 Fonctionnalités du panier

- Ajout de produits avec quantités personnalisées
- Application de remises en pourcentage
- Calcul automatique des prix
- Validation des quantités autorisées par produit
- Affichage des remises actives
- Total général avec remises appliquées

## 📱 Responsive Design

- **Desktop**: Interface complète avec tous les contrôles
- **Mobile**: Interface optimisée avec boutons adaptés
- **Breakpoint**: 768px

## 🔐 Routes protégées

Certaines routes nécessitent une authentification:
- `/home` - Page d'accueil avec catalogue
- `/cart` - Panier d'achat

Les routes publiques:
- `/` et `/login` - Page de connexion
- `/privacy` - Politique de confidentialité
- `/terms` - Mentions légales

## 📦 Build & Déploiement

```bash
# Créer le build de production
npm run build

# Le dossier dist/ contiendra les fichiers statiques
# prêts pour le déploiement
```

## 👨‍💻 Développement

```bash
# Lancer le serveur de développement
npm run dev

# Le hot reload est activé automatiquement
```

## 📄 Licence

©2025 The Sherwin-Williams Company

---

**Développé avec Claude Code**
