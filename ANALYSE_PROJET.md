# 📊 Analyse Approfondie du Projet Monkey-run

**Date d'analyse** : 2024 (mise à jour 2026-03-29)  
**Version du projet** : 0.0.1

---

## 1. Résumé Exécutif

**Monkey-run** est une application complète de gestion d'entraînements de course en fractionné, composée d'un backend API sécurisé (NestJS) et d'une application mobile (React Native). Le backend **Phase 1 est terminé** : API REST sous le préfixe `/api`, modules Auth (signup, login, forgot-password), Users (profil, mot de passe), Runs (CRUD courses avec pagination), Prisma + PostgreSQL, JWT, CORS et ValidationPipe. L'application mobile (React Native + Tamagui) dispose d'une **navigation complète** (stack + onglets), d’**écrans UI** (onboarding, login/signup, dashboard, chrono, historique, profil, détail de session), des **services** `api.ts` et `storage.ts` ; il reste à **finaliser l’auth applicative** (hook `useAuth`, garde de routes), le **chrono métier**, l’**enregistrement des courses** (`POST /runs`) et le **branchement des listes** sur `GET /runs` (Phases 2–4).

---

## 2. Stack Technique

### Backend (NestJS)

| Catégorie            | Technologie       | Version                   | Usage                         |
| -------------------- | ----------------- | ------------------------- | ----------------------------- |
| **Framework**        | NestJS            | 11.0.1                    | Framework Node.js modulaire   |
| **Langage**          | TypeScript        | 5.7.3                     | Langage principal             |
| **Runtime**          | Node.js           | >= 18.x (20.x recommandé) | Environnement d'exécution     |
| **ORM**              | Prisma            | 6.18.0                    | Gestion de la base de données |
| **Base de données**  | PostgreSQL        | >= 14.x                   | SGBD relationnel              |
| **Authentification** | JWT + Passport    | 11.0.1 / 11.0.5           | Gestion des tokens            |
| **Hachage**          | bcrypt            | 6.0.0                     | Chiffrement des mots de passe |
| **Validation**       | class-validator   | 0.14.2                    | Validation des DTOs           |
| **Transformation**   | class-transformer | 0.5.1                     | Transformation des objets     |
| **Configuration**    | @nestjs/config    | 4.0.2                     | Variables d'environnement     |
| **Tests**            | Jest              | 30.0.0                    | Framework de tests            |
| **Linting**          | ESLint            | 9.18.0                    | Analyse statique              |
| **Formatage**        | Prettier          | 3.4.2                     | Formatage du code             |

### Mobile (React Native)

| Catégorie       | Technologie                            | Version | Usage                            |
| --------------- | -------------------------------------- | ------- | -------------------------------- |
| **Framework**   | React Native                           | 0.82.1  | Framework mobile multiplateforme |
| **Langage**     | TypeScript                             | 5.8.3   | Langage principal                |
| **UI Library**  | Tamagui                                | 1.135.7 | Bibliothèque de composants UI    |
| **Navigation**  | React Navigation (stack + bottom tabs) | 7.x     | Gestion de la navigation         |
| **HTTP Client** | Axios                                  | 1.13.1  | Requêtes API                     |
| **Formulaires** | React Hook Form                        | 7.66.0  | Gestion des formulaires          |
| **Validation**  | Zod                                    | 4.1.12  | Validation de schémas            |
| **Stockage**    | react-native-encrypted-storage         | 4.0.3   | Stockage sécurisé (KeyStore)     |
| **Safe Area**   | react-native-safe-area-context         | 5.5.2   | Gestion des zones sûres          |
| **Tests**       | Jest                                   | 29.6.3  | Framework de tests               |
| **Build Tool**  | Metro Bundler                          | 0.82.1  | Bundler React Native             |

### Outils de Build et Configuration

- **Backend** : NestJS CLI (compilation TypeScript)
- **Mobile Android** : Gradle (via Android Studio)
- **Mobile iOS** : Xcode + CocoaPods
- **Bundler Mobile** : Metro Bundler

---

## 3. Architecture

### Pattern Architectural

Le projet suit une **architecture modulaire** inspirée de l'architecture hexagonale, avec séparation claire des responsabilités :

