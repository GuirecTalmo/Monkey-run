# Phases de Développement - Monkey-run

**Dernière mise à jour :** 2026-01-15 21:44:09

Ce document décrit les 4 phases de développement recommandées pour l'application Monkey-run, dans l'ordre d'implémentation.

---

## Vue d'ensemble

| Phase | Objectif | Durée estimée | Statut |
|-------|----------|---------------|--------|
| **Phase 1** | Backend - Setup et modules de base | 2-3 semaines | 🔴 En cours |
| **Phase 2** | Mobile - Authentification | 1-2 semaines | ⚪ À faire |
| **Phase 3** | Mobile - Chrono fonctionnel | 1-2 semaines | ⚪ À faire |
| **Phase 4** | Mobile - Dashboard | 1 semaine | ⚪ À faire |

---

## Phase 1 - Backend (Setup NestJS + PostgreSQL + Prisma)

**Objectif :** Mettre en place l'infrastructure backend et implémenter tous les modules nécessaires.

**Durée estimée :** 2-3 semaines

### ✅ Étape 1.1 : Setup NestJS + PostgreSQL + Prisma (FAIT)

- [x] NestJS installé et configuré
- [x] PrismaModule créé et configuré
- [x] PostgreSQL configuré
- [x] Variables d'environnement documentées

**Fichiers concernés :**
- `src/prisma/prisma.module.ts`
- `src/prisma/prisma.service.ts`
- `prisma/schema.prisma`
- `.env`

---

### ❌ Étape 1.2 : Définir le schéma Prisma

**Objectif :** Créer les modèles de données selon les spécifications.

**Tâches :**
1. Créer le modèle `User` dans `prisma/schema.prisma`
2. Créer le modèle `Profile` (relation 1:1 avec User)
3. Créer le modèle `Run` (relation 1:N avec User)
4. Ajouter les index nécessaires (user_id, date)
5. Créer la migration initiale : `npm run prisma:migrate`
6. Vérifier avec Prisma Studio : `npm run prisma:studio`

**Fichiers à créer/modifier :**
- `prisma/schema.prisma` (modifier)
- `prisma/migrations/` (créé automatiquement)

**Critères de validation :**
- [ ] Les 3 modèles sont définis correctement
- [ ] La migration s'applique sans erreur
- [ ] Les tables sont créées dans PostgreSQL
- [ ] Le client Prisma est régénéré

**Durée estimée :** 2-4 heures

---

### ❌ Étape 1.3 : AuthModule (signup, login, forgot-password)

**Objectif :** Implémenter l'authentification complète avec JWT.

**Tâches :**

1. **Créer le module Auth**
   - Créer `src/auth/auth.module.ts`
   - Configurer JwtModule avec secret et expiration
   - Configurer PassportModule avec JWT strategy

2. **Créer les DTOs**
   - `src/auth/dto/signup.dto.ts` (email, password)
   - `src/auth/dto/login.dto.ts` (email, password)
   - `src/auth/dto/forgot-password.dto.ts` (email)

