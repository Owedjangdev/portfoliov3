import { api } from './api'
import type { DashboardProject, LocalizedText } from '../features/dashboard/dashboard.types'

// Projet « aplati » pour l'affichage public dans la langue courante.
export interface PublicProject {
  id?: string
  title: string
  desc: string
  category: string
  url: string
  image: string
}

const pickLang = (text: LocalizedText | undefined, lang: string) => {
  if (!text) return ''
  const key = lang.startsWith('en') ? 'en' : 'fr'
  return text[key] || text.fr || text.en || ''
}

export function localizeProject(project: DashboardProject, lang: string): PublicProject {
  return {
    id: project.id,
    title: pickLang(project.title, lang),
    desc: pickLang(project.desc, lang),
    category: project.category ?? '',
    url: project.url,
    image: project.image,
  }
}

export async function fetchPublicProjects(lang: string): Promise<PublicProject[]> {
  const data = await api<DashboardProject[]>('/projects')
  return data.map((project) => localizeProject(project, lang))
}