#### Backend (NestJS)

- **Pattern** : Architecture modulaire NestJS (similaire à Angular)
- **Structure** : Modules → Controllers → Services → Repositories (via Prisma)
- **Séparation des couches** :
  - **Présentation** : Controllers (endpoints REST)
  - **Business Logic** : Services (logique métier)
  - **Données** : PrismaService (accès à la base de données)

#### Mobile (React Native)

- **Pattern** : Architecture par services et composants
- **Structure** : Services → Composants → Navigation
- **Séparation des responsabilités** :
  - **Services** : API client, stockage sécurisé
  - **Composants** : UI réutilisables (Tamagui)
  - **Navigation** : React Navigation (pile native + onglets bas)

### Patterns de Design Identifiés

1. **Singleton** : `PrismaService` (service global), `SecureStorageService` (instance unique)
2. **Repository Pattern** : Implémenté via Prisma Client
3. **Dependency Injection** : Utilisé par NestJS pour l'injection de dépendances
4. **Module Pattern** : Modules NestJS pour l'organisation du code
5. **Service Pattern** : Services pour la logique métier et l'accès aux données

### Flux de Données

```
Mobile App (React Native)
    ↓ (HTTP/HTTPS)
Backend API (NestJS)
    ↓ (Prisma Client)
PostgreSQL Database
```

**Flux d'authentification** :

1. Mobile → POST `/auth/login` → Backend
2. Backend → Validation → Génération JWT
3. Backend → Retour JWT → Mobile
4. Mobile → Stockage sécurisé (EncryptedStorage)
5. Mobile → Intercepteur Axios → Ajout automatique du token dans les requêtes

---

## 4. Structure du Projet

### Arborescence Commentée

```
Monkey-run/
│
├── 📱 mobile/                          # Application React Native
│   ├── android/                        # Configuration Android native
│   │   ├── app/                        # Code Android natif
│   │   │   ├── build.gradle            # Configuration Gradle
│   │   │   └── src/main/               # Manifest, ressources Android
│   │   ├── gradle/                     # Wrapper Gradle
│   │   └── settings.gradle              # Configuration Gradle
│   │
│   ├── ios/                            # Configuration iOS native
│   │   ├── MobileApp/                  # Projet Xcode
│   │   └── Podfile                     # Dépendances CocoaPods
│   │
│   ├── src/                            # Code source React Native
│   │   └── services/                   # Services applicatifs
│   │       ├── api.ts                  # Client HTTP Axios avec intercepteurs
│   │       └── storage.ts              # Service de stockage sécurisé
│   │
│   ├── __tests__/                      # Tests unitaires React Native
│   ├── App.tsx                         # Point d'entrée de l'application
│   ├── index.js                        # Entry point React Native
│   ├── package.json                    # Dépendances mobile
│   ├── tsconfig.json                   # Configuration TypeScript mobile
│   ├── tamagui.config.ts               # Configuration Tamagui UI
│   ├── babel.config.js                 # Configuration Babel
│   ├── metro.config.js                 # Configuration Metro Bundler
│   └── jest.config.js                  # Configuration Jest
│
├── 🖥️  src/                            # Code source Backend NestJS
│   ├── prisma/                         # Module Prisma
│   │   ├── prisma.module.ts            # Module global Prisma
│   │   └── prisma.service.ts           # Service Prisma (singleton)
│   │
│   ├── app.controller.ts               # Controller principal (exemple)
│   ├── app.controller.spec.ts          # Tests unitaires du controller
│   ├── app.module.ts                   # Module racine NestJS
│   ├── app.service.ts                  # Service principal (exemple)
│   └── main.ts                         # Point d'entrée de l'application
│
├── 📦 prisma/                          # Configuration Prisma
│   ├── schema.prisma                   # Schéma base de données (User, Profile, Run)
│   └── migrations/                     # Migrations (20260128223000_init)
│
├── 🧪 test/                            # Tests end-to-end
│   ├── app.e2e-spec.ts                 # Tests E2E de base
│   └── jest-e2e.json                   # Configuration Jest E2E
│
├── 📄 Configuration Files
│   ├── package.json                    # Dépendances backend + scripts
│   ├── package-lock.json               # Lock file npm
│   ├── tsconfig.json                   # Configuration TypeScript backend
│   ├── tsconfig.build.json             # Configuration build TypeScript
│   ├── nest-cli.json                   # Configuration NestJS CLI
│   ├── prisma.config.ts                # Configuration Prisma
│   ├── eslint.config.mjs               # Configuration ESLint
│   └── .gitignore                      # Fichiers ignorés par Git
│
└── 📚 Documentation
    ├── README.md                       # Documentation principale (très complète)
    └── README.md.bak                   # Backup du README
```

