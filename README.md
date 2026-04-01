# 🏃 Monkey-run

**Application mobile de course en fractionné avec backend NestJS**

Application complète de gestion d'entraînements de course en fractionné, comprenant un backend API sécurisé (NestJS) et une application mobile React Native (Android/iOS).

## 📋 Table des matières

- [Démarrage rapide (commandes)](#-démarrage-rapide-commandes)
- [Prérequis système](#-prérequis-système)
- [Installation d'Android Studio](#-installation-dandroid-studio)
- [Structure du projet](#-structure-du-projet)
- [Installation du Backend](#-installation-du-backend)
- [Installation du Mobile](#-installation-du-mobile)
- [Variables d'environnement](#-variables-denvironnement)
- [Vérification de l'installation](#-vérification-de-linstallation)
- [Scripts disponibles](#-scripts-disponibles)
- [Architecture technique](#-architecture-technique)
- [Troubleshooting](#-troubleshooting)

---

## 🚀 Démarrage rapide (commandes)

Ordre recommandé : **PostgreSQL démarré** → **backend** → **Metro** → **application Android** (ou iOS sur macOS).

### 1. Backend (racine du dépôt `Monkey-run/`)

```bash
cd Monkey-run
npm install
# Créer la base et le fichier .env si ce n’est pas déjà fait (voir Variables d’environnement)
npm run prisma:migrate
npm run start:dev
```

L’API écoute par défaut sur `http://localhost:3000` (préfixe `/api`).

### 2. Metro Bundler (terminal séparé)

```bash
cd Monkey-run/mobile
npm install
npm start
```

Après un changement de dépendances ou de config Metro, vous pouvez forcer un cache propre :

```bash
cd Monkey-run/mobile
npx react-native start --reset-cache
```

### 3. Lancer l’app sur l’émulateur ou l’appareil (autre terminal)

**Android**

```bash
cd Monkey-run/mobile
npm run android
```

**iOS (macOS uniquement)**

```bash
cd Monkey-run/mobile
npm run ios
```

> **Émulateur Android :** utilisez `http://10.0.2.2:3000/api` comme base d’API dans `mobile/src/services/api.ts` (voir section Mobile ci‑dessous). **Appareil physique :** utilisez l’IP locale de votre machine.

### Arrêter le projet

- Dans chaque terminal où tourne une commande : **Ctrl+C**.
- Fermer l’app sur l’émulateur ou le téléphone si besoin.

Les sections suivantes détaillent prérequis, installation pas à pas et dépannage.

---

## 🔧 Prérequis système

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

### Obligatoires

- **Node.js** >= 18.x (20.x recommandé) ([Télécharger](https://nodejs.org/))
- **npm** ou **yarn** (fourni avec Node.js)
- **PostgreSQL** >= 14.x ([Télécharger](https://www.postgresql.org/download/))

### Pour le développement mobile (Android)

- **Android Studio** avec Android SDK ([Télécharger](https://developer.android.com/studio))
- **Java JDK 17** ([Télécharger](https://adoptium.net/))
- **Android SDK** (API 33 ou supérieure recommandée, installé via Android Studio)
- **Android Emulator** (AVD - Android Virtual Device)

### Pour le développement mobile (iOS) - macOS uniquement

- **Xcode** >= 14.x ([Télécharger depuis l'App Store](https://apps.apple.com/app/xcode/id497799835))
- **CocoaPods** (`sudo gem install cocoapods`)

### Optionnel mais recommandé (macOS/Linux)

- **Watchman** ([Télécharger](https://facebook.github.io/watchman/docs/install)) - Améliore les performances de Metro Bundler

---

## 📱 Installation d'Android Studio

### 1️⃣ Télécharger et installer Android Studio

1. Téléchargez Android Studio depuis [developer.android.com/studio](https://developer.android.com/studio)
2. Suivez l'assistant d'installation
3. À la première ouverture, Android Studio propose d'installer les composants SDK

### 2️⃣ Installer le SDK Android

1. Ouvrez Android Studio
2. Allez dans **Settings** (ou **Preferences** sur macOS) > **Appearance & Behavior** > **System Settings** > **Android SDK**
3. Dans l'onglet **SDK Platforms**, cochez :
   - ✅ **Android 13.0 (Tiramisu)** ou supérieur (API 33+)
   - ✅ **Show Package Details** pour voir les détails
4. Dans l'onglet **SDK Tools**, assurez-vous que sont installés :
   - ✅ Android SDK Build-Tools
   - ✅ Android SDK Command-line Tools
   - ✅ Android SDK Platform-Tools
   - ✅ Android Emulator
   - ✅ Intel x86 Emulator Accelerator (HAXM installer) - pour Windows/Mac
5. Cliquez sur **Apply** pour installer les composants

### 3️⃣ Configurer les variables d'environnement

#### Windows

1. Ouvrez **Variables d'environnement** (Recherchez "variables d'environnement" dans le menu Démarrer)
2. Ajoutez une nouvelle variable système :
   - **Nom** : `ANDROID_HOME`
   - **Valeur** : `C:\Users\VOTRE_NOM\AppData\Local\Android\Sdk` (remplacez VOTRE_NOM)
3. Dans **Path**, ajoutez :
   - `%ANDROID_HOME%\platform-tools`
   - `%ANDROID_HOME%\emulator`
   - `%ANDROID_HOME%\tools`
   - `%ANDROID_HOME%\tools\bin`

#### macOS/Linux

Ajoutez dans votre `~/.zshrc` ou `~/.bashrc` :

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

Rechargez votre terminal :

```bash
source ~/.zshrc  # ou source ~/.bashrc
```

### 4️⃣ Créer un émulateur Android (AVD)

1. Dans Android Studio, cliquez sur **More Actions** > **Virtual Device Manager**
2. Cliquez sur **Create Device**
3. Choisissez un appareil (ex: **Pixel 5**)
4. Cliquez sur **Next**
5. Sélectionnez une image système (ex: **Tiramisu API 33**)
   - Si elle n'est pas installée, cliquez sur **Download**
6. Cliquez sur **Next** puis **Finish**
7. Votre AVD est maintenant prêt !

### 5️⃣ Vérifier l'installation

Ouvrez un terminal et vérifiez :

```bash
# Vérifier Android SDK
adb version

# Lister les appareils/émulateurs
adb devices

# Vérifier les variables d'environnement
echo $ANDROID_HOME  # macOS/Linux
echo %ANDROID_HOME% # Windows PowerShell
```

---

## 📁 Structure du projet

```
Monkey-run/
├── 📱 mobile/              # Application React Native
│   ├── android/           # Configuration Android
│   ├── ios/               # Configuration iOS
│   ├── src/
│   │   ├── components/    # Composants (ex. MainTabBar, SessionCard, ScreenBackground)
│   │   ├── navigation/    # RootNavigator, types de routes
│   │   ├── screens/       # Écrans (onboarding, auth, tabs, profil, chrono, etc.)
│   │   ├── services/      # API (axios), stockage chiffré
│   │   └── theme/         # Couleurs, typo (Tamagui)
│   ├── App.tsx
│   ├── tamagui.config.ts
│   └── package.json
│
├── 🖥️  src/                # Code source Backend NestJS
│   ├── auth/              # Module Auth (signup, login, forgot-password, JWT)
│   ├── users/             # Module Users (profil, mot de passe)
│   ├── runs/              # Module Runs (CRUD courses)
│   ├── prisma/            # Service Prisma
│   └── main.ts
│
├── 📦 prisma/              # Schéma et migrations Prisma
│   └── schema.prisma
│
├── 📜 scripts/             # Scripts utilitaires
│   ├── create-db.mjs      # Création de la base monkey_run
│   └── create-db.sql
│
├── 🧪 test/                # Tests e2e (auth, users, runs)
├── .env                    # Variables d'environnement (à créer)
├── package.json            # Backend dependencies
└── README.md               # Ce fichier
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

**Option 1 — Script npm (recommandé)** : une fois PostgreSQL installé et démarré, et `DATABASE_URL` renseignée dans `.env` :

```bash
npm run db:create
```

**Option 2 — Ligne de commande** :

```bash
# Se connecter à PostgreSQL (port 5432 ou 5433 selon votre installation)
psql -U postgres -h localhost -p 5432

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

Le serveur démarre sur `http://localhost:3000` par défaut. L’API est préfixée par `/api` (ex. `http://localhost:3000/api`).

### 7️⃣ Vérifier l'installation

**Vérifications** :

1. Vérifiez que le serveur démarre sans erreur dans le terminal
2. La racine de l’API répond sur `http://localhost:3000/api`
3. Vérifiez que la connexion à PostgreSQL fonctionne (aucune erreur dans les logs)
4. Testez les endpoints (auth, users, runs) avec un client REST (Postman, curl, etc.)

**Test rapide avec curl** :

```bash
curl http://localhost:3000/api
```

> ✅ **Le backend est prêt quand** : Le serveur démarre sans erreur et répond aux requêtes HTTP.

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

### 3️⃣ Configurer le SDK Android

Avant de continuer, assurez-vous que les variables d'environnement Android sont configurées (voir section [Installation d'Android Studio](#-installation-dandroid-studio)).

**Vérifier la configuration** :

```bash
# Vérifier que Android SDK est détecté
echo $ANDROID_HOME  # macOS/Linux
echo %ANDROID_HOME% # Windows PowerShell

# Vérifier adb
adb version
```

### 4️⃣ Configurer l'URL de l'API backend

Dans le fichier `mobile/src/services/api.ts`, modifiez la `baseURL` ou utilisez une variable d'environnement :

```typescript
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';
```

> ⚠️ **Important pour Android** : Si vous testez sur un émulateur Android, utilisez `http://10.0.2.2:3000/api` au lieu de `localhost`.

### 5️⃣ Installation des dépendances natives

#### Pour iOS (macOS uniquement)

```bash
cd ios
pod install
cd ..
```

#### Pour Android

Les dépendances natives sont automatiquement liées grâce à l'autolinking de React Native.

> ⚠️ **Note** : Pour que les modules natifs (comme `react-native-encrypted-storage`) fonctionnent, vous devez rebuilder l'application.

### 6️⃣ Démarrer l'émulateur Android (AVD)

#### Option 1 : Via Android Studio

1. Ouvrez **Android Studio**
2. Cliquez sur **More Actions** > **Virtual Device Manager**
3. Cliquez sur le bouton **▶️ Play** à côté de votre AVD pour le démarrer

#### Option 2 : Via ligne de commande

```bash
# Lister les AVD disponibles
emulator -list-avds

# Démarrer un émulateur spécifique (remplacez AVD_NAME par le nom de votre AVD)
emulator -avd AVD_NAME
```

#### Option 3 : Connecter un appareil physique

1. Activez les **Options développeur** sur votre appareil Android
2. Activez le **Débogage USB**
3. Connectez l'appareil via USB
4. Vérifiez la connexion :
   ```bash
   adb devices
   ```
   Vous devriez voir votre appareil dans la liste.

> ⚠️ **Important** : L'émulateur ou l'appareil doit être démarré **avant** de lancer l'application React Native.

#### iOS (macOS uniquement)

1. Ouvrez `mobile/ios/MobileApp.xcworkspace` dans Xcode
2. Sélectionnez votre simulateur dans Xcode

### 7️⃣ Démarrer Metro Bundler

Dans un terminal séparé :

```bash
cd mobile
npm start
```

### 8️⃣ Lancer l'application Android

**Important** : Assurez-vous que l'émulateur Android est démarré ou qu'un appareil est connecté avant cette étape.

```bash
cd mobile
npm run android
```

Cette commande va :

1. Compiler l'application Android (Gradle build)
2. Installer l'application sur l'émulateur/appareil
3. Démarrer automatiquement Metro Bundler si ce n'est pas déjà fait
4. Lancer l'application

#### Pour iOS (macOS uniquement)

```bash
cd mobile
npm run ios
```

---

## 🔐 Variables d'environnement

### Backend (.env à la racine)

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# Base de données PostgreSQL
# Format: postgresql://[user]:[password]@[host]:[port]/[database]?schema=[schema]
DATABASE_URL="postgresql://postgres:password@localhost:5432/monkey_run?schema=public"

# Exemple avec utilisateur personnalisé
# DATABASE_URL="postgresql://monkeyuser:mySecurePassword123@localhost:5432/monkey_run?schema=public"

# Configuration JWT (Authentification)
# Générez un secret fort avec: openssl rand -base64 32
JWT_SECRET="votre-secret-jwt-super-securise-changez-moi-absolument-en-production"
JWT_EXPIRATION="7d"  # Durée de validité du token (7 jours, 24h, 1h, etc.)

# Configuration de l'application
NODE_ENV="development"  # development | production | test
PORT=3000  # Port du serveur NestJS

# Optionnel: Configuration CORS
# CORS_ORIGIN="http://localhost:8081"  # Pour React Native Metro
```

**Exemples de valeurs** :

| Variable         | Exemple de valeur                                                      | Description                                               |
| ---------------- | ---------------------------------------------------------------------- | --------------------------------------------------------- |
| `DATABASE_URL`   | `postgresql://postgres:mypass@localhost:5432/monkey_run?schema=public` | URL complète de connexion PostgreSQL                      |
| `JWT_SECRET`     | `aB3xK9mP2vL8nQ5rT7wY4zU6hJ1cF0dE`                                     | Secret pour signer les tokens JWT (minimum 32 caractères) |
| `JWT_EXPIRATION` | `7d` ou `24h` ou `3600s`                                               | Durée de validité du token                                |
| `PORT`           | `3000`                                                                 | Port du serveur backend                                   |

### Mobile

Pour React Native, vous avez deux options pour configurer les variables d'environnement :

#### Option 1 : Configuration directe dans le code (Simple)

Modifiez directement `mobile/src/services/api.ts` :

```typescript
// Pour émulateur Android
const API_BASE_URL = 'http://10.0.2.2:3000/api';

// Pour appareil physique Android (remplacez par l'IP de votre machine)
// const API_BASE_URL = 'http://192.168.1.100:3000/api';

// Pour iOS Simulator (macOS)
// const API_BASE_URL = 'http://localhost:3000/api';
```

#### Option 2 : Utiliser react-native-config (Recommandé pour production)

1. Installez `react-native-config` :

```bash
cd mobile
npm install react-native-config
```

2. Créez `mobile/.env` :

```env
# URL de l'API backend
# Pour émulateur Android
API_BASE_URL=http://10.0.2.2:3000/api

# Pour appareil physique (remplacez par votre IP locale)
# API_BASE_URL=http://192.168.1.100:3000/api

# Pour iOS Simulator (macOS)
# API_BASE_URL=http://localhost:3000/api
```

3. Utilisez dans le code :

```typescript
import Config from 'react-native-config';
const API_BASE_URL = Config.API_BASE_URL || 'http://localhost:3000/api';
```

### 📝 Notes importantes

- **Android Emulator** : Utilisez `http://10.0.2.2:3000/api` (10.0.2.2 est l'alias pour localhost dans l'émulateur Android)
- **Appareil physique Android** : Utilisez l'IP locale de votre machine (ex: `http://192.168.1.100:3000/api`)
  - Trouvez votre IP : `ipconfig` (Windows) ou `ifconfig` (macOS/Linux)
- **iOS Simulator** : Utilisez `http://localhost:3000/api`
- **Appareil iOS physique** : Utilisez l'IP locale de votre machine (comme Android)

### 🔒 Sécurité

> ⚠️ **Important** : Ne commitez **jamais** le fichier `.env` contenant des secrets réels dans Git. Ajoutez `.env` dans `.gitignore`.

---

## ✅ Vérification de l'installation

Avant de commencer à développer, vérifiez que tout est correctement installé :

### 1️⃣ Vérifier Node.js et npm

```bash
node --version  # Doit afficher v18.x ou v20.x
npm --version   # Doit afficher 9.x ou 10.x
```

### 2️⃣ Vérifier Java JDK

```bash
java -version  # Doit afficher java version "17.x" ou supérieur
javac -version # Doit afficher javac 17.x ou supérieur
```

### 3️⃣ Vérifier Android SDK

```bash
# Vérifier la variable d'environnement
echo $ANDROID_HOME  # macOS/Linux
echo %ANDROID_HOME% # Windows PowerShell

# Vérifier adb (Android Debug Bridge)
adb version

# Lister les appareils/émulateurs connectés
adb devices
```

### 4️⃣ Vérifier PostgreSQL

```bash
# Vérifier que PostgreSQL est installé
psql --version

# Tester la connexion
psql -U postgres -c "SELECT version();"
```

### 5️⃣ Vérifier l'environnement React Native

React Native fournit un outil de diagnostic :

```bash
cd mobile
npx react-native doctor
```

Cet outil vérifie automatiquement :

- ✅ Node.js version
- ✅ npm/yarn version
- ✅ Java JDK installation
- ✅ Android Studio installation
- ✅ Android SDK configuration
- ✅ Variables d'environnement (ANDROID_HOME)

### 6️⃣ Vérifier la connexion Backend/Mobile

#### Backend

1. Démarrez le serveur backend :

   ```bash
   npm run start:dev
   ```

2. Testez l'API avec curl :
   ```bash
   curl http://localhost:3000
   ```

#### Mobile

1. Assurez-vous que le backend tourne sur `http://localhost:3000`

2. Configurez l'URL de l'API dans `mobile/src/services/api.ts`

3. Démarrez Metro Bundler :

   ```bash
   cd mobile
   npm start
   ```

4. Dans un autre terminal, lancez l'app :

   ```bash
   cd mobile
   npm run android
   ```

5. Vérifiez dans les logs Metro que l'application se connecte au backend sans erreur réseau.

### 7️⃣ Checklist complète

- [ ] Node.js >= 18.x installé et accessible
- [ ] PostgreSQL >= 14.x installé et en cours d'exécution
- [ ] Base de données `monkey_run` créée
- [ ] Fichier `.env` configuré avec `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRATION`
- [ ] Migrations Prisma exécutées (`npm run prisma:migrate`)
- [ ] Backend démarre sans erreur (`npm run start:dev`)
- [ ] Java JDK 17 installé
- [ ] Android Studio installé avec SDK Android (API 33+)
- [ ] Variables d'environnement Android configurées (`ANDROID_HOME`)
- [ ] Émulateur Android créé et démarré (ou appareil connecté)
- [ ] Application mobile démarre sans erreur (`npm run android`)
- [ ] Connexion API fonctionnelle entre mobile et backend

---

## 📜 Scripts disponibles

### Backend (à la racine)

| Script                          | Description                                                      |
| ------------------------------- | ---------------------------------------------------------------- |
| `npm run start:dev`             | Démarre le serveur en mode développement avec watch              |
| `npm run start:prod`            | Démarre le serveur en mode production                            |
| `npm run build`                 | Compile le TypeScript en JavaScript                              |
| `npm run test`                  | Lance les tests unitaires                                        |
| `npm run test:watch`            | Lance les tests en mode watch                                    |
| `npm run test:e2e`              | Lance les tests end-to-end                                       |
| `npm run lint`                  | Vérifie et corrige le code avec ESLint                           |
| `npm run format`                | Formate le code avec Prettier                                    |
| `npm run prisma:generate`       | Génère le client Prisma                                          |
| `npm run prisma:migrate`        | Crée et applique les migrations                                  |
| `npm run prisma:migrate:deploy` | Applique les migrations en production                            |
| `npm run prisma:studio`         | Ouvre Prisma Studio (interface graphique)                        |
| `npm run prisma:migrate:reset`  | Réinitialise la base de données                                  |
| `npm run db:create`             | Crée la base de données `monkey_run` (si PostgreSQL est démarré) |

### Mobile (dans mobile/)

| Script            | Description                                    |
| ----------------- | ---------------------------------------------- |
| `npm run android` | Lance l'application sur Android                |
| `npm run ios`     | Lance l'application sur iOS (macOS uniquement) |
| `npm start`       | Démarre Metro Bundler                          |
| `npm run lint`    | Vérifie le code avec ESLint                    |
| `npm run test`    | Lance les tests Jest                           |

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
- **AuthModule** : Authentification JWT (signup, login, forgot-password)
- **UsersModule** : Profil utilisateur (GET/PATCH /users/me, changement de mot de passe)
- **RunsModule** : CRUD courses (GET/POST /runs, pagination)
- **ConfigModule** : Variables d'environnement (global)

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

### ❌ Problèmes de connexion PostgreSQL

**Erreur** : `Can't reach database server` ou `Connection refused`

**Solutions** :

1. Vérifiez que PostgreSQL est démarré :

   ```bash
   # Windows
   net start postgresql-x64-XX  # Remplacez XX par votre version

   # macOS (avec Homebrew)
   brew services start postgresql@14

   # Linux (Ubuntu/Debian)
   sudo service postgresql start
   # ou
   sudo systemctl start postgresql
   ```

2. Vérifiez que PostgreSQL écoute sur le bon port :

   ```bash
   # Par défaut, PostgreSQL utilise le port 5432
   psql -U postgres -h localhost -p 5432
   ```

3. Vérifiez la `DATABASE_URL` dans `.env` :

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/monkey_run?schema=public"
   ```

   - Vérifiez que `username` et `password` sont corrects
   - Vérifiez que le port est `5432` (ou celui que vous utilisez)
   - Vérifiez que le nom de la base `monkey_run` existe

4. Vérifiez que la base de données existe :

   ```bash
   psql -U postgres -l
   # Cherchez "monkey_run" dans la liste
   ```

5. Si la base n'existe pas, créez-la :

   ```bash
   psql -U postgres
   CREATE DATABASE monkey_run;
   \q
   ```

6. Testez la connexion manuellement :

   ```bash
   psql "postgresql://username:password@localhost:5432/monkey_run?schema=public"
   ```

7. Vérifiez les logs PostgreSQL pour plus de détails :

   ```bash
   # macOS (Homebrew)
   tail -f /usr/local/var/postgresql@14/log/postgres.log

   # Linux
   tail -f /var/log/postgresql/postgresql-*.log
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

### ❌ SDK location not found / ANDROID_HOME not set

**Erreur** : `SDK location not found` ou `ANDROID_HOME not set`

**Solutions** :

1. Vérifiez que `ANDROID_HOME` est défini :

   ```bash
   echo $ANDROID_HOME  # macOS/Linux
   echo %ANDROID_HOME% # Windows PowerShell
   ```

2. Configurez la variable d'environnement (voir section [Installation d'Android Studio](#-installation-dandroid-studio))

3. Redémarrez votre terminal après configuration

4. Pour React Native, vous pouvez aussi définir localement dans `mobile/android/local.properties` :
   ```properties
   sdk.dir=C:\\Users\\VOTRE_NOM\\AppData\\Local\\Android\\Sdk
   ```

### ❌ Erreur de connexion API depuis l'émulateur Android

**Erreur** : `Network request failed` ou `Connection refused`

**Solutions** :

1. **Utilisez `10.0.2.2` au lieu de `localhost`** :

   ```typescript
   const API_BASE_URL = 'http://10.0.2.2:3000/api'; // ✅ Correct pour émulateur Android
   // const API_BASE_URL = 'http://localhost:3000/api';  // ❌ Ne fonctionne pas dans émulateur
   ```

2. Vérifiez que le backend tourne sur le port 3000 :

   ```bash
   curl http://localhost:3000
   ```

3. Pour un appareil physique, utilisez l'IP locale de votre machine :

   ```typescript
   const API_BASE_URL = 'http://192.168.1.100:3000/api'; // Remplacez par votre IP
   ```

4. Vérifiez que le firewall Windows/Mac n'bloque pas le port 3000

### ❌ Metro Bundler cache problématique

**Erreur** : Erreurs inexpliquées, modules introuvables, comportement étrange

**Solutions** :

1. Nettoyer le cache Metro :

   ```bash
   cd mobile
   npm start -- --reset-cache
   ```

2. Supprimer le cache manuellement :

   ```bash
   # macOS/Linux
   rm -rf $TMPDIR/metro-*
   rm -rf $TMPDIR/haste-*

   # Windows PowerShell
   Remove-Item -Recurse -Force $env:TEMP/metro-*
   Remove-Item -Recurse -Force $env:TEMP/haste-*
   ```

3. Nettoyer complètement :
   ```bash
   cd mobile
   rm -rf node_modules
   rm -rf android/app/build
   npm install
   ```

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

### ❌ Problèmes de build Gradle

**Erreur** : `Gradle build failed` ou erreurs de compilation Android

**Solutions** :

1. Nettoyer le projet Gradle :

   ```bash
   cd mobile/android
   ./gradlew clean
   cd ../..
   ```

2. Vérifiez la version de Java :

   ```bash
   java -version  # Doit être JDK 17
   ```

3. Configurez `JAVA_HOME` si nécessaire :

   ```bash
   # macOS/Linux
   export JAVA_HOME=$(/usr/libexec/java_home -v 17)

   # Windows
   # Définissez JAVA_HOME dans Variables d'environnement
   ```

4. Supprimez le cache Gradle :

   ```bash
   # macOS/Linux
   rm -rf ~/.gradle/caches/

   # Windows
   # Supprimez C:\Users\VOTRE_NOM\.gradle\caches\
   ```

5. Vérifiez `mobile/android/build.gradle` pour les versions compatibles

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
