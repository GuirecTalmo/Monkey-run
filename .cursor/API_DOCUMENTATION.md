# Documentation API - Monkey-run

**Dernière mise à jour :** 2026-01-15 21:44:09

Cette documentation décrit tous les endpoints de l'API backend pour l'application Monkey-run.

---

## Base URL

- **Développement :** `http://localhost:3000`
- **Production :** `https://api.monkey-run.com` (à configurer)

---

## Authentification

L'API utilise l'authentification JWT (JSON Web Token). La plupart des endpoints nécessitent un token JWT dans le header `Authorization`.

**Format :**
```
Authorization: Bearer <token>
```

Le token est obtenu via l'endpoint `POST /auth/login` et doit être stocké de manière sécurisée côté mobile (react-native-encrypted-storage).

---

## Endpoints

### 🔐 Auth (Public)

#### POST /auth/signup
Inscription d'un nouvel utilisateur.

**Request Body :**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Validation :**
- `email` : string, email valide, requis
- `password` : string, minimum 8 caractères, requis

**Response Success (201 Created) :**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "created_at": "2026-01-15T21:00:00Z"
  }
}
```

**Response Error (400 Bad Request) :**
```json
{
  "statusCode": 400,
  "message": ["email must be an email", "password must be longer than or equal to 8 characters"],
  "error": "Bad Request"
}
```

**Response Error (409 Conflict) :**
```json
{
  "statusCode": 409,
  "message": "Email already exists",
  "error": "Conflict"
}
```

---

#### POST /auth/login
Connexion d'un utilisateur existant.

**Request Body :**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Validation :**
- `email` : string, email valide, requis
- `password` : string, requis

**Response Success (200 OK) :**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "profile": {
      "pseudo": "Runner123",
      "first_name": "John",
      "last_name": "Doe",
      "avatar_url": null
    }
  }
}
```

**Response Error (401 Unauthorized) :**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

---

#### POST /auth/forgot-password
Demande de réinitialisation de mot de passe.

**Request Body :**
```json
{
  "email": "user@example.com"
}
```

**Validation :**
- `email` : string, email valide, requis

**Response Success (200 OK) :**
```json
{
  "message": "Password reset email sent"
}
```

**Note :** Pour des raisons de sécurité, la réponse est identique même si l'email n'existe pas.

**Response Error (400 Bad Request) :**
```json
{
  "statusCode": 400,
  "message": ["email must be an email"],
  "error": "Bad Request"
}
```

---

### 👤 Users (Authentifié)

#### GET /users/me
Récupère le profil de l'utilisateur connecté.

**Headers :**
```
Authorization: Bearer <token>
```

**Response Success (200 OK) :**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "created_at": "2026-01-15T21:00:00Z",
  "profile": {
    "pseudo": "Runner123",
    "first_name": "John",
    "last_name": "Doe",
    "avatar_url": "https://s3.amazonaws.com/avatars/user123.jpg"
  }
}
```

**Response Error (401 Unauthorized) :**
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

---

#### PATCH /users/me
Met à jour le profil de l'utilisateur connecté.

**Headers :**
```
Authorization: Bearer <token>
```

**Request Body :**
```json
{
  "pseudo": "NewPseudo",
  "first_name": "Jane",
  "last_name": "Smith",
  "avatar_url": "https://s3.amazonaws.com/avatars/user123.jpg"
}
```

**Validation :**
- `pseudo` : string, optionnel, max 50 caractères
- `first_name` : string, optionnel, max 100 caractères
- `last_name` : string, optionnel, max 100 caractères
- `avatar_url` : string, optionnel, URL valide

**Note :** Tous les champs sont optionnels. Seuls les champs fournis seront mis à jour.

**Response Success (200 OK) :**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "created_at": "2026-01-15T21:00:00Z",
  "profile": {
    "pseudo": "NewPseudo",
    "first_name": "Jane",
    "last_name": "Smith",
    "avatar_url": "https://s3.amazonaws.com/avatars/user123.jpg"
  }
}
```

**Response Error (400 Bad Request) :**
```json
{
  "statusCode": 400,
  "message": ["pseudo must be shorter than or equal to 50 characters"],
  "error": "Bad Request"
}
```

---

#### PATCH /users/me/password
Change le mot de passe de l'utilisateur connecté.

**Headers :**
```
Authorization: Bearer <token>
```

**Request Body :**
```json
{
  "current_password": "OldPassword123!",
  "new_password": "NewPassword456!"
}
```

**Validation :**
- `current_password` : string, requis
- `new_password` : string, minimum 8 caractères, requis

**Response Success (200 OK) :**
```json
{
  "message": "Password updated successfully"
}
```

**Response Error (400 Bad Request) :**
```json
{
  "statusCode": 400,
  "message": ["new_password must be longer than or equal to 8 characters"],
  "error": "Bad Request"
}
```