### Conventions de Nommage

- **Backend** :
  - Fichiers : `kebab-case` (ex: `app.controller.ts`)
  - Classes : `PascalCase` (ex: `AppController`)
  - Variables : `camelCase` (ex: `appService`)
- **Mobile** :
  - Fichiers : `kebab-case` ou `PascalCase` pour composants
  - Composants : `PascalCase` (ex: `App.tsx`)
  - Services : `camelCase` (ex: `api.ts`, `storage.ts`)

---

## 5. Points d'Entrée et Flux

### Backend

**Point d'entrée principal** : `src/main.ts`

```typescript
// src/main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
```

**Flux de démarrage** :

1. `main.ts` → Création de l'application NestJS
2. `AppModule` → Import des modules (PrismaModule)
3. `PrismaModule` → Initialisation de PrismaService
4. `PrismaService.onModuleInit()` → Connexion à PostgreSQL
5. Serveur HTTP démarre sur le port 3000 (ou PORT env)

**Endpoints actuels** :

- `GET /` → Retourne "Hello World!" (exemple)

**Endpoints à implémenter** (selon MVP) :

- `POST /auth/signup` → Inscription
- `POST /auth/login` → Connexion
- `POST /auth/forgot-password` → Mot de passe oublié
- `GET /users/me` → Profil utilisateur
- `PATCH /users/me` → Mise à jour profil
- `GET /runs` → Liste des courses de l'utilisateur
- `POST /runs` → Création d'une course

### Mobile

**Point d'entrée principal** : `mobile/index.js` → `mobile/App.tsx`

**Flux de démarrage** :

1. `index.js` → Enregistrement de l'application React Native
2. `App.tsx` → Composant racine avec SafeAreaProvider
3. `AppContent` → Affichage du NewAppScreen (template par défaut)
4. Navigation → À configurer avec React Navigation

**Services disponibles** :

- `api.ts` : Client HTTP avec intercepteurs JWT
- `storage.ts` : Stockage sécurisé pour tokens et données utilisateur

---

## 6. Configuration et Environnement

### Variables d'Environnement Requises

#### Backend (`.env` à la racine)

| Variable         | Description                       | Exemple                                                          | Statut                      |
| ---------------- | --------------------------------- | ---------------------------------------------------------------- | --------------------------- |
| `DATABASE_URL`   | URL de connexion PostgreSQL       | `postgresql://user:pass@localhost:5432/monkey_run?schema=public` | ✅ Requis                   |
| `JWT_SECRET`     | Secret pour signer les tokens JWT | `votre-secret-jwt-super-securise`                                | ✅ Requis                   |
| `JWT_EXPIRATION` | Durée de validité du token        | `7d` ou `24h`                                                    | ✅ Requis                   |
| `NODE_ENV`       | Environnement d'exécution         | `development` / `production`                                     | ⚠️ Optionnel                |
| `PORT`           | Port du serveur                   | `3000`                                                           | ⚠️ Optionnel (défaut: 3000) |
| `CORS_ORIGIN`    | Origine CORS autorisée            | `http://localhost:8081`                                          | ⚠️ Optionnel                |

**État actuel** : `.env.example` existe ; copier en `.env` et adapter les valeurs (DATABASE_URL, JWT_SECRET, etc.).

#### Mobile

| Variable       | Description          | Exemple                              | Statut                                |
| -------------- | -------------------- | ------------------------------------ | ------------------------------------- |
| `API_BASE_URL` | URL de l'API backend | `http://10.0.2.2:3000/api` (Android) | ⚠️ Optionnel (hardcodé dans `api.ts`) |

