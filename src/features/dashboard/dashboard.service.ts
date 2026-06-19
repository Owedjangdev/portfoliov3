import { api } from '../../lib/api'
import type {
  DashboardMessage,
  DashboardProject,
  DashboardSummary,
  DashboardTestimonial,
} from './dashboard.types'

const emptySummary: DashboardSummary = {
  messagesCount: 0,
  testimonialsCount: 0,
  averageRating: 0,
  recentMessages: [],
  recentTestimonials: [],
  hasDataError: false,
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  try {
    return await api<DashboardSummary>('/dashboard/summary', { auth: true })
  } catch (error) {
    console.error('Erreur dashboard summary:', error)
    return { ...emptySummary, hasDataError: true }
  }
}

export async function getDashboardMessages(): Promise<{ data: DashboardMessage[]; hasError: boolean }> {
  try {
    const data = await api<DashboardMessage[]>('/messages', { auth: true })
    return { data, hasError: false }
  } catch (error) {
    console.error('Erreur dashboard messages:', error)
    return { data: [], hasError: true }
  }
}

export async function deleteDashboardMessage(id: string): Promise<void> {
  await api(`/messages/${id}`, { method: 'DELETE', auth: true })
}

export async function getDashboardTestimonials(): Promise<{ data: DashboardTestimonial[]; hasError: boolean }> {
  try {
    const data = await api<DashboardTestimonial[]>('/testimonials', { auth: true })
    return { data, hasError: false }
  } catch (error) {
    console.error('Erreur dashboard testimonials:', error)
    return { data: [], hasError: true }
  }
}

export async function deleteDashboardTestimonial(id: string): Promise<void> {
  await api(`/testimonials/${id}`, { method: 'DELETE', auth: true })
}

export async function getDashboardProjects(): Promise<{ data: DashboardProject[]; hasError: boolean }> {
  try {
    const data = await api<DashboardProject[]>('/projects')
    return { data, hasError: false }
  } catch (error) {
    console.error('Erreur dashboard projects:', error)
    return { data: [], hasError: true }
  }
}

export async function createDashboardProject(payload: Omit<DashboardProject, 'id'>): Promise<DashboardProject> {
  return api<DashboardProject>('/projects', { method: 'POST', body: payload, auth: true })
}

export async function updateDashboardProject(
  id: string,
  payload: Omit<DashboardProject, 'id'>,
): Promise<DashboardProject> {
  return api<DashboardProject>(`/projects/${id}`, { method: 'PUT', body: payload, auth: true })
}

export async function deleteDashboardProject(id: string): Promise<void> {
  await api(`/projects/${id}`, { method: 'DELETE', auth: true })
}
