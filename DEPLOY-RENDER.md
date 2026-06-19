# Déploiement — Backend (Render) + Frontend (Vercel)

Architecture : **Frontend** statique sur **Vercel** + **Backend** Node/Express sur **Render** + **MongoDB Atlas**.

---

## 1. Backend sur Render

1. Crée un compte sur https://render.com et connecte ton dépôt GitHub `Owedjangdev/portfoliov3`.
2. **New + → Blueprint** : Render détecte le fichier [`render.yaml`](render.yaml) et propose le service `owedev-api`.
   - (Alternative manuelle : **New + → Web Service**, Root Directory = `server`, Build = `npm install`, Start = `npm start`.)
3. Dans **Environment**, renseigne les secrets (les variables `sync:false`) :
   | Variable | Valeur |
   |---|---|
   | `MONGODB_URI` | ta chaîne MongoDB Atlas (`...mongodb.net/portfolio?...`) |
   | `JWT_SECRET` | le secret généré (déjà dans ton `.env` local) |
   | `CLIENT_ORIGIN` | `https://owedevp.vercel.app` (ton domaine Vercel) |
   | `ADMIN_EMAIL` / `ADMIN_PASSWORD` | identifiants admin |
   | `SMTP_USER` / `SMTP_PASS` | Gmail + mot de passe d'application |
   | `MAIL_TO` / `MAIL_FROM` | adresses email |
4. **Deploy**. À la fin tu obtiens une URL type `https://owedev-api.onrender.com`.
5. **Autorise Render dans MongoDB Atlas** : Network Access → autorise `0.0.0.0/0` (Render n'a pas d'IP fixe en plan gratuit).
6. **Créer le compte admin** : onglet **Shell** du service Render → `npm run seed:admin`.
   - (Optionnel : `npm run seed:projects` pour réimporter les projets de base.)

> ⚠️ Plan gratuit Render : le service s'endort après 15 min d'inactivité → la 1ʳᵉ requête peut prendre ~30 s (cold start).

---

## 2. Frontend sur Vercel

1. Dans le projet Vercel `owedevp`, va dans **Settings → Environment Variables**.
2. Ajoute :
   | Variable | Valeur |
   |---|---|
   | `VITE_API_URL` | `https://owedev-api.onrender.com/api` (l'URL Render + `/api`) |
3. **Redeploy** le frontend (Deployments → Redeploy) pour prendre en compte la variable.

> En local, garde `VITE_API_URL=/api` (proxy Vite). En prod, Vercel utilise l'URL Render ci-dessus.

---

## 3. Vérification post-déploiement
- `https://owedev-api.onrender.com/api/health` → `{"status":"ok"}`
- Le site Vercel affiche projets/témoignages, le formulaire de contact envoie un email, et `/dashboard/login` fonctionne.
