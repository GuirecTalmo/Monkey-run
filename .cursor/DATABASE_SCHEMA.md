# Schéma de Base de Données - Monkey-run

**Dernière mise à jour :** 2026-03-29 (inchangé fonctionnellement ; revue documentaire)

Ce document décrit le schéma de base de données Prisma pour l'application Monkey-run.

---

## Schéma Prisma Complet

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// MODÈLES
// ============================================

model User {
  id           String    @id @default(uuid())
  email        String    @unique
  passwordHash String    @map("password_hash")
  createdAt    DateTime  @default(now()) @map("created_at")

  profile Profile?
  runs    Run[]

  @@map("user")
}

model Profile {
  id        String   @id @default(uuid())
  userId    String   @unique @map("user_id")
  pseudo    String?
  avatarUrl String?  @map("avatar_url")
  firstName String?  @map("first_name")
  lastName  String?  @map("last_name")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("profile")
}

model Run {
  id             String   @id @default(uuid())
  userId         String   @map("user_id")
  date           DateTime
  durationSeconds Int     @map("duration_seconds")
  patternJson    Json     @map("pattern_json")
  createdAt      DateTime @default(now()) @map("created_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([date])
  @@map("run")
}
```

---

## Description des Tables

### Table `user`

Table principale pour les utilisateurs de l'application.

| Colonne         | Type      | Contraintes        | Description                                                 |
| --------------- | --------- | ------------------ | ----------------------------------------------------------- |
| `id`            | UUID      | PK, DEFAULT uuid() | Identifiant unique de l'utilisateur                         |
| `email`         | String    | UNIQUE, NOT NULL   | Adresse email de l'utilisateur (utilisée pour la connexion) |
| `password_hash` | String    | NOT NULL           | Hash bcrypt du mot de passe                                 |
| `created_at`    | Timestamp | DEFAULT now()      | Date de création du compte                                  |

**Relations :**

- Un utilisateur peut avoir un profil (`Profile`)
- Un utilisateur peut avoir plusieurs courses (`Run[]`)

**Index :**

- Index automatique sur `id` (clé primaire)
- Index unique sur `email`

---

### Table `profile`

Table pour les informations de profil des utilisateurs (relation 1:1 avec `user`).

| Colonne      | Type   | Contraintes                    | Description                     |
| ------------ | ------ | ------------------------------ | ------------------------------- |
| `id`         | UUID   | PK, DEFAULT uuid()             | Identifiant unique du profil    |
| `user_id`    | UUID   | FK → user.id, UNIQUE, NOT NULL | Référence à l'utilisateur       |
| `pseudo`     | String | NULL                           | Pseudonyme de l'utilisateur     |
| `avatar_url` | String | NULL                           | URL de l'avatar (S3 ou autre)   |
| `first_name` | String | NULL                           | Prénom de l'utilisateur         |
| `last_name`  | String | NULL                           | Nom de famille de l'utilisateur |

**Relations :**

- Un profil appartient à un utilisateur (`User`)
- Suppression en cascade si l'utilisateur est supprimé

**Index :**

- Index automatique sur `id` (clé primaire)
- Index unique sur `user_id`

---

### Table `run`

Table pour les courses enregistrées par les utilisateurs.

| Colonne            | Type      | Contraintes            | Description                                                  |
| ------------------ | --------- | ---------------------- | ------------------------------------------------------------ |
| `id`               | UUID      | PK, DEFAULT uuid()     | Identifiant unique de la course                              |
| `user_id`          | UUID      | FK → user.id, NOT NULL | Référence à l'utilisateur                                    |
| `date`             | Timestamp | NOT NULL               | Date et heure de la course                                   |
| `duration_seconds` | Integer   | NOT NULL               | Durée totale de la course en secondes                        |
| `pattern_json`     | JSON      | NOT NULL               | Configuration du fractionné (ex: `{"fast": 60, "slow": 60}`) |
| `created_at`       | Timestamp | DEFAULT now()          | Date de création de l'enregistrement                         |

**Relations :**

- Une course appartient à un utilisateur (`User`)
- Suppression en cascade si l'utilisateur est supprimé

**Index :**

- Index automatique sur `id` (clé primaire)
- Index sur `user_id` (pour les requêtes par utilisateur)
- Index sur `date` (pour le tri par date)

**Format de `pattern_json` :**

```json
{
  "fast": 60, // Durée de la phase rapide en secondes
  "slow": 60 // Durée de la phase de récupération en secondes
}
```

---

## Migrations

### Créer la migration initiale

```bash
npm run prisma:migrate
```

Cette commande va :

1. Créer un nouveau dossier dans `prisma/migrations/`
2. Générer le SQL pour créer les tables
3. Appliquer la migration à la base de données
4. Régénérer le client Prisma

### Appliquer les migrations en production

```bash
npm run prisma:migrate:deploy
```

---

## Exemples de Requêtes Prisma

### Créer un utilisateur avec son profil

```typescript
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    passwordHash: hashedPassword,
    profile: {
      create: {
        pseudo: 'Runner123',
        firstName: 'John',
        lastName: 'Doe',
      },
    },
  },
  include: {
    profile: true,
  },
});
```

### Récupérer un utilisateur avec son profil

```typescript
const user = await prisma.user.findUnique({
  where: { email: 'user@example.com' },
  include: {
    profile: true,
  },
});
```

### Créer une course

```typescript
const run = await prisma.run.create({
  data: {
    userId: user.id,
    date: new Date(),
    durationSeconds: 1800,
    patternJson: {
      fast: 60,
      slow: 60,
    },
  },
});
```

### Récupérer les courses d'un utilisateur (triées par date)

```typescript
const runs = await prisma.run.findMany({
  where: { userId: user.id },
  orderBy: { date: 'desc' },
  take: 20,
  skip: 0,
});
```

### Mettre à jour le profil d'un utilisateur

```typescript
const profile = await prisma.profile.update({
  where: { userId: user.id },
  data: {
    pseudo: 'NewPseudo',
    firstName: 'Jane',
    lastName: 'Smith',
  },
});
```

---

## Sécurité

### Hashage des mots de passe

Les mots de passe sont hashés avec bcrypt avant stockage :

```typescript
import * as bcrypt from 'bcrypt';