**⚠️ Problème identifié** : L'URL de l'API est hardcodée dans `mobile/src/services/api.ts` avec une valeur par défaut. Pour la production, il faudrait utiliser `react-native-config` ou une configuration dynamique.

### Configurations par Environnement

**Actuellement** : Aucune configuration spécifique par environnement n'est présente (dev/staging/prod). Le projet utilise uniquement `NODE_ENV` pour différencier les environnements.

**Recommandation** : Créer des fichiers `.env.development`, `.env.staging`, `.env.production` ou utiliser `@nestjs/config` avec validation.

---

## 7. Base de Données et Persistence

### Système de Gestion de Base de Données

- **SGBD** : PostgreSQL >= 14.x
- **ORM** : Prisma 6.18.0
- **Client** : Prisma Client (généré automatiquement)

### Schéma de Données

**État actuel** : Le schéma `prisma/schema.prisma` est défini avec les modèles User, Profile et Run (relation 1:1 User–Profile, 1:N User–Run). Index sur `run.user_id` et `run.date`. Voir `.cursor/DATABASE_SCHEMA.md` pour la référence complète.

**Modèles définis** :

- `User` : Utilisateurs (id, email, passwordHash, createdAt)
- `Profile` : Profil utilisateur (pseudo, avatar_url, first_name, last_name), relation 1:1 avec User
- `Run` : Courses enregistrées (date, durationSeconds, patternJson), relation 1:N avec User

### Migrations

- **État actuel** : Migration initiale `20260128223000_init` appliquée. Script `npm run db:create` disponible pour créer la base `monkey_run` si besoin.
- **Scripts disponibles** :
  - `npm run db:create` : Créer la base de données (PostgreSQL démarré + `DATABASE_URL` dans `.env`)
  - `npm run prisma:migrate` : Créer et appliquer les migrations
  - `npm run prisma:migrate:deploy` : Appliquer les migrations en production
  - `npm run prisma:migrate:reset` : Réinitialiser la base de données
  - `npm run prisma:generate` : Générer le client Prisma
  - `npm run prisma:studio` : Ouvrir Prisma Studio (interface graphique)

### Stratégies de Cache

**Aucune stratégie de cache n'est actuellement implémentée pour le MVP.**

**Note** : Le cache pourra être ajouté dans une version future si nécessaire.

---

## 8. Tests et Qualité

### Framework de Tests

#### Backend

- **Framework** : Jest 30.0.0
- **Configuration** : `jest.config.json` (dans `package.json`)
- **Tests unitaires** : `*.spec.ts` (ex: `app.controller.spec.ts`)
- **Tests E2E** : `test/*.e2e-spec.ts` (ex: `app.e2e-spec.ts`)

#### Mobile

- **Framework** : Jest 29.6.3
- **Configuration** : `mobile/jest.config.js`
- **Tests** : `mobile/__tests__/App.test.tsx`

### Couverture de Tests

**État actuel** :

- ✅ Tests unitaires de base présents (controller, service)
- ✅ Tests E2E de base présents
- ⚠️ **Couverture très limitée** (seulement les fichiers de base)
- ❌ Aucun test pour les services Prisma
- ❌ Aucun test pour les services mobile (API, storage)
- ❌ Aucun test d'intégration

**Scripts disponibles** :

- `npm run test` : Tests unitaires backend
- `npm run test:watch` : Tests en mode watch
- `npm run test:cov` : Tests avec couverture
- `npm run test:e2e` : Tests end-to-end

### Outils de Linting et Formatage

#### Backend

- **ESLint** : 9.18.0 (configuration moderne avec `eslint.config.mjs`)
  - Utilise `typescript-eslint` pour TypeScript
  - Intégration avec Prettier
  - Règles personnalisées (désactivation de certaines règles strictes)
- **Prettier** : 3.4.2
  - Formatage automatique du code
  - Script : `npm run format`

#### Mobile

- **ESLint** : 8.19.0 (configuration React Native)
- **Prettier** : 2.8.8

**Scripts disponibles** :

- `npm run lint` : Vérification et correction ESLint (backend)
- `npm run format` : Formatage Prettier (backend)

