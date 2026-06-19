import dotenv from 'dotenv'

dotenv.config()

const required = ['MONGODB_URI', 'JWT_SECRET']
const missing = required.filter((key) => !process.env[key])

if (missing.length) {
  console.error(`❌ Variables d'environnement manquantes: ${missing.join(', ')}`)
  console.error('   Copie server/.env.example vers server/.env et remplis les valeurs.')
  process.exit(1)
}

export const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  admin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    name: process.env.ADMIN_NAME || 'Admin',
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE !== 'false',
    user: process.env.SMTP_USER,
    // Les mots de passe d'application Gmail sont affichés avec des espaces : on les retire.
    pass: process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s/g, '') : undefined,
    to: process.env.MAIL_TO || process.env.SMTP_USER,
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
  },
}