3. **Créer le service AuthService**
   - `src/auth/auth.service.ts`
   - Méthode `signup()` : créer utilisateur, hasher mot de passe, créer profil vide
   - Méthode `login()` : valider credentials, générer JWT
   - Méthode `forgotPassword()` : générer token de reset, envoyer email (stub pour l'instant)

4. **Créer le controller AuthController**
   - `src/auth/auth.controller.ts`
   - `POST /auth/signup`
   - `POST /auth/login`
   - `POST /auth/forgot-password`

5. **Créer la stratégie JWT**
   - `src/auth/strategies/jwt.strategy.ts`
   - Extraire le token du header Authorization
   - Valider le token et retourner le payload

6. **Créer le guard JWT**
   - `src/auth/guards/jwt-auth.guard.ts`
   - Protéger les routes nécessitant authentification

7. **Configurer CORS dans main.ts**
   - Autoriser les requêtes depuis le mobile
   - Configurer les headers autorisés

8. **Tests**
   - Tests unitaires pour AuthService
   - Tests E2E pour les endpoints /auth/*

**Fichiers à créer :**
- `src/auth/auth.module.ts`
- `src/auth/auth.service.ts`
- `src/auth/auth.controller.ts`
- `src/auth/dto/signup.dto.ts`
- `src/auth/dto/login.dto.ts`
- `src/auth/dto/forgot-password.dto.ts`
- `src/auth/strategies/jwt.strategy.ts`
- `src/auth/guards/jwt-auth.guard.ts`
- `src/auth/auth.service.spec.ts`
- `test/auth.e2e-spec.ts`

**Fichiers à modifier :**
- `src/app.module.ts` (importer AuthModule)
- `src/main.ts` (configurer CORS, ValidationPipe)

**Critères de validation :**
- [ ] Inscription fonctionne (création user + profile)
- [ ] Connexion fonctionne (retourne JWT)
- [ ] Mot de passe oublié fonctionne (stub)
- [ ] Les mots de passe sont hashés avec bcrypt
- [ ] Les tokens JWT sont valides
- [ ] Les tests passent

**Durée estimée :** 4-8 heures

---

### ❌ Étape 1.4 : UsersModule (profil utilisateur)

**Objectif :** Gérer le profil utilisateur (GET/PATCH /users/me).

**Tâches :**

1. **Créer le module Users**
   - `src/users/users.module.ts`
   - Importer AuthModule pour utiliser JwtAuthGuard

2. **Créer les DTOs**
   - `src/users/dto/update-profile.dto.ts` (pseudo, first_name, last_name, avatar_url)
   - `src/users/dto/change-password.dto.ts` (current_password, new_password)

3. **Créer le service UsersService**
   - `src/users/users.service.ts`
   - Méthode `getProfile()` : récupérer user + profile
   - Méthode `updateProfile()` : mettre à jour le profil
   - Méthode `changePassword()` : changer le mot de passe

4. **Créer le controller UsersController**
   - `src/users/users.controller.ts`
   - `GET /users/me` (protégé par JwtAuthGuard)
   - `PATCH /users/me` (protégé par JwtAuthGuard)
   - `PATCH /users/me/password` (protégé par JwtAuthGuard)

5. **Créer un decorator pour récupérer l'utilisateur**
   - `src/users/decorators/current-user.decorator.ts`
   - Extraire l'utilisateur depuis le token JWT

6. **Tests**
   - Tests unitaires pour UsersService
   - Tests E2E pour les endpoints /users/*

**Fichiers à créer :**
- `src/users/users.module.ts`
- `src/users/users.service.ts`
- `src/users/users.controller.ts`
- `src/users/dto/update-profile.dto.ts`
- `src/users/dto/change-password.dto.ts`
- `src/users/decorators/current-user.decorator.ts`
- `src/users/users.service.spec.ts`
- `test/users.e2e-spec.ts`

**Fichiers à modifier :**
- `src/app.module.ts` (importer UsersModule)

**Critères de validation :**
- [ ] GET /users/me retourne le profil complet
- [ ] PATCH /users/me met à jour le profil
- [ ] PATCH /users/me/password change le mot de passe
- [ ] Les routes sont protégées par JWT
- [ ] Les tests passent

**Durée estimée :** 3-5 heures

---

### ❌ Étape 1.5 : RunsModule (CRUD courses)

**Objectif :** Gérer les courses (GET/POST /runs).

**Tâches :**

1. **Créer le module Runs**
   - `src/runs/runs.module.ts`
   - Importer AuthModule pour utiliser JwtAuthGuard

2. **Créer les DTOs**
   - `src/runs/dto/create-run.dto.ts` (date, duration_seconds, pattern_json)
   - `src/runs/dto/query-runs.dto.ts` (limit, offset, order)

3. **Créer le service RunsService**
   - `src/runs/runs.service.ts`
   - Méthode `create()` : créer une course pour l'utilisateur
   - Méthode `findAll()` : récupérer les courses de l'utilisateur (avec pagination)

4. **Créer le controller RunsController**
   - `src/runs/runs.controller.ts`
   - `GET /runs` (protégé par JwtAuthGuard, avec query params)
   - `POST /runs` (protégé par JwtAuthGuard)

5. **Tests**
   - Tests unitaires pour RunsService
   - Tests E2E pour les endpoints /runs/*

**Fichiers à créer :**
- `src/runs/runs.module.ts`
- `src/runs/runs.service.ts`
- `src/runs/runs.controller.ts`
- `src/runs/dto/create-run.dto.ts`
- `src/runs/dto/query-runs.dto.ts`
- `src/runs/runs.service.spec.ts`
- `test/runs.e2e-spec.ts`

**Fichiers à modifier :**
- `src/app.module.ts` (importer RunsModule)

**Critères de validation :**
- [ ] GET /runs retourne les courses de l'utilisateur (triées par date)
- [ ] POST /runs crée une nouvelle course
- [ ] La pagination fonctionne (limit, offset)
- [ ] Les routes sont protégées par JWT
- [ ] Les tests passent

**Durée estimée :** 3-5 heures

---

### ✅ Checklist Phase 1

- [x] Setup NestJS + PostgreSQL + Prisma
- [ ] Schéma Prisma défini (User, Profile, Run)
- [ ] AuthModule implémenté (signup, login, forgot-password)
- [ ] UsersModule implémenté (GET/PATCH /users/me)
- [ ] RunsModule implémenté (GET/POST /runs)
- [ ] CORS configuré
- [ ] Validation des DTOs avec class-validator
- [ ] Tests unitaires et E2E écrits
- [ ] Documentation API (Swagger) configurée

---

## Phase 2 - Mobile (Auth)

**Objectif :** Implémenter l'authentification côté mobile (inscription, connexion, mot de passe oublié).

**Durée estimée :** 1-2 semaines

### ❌ Étape 2.1 : Setup React Native + Tamagui

**Tâches :**
1. Vérifier que React Native est configuré
2. Configurer Tamagui (déjà fait dans `tamagui.config.ts`)
3. Configurer React Navigation
4. Créer la structure de navigation de base

**Fichiers à créer/modifier :**
- `mobile/src/navigation/AppNavigator.tsx`
- `mobile/src/navigation/types.ts`

**Durée estimée :** 2-3 heures

---

### ❌ Étape 2.2 : Écrans d'authentification

**Tâches :**

1. **Écran Signup**
   - `mobile/src/screens/auth/SignupScreen.tsx`
   - Formulaire avec react-hook-form + zod
   - Champs : email, password, confirm password
   - Appel API : POST /auth/signup
   - Stockage du token JWT dans encrypted-storage
   - Navigation vers Dashboard après inscription

2. **Écran Login**
   - `mobile/src/screens/auth/LoginScreen.tsx`
   - Formulaire avec react-hook-form + zod
   - Champs : email, password
   - Appel API : POST /auth/login
   - Stockage du token JWT dans encrypted-storage
   - Navigation vers Dashboard après connexion

3. **Écran Forgot Password**
   - `mobile/src/screens/auth/ForgotPasswordScreen.tsx`
   - Formulaire avec email
   - Appel API : POST /auth/forgot-password
   - Message de confirmation

4. **Composants réutilisables**
   - `mobile/src/components/auth/FormInput.tsx` (input avec validation)
   - `mobile/src/components/auth/FormButton.tsx` (bouton de formulaire)

**Fichiers à créer :**
- `mobile/src/screens/auth/SignupScreen.tsx`
- `mobile/src/screens/auth/LoginScreen.tsx`
- `mobile/src/screens/auth/ForgotPasswordScreen.tsx`
- `mobile/src/components/auth/FormInput.tsx`
- `mobile/src/components/auth/FormButton.tsx`

**Fichiers à modifier :**
- `mobile/src/navigation/AppNavigator.tsx` (ajouter les routes auth)
- `mobile/src/services/api.ts` (vérifier que l'intercepteur JWT fonctionne)

**Critères de validation :**
- [ ] Inscription fonctionne et stocke le token
- [ ] Connexion fonctionne et stocke le token
- [ ] Mot de passe oublié fonctionne
- [ ] Navigation vers Dashboard après auth réussie
- [ ] Gestion des erreurs (affichage des messages d'erreur)

**Durée estimée :** 6-10 heures

---

### ❌ Étape 2.3 : Vérification de l'authentification

**Tâches :**

1. **Hook useAuth**
   - `mobile/src/hooks/useAuth.ts`
   - Vérifier si un token existe dans encrypted-storage
   - Appel API : GET /users/me pour valider le token
   - Gérer l'état de connexion (isAuthenticated, user, loading)

2. **Protection des routes**
   - Créer un composant `ProtectedRoute` ou utiliser React Navigation guards
   - Rediriger vers Login si non authentifié

3. **Écran de chargement**
   - Afficher un loader pendant la vérification du token

**Fichiers à créer :**
- `mobile/src/hooks/useAuth.ts`
- `mobile/src/components/auth/ProtectedRoute.tsx`

**Fichiers à modifier :**
- `mobile/src/navigation/AppNavigator.tsx` (ajouter la protection des routes)

**Critères de validation :**
- [ ] Le token est vérifié au démarrage de l'app
- [ ] Redirection automatique vers Login si token invalide
- [ ] Redirection automatique vers Dashboard si token valide

**Durée estimée :** 2-3 heures

---

### ✅ Checklist Phase 2

- [ ] React Navigation configuré
- [ ] Écran Signup implémenté
- [ ] Écran Login implémenté
- [ ] Écran Forgot Password implémenté
- [ ] Hook useAuth créé
- [ ] Protection des routes configurée
- [ ] Token JWT stocké dans encrypted-storage
- [ ] Appel GET /users/me pour vérifier l'auth

---

## Phase 3 - Mobile (Chrono)

**Objectif :** Implémenter le chronomètre fonctionnel avec notifications voix/vibration.

**Durée estimée :** 1-2 semaines

### ❌ Étape 3.1 : Écran chronomètre de base

**Tâches :**

1. **Écran Timer**
   - `mobile/src/screens/timer/TimerScreen.tsx`
   - Affichage du chronomètre (format MM:SS)
   - Boutons : Démarrer, Pause, Arrêter
   - Gestion de l'état du timer (running, paused, stopped)

2. **Hook useTimer**
   - `mobile/src/hooks/useTimer.ts`
   - Logique du chronomètre (start, pause, stop, reset)
   - Calcul du temps écoulé

**Fichiers à créer :**
- `mobile/src/screens/timer/TimerScreen.tsx`
- `mobile/src/hooks/useTimer.ts`

**Durée estimée :** 3-4 heures

---

### ❌ Étape 3.2 : Notifications voix/vibration

**Tâches :**

1. **Configuration des notifications**
   - Installer `@react-native-community/push-notification-ios` (iOS)
   - Installer `react-native-vibration` (Android/iOS)
   - Installer `@react-native-tts/react-native-tts` (Text-to-Speech)

2. **Service de notifications**
   - `mobile/src/services/notifications.ts`
   - Méthode `playVoice()` : lire un message vocal
   - Méthode `vibrate()` : faire vibrer l'appareil
   - Méthode `notify()` : combiner voix + vibration

3. **Intégration dans le Timer**
   - Notifications à chaque changement de phase (rapide → récupération)
   - Paramètres : activer/désactiver voix et/ou vibration

**Fichiers à créer :**
- `mobile/src/services/notifications.ts`
- `mobile/src/components/timer/NotificationSettings.tsx`

**Fichiers à modifier :**
- `mobile/src/screens/timer/TimerScreen.tsx` (intégrer les notifications)
- `mobile/src/hooks/useTimer.ts` (gérer les phases rapide/lente)

**Critères de validation :**
- [ ] Les notifications voix fonctionnent
- [ ] Les vibrations fonctionnent
- [ ] Les paramètres permettent d'activer/désactiver chaque type
- [ ] Les notifications se déclenchent aux bons moments

**Durée estimée :** 4-6 heures

---

### ❌ Étape 3.3 : Enregistrement de la course

**Tâches :**

1. **Écran de confirmation**
   - Après l'arrêt du chrono, afficher un écran de confirmation
   - Afficher la durée totale et le pattern utilisé
   - Bouton "Enregistrer" et "Annuler"

2. **Appel API POST /runs**
   - Envoyer la course au backend à l'arrêt
   - Gérer les erreurs réseau (retry, message d'erreur)
   - Navigation vers Dashboard après enregistrement

3. **Gestion offline (optionnel)**
   - Stocker les courses en attente si pas de connexion
   - Synchroniser quand la connexion revient

**Fichiers à créer :**
- `mobile/src/screens/timer/ConfirmRunScreen.tsx`

**Fichiers à modifier :**
- `mobile/src/screens/timer/TimerScreen.tsx` (navigation vers confirmation)
- `mobile/src/services/api.ts` (gérer les erreurs réseau)

**Critères de validation :**
- [ ] La course est enregistrée au backend
- [ ] Gestion des erreurs réseau
- [ ] Navigation vers Dashboard après enregistrement

**Durée estimée :** 3-4 heures

---

### ❌ Étape 3.4 : BackgroundTimer (chrono en arrière-plan)

**Tâches :**

1. **Installer react-native-background-timer**
   ```bash
   npm install react-native-background-timer
   ```

2. **Modifier useTimer**
   - Utiliser BackgroundTimer au lieu de setInterval
   - Gérer les permissions Android (si nécessaire)

3. **Tester**
   - Vérifier que le chrono continue en arrière-plan
   - Vérifier que les notifications fonctionnent en arrière-plan

**Fichiers à modifier :**
- `mobile/src/hooks/useTimer.ts`
- `mobile/android/app/src/main/AndroidManifest.xml` (permissions si nécessaire)

**Critères de validation :**
- [ ] Le chrono continue en arrière-plan
- [ ] Les notifications fonctionnent en arrière-plan

**Durée estimée :** 2-3 heures

---

### ✅ Checklist Phase 3

- [ ] Écran Timer implémenté
- [ ] Notifications voix configurées
- [ ] Vibrations configurées
- [ ] Paramètres de notifications (activer/désactiver)
- [ ] Enregistrement de la course (POST /runs)
- [ ] BackgroundTimer configuré
- [ ] Gestion des erreurs réseau

---

## Phase 4 - Mobile (Dashboard)

**Objectif :** Afficher l'historique des courses et les statistiques.

**Durée estimée :** 1 semaine

### ❌ Étape 4.1 : Écran Dashboard

**Tâches :**

1. **Écran Dashboard**
   - `mobile/src/screens/dashboard/DashboardScreen.tsx`
   - Affichage des infos perso (nom, prénom ou pseudo)
   - Bouton "Démarrer une course" (navigation vers Timer)
   - Section "Historique des courses"

2. **Appel API GET /runs**
   - Récupérer les courses de l'utilisateur
   - Pagination (charger plus au scroll)

3. **Composant CourseCard**
   - `mobile/src/components/dashboard/CourseCard.tsx`
   - Afficher : date, durée, pattern utilisé

**Fichiers à créer :**
- `mobile/src/screens/dashboard/DashboardScreen.tsx`
- `mobile/src/components/dashboard/CourseCard.tsx`
- `mobile/src/hooks/useRuns.ts` (hook pour récupérer les courses)

**Critères de validation :**
- [ ] Les infos perso s'affichent
- [ ] L'historique des courses s'affiche (trié par date)
- [ ] La pagination fonctionne
- [ ] Navigation vers Timer fonctionne

**Durée estimée :** 4-6 heures

---

### ❌ Étape 4.2 : Statistiques (optionnel)

**Tâches :**

1. **Calcul des statistiques**
   - Nombre total de courses
   - Durée totale
   - Durée moyenne
   - Dernière course

2. **Affichage**
   - Composant `StatsCard` pour afficher les stats

**Fichiers à créer :**
- `mobile/src/components/dashboard/StatsCard.tsx`

**Durée estimée :** 2-3 heures

---

### ✅ Checklist Phase 4

- [ ] Écran Dashboard implémenté
- [ ] Appel GET /runs fonctionne
- [ ] Historique des courses affiché (trié par date)
- [ ] Pagination implémentée
- [ ] Navigation vers Timer fonctionne
- [ ] Statistiques affichées (optionnel)

---

## Résumé des Phases

| Phase | Modules Backend | Écrans Mobile | Durée |
|-------|----------------|---------------|-------|
| **Phase 1** | AuthModule, UsersModule, RunsModule | - | 2-3 semaines |
| **Phase 2** | - | Auth (Signup, Login, ForgotPassword) | 1-2 semaines |
| **Phase 3** | - | Timer (Chrono, Notifications) | 1-2 semaines |
| **Phase 4** | - | Dashboard (Historique, Stats) | 1 semaine |
| **TOTAL** | 3 modules | 6+ écrans | 5-8 semaines |

---

## Notes Importantes

1. **Ordre de développement** : Respecter l'ordre des phases (backend d'abord, puis mobile).
2. **Tests** : Écrire des tests à chaque étape (unitaires et E2E).
3. **Documentation** : Mettre à jour la documentation API à chaque nouveau endpoint.
4. **Gestion d'erreurs** : Toujours gérer les erreurs réseau et afficher des messages clairs.
5. **UX** : Penser à l'expérience utilisateur (loaders, messages d'erreur, confirmations).

---

**Note :** Ce document sera mis à jour au fur et à mesure de l'avancement du projet.
