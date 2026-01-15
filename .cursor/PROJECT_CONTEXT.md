# Contexte et Historique du Projet

**Dernière mise à jour :** 2026-01-15 21:15:02
**Version du projet :** 0.0.1
**Agent Cursor :** Composer
**Développeur actuel :** [À REMPLIR]

## État actuel du projet

Le projet Monkey-run est une application de gestion d'entraînements de course en fractionné en phase de développement initiale. L'architecture est solide avec un backend NestJS et une application mobile React Native, mais plusieurs fonctionnalités clés restent à implémenter : le schéma Prisma est vide, l'authentification n'est pas encore développée malgré les dépendances installées, et les endpoints API métier sont absents. La documentation README est excellente et facilite grandement la prise en main du projet.

---

## Architecture

### Stack Technique
- **Frontend Mobile :** React Native 0.82.1, TypeScript 5.8.3, Tamagui 1.135.7 (UI Library), React Navigation 7.1.19/7.6.2, Axios 1.13.1, React Hook Form 7.66.0, Zod 4.1.12, react-native-encrypted-storage 4.0.3
- **Backend :** NestJS 11.0.1, TypeScript 5.7.3, Node.js >= 18.x (20.x recommandé), Express (via @nestjs/platform-express)
- **Base de données :** PostgreSQL >= 14.x, Prisma ORM 6.18.0, Prisma Client (généré automatiquement)
- **Infrastructure :** Aucun CI/CD configuré actuellement, pas de Docker détecté, pas de cloud configuré
- **Autres :** npm (gestionnaire de paquets), Metro Bundler 0.82.1 (bundler React Native), Gradle (build Android), Xcode/CocoaPods (build iOS), Jest 30.0.0 (tests backend), Jest 29.6.3 (tests mobile), ESLint 9.18.0 (backend) / 8.19.0 (mobile), Prettier 3.4.2 (backend) / 2.8.8 (mobile)

### Décisions architecturales clés
| Date | Décision | Raison | Impact |
|------|----------|--------|--------|
| Initial | Architecture modulaire NestJS | Séparation claire des responsabilités, facilité de maintenance | Structure organisée en modules, controllers, services |
| Initial | Prisma comme ORM | Type-safety, migrations automatiques, génération de client | Accès type-safe à la base de données, mais schéma vide actuellement |
| Initial | React Native multiplateforme | Développement unique pour Android et iOS | Code partagé entre plateformes, nécessite configuration native |
| Initial | Stockage sécurisé avec react-native-encrypted-storage | Sécurité des tokens JWT et données sensibles | Utilisation du KeyStore Android/Keychain iOS natif |
| Initial | Tamagui pour l'UI | Performance et design system moderne | UI cohérente mais nécessite configuration |
| Initial | JWT + Passport pour l'authentification | Standard de l'industrie, stateless | Infrastructure prête mais non implémentée |

### Patterns utilisés
- **Singleton Pattern** : `PrismaService` (service global dans `src/prisma/prisma.service.ts`), `SecureStorageService` (instance unique dans `mobile/src/services/storage.ts`)
- **Repository Pattern** : Implémenté via Prisma Client (accès à la base de données)
- **Dependency Injection** : Utilisé par NestJS pour l'injection de dépendances dans tous les modules
- **Module Pattern** : Modules NestJS pour l'organisation du code (`AppModule`, `PrismaModule`)
- **Service Pattern** : Services pour la logique métier et l'accès aux données (`AppService`, `PrismaService`)
- **Interceptor Pattern** : Intercepteurs Axios dans `mobile/src/services/api.ts` pour ajout automatique des tokens JWT

### Conventions de code
- **Nommage :** 
  - Backend : fichiers en `kebab-case` (ex: `app.controller.ts`), classes en `PascalCase` (ex: `AppController`), variables en `camelCase` (ex: `appService`)
  - Mobile : fichiers en `kebab-case` ou `PascalCase` pour composants, composants en `PascalCase` (ex: `App.tsx`), services en `camelCase` (ex: `api.ts`)
- **Structure des fichiers :** 
  - Backend : Organisation modulaire NestJS (`src/module/module.controller.ts`, `module.service.ts`, `module.module.ts`)
  - Mobile : Services dans `src/services/`, composants à créer dans `src/components/`
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

### APIs internes
**État actuel :** Aucun endpoint métier n'est encore implémenté.

**Endpoints existants (exemples) :**
- `GET /` → Retourne "Hello World!" (controller de test dans `src/app.controller.ts`)

**Endpoints à implémenter (selon contexte métier) :**
- `POST /auth/login` → Authentification utilisateur
- `POST /auth/register` → Inscription utilisateur
- `GET /auth/me` → Récupération du profil utilisateur
- `GET /api/trainings` → Liste des entraînements
- `POST /api/trainings` → Création d'un entraînement
- `GET /api/trainings/:id` → Détails d'un entraînement
- `PUT /api/trainings/:id` → Modification d'un entraînement
- `DELETE /api/trainings/:id` → Suppression d'un entraînement
- `GET /api/users/:id` → Profil utilisateur
- `PUT /api/users/:id` → Modification du profil

