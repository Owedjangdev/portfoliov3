// Placeholders animés affichés pendant le chargement des données (cold start API, etc.)
const bar = 'animate-pulse rounded bg-slate-200 dark:bg-white/10'

export const TestimonialCardSkeleton = () => (
  <div className="rounded-lg border border-slate-100 bg-white p-8 shadow-sm dark:border-white/5 dark:bg-[#16161F]">
    <div className="flex gap-1.5">
      {[...Array(5)].map((_, i) => (
        <div key={i} className={`h-4 w-4 ${bar}`} />
      ))}
    </div>
    <div className="mt-5 space-y-2.5">
      <div className={`h-3 w-full ${bar}`} />
      <div className={`h-3 w-11/12 ${bar}`} />
      <div className={`h-3 w-3/4 ${bar}`} />
    </div>
    <div className="mt-6 flex items-center gap-4">
      <div className={`h-10 w-10 rounded-full ${bar}`} />
      <div className="space-y-2">
        <div className={`h-3 w-24 ${bar}`} />
        <div className={`h-2.5 w-32 ${bar}`} />
      </div>
    </div>
  </div>
)

export const ProjectCardSkeleton = () => (
  <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-white/5 dark:bg-[#16161F]">
    <div className="flex gap-1.5 border-b border-slate-100 px-4 py-3 dark:border-white/5">
      <div className={`h-2.5 w-2.5 rounded-full ${bar}`} />
      <div className={`h-2.5 w-2.5 rounded-full ${bar}`} />
      <div className={`h-2.5 w-2.5 rounded-full ${bar}`} />
    </div>
    <div className="aspect-video w-full animate-pulse bg-slate-200 dark:bg-white/10" />
    <div className="space-y-3 p-6">
      <div className={`h-4 w-2/3 ${bar}`} />
      <div className={`h-3 w-full ${bar}`} />
      <div className={`h-3 w-5/6 ${bar}`} />
    </div>
  </div>
)
