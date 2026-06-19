interface DashboardSectionPageProps {
  title: string
  description: string
  actionLabel?: string
}

const DashboardSectionPage = ({ title, description, actionLabel }: DashboardSectionPageProps) => {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-blue-600">Module dashboard</p>
            <h1 className="mt-2 text-3xl font-black">{title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
          </div>
          {actionLabel && (
            <button className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700">
              {actionLabel}
            </button>
          )}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
        <div className="flex min-h-80 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 text-center text-sm font-bold text-slate-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400">
          Structure prête. Le CRUD, les filtres, la pagination et la connexion Supabase seront ajoutés après validation.
        </div>
      </section>
    </div>
  )
}

export default DashboardSectionPage
