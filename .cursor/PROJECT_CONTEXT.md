# Contexte et Historique du Projet

**Dernière mise à jour :** 2026-01-28
**Version du projet :** 0.0.1
**Agent Cursor :** Composer
**Développeur actuel :** [À REMPLIR]

## État actuel du projet

Application mobile de course en fractionné guidée (MVP). Phase actuelle : **Phase 1 - Backend (Setup initial)**. Le projet est en phase de développement initiale avec le PrismaModule configuré et le schéma Prisma défini (User, Profile, Run). L'authentification n'est pas encore développée malgré les dépendances installées, et les modules métier (AuthModule, UsersModule, RunsModule) sont à créer. Stack : React Native + Tamagui (mobile) / NestJS + PostgreSQL + Prisma (backend).

---

## Architecture

### Stack Technique

**Frontend Mobile :**
- React Native 0.82.1 (priorité Android)
- Tamagui 1.135.7 (design system)
- @react-navigation/native 7.1.19 / @react-navigation/native-stack 7.6.2 (navigation)
- react-hook-form 7.66.0 + zod 4.1.12 (formulaires et validation)
- axios 1.13.1 (client HTTP pour API)
- react-native-encrypted-storage 4.0.3 (stockage sécurisé des tokens)
- react-native-background-timer (chrono en arrière-plan, à installer si nécessaire)
- TypeScript 5.8.3

**Backend :**
- NestJS 11.0.1 (framework backend)
- @nestjs/passport 11.0.5 + passport-jwt 4.0.1 (authentification JWT)
- bcrypt 6.0.0 (hashage des mots de passe)
- PostgreSQL >= 14.x (base de données relationnelle)
- Prisma 6.18.0 (ORM recommandé)
- class-validator 0.14.2 / class-transformer 0.5.1 (validation et transformation des DTOs)
- TypeScript 5.7.3
- Node.js >= 18.x (20.x recommandé)

**Infrastructure :**
- Aucun CI/CD configuré actuellement
- Pas de Docker détecté
- S3 pour avatars (à implémenter plus tard)

**Autres :**
- npm (gestionnaire de paquets)
- Metro Bundler 0.82.1 (bundler React Native)
- Gradle (build Android)
- Xcode/CocoaPods (build iOS)
- Jest 30.0.0 (tests backend) / Jest 29.6.3 (tests mobile)
- ESLint 9.18.0 (backend) / 8.19.0 (mobile)
- Prettier 3.4.2 (backend) / 2.8.8 (mobile)

### Architecture du projet
- **Type :** Application mobile-first avec backend API REST
- **Flow de données :** Mobile (React Native) → Backend (NestJS) → Database (PostgreSQL) → Web Dashboard (futur)
- **Authentification :** JWT avec refresh token (stateless, scalable)
- **Structure :** Monorepo (backend et mobile dans le même repository)
- **Architecture mobile :** Services (API, Storage) → Composants → Navigation

### Décisions architecturales clés
| Date | Décision | Raison | Impact |
|------|----------|--------|--------|
| Initial | React Native pour le mobile (priorité Android) | Cross-platform, code partagé, performance native | Développement unique pour Android et iOS, nécessite configuration native |
| Initial | Tamagui pour l'UI | Design system performant et moderne, optimisation automatique | UI cohérente, meilleures performances que les composants React Native natifs |
| Initial | Architecture modulaire NestJS | Séparation claire des responsabilités, facilité de maintenance, TypeScript natif | Structure organisée en modules (AuthModule, UsersModule, RunsModule), controllers, services |
| Initial | Prisma comme ORM | Type-safety, migrations automatiques, génération de client, recommandé dans les specs | Accès type-safe à la base de données, migrations faciles. Schéma défini (User, Profile, Run) depuis 2026-01-28 |
| Initial | JWT pour l'authentification | Standard de l'industrie, stateless, scalable, requis par les specs | Infrastructure prête mais non implémentée, nécessite Passport |
| Initial | PostgreSQL pour la persistence | Base de données relationnelle robuste, requise par les specs | Persistance fiable, nécessite configuration et migrations |
| Initial | Stockage sécurisé avec react-native-encrypted-storage | Sécurité des tokens JWT et données sensibles, requis par les specs | Utilisation du KeyStore Android/Keychain iOS natif, sécurité renforcée |
| Initial | react-hook-form + zod | Gestion des formulaires et validation, requis par les specs | Validation côté client robuste, meilleure UX |
| Initial | BackgroundTimer si nécessaire | Chrono fonctionnel en arrière-plan pour les courses | Permet de continuer le chrono même si l'app est en arrière-plan |

