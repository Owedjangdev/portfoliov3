export interface LocalizedText {
  fr: string
  en: string
}

export interface DashboardProject {
  id?: string
  title: LocalizedText
  desc: LocalizedText
  category?: string
  url: string
  image: string
  order?: number
}

export interface DashboardTestimonial {
  id: string | number
  name?: string
  email?: string | null
  company?: string | null
  role?: string | null
  project_name?: string | null
  content?: string | null
  rating?: number | null
  created_at?: string | null
}

export interface DashboardMessage {
  id?: string | number
  name?: string | null
  email?: string | null
  phone?: string | null
  project_type?: string | null
  budget?: string | null
  message?: string | null
  subject?: string | null
  created_at?: string | null
}

export interface DashboardSummary {
  messagesCount: number
  testimonialsCount: number
  averageRating: number
  recentMessages: DashboardMessage[]
  recentTestimonials: DashboardTestimonial[]
  hasDataError: boolean
}
