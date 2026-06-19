// Injecte les projets du portfolio (depuis src/i18n/fr.json) dans MongoDB.
// Idempotent: ne recrée pas un projet déjà présent (clé = title.fr).
// Usage: node src/scripts/seedProjects.js
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import { Project } from '../models/Project.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const frPath = path.resolve(__dirname, '../../../src/i18n/fr.json')

async function run() {
  const fr = JSON.parse(await readFile(frPath, 'utf-8'))
  const items = Array.isArray(fr?.works?.items) ? fr.works.items : []

  if (items.length === 0) {
    console.error('❌ Aucun projet trouvé dans src/i18n/fr.json (works.items)')
    process.exit(1)
  }

  await connectDB()

  let inserted = 0
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i]
    const exists = await Project.findOne({ 'title.fr': item.title })
    if (exists) continue
    await Project.create({
      // EN repris du FR au départ — à traduire ensuite dans le dashboard
      title: { fr: item.title, en: item.title },
      desc: { fr: item.desc, en: item.desc },
      category: item.category ?? 'web',
      url: item.url,
      image: item.image,
      order: i,
    })
    inserted += 1
  }

  console.log(`✅ Projets: ${inserted} créé(s) sur ${items.length} (les doublons sont ignorés)`)
  await mongoose.disconnect()
  process.exit(0)
}

run().catch((error) => {
  console.error('💥 Seed projets échoué:', error)
  process.exit(1)
})
