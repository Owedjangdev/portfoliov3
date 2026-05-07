export const testimonialStyles = {
  // Section principale
  section: 'relative py-24  dark:bg-[#0A0A0F] overflow-hidden',
  container: 'max-w-6xl mx-auto px-6',
  header: 'flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16',
  headerLeft: 'flex flex-col gap-4',
  label: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] inline-block w-fit border border-blue-100 dark:border-blue-500/20',
  title: 'text-4xl md:text-5xl font-black font-[Clash_Display] text-gray-900 dark:text-white',
  titleAccent: 'italic font-serif font-light text-blue-700 dark:text-blue-400 ml-2',
  ctaBtn: 'group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all shadow-lg active:scale-95',

  // Grille et Cartes
  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
  card: 'bg-white dark:bg-[#16161F] p-8 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm flex flex-col gap-6 transition-all hover:shadow-xl',
  stars: 'flex gap-1 text-yellow-400',
  content: 'text-gray-600 dark:text-gray-400 font-[Inter] leading-relaxed italic text-sm',
  author: 'flex items-center gap-4 mt-auto',
  avatar: 'w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold uppercase',
  info: 'flex flex-col',
  name: 'text-sm font-bold text-gray-900 dark:text-white',
  role: 'text-xs text-gray-500 dark:text-gray-500',

  // Modal
  modalOverlay: 'fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto',
  modalContent: 'relative w-full max-w-4xl my-auto animate-in zoom-in duration-300',

  // --- STYLE DU FORMULAIRE (Inspiré de ton image) ---
  f: {
    container: 'w-full bg-[#0F0F0F] p-8 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl',
    grid: 'grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6',
    group: 'flex flex-col gap-2',
    labelWrapper: 'flex items-center gap-2 mb-1',
    labelIcon: 'text-blue-500 text-sm',
    label: 'text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]',
    input: 'w-full bg-[#161616] border border-white/5 rounded-xl px-4 py-4 text-sm text-white focus:border-red-500/50 outline-none transition-all placeholder:text-gray-600',
    textarea: 'w-full bg-[#161616] border border-white/5 rounded-xl px-4 py-4 text-sm text-white focus:border-red-500/50 outline-none transition-all min-h-[140px] resize-none placeholder:text-gray-600',
    starWrapper: 'flex items-center gap-2 mt-2',
    star: 'cursor-pointer transition-all hover:scale-110',
    footer: 'mt-8 flex flex-col md:flex-row items-center justify-between gap-6',
    submitBtn: 'flex items-center gap-3 bg-blue-800/80 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50',
    charCount: 'text-[10px] font-medium text-gray-600',
    disclaimer: 'text-[10px] text-gray-600 font-[Inter]'
  }
}