---

## ⚠️ Pièges connus et erreurs à éviter

### Erreurs courantes
- **Schéma Prisma vide** : Le fichier `prisma/schema.prisma` ne contient aucun modèle. Toute tentative d'utiliser Prisma Client échouera jusqu'à ce que le schéma soit défini et les migrations appliquées.
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
- **Schéma Prisma vide** : Aucun modèle de données défini. TODO : Créer les modèles User, Training, TrainingSession, etc.
- **Module AuthModule manquant** : Mentionné dans le README comme "à créer". TODO : Implémenter l'authentification complète.
- **Pas de tests pour les services** : Seuls les fichiers de base (controller, service) ont des tests. TODO : Ajouter des tests pour PrismaService, api.ts, storage.ts.
- **Pas de documentation API** : Swagger/OpenAPI non configuré. TODO : Installer `@nestjs/swagger` et documenter les endpoints.
- **Pas de CI/CD** : Aucun pipeline automatisé. TODO : Configurer GitHub Actions ou GitLab CI.
- **Pas de logging structuré** : Logs basiques uniquement. TODO : Intégrer Winston ou Pino.
- **Pas de gestion multi-environnements** : Pas de configuration spécifique dev/staging/prod. TODO : Créer `.env.example` et configurer les environnements.

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

### Prochaines étapes planifiées

**Priorité Haute 🔴 :**
1. **Définir le schéma Prisma** - Créer les modèles User, Training, TrainingSession, Workout
2. **Implémenter l'authentification complète** - Créer AuthModule avec endpoints login/register
3. **Créer les endpoints API métier** - CRUD pour les entraînements et utilisateurs
4. **Ajouter la documentation API** - Installer et configurer Swagger/OpenAPI

**Priorité Moyenne 🟡 :**
5. **Mettre en place CI/CD** - GitHub Actions pour tests et build automatiques
6. **Améliorer la gestion d'erreurs** - Créer un filtre d'exceptions global
7. **Augmenter la couverture de tests** - Tests pour tous les services et endpoints
8. **Configuration multi-environnements** - Créer `.env.example` et configurer dev/staging/prod

**Priorité Basse 🟢 :**
9. **Optimisations de performance** - Cache Redis, pagination, optimisation Prisma
10. **Améliorer le mobile** - Navigation complète, écrans principaux, gestion offline
11. **Monitoring et observabilité** - Intégration Sentry, métriques, logs structurés
12. **Documentation supplémentaire** - Guide de contribution, ADR, guide de déploiement

### Dette technique identifiée
| Issue | Impact | Effort estimé | Priorité | Fichier/Module |
|-------|--------|---------------|----------|----------------|
| Schéma Prisma vide | Bloque toute utilisation de la base de données | 2-4h | 🔴 Haute | `prisma/schema.prisma` |
| Module AuthModule manquant | Authentification non fonctionnelle | 4-8h | 🔴 Haute | `src/auth/` (à créer) |
| Pas de gestion d'erreurs centralisée | Erreurs non standardisées, difficile à déboguer | 2-3h | 🟡 Moyenne | `src/common/filters/` (à créer) |
| Pas de validation des DTOs | Entrées utilisateur non validées, risques sécurité | 3-5h | 🟡 Moyenne | Tous les controllers |
| URL API hardcodée dans mobile | Configuration non flexible pour différents environnements | 1h | 🟡 Moyenne | `mobile/src/services/api.ts` |
| Pas de refresh token automatique | Expiration des tokens non gérée automatiquement | 2-3h | 🟡 Moyenne | `mobile/src/services/api.ts` |
| Pas de CORS configuré | Problèmes de connexion mobile possibles | 30min | 🟡 Moyenne | `src/main.ts` |
| Couverture de tests limitée | Risques de régression, maintenance difficile | 8-16h | 🟡 Moyenne | Tous les modules |
| Pas de CI/CD | Pas d'automatisation, risques de déploiement | 4-6h | 🟡 Moyenne | `.github/workflows/` (à créer) |
| Pas de logging structuré | Difficile de déboguer en production | 2-3h | 🟢 Basse | `src/common/logger/` (à créer) |
| Pas de documentation API | Difficile pour les développeurs frontend | 2-3h | 🟡 Moyenne | Swagger à configurer |

### Refactoring souhaité
- **Centraliser la configuration** : Créer un module ConfigModule avec validation des variables d'environnement
- **Créer des DTOs réutilisables** : Éviter la duplication de code dans les controllers
- **Implémenter un système de logging structuré** : Remplacer les `console.log` par un logger professionnel
- **Créer des guards réutilisables** : Au-delà de JwtAuthGuard, créer des guards pour les rôles/permissions
- **Optimiser les requêtes Prisma** : Ajouter des index, optimiser les relations, éviter les N+1 queries
- **Créer des services de cache** : Implémenter Redis pour les requêtes fréquentes
- **Standardiser les réponses API** : Créer des interceptors pour formater toutes les réponses de manière cohérente

---

# Template pour les futures modifications

Voir le fichier `.cursor/MODIFICATION_TEMPLATE.md` pour le template complet.
