import mongoose from 'mongoose'
import { env } from './env.js'

export async function connectDB() {
  mongoose.set('strictQuery', true)
  try {
    await mongoose.connect(env.mongoUri)
    console.log('✅ MongoDB connecté')
  } catch (error) {
    console.error('❌ Connexion MongoDB échouée:', error.message)
    process.exit(1)
  }
}
