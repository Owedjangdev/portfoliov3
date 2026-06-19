// Migration ponctuelle des données Supabase vers MongoDB.
// Usage:
//   SUPABASE_URL=... SUPABASE_KEY=... node src/scripts/migrateFromSupabase.js
// Idempotent: ré-exécutable sans créer de doublons (dédoublonnage par clé naturelle).
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import { Testimonial } from '../models/Testimonial.js'
import { Message } from '../models/Message.js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Renseigne SUPABASE_URL et SUPABASE_KEY en variables d\'environnement.')
  process.exit(1)
}

async function fetchTable(table) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  })
  if (!res.ok) {
    throw new Error(`Supabase ${table}: ${res.status} ${await res.text()}`)
  }
  return res.json()
}

async function migrateTestimonials() {
  const rows = await fetchTable('testimonials')
  let inserted = 0
  for (const row of rows) {
    const created_at = row.created_at ? new Date(row.created_at) : new Date()
    // dédoublonnage par nom + contenu + date
    const exists = await Testimonial.findOne({ name: row.name, content: row.content, created_at })
    if (exists) continue
    await Testimonial.collection.insertOne({
      name: row.name,
      email: row.email ?? null,
      company: row.company ?? null,
      role: row.role ?? null,
      project_name: row.project_name ?? null,
      content: row.content,
      rating: row.rating ?? 5,
      created_at,
    })
    inserted += 1
  }
  console.log(`✅ Témoignages: ${inserted} migré(s) sur ${rows.length} trouvé(s) dans Supabase`)
}

async function migrateMessages() {
  let rows = []
  try {
    rows = await fetchTable('contact_messages')
  } catch (error) {
    console.warn(`⚠️  contact_messages non récupéré (${error.message})`)
    return
  }
  let inserted = 0
  for (const row of rows) {
    const created_at = row.created_at ? new Date(row.created_at) : new Date()
    const exists = await Message.findOne({ name: row.name, message: row.message, created_at })
    if (exists) continue
    await Message.collection.insertOne({
      name: row.name,
      email: row.email ?? null,
      phone: row.phone ?? null,
      project_type: row.project_type ?? null,
      budget: row.budget ?? null,
      message: row.message,
      subject: row.subject ?? null,
      created_at,
    })
    inserted += 1
  }
  console.log(`✅ Messages: ${inserted} migré(s) sur ${rows.length} trouvé(s) dans Supabase`)
}

async function run() {
  await connectDB()
  // Nettoie l'éventuel avis de test créé pendant la vérification
  await Testimonial.deleteMany({ name: 'Test Migration' })
  await migrateTestimonials()
  await migrateMessages()
  await mongoose.disconnect()
  console.log('🏁 Migration terminée')
  process.exit(0)
}

run().catch((error) => {
  console.error('💥 Migration échouée:', error)
  process.exit(1)
})