---

## 9. Documentation

### README Principal

**Qualité** : ⭐⭐⭐⭐⭐ **Excellente**

Le fichier `README.md` est **très complet** et contient :

- ✅ Instructions d'installation détaillées (Android Studio, PostgreSQL)
- ✅ Structure du projet expliquée
- ✅ Guide de configuration des variables d'environnement
- ✅ Scripts disponibles documentés
- ✅ Architecture technique décrite
- ✅ Section troubleshooting complète
- ✅ Ressources supplémentaires

**Points forts** :

- Documentation exhaustive pour les nouveaux développeurs
- Instructions spécifiques pour Android et iOS
- Exemples concrets de configuration
- Guide de dépannage détaillé

### Documentation API

**État actuel** : ❌ **Aucune documentation API n'est présente**

**Note** : La documentation API Swagger pourra être ajoutée dans une version future si nécessaire.

### Commentaires de Code

**Qualité** : ⭐⭐⭐⭐ **Bonne**

- ✅ Services mobile bien documentés (`storage.ts` avec JSDoc complet)
- ✅ Commentaires explicatifs dans `api.ts`
- ⚠️ Code backend minimal (peu de commentaires, mais code simple)

### Guides de Contribution

**État actuel** : ❌ **Aucun guide de contribution n'est présent**

**Note** : Le guide de contribution pourra être créé dans une phase ultérieure si nécessaire.

### Documentation Cursor (.cursor/)

**État actuel** : ✅ **Documentation complémentaire disponible**

Le dossier `.cursor/` contient une documentation complémentaire importante pour le développement :

- **`PROJECT_CONTEXT.md`** : Contexte et historique du projet, état actuel, architecture détaillée
- **`DATABASE_SCHEMA.md`** : Schéma de base de données Prisma complet avec modèles et relations
- **`API_DOCUMENTATION.md`** : Documentation des endpoints API et spécifications
- **`DEVELOPMENT_PHASES.md`** : Phases de développement et roadmap détaillée
- **`MODIFICATION_TEMPLATE.md`** : Template pour documenter les modifications
- **`rules`** : Règles et conventions de développement

**Note importante** : Cette documentation dans `.cursor/` doit être prise en compte lors de l'analyse et du développement du projet, car elle contient des spécifications détaillées, des décisions architecturales et des guides de développement complémentaires au présent document.

---

## 10. Gestion de Version et CI/CD

### Git

**État actuel** :

- ✅ `.gitignore` présent (ignore `node_modules`, `.env`, `/generated/prisma`)
- ⚠️ Aucun workflow CI/CD configuré
- ⚠️ Aucune stratégie de branching documentée

### CI/CD

**État actuel** : ❌ **Aucun pipeline CI/CD n'est configuré**

**Note** : Le CI/CD ne fait pas partie du MVP et sera configuré dans une phase ultérieure.

### Stratégies de Branching

**État actuel** : ⚠️ **Non documentée**

**Note** : La stratégie de branching pourra être définie dans une phase ultérieure.

### Processus de Déploiement

**État actuel** : ❌ **Non défini**

**Note** : Le déploiement et la distribution ne font pas partie du MVP et seront traités dans une phase ultérieure.

---

## 11. Sécurité et Authentification

### Mécanismes d'Authentification

#### Backend

**État actuel** : ⚠️ **Préparé mais non implémenté**

**Dépendances installées** :

- `@nestjs/jwt` : Gestion des tokens JWT
- `@nestjs/passport` : Middleware d'authentification
- `passport-jwt` : Stratégie JWT pour Passport
- `bcrypt` : Hachage des mots de passe

**À implémenter pour le MVP** :

- Module `AuthModule` avec endpoints `/auth/signup`, `/auth/login`, `/auth/forgot-password`
- Guards JWT (`@UseGuards(JwtAuthGuard)`)
- Stratégies Passport (JWT Strategy)
- Validation des tokens JWT

#### Mobile

**État actuel** : ✅ **Infrastructure prête**

**Implémenté** :

- Service de stockage sécurisé (`storage.ts`) avec `react-native-encrypted-storage`
- Intercepteur Axios pour ajout automatique du token JWT
- Gestion des tokens (JWT + refresh token)
- Stockage sécurisé via KeyStore Android / Keychain iOS

