import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { Admin } from '../models/Admin.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const protect = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    throw new ApiError(401, 'Non autorisé: token manquant')
  }

  let payload
  try {
    payload = jwt.verify(token, env.jwtSecret)
  } catch {
    throw new ApiError(401, 'Non autorisé: token invalide ou expiré')
  }

  const admin = await Admin.findById(payload.sub)
  if (!admin) {
    throw new ApiError(401, 'Non autorisé: compte introuvable')
  }

  req.admin = admin
  next()
})
