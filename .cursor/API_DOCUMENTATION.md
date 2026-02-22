# Documentation API - Monkey-run

**Dernière mise à jour :** 2026-02-22

Cette documentation décrit tous les endpoints de l'API backend pour l'application Monkey-run.

---

## Base URL

Tous les endpoints sont préfixés par `/api`.

- **Développement :** `http://localhost:3000/api`
- **Production :** `https://api.monkey-run.com` (à configurer)

---

## Authentification

L'API utilise l'authentification JWT (JSON Web Token). La plupart des endpoints nécessitent un token JWT dans le header `Authorization`.

**Format :**
```
Authorization: Bearer <token>
```

Le token est obtenu via `POST /api/auth/login` ou `POST /api/auth/signup` et doit être envoyé dans le header `Authorization: Bearer <token>`. À stocker de manière sécurisée côté mobile (react-native-encrypted-storage).

---

## Endpoints

### 🔐 Auth (Public)

#### POST /api/auth/signup
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
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com"
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
  "message": "Un compte existe déjà avec cet email.",
  "error": "Conflict"
}
```

---

#### POST /api/auth/login
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

**Response Success (201 Created) :**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

**Response Error (401 Unauthorized) :**
```json
{
  "statusCode": 401,
  "message": "Email ou mot de passe incorrect.",
  "error": "Unauthorized"
}
```

---

#### POST /api/auth/forgot-password
Demande de réinitialisation de mot de passe (stub : message uniquement, pas d’email envoyé pour l’instant).

**Request Body :**
```json
{
  "email": "user@example.com"
}
```

**Validation :**
- `email` : string, email valide, requis

**Response Success (201 Created) — email existant :**
```json
{
  "message": "Si un compte existe pour cet email, un lien de réinitialisation vous a été envoyé."
}
```

**Response Error (404 Not Found) — email inexistant :**
```json
{
  "statusCode": 404,
  "message": "Aucun compte associé à cet email.",
  "error": "Not Found"
}
```

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

#### GET /api/users/me
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
  "createdAt": "2026-01-15T21:00:00.000Z",
  "profile": {
    "id": "uuid",
    "pseudo": "Runner123",
    "firstName": "John",
    "lastName": "Doe",
    "avatarUrl": "https://example.com/avatar.jpg"
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

#### PATCH /api/users/me
Met à jour le profil de l'utilisateur connecté.

**Headers :**
```
Authorization: Bearer <token>
```

**Request Body :**
```json
{
  "pseudo": "NewPseudo",
  "firstName": "Jane",
  "lastName": "Smith",
  "avatarUrl": "https://example.com/avatar.jpg"
}
```

**Validation :**
- `pseudo` : string, optionnel, max 50 caractères
- `firstName` : string, optionnel, max 100 caractères
- `lastName` : string, optionnel, max 100 caractères
- `avatarUrl` : string, optionnel, URL valide

**Note :** Tous les champs sont optionnels. Seuls les champs fournis seront mis à jour.

**Response Success (200 OK) :** même forme que GET /api/users/me (profil complet avec champs en camelCase).

**Response Error (400 Bad Request) :**
```json
{
  "statusCode": 400,
  "message": ["pseudo must be shorter than or equal to 50 characters"],
  "error": "Bad Request"
}
```

---

#### PATCH /api/users/me/password
Change le mot de passe de l'utilisateur connecté.

**Headers :**
```
Authorization: Bearer <token>
```

**Request Body :**
```json
{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewPassword456!"
}
```

**Validation :**
- `currentPassword` : string, requis
- `newPassword` : string, minimum 8 caractères, requis

**Response Success (200 OK) :** corps vide.

**Response Error (400 Bad Request) :**
```json
{
  "statusCode": 400,
  "message": "Mot de passe actuel incorrect.",
  "error": "Bad Request"
}
```

---

### 🏃 Runs (Authentifié)

#### GET /api/runs
Récupère la liste des courses de l'utilisateur connecté, triées par date.

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
GET /api/runs?limit=10&offset=0&order=desc
```

**Response Success (200 OK) :**
```json
{
  "items": [
    {
      "id": "uuid",
      "userId": "uuid",
      "date": "2026-01-15T20:30:00.000Z",
      "durationSeconds": 1800,
      "patternJson": { "warmup": 300, "intervals": [] },
      "createdAt": "2026-01-15T20:35:00.000Z"
    }
  ],
  "total": 25
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

#### POST /api/runs
Crée une nouvelle course pour l'utilisateur connecté.

**Headers :**
```
Authorization: Bearer <token>
```

**Request Body :**
```json
{
  "date": "2026-01-15T20:30:00.000Z",
  "durationSeconds": 1800,
  "patternJson": {
    "warmup": 300,
    "intervals": [{ "run": 400, "rest": 200 }]
  }
}
```

**Validation :**
- `date` : date ISO 8601 (transformée en Date), requise
- `durationSeconds` : number, entier ≥ 0, requis
- `patternJson` : object JSON, requis (structure libre pour le pattern de fractionné)

**Response Success (201 Created) :**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "date": "2026-01-15T20:30:00.000Z",
  "durationSeconds": 1800,
  "patternJson": { "warmup": 300, "intervals": [] },
  "createdAt": "2026-01-15T20:35:00.000Z"
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

1. **Sécurité** : Tous les endpoints sauf `POST /api/auth/signup`, `POST /api/auth/login` et `POST /api/auth/forgot-password` nécessitent un token JWT valide dans le header `Authorization: Bearer <token>`.
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
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "SecurePassword123!"}'

# Réponse : { "accessToken": "eyJ...", "user": { "id", "email" } }

# 2. Création d'une course
curl -X POST http://localhost:3000/api/runs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ..." \
  -d '{
    "date": "2026-01-15T20:30:00.000Z",
    "durationSeconds": 1800,
    "patternJson": { "warmup": 300, "intervals": [] }
  }'

# 3. Récupération de l'historique
curl -X GET "http://localhost:3000/api/runs?limit=10&offset=0" \
  -H "Authorization: Bearer eyJ..."
```
