import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import { env } from './config/env.js'
import routes from './routes/index.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

export function createApp() {
  const app = express()

  app.use(helmet())
  const allowedOrigins = env.clientOrigin.split(',').map((o) => o.trim())
  const isLocalhost = (origin) => /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
  app.use(
    cors({
      origin: (origin, callback) => {
        // Pas d'origine (curl, requêtes serveur-à-serveur) → autorisé
        if (!origin) return callback(null, true)
        if (allowedOrigins.includes(origin)) return callback(null, true)
        // En dev, tolère localhost ET 127.0.0.1 sur n'importe quel port
        if (env.nodeEnv === 'development' && isLocalhost(origin)) return callback(null, true)
        return callback(new Error(`Origine non autorisée par CORS: ${origin}`))
      },
      credentials: true,
    }),
  )
  app.use(express.json({ limit: '1mb' }))
  if (env.nodeEnv === 'development') {
    app.use(morgan('dev'))
  }

  // Limite anti-spam sur les soumissions publiques (contact + avis).
  const publicWriteLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Trop de soumissions, réessaie dans quelques minutes.' },
  })
  app.use('/api/contact', publicWriteLimiter)
  app.use('/api/testimonials', publicWriteLimiter)

  app.use('/api', routes)

  app.use(notFound)
  app.use(errorHandler)

  return app
}