**Fonctionnalités disponibles** :

- `saveJwtToken()` : Sauvegarde sécurisée du token
- `getJwtToken()` : Récupération du token
- `removeJwtToken()` : Suppression du token
- `clearTokens()` : Suppression de tous les tokens
- `saveUserData()` : Stockage des données utilisateur

### Pratiques de Sécurité

#### Backend

**Bonnes pratiques identifiées** :

- ✅ Utilisation de `bcrypt` pour le hachage des mots de passe
- ✅ Variables d'environnement pour les secrets (JWT_SECRET)
- ✅ Validation des données avec `class-validator`

**À améliorer pour le MVP** :

- ⚠️ Pas de CORS configuré explicitement dans `main.ts`
- ⚠️ Pas de validation des entrées utilisateur (DTOs manquants)
- ⚠️ Pas de gestion des erreurs centralisée

#### Mobile

**Bonnes pratiques identifiées** :

- ✅ Stockage sécurisé avec `react-native-encrypted-storage`
- ✅ Intercepteur pour gestion automatique des tokens
- ✅ Gestion des erreurs réseau dans l'intercepteur Axios

**À améliorer pour le MVP** :

- ⚠️ Pas de gestion de déconnexion automatique en cas d'erreur 401

### Configuration des Permissions

#### Mobile Android

**Fichier** : `mobile/android/app/src/main/AndroidManifest.xml`

**État actuel** : ⚠️ **Non vérifié** (fichier non lu)

**Permissions requises pour le MVP** :

- `INTERNET` : Pour les requêtes API
- `ACCESS_NETWORK_STATE` : Pour vérifier la connectivité
- `VIBRATE` : Pour les notifications de vibration du chrono

#### Mobile iOS

**Fichier** : `mobile/ios/MobileApp/Info.plist`

**État actuel** : ⚠️ **Non vérifié** (fichier non lu)

---

## 12. Points Clés

### ✅ Points Forts

1. **Architecture solide** : Séparation claire backend/mobile, utilisation de technologies modernes
2. **Documentation excellente** : README très complet et détaillé
3. **Sécurité préparée** : Infrastructure de sécurité prête (JWT, stockage sécurisé)
4. **Stack moderne** : Technologies à jour (NestJS 11, React Native 0.82, Prisma 6)
5. **TypeScript** : Typage fort sur tout le projet
6. **Tests configurés** : Infrastructure de tests en place (Jest)

### ⚠️ Points d'Attention

1. **Couverture de tests** : Tests unitaires et E2E en place pour auth, users, runs ; à étendre si nouveaux modules.
2. **Pas de gestion d'erreurs centralisée** : Filtre d'exceptions global optionnel pour standardiser les réponses.
3. **Configuration environnement** : Pas de gestion multi-environnements (optionnel pour MVP).
4. **Documentation API** : Référence dans `.cursor/API_DOCUMENTATION.md` ; Swagger non configuré.

### 🔴 Dettes Techniques / Prochaines étapes

1. **Mobile** : Navigation et écrans à développer (Auth, Timer, Dashboard) — Phase 2 à 4.
2. **Chrono** : Implémenter le chronomètre avec notifications voix/vibration.
3. **BackgroundTimer** : Configurer le chrono en arrière-plan.
4. **Swagger** : Optionnel — documenter l'API avec @nestjs/swagger.

---

## 13. Recommandations

### Priorité Haute 🔴

1. **Backend Phase 1** ✅ (terminé)
   - Schéma Prisma, migrations, AuthModule, UsersModule, RunsModule
   - Endpoints sous `/api` (auth, users, runs), JWT, CORS, ValidationPipe, tests

2. **Développer l'application mobile** (Phase 2 et suivantes)
   - Écrans d'authentification (signup, login, forgot-password)
   - Écran chronomètre avec notifications voix/vibration
   - Écran dashboard avec historique des courses

### Priorité Moyenne 🟡

5. **Améliorer la gestion d'erreurs**
   - Créer un filtre d'exceptions global
   - Standardiser les réponses d'erreur

