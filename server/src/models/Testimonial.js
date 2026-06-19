import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, default: null, trim: true },
    company: { type: String, default: null, trim: true },
    role: { type: String, default: null, trim: true },
    project_name: { type: String, default: null, trim: true },
    content: { type: String, required: true, trim: true, maxlength: 1000 },
    rating: { type: Number, default: 5, min: 1, max: 5 },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: false } },
)

testimonialSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  },
})

export const Testimonial = mongoose.model('Testimonial', testimonialSchema)
