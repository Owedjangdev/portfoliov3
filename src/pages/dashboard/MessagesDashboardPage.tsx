import { useEffect, useMemo, useState } from 'react'
import { HiMail, HiSearch, HiTrash } from 'react-icons/hi'
import { deleteDashboardMessage, getDashboardMessages } from '../../features/dashboard/dashboard.service'
import type { DashboardMessage } from '../../features/dashboard/dashboard.types'

const MessagesDashboardPage = () => {
  const [messages, setMessages] = useState<DashboardMessage[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let ignore = false

    const loadMessages = async () => {
      setLoading(true)
      const result = await getDashboardMessages()
      if (!ignore) {
        setMessages(result.data)
        setHasError(result.hasError)
        setLoading(false)
      }
    }

    loadMessages()

    return () => {
      ignore = true
    }
  }, [])

  const filteredMessages = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    if (!normalizedSearch) return messages

    return messages.filter((item) =>
      [item.name, item.email, item.phone, item.project_type, item.budget, item.subject, item.message]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedSearch)),
    )
  }, [messages, search])

  const handleDelete = async (id: DashboardMessage['id'], name?: string | null) => {
    if (!id) return
    if (!window.confirm(`Supprimer le message de ${name || 'ce contact'} ? Cette action est définitive.`)) return
    try {
      await deleteDashboardMessage(String(id))
      setMessages((prev) => prev.filter((item) => item.id !== id))
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Échec de la suppression.')
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
        <p className="text-sm font-bold text-blue-600">Prospection</p>
        <h1 className="mt-2 text-3xl font-black">Messages de contact</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          Suivi des demandes envoyées depuis la page contact, avec recherche par client, budget ou type de projet.
        </p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]">
        <div className="relative max-w-xl">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Rechercher un message..."
            className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-bold outline-none transition focus:border-blue-500 dark:border-white/10 dark:bg-white/[0.04]"
          />
        </div>
      </section>

      <section className="space-y-4">
        {filteredMessages.map((item) => (
          <article key={`${item.id ?? item.email}-${item.created_at}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <HiMail className="text-blue-600" size={18} />
                  <h2 className="font-black">{item.name ?? 'Contact inconnu'}</h2>
                </div>
                <a href={item.email ? `mailto:${item.email}` : undefined} className="mt-2 block text-sm font-bold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">{item.email ?? 'Email non renseigné'}</a>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-black text-blue-600 dark:bg-blue-500/10">{item.project_type ?? 'Projet'}</span>
                <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-black text-slate-600 dark:bg-white/10 dark:text-slate-300">{item.budget ?? 'Budget non précisé'}</span>
                <button
                  onClick={() => handleDelete(item.id, item.name)}
                  aria-label="Supprimer le message"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition-colors hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/15"
                >
                  <HiTrash size={16} />
                </button>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.message ?? 'Aucun message.'}</p>
          </article>
        ))}
      </section>

      {(loading || hasError || filteredMessages.length === 0) && (
        <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm font-bold text-slate-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400">
          {loading ? 'Chargement des messages...' : hasError ? 'Impossible de charger les messages pour le moment.' : 'Aucun message trouvé.'}
        </div>
      )}
    </div>
  )
}

export default MessagesDashboardPage
