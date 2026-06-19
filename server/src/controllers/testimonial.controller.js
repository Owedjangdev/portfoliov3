import { Testimonial } from '../models/Testimonial.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

// GET /api/testimonials?limit=3   (public)
export const listTestimonials = asyncHandler(async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 0, 100)
  let query = Testimonial.find().sort({ created_at: -1 })
  if (limit > 0) query = query.limit(limit)
  const data = await query
  res.json(data)
})

// POST /api/testimonials   (public)
export const createTestimonial = asyncHandler(async (req, res) => {
  const { name, email, company, role, project_name, content, rating } = req.body

  if (!name || !content) {
    throw new ApiError(400, 'Le nom et le contenu sont requis')
  }

  const testimonial = await Testimonial.create({
    name,
    email: email || null,
    company: company || null,
    role: role || null,
    project_name: project_name || null,
    content,
    rating: rating ?? 5,
  })

  res.status(201).json(testimonial)
})

// DELETE /api/testimonials/:id   (admin)
export const deleteTestimonial = asyncHandler(async (req, res) => {
  const deleted = await Testimonial.findByIdAndDelete(req.params.id)
  if (!deleted) throw new ApiError(404, 'Témoignage introuvable')
  res.json({ message: 'Témoignage supprimé', id: req.params.id })
})