const saltRounds = 10;
const passwordHash = await bcrypt.hash(password, saltRounds);
```

### Validation

- L'email doit être unique (contrainte au niveau de la base de données)
- Le mot de passe doit être hashé avant insertion
- Les dates doivent être valides (validation côté application)
- Le JSON `pattern_json` doit être validé (structure attendue)

---

## Évolutions Futures

### Ajouts possibles

1. **Table `refresh_token`** : Pour gérer les refresh tokens JWT

   ```prisma
   model RefreshToken {
     id        String   @id @default(uuid())
     userId    String   @map("user_id")
     token     String   @unique
     expiresAt DateTime @map("expires_at")
     createdAt DateTime @default(now()) @map("created_at")

     user User @relation(fields: [userId], references: [id], onDelete: Cascade)

     @@index([userId])
     @@map("refresh_token")
   }
   ```

2. **Table `password_reset`** : Pour gérer les tokens de réinitialisation

   ```prisma
   model PasswordReset {
     id        String   @id @default(uuid())
     userId    String   @map("user_id")
     token     String   @unique
     expiresAt DateTime @map("expires_at")
     used      Boolean  @default(false)
     createdAt DateTime @default(now()) @map("created_at")

     user User @relation(fields: [userId], references: [id], onDelete: Cascade)

     @@index([userId])
     @@index([token])
     @@map("password_reset")
   }
   ```

3. **Statistiques agrégées** : Pour optimiser les requêtes de statistiques
   ```prisma
   model UserStats {
     id              String   @id @default(uuid())
     userId          String   @unique @map("user_id")
     totalRuns       Int      @default(0) @map("total_runs")
     totalDuration   Int      @default(0) @map("total_duration")
     lastRunDate     DateTime? @map("last_run_date")
     updatedAt       DateTime @default(now()) @updatedAt @map("updated_at")

     user User @relation(fields: [userId], references: [id], onDelete: Cascade)

     @@map("user_stats")
   }
   ```

---

## Notes Importantes

1. **UUID vs Serial** : Le schéma utilise UUID pour les clés primaires. Si vous préférez utiliser des entiers auto-incrémentés, remplacez `@default(uuid())` par `@default(autoincrement())` et changez le type en `Int`.

2. **Snake_case** : Les noms de colonnes utilisent `snake_case` (convention PostgreSQL) via `@map()`, mais les noms de propriétés Prisma utilisent `camelCase`.

3. **Cascade Delete** : Les relations utilisent `onDelete: Cascade` pour supprimer automatiquement les données liées (profil, courses) quand un utilisateur est supprimé.

4. **Index** : Des index sont créés sur `user_id` et `date` dans la table `run` pour optimiser les requêtes fréquentes.

5. **JSON** : Le champ `pattern_json` utilise le type JSON de PostgreSQL pour stocker la configuration du fractionné de manière flexible.

---

**Note :** Ce schéma est implémenté dans `prisma/schema.prisma`. La migration initiale se trouve dans `prisma/migrations/20260128223000_init/`. Exécuter `npm run prisma:migrate` puis `npm run prisma:studio` une fois `DATABASE_URL` configurée dans `.env`.
