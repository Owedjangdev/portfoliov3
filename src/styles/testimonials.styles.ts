export const testimonialStyles = {
  // Section principale
  section: 'relative py-24  dark:bg-[#0A0A0F] overflow-hidden',
  container: 'max-w-6xl mx-auto px-6',
  header: 'flex flex-col items-center text-center md:flex-row md:items-end md:text-left justify-between gap-6 mb-16',
  headerLeft: 'flex flex-col items-center md:items-start gap-4',
  label: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] inline-block w-fit border border-blue-100 dark:border-blue-500/20',
  title: 'text-3xl sm:text-4xl md:text-5xl font-black font-[Clash_Display] text-gray-900 dark:text-white leading-tight',
  titleAccent: 'font-[Clash_Display] bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent',
  ctaBtn: 'group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold text-sm transition-all shadow-lg active:scale-95',

  // Grille et Cartes
  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
  card: 'bg-white dark:bg-[#16161F] p-8 rounded-lg border border-gray-100 dark:border-white/5 shadow-sm flex flex-col gap-6 transition-all hover:shadow-xl',
  stars: 'flex gap-1 text-yellow-400',
  content: 'text-gray-600 dark:text-gray-400 font-[Inter] leading-relaxed italic text-sm',
  author: 'flex items-center gap-4 mt-auto',
  avatar: 'w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold uppercase',
  info: 'flex flex-col',
  name: 'text-sm font-bold text-gray-900 dark:text-white',
  role: 'text-xs text-gray-500 dark:text-gray-500',

  // Modal
  modalOverlay: 'fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto',
  modalContent: 'relative w-full max-w-4xl my-auto animate-in zoom-in duration-300',
  emptyState: 'col-span-full rounded-lg border border-dashed border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400',

  // --- STYLE DU FORMULAIRE (Inspiré de ton image) ---
  f: {
    container: 'w-full bg-white dark:bg-[#0F0F0F] p-8 md:p-10 rounded-lg border border-slate-200 dark:border-white/5 shadow-xl',
    grid: 'grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6',
    group: 'flex flex-col gap-2',
    labelWrapper: 'flex items-center gap-2 mb-1',
    labelIcon: 'text-blue-500 text-sm',
    label: 'text-[10px] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-[0.2em]',
    input: 'w-full bg-slate-50 dark:bg-[#161616] border border-slate-200 dark:border-white/5 rounded-lg px-4 py-4 text-sm text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-gray-600',
    textarea: 'w-full bg-slate-50 dark:bg-[#161616] border border-slate-200 dark:border-white/5 rounded-lg px-4 py-4 text-sm text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all min-h-[140px] resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600',
    starWrapper: 'flex items-center gap-2 mt-2',
    star: 'cursor-pointer transition-all hover:scale-110',
    footer: 'mt-8 flex flex-col md:flex-row items-center justify-between gap-6',
    submitBtn: 'flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-xs uppercase tracking-widest transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
    charCount: 'text-[10px] font-medium text-slate-500 dark:text-gray-600',
    disclaimer: 'text-[10px] text-slate-400 dark:text-gray-600 font-[Inter]'
  }
}