6. **Augmenter la couverture de tests**
   - Tests unitaires pour tous les services
   - Tests d'intégration pour les endpoints
   - Tests E2E pour les flux critiques

7. **Configuration multi-environnements**
   - `.env.example` existe ; étendre si besoin (staging, prod)
   - Validation des variables d'environnement

**Note** : Les fonctionnalités suivantes sont prévues pour les versions futures (hors MVP) :

- CI/CD automatisé
- Cache Redis
- Gestion offline
- Monitoring avancé
- Dashboard web
- Upload d'avatars vers S3

---

## 14. Checklist de Démarrage

### Pour un Nouveau Développeur

#### Prérequis Système

- [ ] Node.js >= 18.x installé
- [ ] PostgreSQL >= 14.x installé et démarré
- [ ] Git installé et configuré
- [ ] IDE configuré (VS Code recommandé)

#### Pour le Développement Mobile (Android)

- [ ] Java JDK 17 installé
- [ ] Android Studio installé
- [ ] Android SDK (API 33+) configuré
- [ ] Variable `ANDROID_HOME` configurée
- [ ] Émulateur Android créé ou appareil connecté

#### Pour le Développement Mobile (iOS) - macOS uniquement

- [ ] Xcode >= 14.x installé
- [ ] CocoaPods installé (`sudo gem install cocoapods`)

#### Configuration du Projet

**Backend** :

- [ ] Cloner le repository
- [ ] `npm install` à la racine
- [ ] Copier `.env.example` en `.env` et renseigner : `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRATION`
- [ ] Créer la base de données PostgreSQL : `CREATE DATABASE monkey_run;`
- [ ] `npm run prisma:migrate` pour appliquer la migration initiale
- [ ] `npm run start:dev` pour démarrer le serveur

**Mobile** :

- [ ] `cd mobile && npm install`
- [ ] Pour iOS : `cd ios && pod install && cd ..`
- [ ] Configurer `API_BASE_URL` dans `mobile/src/services/api.ts`
- [ ] `npm start` pour démarrer Metro Bundler
- [ ] `npm run android` ou `npm run ios` pour lancer l'app

#### Vérifications

- [ ] Backend démarre sur `http://localhost:3000`
- [ ] Connexion PostgreSQL fonctionne
- [ ] Application mobile se connecte au backend
- [ ] Tests unitaires passent : `npm run test`
- [ ] Linting OK : `npm run lint`

#### Prochaines Étapes de Développement (MVP)

- [x] Définir le schéma Prisma (User, Profile, Run) — migration `20260128223000_init` créée
- [ ] Implémenter AuthModule (signup, login, forgot-password)
- [ ] Implémenter UsersModule (GET/PATCH /users/me)
- [ ] Implémenter RunsModule (GET/POST /runs)
- [ ] Développer les écrans mobile d'authentification
- [ ] Développer l'écran chronomètre avec notifications
- [ ] Développer l'écran dashboard avec historique
- [ ] Configurer BackgroundTimer pour le chrono en arrière-plan
- [ ] Écrire les tests

---

## 15. Conclusion

Le projet **Monkey-run** présente une **base solide** avec une architecture moderne et bien structurée. La documentation est excellente et facilite grandement la prise en main du projet. Le projet est en **phase de développement MVP** avec les fonctionnalités suivantes à implémenter :

- **Schéma de base de données** : Modèles User, Profile, Run à définir
- **Authentification complète** : AuthModule avec signup, login, forgot-password
- **Modules métier** : UsersModule et RunsModule à créer
- **Interface mobile** : Écrans Auth, Timer et Dashboard à développer
- **Chronomètre** : Fonctionnalité principale avec notifications voix/vibration

Les choix technologiques sont pertinents et modernes, et l'infrastructure de sécurité est bien préparée. Avec l'implémentation des fonctionnalités MVP, le projet sera prêt pour une première version fonctionnelle.

**Note globale** : ⭐⭐⭐⭐ (4/5) - Excellent départ, nécessite l'implémentation des fonctionnalités métier.

---

**Document généré automatiquement** - Pour toute question, consulter le `README.md` principal ou ouvrir une issue sur le repository.