**Response Error (401 Unauthorized) :**
```json
{
  "statusCode": 401,
  "message": "Current password is incorrect",
  "error": "Unauthorized"
}
```

---

### 🏃 Runs (Authentifié)

#### GET /runs
Récupère la liste des courses de l'utilisateur connecté, triées par date (plus récentes en premier).

**Headers :**
```
Authorization: Bearer <token>
```

**Query Parameters :**
- `limit` : number, optionnel, défaut 20, maximum 100
- `offset` : number, optionnel, défaut 0
- `order` : string, optionnel, "asc" ou "desc", défaut "desc"

**Example Request :**
```
GET /runs?limit=10&offset=0&order=desc
```

**Response Success (200 OK) :**
```json
{
  "runs": [
    {
      "id": "uuid",
      "date": "2026-01-15T20:30:00Z",
      "duration_seconds": 1800,
      "pattern_json": {
        "fast": 60,
        "slow": 60
      },
      "created_at": "2026-01-15T20:35:00Z"
    },
    {
      "id": "uuid",
      "date": "2026-01-14T19:00:00Z",
      "duration_seconds": 2400,
      "pattern_json": {
        "fast": 90,
        "slow": 60
      },
      "created_at": "2026-01-14T19:10:00Z"
    }
  ],
  "total": 25,
  "limit": 10,
  "offset": 0
}
```

**Response Error (401 Unauthorized) :**
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

---

#### POST /runs
Crée une nouvelle course pour l'utilisateur connecté.

**Headers :**
```
Authorization: Bearer <token>
```

**Request Body :**
```json
{
  "date": "2026-01-15T20:30:00Z",
  "duration_seconds": 1800,
  "pattern_json": {
    "fast": 60,
    "slow": 60
  }
}
```

**Validation :**
- `date` : string, date ISO 8601, requis
- `duration_seconds` : number, entier positif, requis
- `pattern_json` : object JSON, requis
  - `fast` : number, entier positif (secondes de course rapide)
  - `slow` : number, entier positif (secondes de récupération)

**Response Success (201 Created) :**
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "date": "2026-01-15T20:30:00Z",
  "duration_seconds": 1800,
  "pattern_json": {
    "fast": 60,
    "slow": 60
  },
  "created_at": "2026-01-15T20:35:00Z"
}
```

**Response Error (400 Bad Request) :**
```json
{
  "statusCode": 400,
  "message": ["date must be a valid ISO 8601 date", "duration_seconds must be a positive number"],
  "error": "Bad Request"
}
```

**Response Error (401 Unauthorized) :**
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

---

## Codes de statut HTTP

- **200 OK** : Requête réussie
- **201 Created** : Ressource créée avec succès
- **400 Bad Request** : Données invalides ou validation échouée
- **401 Unauthorized** : Token manquant, invalide ou expiré
- **404 Not Found** : Ressource non trouvée
- **409 Conflict** : Conflit (ex: email déjà existant)
- **500 Internal Server Error** : Erreur serveur

---

## Gestion des erreurs

Toutes les erreurs suivent le format standard NestJS :

```json
{
  "statusCode": 400,
  "message": ["message d'erreur 1", "message d'erreur 2"],
  "error": "Bad Request"
}
```

Pour les erreurs de validation, `message` est un tableau de messages d'erreur.
Pour les autres erreurs, `message` est une chaîne de caractères.

---

## Notes importantes

1. **Sécurité** : Tous les endpoints sauf `/auth/*` nécessitent un token JWT valide.
2. **Validation** : Toutes les entrées sont validées côté serveur avec `class-validator`.
3. **Hashage** : Les mots de passe sont hashés avec bcrypt avant stockage.
4. **Dates** : Toutes les dates sont au format ISO 8601 (UTC).
5. **Pagination** : L'endpoint `GET /runs` supporte la pagination avec `limit` et `offset`.
6. **Tri** : Les courses sont triées par date par défaut (plus récentes en premier).

---

## Exemples d'utilisation

### Exemple complet : Inscription → Connexion → Création d'une course

```bash
# 1. Inscription
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!"
  }'

# Réponse : { "access_token": "eyJ...", "user": {...} }

# 2. Création d'une course
curl -X POST http://localhost:3000/runs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ..." \
  -d '{
    "date": "2026-01-15T20:30:00Z",
    "duration_seconds": 1800,
    "pattern_json": {
      "fast": 60,
      "slow": 60
    }
  }'

# 3. Récupération de l'historique
curl -X GET http://localhost:3000/runs \
  -H "Authorization: Bearer eyJ..."
```

---

**Note :** Cette documentation sera mise à jour au fur et à mesure de l'implémentation des endpoints.
