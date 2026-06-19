import { Project } from '../models/Project.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

// GET /api/projects   (public)
export const listProjects = asyncHandler(async (_req, res) => {
  const data = await Project.find().sort({ order: 1, created_at: -1 })
  res.json(data)
})

// POST /api/projects   (admin)
export const createProject = asyncHandler(async (req, res) => {
  const { title, category, desc, url, image, order } = req.body

  if (!title?.fr || !desc?.fr || !url) {
    throw new ApiError(400, 'Le titre (FR), la description (FR) et l\'URL sont requis')
  }

  const project = await Project.create({
    title: { fr: title.fr, en: title.en || title.fr },
    desc: { fr: desc.fr, en: desc.en || desc.fr },
    category: category || 'web',
    url,
    image: image || '',
    order: order ?? 0,
  })

  res.status(201).json(project)
})

// PUT /api/projects/:id   (admin)
export const updateProject = asyncHandler(async (req, res) => {
  const { title, desc, ...rest } = req.body
  const update = { ...rest }
  if (title) update.title = { fr: title.fr, en: title.en || title.fr }
  if (desc) update.desc = { fr: desc.fr, en: desc.en || desc.fr }

  const project = await Project.findByIdAndUpdate(req.params.id, update, {
    new: true,
    runValidators: true,
  })
  if (!project) throw new ApiError(404, 'Projet introuvable')
  res.json(project)
})

// DELETE /api/projects/:id   (admin)
export const deleteProject = asyncHandler(async (req, res) => {
  const deleted = await Project.findByIdAndDelete(req.params.id)
  if (!deleted) throw new ApiError(404, 'Projet introuvable')
  res.json({ message: 'Projet supprimé', id: req.params.id })
})
