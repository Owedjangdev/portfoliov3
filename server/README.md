# Portfolio — Backend (Node.js + Express + MongoDB)

API REST qui remplace Supabase : authentification admin (JWT), témoignages, messages de contact (avec envoi d'email via Nodemailer) et projets.

## Prérequis

- Node.js 18+ (le projet utilise nvm node 24)
- Une base MongoDB (MongoDB Atlas gratuit recommandé, ou MongoDB local)
- Un compte SMTP pour l'envoi d'emails (Gmail avec « mot de passe d'application », Resend, Brevo…)

## Installation

```bash
cd server
npm install
cp .env.example .env   # puis remplir les valeurs
```

## Variables d'environnement (`server/.env`)

| Variable | Description |
|---|---|
| `PORT` | Port du serveur (défaut 5000) |
| `CLIENT_ORIGIN` | URL du frontend autorisée par le CORS |
| `MONGODB_URI` | Chaîne de connexion MongoDB |
| `JWT_SECRET` | Secret de signature des tokens (déjà généré) |
| `JWT_EXPIRES_IN` | Durée de validité du token (ex: 7d) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | Compte admin créé par le seed |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` | Serveur SMTP |
| `SMTP_USER` / `SMTP_PASS` | Identifiants SMTP |
| `MAIL_TO` | Adresse qui reçoit les messages de contact |
| `MAIL_FROM` | Expéditeur affiché |

## Créer le compte admin

```bash
npm run seed:admin
```

## Démarrer

```bash
npm run dev    # développement (nodemon)
npm start      # production
```

## Routes

### Public
- `GET  /api/health`
- `GET  /api/testimonials?limit=3`
- `POST /api/testimonials`
- `POST /api/contact`
- `GET  /api/projects`

### Auth
- `POST /api/auth/login` → `{ token, user }`
- `GET  /api/auth/me` (Bearer token)

### Admin (Bearer token)
- `GET    /api/dashboard/summary`
- `GET    /api/messages`
- `DELETE /api/messages/:id`
- `DELETE /api/testimonials/:id`
- `POST   /api/projects`
- `PUT    /api/projects/:id`
- `DELETE /api/projects/:id`
