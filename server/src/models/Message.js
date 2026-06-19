import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, default: null, trim: true },
    project_type: { type: String, default: null, trim: true },
    budget: { type: String, default: null, trim: true },
    message: { type: String, required: true, trim: true },
    subject: { type: String, default: null, trim: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: false } },
)

messageSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  },
})

export const Message = mongoose.model('Message', messageSchema)
