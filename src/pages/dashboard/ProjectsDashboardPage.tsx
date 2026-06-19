import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiPencil, HiPlus, HiSave, HiSearch, HiTrash, HiX } from 'react-icons/hi'
import type { DashboardProject } from '../../features/dashboard/dashboard.types'
import {
  createDashboardProject,
  deleteDashboardProject,
  getDashboardProjects,
  updateDashboardProject,
} from '../../features/dashboard/dashboard.service'

const categories = ['all', 'web', 'mobile', 'api', 'saas', 'wordpress']

type ProjectFormState = Omit<DashboardProject, 'id'> & { id?: string }

const emptyForm: ProjectFormState = {
  title: { fr: '', en: '' },
  desc: { fr: '', en: '' },
  category: 'web',
  url: '',
  image: '',
}

const inputClass =
  'h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none focus:border-blue-500 dark:border-white/10 dark:bg-white/[0.04]'

const ProjectsDashboardPage = () => {
  const { i18n } = useTranslation()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [projects, setProjects] = useState<DashboardProject[]>([])
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [form, setForm] = useState<ProjectFormState>(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [notice, setNotice] = useState('')

  // Projets du portfolio (i18n FR) servant de base à l'import initial.
  const seedProjects = useMemo<Omit<DashboardProject, 'id'>[]>(() => {
    const tFr = i18n.getFixedT('fr')
    const rawProjects = tFr('works.items', { returnObjects: true })
    if (!Array.isArray(rawProjects)) return []
    return (rawProjects as { title: string; desc: string; category?: string; url: string; image: string }[]).map(
      (project) => ({
        title: { fr: project.title, en: project.title },
        desc: { fr: project.desc, en: project.desc },
        category: project.category ?? 'web',
        url: project.url,
        image: project.image,
      }),
    )
  }, [i18n])

  const loadProjects = async () => {
    setLoading(true)
    const { data, hasError: error } = await getDashboardProjects()
    setProjects(data)
    setHasError(error)
    setLoading(false)
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const filteredProjects = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return projects.filter((project) => {
      const projectCategories = (project.category ?? '').split(' ')
      const matchCategory = category === 'all' || projectCategories.includes(category)
      const haystack = `${project.title.fr} ${project.title.en} ${project.desc.fr} ${project.url}`.toLowerCase()
      const matchSearch = !normalizedSearch || haystack.includes(normalizedSearch)

      return matchCategory && matchSearch
    })
  }, [projects, category, search])

  const openCreateForm = () => {
    setForm(emptyForm)
    setEditingId(null)
    setIsFormOpen(true)
    setNotice('')
  }

  const openEditForm = (project: DashboardProject) => {
    setForm({
      id: project.id,
      title: { ...project.title },
      desc: { ...project.desc },
      category: project.category ?? 'web',
      url: project.url,
      image: project.image,
    })
    setEditingId(project.id ?? null)
    setIsFormOpen(true)
    setNotice('')
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const payload = {
      title: form.title,
      desc: form.desc,
      category: form.category,
      url: form.url,
      image: form.image,
    }

    try {
      if (editingId) {
        await updateDashboardProject(editingId, payload)
        setNotice('Projet modifié.')
      } else {
        await createDashboardProject(payload)
        setNotice('Projet ajouté.')
      }
      closeForm()
      await loadProjects()
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Échec de l'enregistrement.")
    }
  }

  const handleDelete = async (project: DashboardProject) => {
    const confirmed = window.confirm(`Supprimer le projet "${project.title.fr}" ?`)
    if (!confirmed || !project.id) return

    try {
      await deleteDashboardProject(project.id)
      setNotice('Projet supprimé.')
      await loadProjects()
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Échec de la suppression.')
    }
  }

  const importSeedProjects = async () => {
    const confirmed = window.confirm('Importer les projets du portfolio actuel dans la base ?')
    if (!confirmed) return

    try {
      await Promise.all(seedProjects.map((project) => createDashboardProject(project)))
      setNotice('Projets du portfolio importés (pense à compléter les traductions EN).')
      await loadProjects()
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Échec de l'import.")
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold text-blue-600">Contenu public</p>
            <h1 className="mt-2 text-3xl font-black">Gestion des projets</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              Ajoute, modifie et supprime les projets (bilingue FR/EN). Données persistées dans MongoDB via l'API.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={importSeedProjects}
              className="rounded-lg bg-slate-100 px-4 py-3 text-sm font-black text-slate-700 transition-colors hover:bg-slate-200 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/15"
            >
              Importer du portfolio
            </button>
            <button
              onClick={openCreateForm}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700"
            >
              <HiPlus size={18} />
              Ajouter un projet
            </button>
          </div>
        </div>
      </section>

      {notice && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-5 py-4 text-sm font-black text-green-700 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-300">
          {notice}
        </div>
      )}

      {hasError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm font-black text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
          Impossible de charger les projets. Vérifie que l'API est démarrée.
        </div>
      )}

      {isFormOpen && (
        <section className="rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-blue-600">{editingId ? 'Modification' : 'Création'}</p>
              <h2 className="text-xl font-black">{editingId ? 'Modifier le projet' : 'Ajouter un projet'}</h2>
            </div>
            <button
              onClick={closeForm}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200"
              aria-label="Fermer le formulaire"
            >
              <HiX size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 lg:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">Titre (FR)</span>
              <input
                value={form.title.fr}
                onChange={(event) => setForm({ ...form, title: { ...form.title, fr: event.target.value } })}
                required
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">Titre (EN)</span>
              <input
                value={form.title.en}
                onChange={(event) => setForm({ ...form, title: { ...form.title, en: event.target.value } })}
                placeholder="Laisse vide pour reprendre le FR"
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">Catégories</span>
              <input
                value={form.category ?? ''}
                onChange={(event) => setForm({ ...form, category: event.target.value })}
                placeholder="web saas wordpress"
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">URL</span>
              <input
                value={form.url}
                onChange={(event) => setForm({ ...form, url: event.target.value })}
                required
                className={inputClass}
              />
            </label>

            <label className="block lg:col-span-2">
              <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">Image</span>
              <input
                value={form.image}
                onChange={(event) => setForm({ ...form, image: event.target.value })}
                placeholder="flora, coinplace ou URL"
                className={inputClass}
              />
            </label>

            <label className="block lg:col-span-2">
              <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">Description (FR)</span>
              <textarea
                value={form.desc.fr}
                onChange={(event) => setForm({ ...form, desc: { ...form.desc, fr: event.target.value } })}
                required
                rows={3}
                className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-blue-500 dark:border-white/10 dark:bg-white/[0.04]"
              />
            </label>

            <label className="block lg:col-span-2">
              <span className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">Description (EN)</span>
              <textarea
                value={form.desc.en}
                onChange={(event) => setForm({ ...form, desc: { ...form.desc, en: event.target.value } })}
                rows={3}
                placeholder="Laisse vide pour reprendre le FR"
                className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-blue-500 dark:border-white/10 dark:bg-white/[0.04]"
              />
            </label>

            <div className="flex justify-end gap-2 lg:col-span-2">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg bg-slate-100 px-4 py-3 text-sm font-black text-slate-700 dark:bg-white/10 dark:text-slate-200"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20"
              >
                <HiSave size={18} />
                Enregistrer
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="rounded-lg border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative max-w-xl flex-1">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher un projet..."
              className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-bold outline-none transition focus:border-blue-500 dark:border-white/10 dark:bg-white/[0.04]"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={[
                  'h-10 rounded-lg px-4 text-xs font-black capitalize transition-colors',
                  category === item
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/15',
                ].join(' ')}
              >
                {item === 'all' ? 'Tous' : item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03]">
        <div className="grid grid-cols-[1.4fr_0.7fr_0.8fr_120px] gap-4 border-b border-slate-200 px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-slate-500 dark:border-white/10 dark:text-slate-400 max-lg:hidden">
          <span>Projet</span>
          <span>Catégorie</span>
          <span>URL</span>
          <span>Actions</span>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-white/10">
          {filteredProjects.map((project) => (
            <article key={project.id ?? project.title.fr} className="grid gap-4 px-5 py-4 lg:grid-cols-[1.4fr_0.7fr_0.8fr_120px] lg:items-center">
              <div>
                <h2 className="font-black">{project.title.fr}</h2>
                <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{project.desc.fr}</p>
              </div>
              <span className="text-sm font-bold capitalize text-slate-600 dark:text-slate-300">{project.category ?? 'Non classé'}</span>
              <span className="truncate text-sm font-bold text-blue-600">{project.url}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditForm(project)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200"
                  aria-label="Modifier"
                >
                  <HiPencil size={17} />
                </button>
                <button
                  onClick={() => handleDelete(project)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600 dark:bg-red-500/10"
                  aria-label="Supprimer"
                >
                  <HiTrash size={17} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {!loading && filteredProjects.length === 0 && (
          <div className="p-6 text-sm font-bold text-slate-500 dark:text-slate-400">
            Aucun projet. Clique sur « Importer du portfolio » ou « Ajouter un projet ».
          </div>
        )}

        {loading && (
          <div className="p-6 text-sm font-bold text-slate-500 dark:text-slate-400">Chargement...</div>
        )}
      </section>
    </div>
  )
}

export default ProjectsDashboardPage
