import { Message } from '../models/Message.js'
import { Testimonial } from '../models/Testimonial.js'
import { asyncHandler } from '../utils/asyncHandler.js'

// GET /api/dashboard/summary   (admin)
export const getSummary = asyncHandler(async (_req, res) => {
  const [messagesCount, testimonialsCount, recentMessages, recentTestimonials, ratingAgg] =
    await Promise.all([
      Message.countDocuments(),
      Testimonial.countDocuments(),
      Message.find().sort({ created_at: -1 }).limit(5),
      Testimonial.find().sort({ created_at: -1 }).limit(5),
      Testimonial.aggregate([{ $group: { _id: null, avg: { $avg: '$rating' } } }]),
    ])

  const averageRating = ratingAgg[0]?.avg ? Number(ratingAgg[0].avg.toFixed(1)) : 0

  res.json({
    messagesCount,
    testimonialsCount,
    averageRating,
    recentMessages,
    recentTestimonials,
    hasDataError: false,
  })
})
