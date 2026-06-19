export const rPage = {
  section: 'relative py-24 bg-white dark:bg-[#0A0A0F] min-h-screen transition-colors duration-500',
  container: 'max-w-6xl mx-auto px-6',
  
  header: 'mb-16 max-w-3xl flex flex-col items-start text-left',
  label: 'inline-flex items-center w-fit mb-5 px-4 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] border border-blue-100 dark:border-blue-500/20',
  title: 'text-4xl sm:text-5xl md:text-7xl font-black font-[Clash_Display] text-slate-900 dark:text-white leading-[1.05] tracking-tight',
  titleAccent: 'font-[Clash_Display] bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent ml-3',
  subtitle: 'mt-5 text-lg text-slate-500 dark:text-gray-400 font-[Inter] leading-relaxed max-w-2xl',

  // Stats
  statsGrid: 'grid grid-cols-1 md:grid-cols-3 gap-6 mb-20',
  statCard: 'bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-10 rounded-lg text-center transition-all hover:border-blue-500/30',
  statNumber: 'text-5xl font-black text-blue-600 dark:text-blue-500 mb-2 font-[Clash_Display]',
  statLabel: 'text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-[0.2em]',

  // Filters & Search
  controlsWrapper: 'flex flex-col gap-8 mb-12',
  filterList: 'flex flex-wrap items-center justify-center gap-3',
  filterBtn: (active: boolean) => `px-6 py-2.5 rounded-lg text-xs font-bold transition-all border ${
    active 
    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' 
    : 'bg-transparent border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400 hover:border-blue-500/50'
  }`,
  
  searchRow: 'flex flex-wrap items-center justify-center gap-4',
  inputWrapper: 'relative w-full max-w-md',
  input: 'w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-6 py-4 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500/50 transition-all',
  
  actionBtn: 'px-8 py-4 rounded-lg font-bold text-xs uppercase tracking-widest transition-all active:scale-95',
  searchBtn: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20',
  resetBtn: 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-white/10',

  // Grid
  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
  
  // Project Card (Mac Style)
  card: 'group flex flex-col bg-white dark:bg-[#111111] rounded-lg overflow-hidden border border-slate-200 dark:border-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl',
  browserBar: 'flex items-center gap-1.5 px-5 py-4 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]',
  dot: 'w-2.5 h-2.5 rounded-full',
  addressBar: 'flex-1 bg-white dark:bg-black/20 rounded-lg h-6 mx-4 flex items-center px-3 text-[10px] text-slate-400 dark:text-gray-600 font-mono truncate',
  emptyState: 'mt-12 rounded-lg border border-dashed border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-6 py-10 text-center text-sm font-medium text-slate-500 dark:text-gray-400'
}
