import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { Admin } from '../models/Admin.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

function signToken(admin) {
  return jwt.sign({ sub: admin._id }, env.jwtSecret, { expiresIn: env.jwtExpiresIn })
}

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new ApiError(400, 'Email et mot de passe requis')
  }

  const admin = await Admin.findOne({ email: email.toLowerCase().trim() }).select('+password')
  if (!admin || !(await admin.comparePassword(password))) {
    throw new ApiError(401, 'Identifiants invalides')
  }

  const token = signToken(admin)
  res.json({ token, user: admin.toJSON() })
})

// GET /api/auth/me
export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.admin.toJSON() })
})