### Patterns utilisés
- **Singleton Pattern** : `PrismaService` (service global dans `src/prisma/prisma.service.ts`), `SecureStorageService` (instance unique dans `mobile/src/services/storage.ts`)
- **Repository Pattern** : Implémenté via Prisma Client (accès à la base de données)
- **Dependency Injection** : Utilisé par NestJS pour l'injection de dépendances dans tous les modules
- **Module Pattern** : Modules NestJS pour l'organisation du code (`AppModule`, `PrismaModule`)
- **Service Pattern** : Services pour la logique métier et l'accès aux données (`AppService`, `PrismaService`)
- **Interceptor Pattern** : Intercepteurs Axios dans `mobile/src/services/api.ts` pour ajout automatique des tokens JWT

### Modules de l'application

#### Backend (NestJS)
- **PrismaModule** : Service global pour l'accès à la base de données (✅ Existant)
- **AuthModule** : Gestion authentification (signup, login, forgot-password, JWT) (❌ À créer)
- **UsersModule** : Gestion profil utilisateur (GET/PATCH /users/me) (❌ À créer)
- **RunsModule** : Gestion des courses (GET/POST /runs) (❌ À créer)

#### Mobile (React Native)
- **Auth** : Écrans d'inscription, connexion, mot de passe oublié (❌ À créer)
- **Profile** : Consultation et modification du profil (❌ À créer)
- **Timer** : Chronomètre de course avec notifications voix/vibration (❌ À créer)
- **Dashboard** : Historique des courses et statistiques (❌ À créer)

### Conventions de code
- **Nommage :** 
  - Backend : fichiers en `kebab-case` (ex: `app.controller.ts`), classes en `PascalCase` (ex: `AppController`), méthodes/variables en `camelCase` (ex: `appService`)
  - Mobile : composants en `PascalCase` (ex: `App.tsx`), hooks/fonctions en `camelCase`, services en `camelCase` (ex: `api.ts`)
  - Base de données : tables et colonnes en `snake_case` (ex: `user_id`, `created_at`)
- **Structure des fichiers :** 
  - Backend : Organisation modulaire NestJS (`src/module/module.controller.ts`, `module.service.ts`, `module.module.ts`, `module.dto.ts`)
  - Mobile : Services dans `src/services/`, composants dans `src/components/`, écrans dans `src/screens/`
- **Style :** 
  - Backend : ESLint 9.18.0 avec typescript-eslint, Prettier 3.4.2, règles personnalisées (certaines règles strictes désactivées)
  - Mobile : ESLint 8.19.0 avec configuration React Native, Prettier 2.8.8
- **Tests :** 
  - Backend : Tests unitaires `*.spec.ts` dans le même dossier que le fichier testé, tests E2E dans `test/*.e2e-spec.ts`
  - Mobile : Tests dans `__tests__/` avec extension `.test.tsx`

---

## Journal des modifications

### 2026-01-15 - Session 1 - Initialisation du contexte
**Développeur/Agent :** Cursor Agent (Composer)
**Objectif :** Création du système de traçabilité et documentation du contexte initial

#### État initial documenté
- Analyse complète du projet effectuée
- Structure et architecture identifiées
- Conventions de code documentées
- Dépendances inventoriées
- Schéma Prisma vide identifié (aucun modèle défini)
- Authentification préparée mais non implémentée
- Infrastructure de tests en place mais couverture limitée

#### Fichiers créés
1. `.cursor/PROJECT_CONTEXT.md` - Ce fichier de contexte principal
2. `.cursor/MODIFICATION_TEMPLATE.md` - Template pour futures sessions
3. `.cursor/rules` - Règles simplifiées pour l'agent
4. `ANALYSE_PROJET.md` - Analyse approfondie complète du projet

---

### 2026-01-15 - Session 2 - Intégration des spécifications du projet
**Développeur/Agent :** Cursor Agent (Composer)
**Objectif :** Mise à jour du contexte avec les spécifications détaillées du projet

#### Modifications effectuées
1. **Docs** - Mise à jour complète de PROJECT_CONTEXT.md avec les spécifications
   - **Fichiers modifiés :**
     - `.cursor/PROJECT_CONTEXT.md` - Intégration des spécifications (concept, stack technique, modules, schéma BDD, phases de développement)
   - **Raison :** Aligner la documentation avec les spécifications réelles du projet (application de course en fractionné guidée)
   - **Tests ajoutés :** Non
   - **Breaking changes :** Non
   - **Dépendances modifiées :** Aucune

