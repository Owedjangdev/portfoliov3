import { env } from './config/env.js'
import { connectDB } from './config/db.js'
import { createApp } from './app.js'

async function start() {
  await connectDB()
  const app = createApp()
  app.listen(env.port, () => {
    console.log(`🚀 API démarrée sur http://localhost:${env.port} (${env.nodeEnv})`)
  })
}

start()
