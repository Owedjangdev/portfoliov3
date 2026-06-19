import { env } from '../config/env.js'

export function notFound(req, res) {
  res.status(404).json({ message: `Route introuvable: ${req.originalUrl}` })
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, _next) {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Erreur serveur'

  // Erreurs de validation Mongoose
  if (err.name === 'ValidationError') {
    statusCode = 400
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ')
  }

  // ID Mongo malformé
  if (err.name === 'CastError') {
    statusCode = 400
    message = 'Identifiant invalide'
  }

  // Doublon (index unique)
  if (err.code === 11000) {
    statusCode = 409
    message = 'Ressource déjà existante'
  }

  if (statusCode >= 500) {
    console.error('💥', err)
  }

  res.status(statusCode).json({
    message,
    ...(env.nodeEnv === 'development' && statusCode >= 500 ? { stack: err.stack } : {}),
  })
}
