export const aboutStyles = {
  section:
    'relative py-24 bg-white dark:bg-[#0A0A0F] overflow-hidden',
  container:
    'max-w-6xl mx-auto px-6 flex flex-col gap-20',

  // Bloc haut
  topRow:
    'flex flex-col md:flex-row items-center gap-16 w-full',

  left:
    'flex-1 flex justify-center relative order-2 md:order-1',
  imageWrapper:
    'relative w-72 h-80 md:w-80 md:h-96',
  imageBg:
    'absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/15 to-emerald-500/10 blur-2xl scale-105',
  image:
    'relative w-full h-full object-cover object-top rounded-xl shadow-2xl',
  expBadge:
    'absolute -bottom-6 -right-6 bg-white dark:bg-[#16161F] border border-gray-100 dark:border-gray-800 rounded-lg px-4 py-3 shadow-xl flex flex-col items-center',
  expBadgeNumber:
    'text-3xl font-black font-[Clash_Display] text-blue-500',
  expBadgeLabel:
    'text-xs text-gray-500 dark:text-gray-400 font-[Inter]',

  right:
    'flex-[1.2] flex flex-col gap-6 order-1 md:order-2 text-left',
  label:
    'text-blue-500 text-sm font-semibold font-[Inter] uppercase tracking-widest',
  title:
    'text-3xl sm:text-4xl md:text-5xl font-black font-[Clash_Display] text-gray-900 dark:text-white leading-tight break-words',
  bio:
    'text-base text-gray-500 dark:text-gray-400 font-[Inter] leading-relaxed',
  statsWrapper:
    'grid grid-cols-3 gap-4 py-2',
  statCard:
    'flex flex-col items-center gap-1 p-4 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10',
  statNumber:
    'text-2xl font-black font-[Clash_Display] text-gray-900 dark:text-white',
  statLabel:
    'text-xs text-gray-500 dark:text-gray-400 font-[Inter] text-center',

  // ── Blocs Timeline (Exp & Edu) ───────────────────────
  timelineLayout:
    'w-full flex flex-col md:flex-row gap-16', // Conteneur pour mettre Exp et Edu côte à côte sur desktop
  
  timelineSection:
    'flex flex-col gap-8 flex-1',
  timelineHeader:
    'flex items-center gap-4',
  timelineIcon:
    'w-5 h-5 text-blue-500 dark:text-blue-400 shrink-0',
  timelineTitle:
    'text-xs font-bold font-[Inter] uppercase tracking-widest text-gray-400 dark:text-gray-500',
  timelineLine:
    'flex-1 h-px bg-gray-200 dark:bg-gray-800',

  timelineList:
    'flex flex-col gap-0 border-l-2 border-gray-100 dark:border-gray-800 ml-3',

  timelineItem:
    'relative pl-8 pb-10 last:pb-0',
  timelineDot:
    'absolute -left-[11px] top-1 w-5 h-5 rounded-full border-2 border-blue-400 dark:border-blue-500 bg-white dark:bg-[#0A0A0F] flex items-center justify-center',
  timelineDotInner:
    'w-2 h-2 rounded-full bg-blue-400 dark:bg-blue-500',
  timelinePeriod:
    'text-xs font-bold font-[Inter] text-blue-500 dark:text-blue-400 uppercase tracking-wider mb-1',
  timelineRole:
    'text-base font-bold font-[Clash_Display] text-gray-900 dark:text-white',
  timelineCompanyRow:
    'flex items-center gap-2 mt-1 mb-2',
  timelineCompany:
    'text-sm text-gray-500 dark:text-gray-400 font-[Inter]',
  
  timelineBadge: (type: string) => {
    const map: Record<string, string> = {
      'Télétravail': 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10',
      'Remote':      'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10',
      'Présentiel':  'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
      'On-site':     'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
      'Freelance':   'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/20',
      'Remote / Freelance': 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/20',
    }
    const base = 'text-[10px] font-bold font-[Inter] px-2 py-0.5 rounded-full border uppercase tracking-tighter'
    return `${base} ${map[type] ?? map['Freelance']}`
  },
  timelineDesc:
    'text-sm text-gray-500 dark:text-gray-400 font-[Inter] leading-relaxed',
}
