import mongoose from 'mongoose'
import { env } from '../config/env.js'
import { connectDB } from '../config/db.js'
import { Admin } from '../models/Admin.js'

async function seedAdmin() {
  const { email, password, name } = env.admin

  if (!email || !password) {
    console.error('❌ Renseigne ADMIN_EMAIL et ADMIN_PASSWORD dans server/.env')
    process.exit(1)
  }

  await connectDB()

  const existing = await Admin.findOne({ email: email.toLowerCase().trim() })
  if (existing) {
    existing.password = password // re-hashé par le hook pre-save
    existing.name = name
    await existing.save()
    console.log(`♻️  Admin mis à jour: ${email}`)
  } else {
    await Admin.create({ email, password, name })
    console.log(`✅ Admin créé: ${email}`)
  }

  await mongoose.disconnect()
  process.exit(0)
}

seedAdmin()
