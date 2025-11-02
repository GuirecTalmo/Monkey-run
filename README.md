# 🏃 Monkey-run

**Application mobile de course en fractionné avec backend NestJS**

Application complète de gestion d'entraînements de course en fractionné, comprenant un backend API sécurisé (NestJS) et une application mobile React Native (Android/iOS).

## 📋 Table des matières

- [Prérequis système](#-prérequis-système)
- [Structure du projet](#-structure-du-projet)
- [Installation du Backend](#-installation-du-backend)
- [Installation du Mobile](#-installation-du-mobile)
- [Variables d'environnement](#-variables-denvironnement)
- [Scripts disponibles](#-scripts-disponibles)
- [Architecture technique](#-architecture-technique)
- [Troubleshooting](#-troubleshooting)

---

## 🔧 Prérequis système

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

### Obligatoires
- **Node.js** >= 20.x ([Télécharger](https://nodejs.org/))
- **npm** ou **yarn** (fourni avec Node.js)
- **PostgreSQL** >= 12.x ([Télécharger](https://www.postgresql.org/download/))

### Pour le développement mobile (Android)
- **Android Studio** avec Android SDK ([Télécharger](https://developer.android.com/studio))
- **Java JDK** >= 17 ([Télécharger](https://adoptium.net/))
- **Android SDK** (installé via Android Studio)

### Pour le développement mobile (iOS) - macOS uniquement
- **Xcode** >= 14.x ([Télécharger depuis l'App Store](https://apps.apple.com/app/xcode/id497799835))
- **CocoaPods** (`sudo gem install cocoapods`)

---

## 📁 Structure du projet

```
Monkey-run/
├── 📱 mobile/              # Application React Native
│   ├── android/           # Configuration Android
│   ├── ios/               # Configuration iOS
│   ├── src/               # Code source React Native
│   │   └── services/      # Services (API, stockage)
│   └── package.json
│
├── 🖥️  src/                # Code source Backend NestJS
│   ├── prisma/            # Service Prisma
│   └── ...
│
├── 📦 prisma/              # Schéma et migrations Prisma
│   └── schema.prisma
│
├── 🧪 test/                # Tests e2e
├── .env                    # Variables d'environnement (à créer)
├── package.json           # Backend dependencies
└── README.md              # Ce fichier
```

---

## 🖥️ Installation du Backend

### 1️⃣ Cloner le repository

```bash
git clone <votre-repo-url>
cd Monkey-run
```

### 2️⃣ Installer les dépendances

```bash
npm install
```

### 3️⃣ Configurer l'environnement

Créez un fichier `.env` à la racine du projet :

```bash
cp .env.example .env  # Si vous avez un exemple
# Ou créez directement .env
```

Configurez les variables nécessaires (voir section [Variables d'environnement](#-variables-denvironnement)).

### 4️⃣ Configurer PostgreSQL

#### Créer la base de données

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Créer la base de données
CREATE DATABASE monkey_run;

# Quitter PostgreSQL
\q
```

### 5️⃣ Configurer Prisma

#### Configurer le fichier .env avec DATABASE_URL

```env
DATABASE_URL="postgresql://username:password@localhost:5432/monkey_run?schema=public"
```

Remplacz `username`, `password` et `monkey_run` par vos valeurs.

#### Lancer les migrations

```bash
# Créer et appliquer les migrations
npm run prisma:migrate

# Générer le client Prisma
npm run prisma:generate
```

> 💡 **Astuce** : Le client Prisma est automatiquement généré après `npm install` grâce au script `postinstall`.

### 6️⃣ Démarrer le serveur

```bash
# Mode développement (avec watch)
npm run start:dev

# Mode production
npm run start:prod
```

Le serveur démarre sur `http://localhost:3000` par défaut.

### 7️⃣ Vérifier l'installation

Ouvrez votre navigateur et accédez à :
- API : `http://localhost:3000`

---

## 📱 Installation du Mobile

### 1️⃣ Naviguer vers le dossier mobile

```bash
cd mobile
```

### 2️⃣ Installer les dépendances

```bash
npm install
```

### 3️⃣ Configurer l'URL de l'API backend

Dans le fichier `mobile/src/services/api.ts`, modifiez la `baseURL` ou utilisez une variable d'environnement :

```typescript
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';
```

> ⚠️ **Important pour Android** : Si vous testez sur un émulateur Android, utilisez `http://10.0.2.2:3000/api` au lieu de `localhost`.

### 4️⃣ Installation des dépendances natives

#### Pour iOS (macOS uniquement)

```bash
cd ios
pod install
cd ..
```

#### Pour Android

Les dépendances natives sont automatiquement liées grâce à l'autolinking de React Native.

> ⚠️ **Note** : Pour que les modules natifs (comme `react-native-encrypted-storage`) fonctionnent, vous devez rebuilder l'application.

### 5️⃣ Configurer l'émulateur/Appareil

#### Android

1. Ouvrez **Android Studio**
2. Lancez un émulateur Android depuis le **Device Manager**
   - Ou connectez un appareil Android avec le mode développeur activé et le débogage USB activé

#### iOS (macOS uniquement)

1. Ouvrez `mobile/ios/MobileApp.xcworkspace` dans Xcode
2. Sélectionnez votre simulateur dans Xcode

### 6️⃣ Démarrer Metro Bundler

Dans un terminal séparé :

```bash
cd mobile
npm start
```

### 7️⃣ Lancer l'application

#### Pour Android

```bash
cd mobile
npm run android
```

#### Pour iOS (macOS uniquement)

```bash
cd mobile
npm run ios
```

---

## 🔐 Variables d'environnement

### Backend (.env à la racine)

Créez un fichier `.env` à la racine du projet :

```env
# Base de données
DATABASE_URL="postgresql://username:password@localhost:5432/monkey_run?schema=public"

# JWT Configuration
JWT_SECRET="votre-secret-jwt-super-securise-changez-moi"
JWT_EXPIRATION="7d"

# Application
NODE_ENV="development"
PORT=3000
```

### Mobile

Pour React Native, vous pouvez utiliser `react-native-config` ou définir directement dans le code.

#### Exemple avec react-native-config

1. Installez `react-native-config` :
```bash
cd mobile
npm install react-native-config
```

2. Créez `mobile/.env` :
```env
API_BASE_URL=http://10.0.2.2:3000/api
```

> 📝 **Note** : Pour Android, utilisez `10.0.2.2` au lieu de `localhost` pour accéder à l'API locale.

---

## 📜 Scripts disponibles

### Backend (à la racine)

| Script | Description |
|--------|-------------|
| `npm run start:dev` | Démarre le serveur en mode développement avec watch |
| `npm run start:prod` | Démarre le serveur en mode production |
| `npm run build` | Compile le TypeScript en JavaScript |
| `npm run test` | Lance les tests unitaires |
| `npm run test:watch` | Lance les tests en mode watch |
| `npm run test:e2e` | Lance les tests end-to-end |
| `npm run lint` | Vérifie et corrige le code avec ESLint |
| `npm run format` | Formate le code avec Prettier |
| `npm run prisma:generate` | Génère le client Prisma |
| `npm run prisma:migrate` | Crée et applique les migrations |
| `npm run prisma:migrate:deploy` | Applique les migrations en production |
| `npm run prisma:studio` | Ouvre Prisma Studio (interface graphique) |
| `npm run prisma:migrate:reset` | Réinitialise la base de données |

### Mobile (dans mobile/)

| Script | Description |
|--------|-------------|
| `npm run android` | Lance l'application sur Android |
| `npm run ios` | Lance l'application sur iOS (macOS uniquement) |
| `npm start` | Démarre Metro Bundler |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run test` | Lance les tests Jest |

---

## 🏗️ Architecture technique

### Backend (NestJS)

```
Backend Stack:
├── 🚀 NestJS 11.x          # Framework Node.js
├── 🗄️  Prisma 6.x          # ORM et migrations
├── 🐘 PostgreSQL           # Base de données relationnelle
├── 🔐 JWT                  # Authentification
├── 🛡️  Passport            # Middleware d'authentification
├── ✅ class-validator      # Validation des données
└── 🔧 class-transformer    # Transformation des données
```

#### Modules principaux
- **PrismaModule** : Service global pour l'accès à la base de données
- **AuthModule** : Gestion de l'authentification JWT (à créer)
- **ConfigModule** : Gestion des variables d'environnement

### Mobile (React Native)

```
Mobile Stack:
├── 📱 React Native 0.82    # Framework mobile
├── 🎨 Tamagui              # UI Library
├── 🧭 React Navigation      # Navigation
├── 📡 Axios                # Client HTTP
├── 📝 React Hook Form      # Gestion de formulaires
├── ✅ Zod                  # Validation de schémas
└── 🔒 Encrypted Storage    # Stockage sécurisé
```

#### Structure mobile
- **Services** : API client, stockage sécurisé
- **Navigation** : Configuration React Navigation
- **Components** : Composants réutilisables avec Tamagui

---

## 🔧 Troubleshooting

### ❌ Problèmes de connexion à la base de données

**Erreur** : `Can't reach database server`

**Solutions** :
1. Vérifiez que PostgreSQL est démarré :
   ```bash
   # Windows
   net start postgresql-x64-XX

   # macOS/Linux
   sudo service postgresql start
   ```

2. Vérifiez la `DATABASE_URL` dans `.env`
3. Vérifiez que la base de données existe :
   ```bash
   psql -U postgres -l
   ```

### ❌ Erreur "Module not found" après npm install

**Solution** :
```bash
# Supprimez node_modules et réinstallez
rm -rf node_modules package-lock.json
npm install
```

### ❌ Metro Bundler ne démarre pas

**Erreur** : `Metro bundler has encountered an error`

**Solutions** :
1. Nettoyez le cache :
   ```bash
   cd mobile
   npm start -- --reset-cache
   ```

2. Supprimez le cache Metro :
   ```bash
   rm -rf $TMPDIR/metro-*
   ```

### ❌ Impossible de se connecter à l'API depuis Android

**Erreur** : Network request failed

**Solutions** :
1. Utilisez `10.0.2.2` au lieu de `localhost` pour Android :
   ```typescript
   const API_BASE_URL = 'http://10.0.2.2:3000/api';
   ```

2. Vérifiez que le backend tourne sur le port 3000
3. Vérifiez les permissions Internet dans `AndroidManifest.xml`

### ❌ Erreur "react-native-encrypted-storage" non trouvé

**Solution** :
1. Rebuild l'application Android :
   ```bash
   cd mobile/android
   ./gradlew clean
   cd ..
   npm run android
   ```

2. Vérifiez que le module est bien installé :
   ```bash
   cd mobile
   npm list react-native-encrypted-storage
   ```

### ❌ Erreur Prisma "Environment variable not found"

**Erreur** : `DATABASE_URL not found`

**Solutions** :
1. Vérifiez que le fichier `.env` existe à la racine
2. Vérifiez que la variable `DATABASE_URL` est bien définie
3. Redémarrez votre serveur de développement

### ❌ Erreur lors des migrations Prisma

**Erreur** : `Migration failed`

**Solutions** :
1. Vérifiez que la base de données est accessible
2. Vérifiez les permissions PostgreSQL
3. Réinitialisez les migrations si nécessaire :
   ```bash
   npm run prisma:migrate:reset
   ```

### ❌ Problème de permissions Android

**Solution** :
Vérifiez que les permissions sont correctement configurées dans `mobile/android/app/src/main/AndroidManifest.xml`.

Pour `react-native-encrypted-storage`, aucune permission supplémentaire n'est nécessaire (utilise le KeyStore Android nativement).

---

## 📚 Ressources supplémentaires

- [Documentation NestJS](https://docs.nestjs.com/)
- [Documentation Prisma](https://www.prisma.io/docs)
- [Documentation React Native](https://reactnative.dev/docs/getting-started)
- [Documentation Tamagui](https://tamagui.dev/docs/core/configuration)
- [Documentation React Navigation](https://reactnavigation.org/docs/getting-started)

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

---

## 📄 License

Ce projet est sous licence [MIT](LICENSE).

---

**Développé avec ❤️ pour les coureurs en fractionné** 🏃‍♂️💨
