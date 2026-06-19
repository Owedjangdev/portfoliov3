import { Message } from '../models/Message.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { sendContactEmail } from '../utils/mailer.js'

// POST /api/contact   (public)
export const createMessage = asyncHandler(async (req, res) => {
  const { name, email, phone, project_type, budget, message } = req.body

  if (!name || !email || !message) {
    throw new ApiError(400, 'Nom, email et message sont requis')
  }

  const subject = req.body.subject || `Nouveau projet: ${project_type || 'Contact'} - De ${name}`

  const saved = await Message.create({
    name,
    email,
    phone: phone || null,
    project_type: project_type || null,
    budget: budget || null,
    message,
    subject,
  })

  // L'email ne doit pas faire échouer l'enregistrement.
  let emailSent = false
  try {
    const result = await sendContactEmail(saved.toJSON())
    emailSent = result.sent
  } catch (error) {
    console.error('✉️  Échec envoi email contact:', error.message)
  }

  res.status(201).json({ message: 'Message envoyé', emailSent, data: saved })
})

// GET /api/messages   (admin)
export const listMessages = asyncHandler(async (_req, res) => {
  const data = await Message.find().sort({ created_at: -1 })
  res.json(data)
})

// DELETE /api/messages/:id   (admin)
export const deleteMessage = asyncHandler(async (req, res) => {
  const deleted = await Message.findByIdAndDelete(req.params.id)
  if (!deleted) throw new ApiError(404, 'Message introuvable')
  res.json({ message: 'Message supprimé', id: req.params.id })
})
