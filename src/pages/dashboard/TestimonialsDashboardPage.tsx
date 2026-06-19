import { useEffect, useMemo, useState } from 'react'
import { HiSearch, HiStar, HiTrash } from 'react-icons/hi'
import { deleteDashboardTestimonial, getDashboardTestimonials } from '../../features/dashboard/dashboard.service'
import type { DashboardTestimonial } from '../../features/dashboard/dashboard.types'

const TestimonialsDashboardPage = () => {
  const [testimonials, setTestimonials] = useState<DashboardTestimonial[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let ignore = false

    const loadTestimonials = async () => {
      setLoading(true)
      const result = await getDashboardTestimonials()
      if (!ignore) {
        setTestimonials(result.data)
        setHasError(result.hasError)
        setLoading(false)
      }
    }

    loadTestimonials()

    return () => {
      ignore = true
    }
  }, [])

  const filteredTestimonials = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    if (!normalizedSearch) return testimonials

    return testimonials.filter((item) =>
      [item.name, item.email, item.company, item.role, item.project_name, item.content]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedSearch)),
    )
  }, [search, testimonials])

  const handleDelete = async (id: DashboardTestimonial['id'], name?: string | null) => {
    if (!id) return
    if (!window.confirm(`Supprimer l'avis de ${name || 'ce client'} ? Cette action est définitive.`)) return
    try {
      await deleteDashboardTestimonial(String(id))
      setTestimonials((prev) => prev.filter((item) => item.id !== id))
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Échec de la suppression.')
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
        <p className="text-sm font-bold text-blue-600">Modération</p>
        <h1 className="mt-2 text-3xl font-black">Témoignages clients</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          Consulte les avis envoyés depuis le formulaire public et prépare la modération avant publication avancée.
        </p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]">
        <div className="relative max-w-xl">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Rechercher un témoignage..."
            className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-bold outline-none transition focus:border-blue-500 dark:border-white/10 dark:bg-white/[0.04]"
          />
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {filteredTestimonials.map((item) => (
          <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-black">{item.name ?? 'Client anonyme'}</h2>
                <p className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-400">
                  {[item.role, item.company].filter(Boolean).join(' @ ') || 'Profil non renseigné'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-lg bg-yellow-50 px-3 py-2 text-sm font-black text-yellow-600 dark:bg-yellow-500/10">
                  <HiStar size={16} />
                  {item.rating ?? 0}/5
                </div>
                <button
                  onClick={() => handleDelete(item.id, item.name)}
                  aria-label="Supprimer l'avis"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition-colors hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/15"
                >
                  <HiTrash size={16} />
                </button>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.content ?? 'Aucun contenu.'}</p>
          </article>
        ))}
      </section>

      {(loading || hasError || filteredTestimonials.length === 0) && (
        <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm font-bold text-slate-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400">
          {loading ? 'Chargement des témoignages...' : hasError ? 'Impossible de charger les témoignages pour le moment.' : 'Aucun témoignage trouvé.'}
        </div>
      )}
    </div>
  )
}

export default TestimonialsDashboardPage