2. **Docs** - Création de la documentation API complète
   - **Fichiers créés :**
     - `.cursor/API_DOCUMENTATION.md` - Documentation détaillée de tous les endpoints (Auth, Users, Runs)
   - **Raison :** Documenter les endpoints API selon les spécifications (request/response, validation, codes d'erreur)
   - **Tests ajoutés :** Non
   - **Breaking changes :** Non
   - **Dépendances modifiées :** Aucune

3. **Docs** - Création du schéma de base de données Prisma
   - **Fichiers créés :**
     - `.cursor/DATABASE_SCHEMA.md` - Schéma Prisma complet avec modèles User, Profile, Run
   - **Raison :** Documenter le schéma de base de données selon les spécifications
   - **Tests ajoutés :** Non
   - **Breaking changes :** Non
   - **Dépendances modifiées :** Aucune

4. **Docs** - Création du plan de développement par phases
   - **Fichiers créés :**
     - `.cursor/DEVELOPMENT_PHASES.md` - Détail des 4 phases de développement (Backend, Mobile Auth, Mobile Chrono, Mobile Dashboard)
   - **Raison :** Planifier l'ordre de développement recommandé avec tâches détaillées
   - **Tests ajoutés :** Non
   - **Breaking changes :** Non
   - **Dépendances modifiées :** Aucune

#### Points d'attention
- [x] ~~Le schéma Prisma doit être implémenté dans `prisma/schema.prisma` avant utilisation~~ (fait 2026-01-28)
- [ ] Les modules AuthModule, UsersModule, RunsModule sont à créer selon les spécifications
- [ ] Les écrans mobile (Auth, Timer, Dashboard) sont à développer selon les phases
- [ ] BackgroundTimer doit être installé et configuré pour le chrono en arrière-plan

#### Dépendances ajoutées/supprimées
- **Ajoutées :** Aucune (dépendances déjà présentes)
- **Supprimées :** Aucune
- **Mises à jour :** Aucune

#### Documentation mise à jour
- [x] PROJECT_CONTEXT.md - Intégration complète des spécifications
- [x] API_DOCUMENTATION.md - Créé avec tous les endpoints détaillés
- [x] DATABASE_SCHEMA.md - Créé avec le schéma Prisma complet
- [x] DEVELOPMENT_PHASES.md - Créé avec le plan de développement détaillé

---

### 2026-01-28 - Session 3 - Schéma Prisma et migration initiale (Étape 1.2)
**Développeur/Agent :** Cursor Agent
**Objectif :** Définir le schéma Prisma selon `.cursor/rules` et `.cursor/DATABASE_SCHEMA.md`, cocher les tâches 1 à 6 de l'étape 1.2

#### Modifications effectuées
1. **Backend - Schéma Prisma**
   - **Fichiers modifiés :** `prisma/schema.prisma`
   - Modèles `User`, `Profile`, `Run` ajoutés (relation 1:1 User–Profile, 1:N User–Run). Index sur `run.user_id` et `run.date`. Générateur `prisma-client-js` pour compatibilité avec `@prisma/client`.
   - **Tests ajoutés :** Non
   - **Breaking changes :** Non

2. **Backend - Migration initiale**
   - **Fichiers créés :** `prisma/migrations/migration_lock.toml`, `prisma/migrations/20260128223000_init/migration.sql`
   - Migration générée via `prisma migrate diff --from-empty --to-schema-datamodel`. À appliquer avec `npm run prisma:migrate` une fois `DATABASE_URL` configurée dans `.env`.

3. **Config - Environnement**
   - **Fichiers créés :** `.env.example`, `.env` (placeholder)
   - **Fichiers modifiés :** `prisma.config.ts` — ajout de `import "dotenv/config"` pour charger `DATABASE_URL` depuis `.env`.

4. **Docs**
   - **Fichiers modifiés :** `.cursor/DEVELOPMENT_PHASES.md` (étape 1.2 ✅, tâches 1–6 cochées), `.cursor/PROJECT_CONTEXT.md` (journal, roadmap, dette technique).

#### Dépendances ajoutées/supprimées
- **Ajoutées :** Aucune (dotenv déjà présent via @nestjs/config)
- **Supprimées :** Aucune

---

### 2026-01-28 - Session 4 - Alignement de la documentation avec l’état Prisma
**Développeur/Agent :** Cursor Agent
**Objectif :** Mettre à jour tous les fichiers selon PROJECT_CONTEXT pour refléter que le schéma Prisma est défini (User, Profile, Run) et la migration initiale créée.

#### Modifications effectuées
1. **Docs - PROJECT_CONTEXT.md**
   - **Décisions architecturales :** Prisma — "schéma vide actuellement" → "Schéma défini (User, Profile, Run) depuis 2026-01-28".
   - **Erreurs courantes :** "Schéma Prisma vide" → "Migration Prisma non appliquée" (préciser config `.env` et `npm run prisma:migrate`).
   - **Limitations connues :** "Schéma Prisma vide" / TODO → "Migration Prisma à appliquer" (schéma défini, migration à lancer).
   - **Limitations :** "Pas de gestion multi-environnements" — mention que `.env.example` existe.
2. **Docs - .cursor/rules** : Pièges — "Schéma Prisma vide" remplacé par "Migration Prisma non appliquée". Fichiers critiques — `prisma/schema.prisma` "vide actuellement" → "User, Profile, Run définis".
3. **Docs - ANALYSE_PROJET.md** : Références au schéma vide mises à jour pour refléter l’état actuel.

#### Dépendances ajoutées/supprimées
- **Ajoutées :** Aucune
- **Supprimées :** Aucune

---

## Dépendances critiques

### Services externes
| Service | Usage | Configuration | Documentation |
|---------|-------|---------------|---------------|
| PostgreSQL | Base de données relationnelle | Variable `DATABASE_URL` dans `.env` | https://www.postgresql.org/docs/ |
| JWT (via @nestjs/jwt) | Authentification par tokens | Variables `JWT_SECRET` et `JWT_EXPIRATION` dans `.env` | https://docs.nestjs.com/security/authentication |
| Android SDK | Build et développement Android | Variable `ANDROID_HOME` dans l'environnement | https://developer.android.com/studio |
| iOS SDK (macOS uniquement) | Build et développement iOS | Xcode installé, CocoaPods configuré | https://developer.apple.com/xcode/ |

### Dépendances clés
| Package | Version | Raison d'utilisation | Alternatives considérées |
|---------|---------|----------------------|--------------------------|
| @nestjs/core | 11.0.1 | Framework backend principal, injection de dépendances | Express seul, Fastify |
| @nestjs/common | 11.0.1 | Utilitaires et décorateurs NestJS | - |
| @prisma/client | 6.18.0 | Client type-safe pour accès à la base de données | TypeORM, Sequelize, Mongoose |
| prisma | 6.18.0 | ORM et migrations de base de données | TypeORM, Sequelize |
| react-native | 0.82.1 | Framework mobile multiplateforme | Flutter, Ionic, Xamarin |
| @tamagui/core | 1.135.7 | Bibliothèque UI performante | React Native Paper, NativeBase |
| @react-navigation/native | 7.1.19 | Navigation entre écrans | React Navigation (déjà utilisé) |
| axios | 1.13.1 | Client HTTP pour requêtes API | fetch natif, ky |
| react-native-encrypted-storage | 4.0.3 | Stockage sécurisé des tokens (KeyStore/Keychain) | AsyncStorage (moins sécurisé), react-native-keychain |
| @nestjs/jwt | 11.0.1 | Génération et validation de tokens JWT | jsonwebtoken directement |
| @nestjs/passport | 11.0.5 | Middleware d'authentification | Implémentation manuelle |
| passport-jwt | 4.0.1 | Stratégie JWT pour Passport | - |
| bcrypt | 6.0.0 | Hachage sécurisé des mots de passe | argon2, scrypt |
| class-validator | 0.14.2 | Validation des DTOs et entrées utilisateur | joi, zod |
| class-transformer | 0.5.1 | Transformation des objets (DTOs) | - |
| react-hook-form | 7.66.0 | Gestion des formulaires dans React Native | Formik |
| zod | 4.1.12 | Validation de schémas côté mobile | yup, joi |

## API Endpoints

### Auth (public)
- `POST /auth/signup` - Inscription (email, mot de passe)
- `POST /auth/login` - Connexion (email, mot de passe)
- `POST /auth/forgot-password` - Réinitialisation mot de passe

### Users (authentifié - JWT requis)
- `GET /users/me` - Profil utilisateur (nom, prénom ou pseudo, avatar)
- `PATCH /users/me` - Mise à jour profil (pseudo, avatar, mot de passe)

### Runs (authentifié - JWT requis)
- `GET /runs` - Liste des courses de l'utilisateur connecté (tri par date)
- `POST /runs` - Créer une nouvelle course (date, durée, pattern_json)

**État actuel :** Aucun endpoint métier n'est encore implémenté.

**Endpoints existants (exemples) :**
- `GET /` → Retourne "Hello World!" (controller de test dans `src/app.controller.ts`)

**Voir `.cursor/API_DOCUMENTATION.md` pour la documentation détaillée des endpoints.**

---

## ⚠️ Pièges connus et erreurs à éviter

### Erreurs courantes
- **Migration Prisma non appliquée** : Le schéma (User, Profile, Run) est défini et la migration initiale existe dans `prisma/migrations/20260128223000_init/`. Si `DATABASE_URL` n'est pas configurée dans `.env` ou si la base `monkey_run` n'existe pas, `npm run prisma:migrate` échouera. Configurer `.env` puis exécuter la migration.
- **Authentification non implémentée** : Les dépendances JWT et Passport sont installées mais le module `AuthModule` n'existe pas. Les guards JWT ne fonctionneront pas sans implémentation.
- **URL API hardcodée** : Dans `mobile/src/services/api.ts`, l'URL de l'API est hardcodée avec `process.env.API_BASE_URL || 'http://localhost:3000/api'`. Pour Android, utiliser `http://10.0.2.2:3000/api` au lieu de `localhost`.
- **Pas de gestion d'erreurs centralisée** : Aucun filtre d'exceptions global n'est configuré dans NestJS. Les erreurs ne sont pas standardisées.
- **Pas de validation des DTOs** : Aucun DTO avec `class-validator` n'est défini actuellement. Les entrées utilisateur ne sont pas validées.
- **Refresh token non géré** : Le service de stockage mobile gère les refresh tokens mais aucun mécanisme automatique de renouvellement n'est implémenté dans l'intercepteur Axios.
- **Pas de gestion CORS** : CORS n'est pas configuré explicitement dans `main.ts`, ce qui peut causer des problèmes de connexion mobile.

### Zones sensibles du code
- **`src/prisma/prisma.service.ts`** : Service global critique pour l'accès à la base de données. Toute modification peut impacter toute l'application.
- **`mobile/src/services/api.ts`** : Client HTTP centralisé avec intercepteurs. Modifications à faire avec précaution pour éviter de casser les requêtes.
- **`mobile/src/services/storage.ts`** : Gestion du stockage sécurisé. Ne pas modifier les clés de stockage sans migration des données existantes.
- **`prisma/schema.prisma`** : Schéma de base de données. Toute modification nécessite une migration. Ne jamais modifier les migrations déjà appliquées.
- **`src/main.ts`** : Point d'entrée de l'application. Configuration CORS, validation pipes, etc. à ajouter ici.
- **`.env`** : Variables d'environnement critiques. Ne jamais commiter ce fichier.

### Limitations connues
- **Migration Prisma à appliquer** : Les modèles User, Profile, Run sont définis dans `prisma/schema.prisma`. Appliquer la migration avec `npm run prisma:migrate` une fois `DATABASE_URL` configurée et la base `monkey_run` créée.
- **Module AuthModule manquant** : À créer avec signup, login, forgot-password selon les spécifications.
- **Module UsersModule manquant** : À créer avec GET/PATCH /users/me pour la gestion du profil.
- **Module RunsModule manquant** : À créer avec GET/POST /runs pour la gestion des courses.
- **Pas de tests pour les services** : Seuls les fichiers de base (controller, service) ont des tests. TODO : Ajouter des tests pour PrismaService, api.ts, storage.ts.
- **Pas de documentation API** : Swagger/OpenAPI non configuré. TODO : Installer `@nestjs/swagger` et documenter les endpoints.
- **Pas de CI/CD** : Aucun pipeline automatisé. TODO : Configurer GitHub Actions ou GitLab CI.
- **Pas de logging structuré** : Logs basiques uniquement. TODO : Intégrer Winston ou Pino.
- **Pas de gestion multi-environnements** : Pas de configuration spécifique dev/staging/prod. `.env.example` existe ; à étendre pour staging/prod si besoin.
- **Chrono non implémenté** : Le chronomètre avec notifications voix/vibration n'est pas encore développé.
- **Dashboard mobile non implémenté** : L'historique des courses et les statistiques ne sont pas encore développés.
- **Refresh token non géré** : Aucun mécanisme automatique de renouvellement des tokens JWT.
- **S3 pour avatars** : Non configuré, à implémenter plus tard selon les spécifications.

---

## 🤖 Règles pour l'agent Cursor

### AVANT toute modification
- [ ] Lire ce fichier PROJECT_CONTEXT.md en entier
- [ ] Vérifier les décisions architecturales existantes
- [ ] Consulter les pièges connus
- [ ] Vérifier s'il existe des tests pour la zone modifiée
- [ ] Vérifier que le schéma Prisma est défini avant d'utiliser Prisma Client
- [ ] Vérifier que les variables d'environnement requises sont documentées

### PENDANT la modification
- [ ] Respecter les conventions de code établies ci-dessus
- [ ] Ne PAS modifier les fichiers de configuration critique sans validation
- [ ] Suivre les patterns architecturaux identifiés
- [ ] Ajouter des tests pour toute nouvelle fonctionnalité
- [ ] Commenter le code complexe
- [ ] Utiliser TypeScript strict (éviter `any` sans justification)
- [ ] Valider les entrées utilisateur avec `class-validator` (backend) ou `zod` (mobile)
- [ ] Gérer les erreurs de manière appropriée

### APRÈS chaque modification
- [ ] Mettre à jour ce fichier PROJECT_CONTEXT.md dans la section "Journal des modifications"
- [ ] Documenter toute nouvelle dépendance dans "Dépendances critiques"
- [ ] Noter toute dette technique créée dans "Roadmap et Dette Technique"
- [ ] Vérifier que tous les tests passent (`npm run test` backend, `npm run test` mobile)
- [ ] Vérifier le linting (`npm run lint`)
- [ ] Mettre à jour la date "Dernière mise à jour" en haut du fichier
- [ ] Mettre à jour la version du projet si nécessaire

### Conventions spécifiques au projet
- **Backend :** Utiliser les décorateurs NestJS (@Controller, @Injectable, @UseGuards, @Get, @Post, @Patch)
- **Backend :** Toujours valider les DTOs avec class-validator (décorateurs @IsEmail, @IsString, @MinLength, etc.)
- **Backend :** Utiliser Prisma pour toutes les requêtes BDD (pas de SQL brut)
- **Mobile :** Utiliser les composants Tamagui (pas de React Native natifs sauf nécessité)
- **Mobile :** Formulaires avec react-hook-form + zod pour la validation
- **Mobile :** Tout stockage sensible via react-native-encrypted-storage (jamais AsyncStorage pour les tokens)
- **API :** Toutes les routes protégées sauf /auth/* nécessitent JWT (utiliser @UseGuards(JwtAuthGuard))
- **Nommage :** 
  - Backend : PascalCase pour classes, camelCase pour méthodes/variables
  - Mobile : PascalCase pour composants, camelCase pour hooks/fonctions
  - BDD : snake_case pour tables et colonnes

### Interdictions absolues
- ❌ Ne JAMAIS supprimer des tests existants sans justification documentée
- ❌ Ne JAMAIS modifier les migrations de base de données déjà appliquées
- ❌ Ne JAMAIS ignorer les erreurs TypeScript/de compilation/linting
- ❌ Ne JAMAIS commiter des secrets, clés API, ou données sensibles (`.env` est dans `.gitignore`)
- ❌ Ne JAMAIS modifier les fichiers de configuration de sécurité sans validation humaine
- ❌ Ne JAMAIS utiliser `any` en TypeScript sans justification documentée
- ❌ Ne JAMAIS désactiver les règles de linting sans justification
- ❌ Ne JAMAIS modifier le schéma Prisma sans créer de migration correspondante
- ❌ Ne JAMAIS modifier les clés de stockage dans `storage.ts` sans migration des données
- ❌ Ne JAMAIS hardcoder des URLs d'API dans le code mobile (utiliser des variables d'environnement)
- ❌ Ne JAMAIS stocker le JWT en clair (toujours encrypted-storage)
- ❌ Ne JAMAIS envoyer le password_hash au frontend
- ❌ Ne JAMAIS valider les données uniquement côté client (toujours valider côté backend)
- ❌ Ne JAMAIS exposer les endpoints backend sans authentification (sauf /auth/*)
- ❌ Ne JAMAIS utiliser des composants React Native natifs si Tamagui a l'équivalent

### Validation humaine requise pour
- Changements dans la configuration de sécurité ou authentification
- Modifications du schéma de base de données (migrations)
- Ajout de dépendances majeures (frameworks, libraries core)
- Refactoring de modules critiques identifiés ci-dessus (`PrismaService`, `api.ts`, `storage.ts`)
- Changements dans les workflows CI/CD (quand ils seront créés)
- Modifications des variables d'environnement requises
- Modifications des fichiers de configuration Android/iOS natifs
- Changements dans la structure des modules NestJS principaux

---

## 🚀 Démarrage rapide pour nouveau développeur

### Prérequis
- **Node.js** >= 18.x (20.x recommandé)
- **npm** ou **yarn** (fourni avec Node.js)
- **PostgreSQL** >= 14.x
- **Git** installé et configuré
- **Pour Android** : Java JDK 17, Android Studio avec Android SDK (API 33+), variable `ANDROID_HOME` configurée
- **Pour iOS (macOS uniquement)** : Xcode >= 14.x, CocoaPods (`sudo gem install cocoapods`)

### Installation (étapes exactes)
```bash
# 1. Cloner le repository
git clone <votre-repo-url>
cd Monkey-run

# 2. Installer les dépendances backend
npm install

# 3. Installer les dépendances mobile
cd mobile
npm install

# 4. Pour iOS uniquement (macOS)
cd ios
pod install
cd ../..
```

### Configuration de l'environnement
```bash
# 1. Créer le fichier .env à la racine du projet
# (Copier depuis .env.example si disponible, sinon créer manuellement)

# 2. Configurer les variables dans .env :
# DATABASE_URL="postgresql://username:password@localhost:5432/monkey_run?schema=public"
# JWT_SECRET="votre-secret-jwt-super-securise-changez-moi"
# JWT_EXPIRATION="7d"
# PORT=3000
# NODE_ENV="development"

# 3. Créer la base de données PostgreSQL
psql -U postgres
CREATE DATABASE monkey_run;
\q

# 4. Configurer l'URL de l'API dans mobile/src/services/api.ts
# Pour Android Emulator : http://10.0.2.2:3000/api
# Pour iOS Simulator : http://localhost:3000/api
# Pour appareil physique : http://VOTRE_IP_LOCALE:3000/api
```

### Commandes essentielles

**Backend (à la racine) :**
- `npm run start:dev` - Démarre le serveur en mode développement avec watch
- `npm run start:prod` - Démarre le serveur en mode production
- `npm run build` - Compile le TypeScript en JavaScript
- `npm run test` - Lance les tests unitaires
- `npm run test:watch` - Lance les tests en mode watch
- `npm run test:e2e` - Lance les tests end-to-end
- `npm run lint` - Vérifie et corrige le code avec ESLint
- `npm run format` - Formate le code avec Prettier
- `npm run prisma:generate` - Génère le client Prisma
- `npm run prisma:migrate` - Crée et applique les migrations
- `npm run prisma:studio` - Ouvre Prisma Studio (interface graphique)

**Mobile (dans mobile/) :**
- `npm run android` - Lance l'application sur Android
- `npm run ios` - Lance l'application sur iOS (macOS uniquement)
- `npm start` - Démarre Metro Bundler
- `npm run lint` - Vérifie le code avec ESLint
- `npm run test` - Lance les tests Jest

### Lancer le projet
```bash
# Terminal 1 : Backend
npm run start:dev

# Terminal 2 : Mobile (dans mobile/)
npm start

# Terminal 3 : Mobile - Lancer l'app (dans mobile/)
npm run android  # ou npm run ios
```

### Vérifier que tout fonctionne
```bash
# Backend
curl http://localhost:3000
# Devrait retourner "Hello World!"

# Tests backend
npm run test

# Tests mobile
cd mobile
npm run test

# Vérifier la connexion PostgreSQL
psql -U postgres -d monkey_run -c "SELECT version();"
```

---

## Roadmap et Dette Technique

### Schéma de base de données

**Table `user` :**
- `id` (PK, UUID ou Serial)
- `email` (unique, string)
- `password_hash` (string)
- `created_at` (timestamp)

**Table `profile` :**
- `user_id` (FK → user.id, unique)
- `pseudo` (string, nullable)
- `avatar_url` (string, nullable)
- `first_name` (string, nullable)
- `last_name` (string, nullable)

**Table `run` :**
- `id` (PK, UUID ou Serial)
- `user_id` (FK → user.id)
- `date` (timestamp)
- `duration_seconds` (integer)
- `pattern_json` (JSON, configuration fractionné ex: `{ "fast": 60, "slow": 60 }`)
- `created_at` (timestamp)

**État actuel :** Le schéma Prisma est défini dans `prisma/schema.prisma` (User, Profile, Run) et la migration initiale est dans `prisma/migrations/20260128223000_init/`. Voir `.cursor/DATABASE_SCHEMA.md` pour la référence.

### Prochaines étapes planifiées

**Phase 1 - Backend (En cours)**
1. ✅ Setup NestJS + PostgreSQL + Prisma (PrismaModule configuré)
2. ✅ Définir le schéma Prisma (modèles User, Profile, Run)
3. ❌ AuthModule (signup, login, forgot-password)
4. ❌ UsersModule (profil utilisateur GET/PATCH /users/me)
5. ❌ RunsModule (CRUD courses GET/POST /runs)

**Phase 2 - Mobile (Auth)**
1. ❌ Setup React Native + Tamagui (partiellement fait)
2. ❌ Écrans d'authentification (signup, login, forgot-password)
3. ✅ Stockage sécurisé du token JWT (service storage.ts existant)
4. ❌ Appel GET /users/me pour vérifier l'auth

**Phase 3 - Mobile (Chrono)**
1. ❌ Écran chronomètre fonctionnel
2. ❌ Notifications voix/vibration
3. ❌ POST /runs à l'arrêt du chrono
4. ❌ BackgroundTimer pour chrono en arrière-plan

**Phase 4 - Mobile (Dashboard)**
1. ❌ GET /runs pour afficher l'historique
2. ❌ Tri et affichage des courses
3. ❌ Statistiques et infos perso

**Voir `.cursor/DEVELOPMENT_PHASES.md` pour le détail complet des phases.**

### Dette technique identifiée
| Issue | Impact | Effort estimé | Priorité | Fichier/Module |
|-------|--------|---------------|----------|----------------|
| ~~Schéma Prisma vide~~ | ~~Bloque toute utilisation de la base de données~~ | — | ✅ Résolu | `prisma/schema.prisma` |
| Module AuthModule manquant | Authentification non fonctionnelle | 4-8h | 🔴 Haute | `src/auth/` (à créer) |
| Module UsersModule manquant | Gestion profil utilisateur impossible | 3-5h | 🔴 Haute | `src/users/` (à créer) |
| Module RunsModule manquant | Gestion des courses impossible | 3-5h | 🔴 Haute | `src/runs/` (à créer) |
| Écrans mobile Auth non créés | Impossible de s'inscrire/se connecter | 6-10h | 🔴 Haute | `mobile/src/screens/auth/` (à créer) |
| Chrono non implémenté | Fonctionnalité principale manquante | 8-12h | 🔴 Haute | `mobile/src/screens/timer/` (à créer) |
| Dashboard mobile non implémenté | Impossible de consulter l'historique | 4-6h | 🟡 Moyenne | `mobile/src/screens/dashboard/` (à créer) |
| Pas de gestion d'erreurs centralisée | Erreurs non standardisées, difficile à déboguer | 2-3h | 🟡 Moyenne | `src/common/filters/` (à créer) |
| Pas de validation des DTOs | Entrées utilisateur non validées, risques sécurité | 3-5h | 🟡 Moyenne | Tous les controllers |
| URL API hardcodée dans mobile | Configuration non flexible pour différents environnements | 1h | 🟡 Moyenne | `mobile/src/services/api.ts` |
| Pas de refresh token automatique | Expiration des tokens non gérée automatiquement | 2-3h | 🟡 Moyenne | `mobile/src/services/api.ts` |
| Pas de CORS configuré | Problèmes de connexion mobile possibles | 30min | 🟡 Moyenne | `src/main.ts` |
| BackgroundTimer non configuré | Chrono ne fonctionne pas en arrière-plan | 2-3h | 🟡 Moyenne | `mobile/` (à installer et configurer) |
| Couverture de tests limitée | Risques de régression, maintenance difficile | 8-16h | 🟡 Moyenne | Tous les modules |
| Pas de CI/CD | Pas d'automatisation, risques de déploiement | 4-6h | 🟡 Moyenne | `.github/workflows/` (à créer) |
| Pas de logging structuré | Difficile de déboguer en production | 2-3h | 🟢 Basse | `src/common/logger/` (à créer) |
| Pas de documentation API | Difficile pour les développeurs frontend | 2-3h | 🟡 Moyenne | Swagger à configurer |
| S3 pour avatars non configuré | Upload d'avatars impossible | 3-4h | 🟢 Basse | Configuration AWS S3 |

### Points d'attention
- [ ] Implémenter le refresh token pour éviter les déconnexions fréquentes
- [ ] Gérer les permissions Android pour les notifications et vibrations
- [ ] Prévoir la gestion du chrono en arrière-plan (BackgroundTimer)
- [ ] Optimiser les appels API (cache, retry logic)
- [ ] Prévoir la sync offline (courses enregistrées hors connexion)
- [ ] Gérer les erreurs réseau de manière élégante côté mobile
- [ ] Implémenter la pagination pour l'historique des courses
- [ ] Optimiser les performances du chrono (éviter les re-renders inutiles)

### Refactoring souhaité
- **Centraliser la configuration** : Créer un module ConfigModule avec validation des variables d'environnement
- **Créer des DTOs réutilisables** : Éviter la duplication de code dans les controllers
- **Implémenter un système de logging structuré** : Remplacer les `console.log` par un logger professionnel
- **Créer des guards réutilisables** : Au-delà de JwtAuthGuard, créer des guards pour les rôles/permissions
- **Optimiser les requêtes Prisma** : Ajouter des index, optimiser les relations, éviter les N+1 queries
- **Créer des services de cache** : Implémenter Redis pour les requêtes fréquentes
- **Standardiser les réponses API** : Créer des interceptors pour formater toutes les réponses de manière cohérente
- **Créer des hooks React réutilisables** : Pour la gestion de l'auth, des appels API, etc.

---

# Template pour les futures modifications

Voir le fichier `.cursor/MODIFICATION_TEMPLATE.md` pour le template complet.
