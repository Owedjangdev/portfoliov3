import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import { login, me } from '../controllers/auth.controller.js'
import {
  listTestimonials,
  createTestimonial,
  deleteTestimonial,
} from '../controllers/testimonial.controller.js'
import {
  createMessage,
  listMessages,
  deleteMessage,
} from '../controllers/message.controller.js'
import {
  listProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller.js'
import { getSummary } from '../controllers/dashboard.controller.js'

const router = Router()

router.get('/health', (_req, res) => res.json({ status: 'ok' }))

// --- Auth ---
router.post('/auth/login', login)
router.get('/auth/me', protect, me)

// --- Témoignages ---
router.get('/testimonials', listTestimonials)
router.post('/testimonials', createTestimonial)
router.delete('/testimonials/:id', protect, deleteTestimonial)

// --- Messages / Contact ---
router.post('/contact', createMessage)
router.get('/messages', protect, listMessages)
router.delete('/messages/:id', protect, deleteMessage)

// --- Projets ---
router.get('/projects', listProjects)
router.post('/projects', protect, createProject)
router.put('/projects/:id', protect, updateProject)
router.delete('/projects/:id', protect, deleteProject)

// --- Dashboard ---
router.get('/dashboard/summary', protect, getSummary)

export default router
