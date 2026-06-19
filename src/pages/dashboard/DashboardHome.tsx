import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiChartBar, HiClock, HiFolderOpen, HiMail, HiStar, HiTrendingUp } from 'react-icons/hi'
import { getDashboardSummary } from '../../features/dashboard/dashboard.service'
import type { DashboardProject, DashboardSummary } from '../../features/dashboard/dashboard.types'

const emptySummary: DashboardSummary = {
  messagesCount: 0,
  testimonialsCount: 0,
  averageRating: 0,
  recentMessages: [],
  recentTestimonials: [],
  hasDataError: false,
}

const formatDate = (value?: string | null) => {
  if (!value) return 'Date inconnue'

  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

const DashboardHome = () => {
  const { t } = useTranslation()
  const [summary, setSummary] = useState<DashboardSummary>(emptySummary)
  const [loading, setLoading] = useState(true)

  const projects = useMemo(() => {
    const rawProjects = t('works.items', { returnObjects: true })
    return Array.isArray(rawProjects) ? (rawProjects as DashboardProject[]) : []
  }, [t])

  useEffect(() => {
    let ignore = false

    const loadSummary = async () => {
      setLoading(true)
      const nextSummary = await getDashboardSummary()
      if (!ignore) {
        setSummary(nextSummary)
        setLoading(false)
      }
    }

    loadSummary()

    return () => {
      ignore = true
    }
  }, [])

  const stats = [
    { label: 'Projets publiés', value: projects.length, change: 'Contenu actuel', icon: HiFolderOpen },
    { label: 'Messages reçus', value: summary.messagesCount, change: loading ? 'Chargement...' : 'Base MongoDB', icon: HiMail },
    { label: 'Avis clients', value: summary.testimonialsCount, change: `${summary.averageRating}/5 moyenne récente`, icon: HiStar },
    { label: 'Santé système', value: summary.hasDataError ? 'À vérifier' : 'OK', change: 'Connexion API', icon: HiTrendingUp },
  ]

  const recentActivities = [
    ...summary.recentMessages.map((item) => ({
      id: `message-${item.id ?? item.created_at}`,
      title: item.name ? `Message de ${item.name}` : 'Nouveau message',
      meta: `${item.project_type ?? 'Projet non précisé'} - ${formatDate(item.created_at)}`,
    })),
    ...summary.recentTestimonials.map((item) => ({
      id: `testimonial-${item.id}`,
      title: item.name ? `Avis de ${item.name}` : 'Nouvel avis client',
      meta: `${item.rating ?? 0}/5 - ${formatDate(item.created_at)}`,
    })),
  ].slice(0, 5)

  const chartBars = [
    { label: 'Projets', value: projects.length, height: Math.max(24, projects.length * 18) },
    { label: 'Messages', value: summary.messagesCount, height: Math.max(24, summary.messagesCount * 18) },
    { label: 'Avis', value: summary.testimonialsCount, height: Math.max(24, summary.testimonialsCount * 18) },
  ]

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold text-blue-600">Vue globale</p>
            <h1 className="mt-2 text-3xl font-black">Pilotage du portfolio</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              Suivi centralisé des projets, messages entrants, témoignages clients et premiers indicateurs système.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 dark:bg-white/10 dark:text-slate-200">
            <HiClock size={18} />
            {loading ? 'Synchronisation...' : 'Données synchronisées'}
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon

          return (
            <article
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{item.label}</span>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30">
                  <Icon size={20} />
                </div>
              </div>
              <strong className="mt-5 block text-3xl font-black">{item.value}</strong>
              <span className="mt-1 block text-xs font-bold text-slate-500 dark:text-slate-400">{item.change}</span>
            </article>
          )
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-black">Indicateurs clés</h2>
            <HiChartBar className="text-blue-600" size={22} />
          </div>
          <div className="flex h-72 items-end gap-4 rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/[0.03]">
            {chartBars.map((bar) => (
              <div key={bar.label} className="flex h-full flex-1 flex-col justify-end gap-3">
                <div className="flex min-h-6 items-end justify-center rounded-t-lg bg-gradient-to-t from-blue-600 to-cyan-500" style={{ height: `${bar.height}px` }}>
                  <span className="pb-2 text-xs font-black text-white">{bar.value}</span>
                </div>
                <span className="text-center text-xs font-bold text-slate-500 dark:text-slate-400">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
          <h2 className="text-lg font-black">Activité récente</h2>
          <div className="mt-6 space-y-4">
            {recentActivities.length > 0 ? (
              recentActivities.map((item) => (
                <div key={item.id} className="rounded-lg bg-slate-50 p-4 dark:bg-white/[0.04]">
                  <p className="text-sm font-black text-slate-800 dark:text-white">{item.title}</p>
                  <p className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">{item.meta}</p>
                </div>
              ))
            ) : (
              <div className="rounded-lg bg-slate-50 p-4 text-sm font-bold text-slate-500 dark:bg-white/[0.04] dark:text-slate-400">
                {loading ? 'Chargement des activités...' : 'Aucune activité récente à afficher.'}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default DashboardHome
