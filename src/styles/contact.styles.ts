export const contactStyles = {
  section: 'relative py-24 bg-white dark:bg-[#0A0A0F] transition-colors duration-500 overflow-hidden',
  container: 'max-w-7xl mx-auto px-6',

  // --- NOUVEAU : Header d'intro ---
  introWrapper: 'text-center mb-24 max-w-3xl mx-auto',
  introLabel: 'inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] border border-blue-100 dark:border-blue-500/20 mb-6',
  introTitle: 'text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-tight font-[Clash_Display]',
  introAccent: 'italic font-serif font-light text-blue-700 dark:text-blue-500 ml-2',
  introDesc: 'text-lg text-slate-500 dark:text-gray-400 leading-relaxed font-[Inter]',

  grid: 'grid grid-cols-1 lg:grid-cols-12 gap-12 items-start',

  // --- GAUCHE : Cartes d'infos ---
  infoColumn: 'lg:col-span-4 flex flex-col gap-6',
  infoCard: 'p-8 bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-white/5 rounded-[2.5rem] transition-all hover:border-blue-500/30 group hover:shadow-xl hover:shadow-blue-500/5',
  iconBox: 'w-12 h-12 bg-white dark:bg-white/5 rounded-2xl flex items-center justify-center text-blue-600 mb-6 shadow-sm border border-slate-100 dark:border-white/5 group-hover:scale-110 transition-transform',
  infoTitle: 'text-xl font-bold text-slate-900 dark:text-white mb-2 font-[Clash_Display]',
  infoDesc: 'text-sm text-slate-500 dark:text-gray-400 leading-relaxed mb-4 font-[Inter]',
  infoLink: 'text-blue-600 dark:text-blue-500 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all',

  // --- DROITE : Formulaire ---
  formCard: 'lg:col-span-8 bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl',
  formHeader: 'mb-10',
  formTitle: 'text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 font-[Clash_Display]',
  formDesc: 'text-slate-500 dark:text-gray-400 font-[Inter] text-sm',

  inputGrid: 'grid grid-cols-1 md:grid-cols-2 gap-6 mb-6',
  group: 'flex flex-col gap-2',
  label: 'text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-1',
  input: 'w-full bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-white/5 rounded-2xl px-5 py-4 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-all placeholder:text-slate-300 dark:placeholder:text-gray-600',
  select: 'w-full bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-white/5 rounded-2xl px-5 py-4 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-all cursor-pointer',
  textarea: 'w-full bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-white/5 rounded-2xl px-5 py-4 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-all min-h-[160px] resize-none',

  footer: 'mt-10 flex flex-col md:flex-row items-center gap-6',
  submitBtn: 'flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:bg-slate-400',
  responseMsg: 'text-[11px] text-slate-400 dark:text-gray-500 font-[Inter]'
}