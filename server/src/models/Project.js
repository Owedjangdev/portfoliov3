import mongoose from 'mongoose'

const localizedSchema = new mongoose.Schema(
  {
    fr: { type: String, default: '', trim: true },
    en: { type: String, default: '', trim: true },
  },
  { _id: false },
)

const projectSchema = new mongoose.Schema(
  {
    title: { type: localizedSchema, required: true },
    desc: { type: localizedSchema, required: true },
    category: { type: String, default: 'web', trim: true },
    url: { type: String, required: true, trim: true },
    image: { type: String, default: '', trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
)

projectSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  },
})

export const Project = mongoose.model('Project', projectSchema)
