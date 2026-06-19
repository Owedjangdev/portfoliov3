export const contactStyles = {
  section: 'relative py-24 bg-white dark:bg-[#0A0A0F] transition-colors duration-500 overflow-hidden',
  container: 'relative z-10 max-w-6xl mx-auto px-6',

  // --- NOUVEAU : Header d'intro ---
  introWrapper: 'text-center mb-16 max-w-3xl mx-auto',
  introLabel: 'inline-block px-4 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] border border-blue-100 dark:border-blue-500/20 mb-4',
  introTitle: 'text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-tight font-[Clash_Display]',
  introAccent: 'font-[Clash_Display] bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent ml-2',
  introDesc: 'text-lg text-slate-500 dark:text-gray-400 leading-relaxed font-[Inter]',

  grid: 'grid grid-cols-1 lg:grid-cols-12 gap-12 items-start',

  // --- GAUCHE : Cartes d'infos ---
  infoColumn: 'lg:col-span-4 flex flex-col gap-6',
  infoCard: 'group p-8 rounded-2xl bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-lg shadow-slate-200/50 dark:shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10',
  iconBox: 'w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300',
  infoTitle: 'text-xl font-bold text-slate-900 dark:text-white mb-2 font-[Clash_Display]',
  infoDesc: 'text-sm text-slate-500 dark:text-gray-400 leading-relaxed mb-4 font-[Inter]',
  infoLink: 'text-blue-600 dark:text-blue-500 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all',

  // --- DROITE : Formulaire ---
  formCard: 'lg:col-span-8 p-8 md:p-12 rounded-2xl bg-white/80 dark:bg-white/[0.03] backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-2xl shadow-slate-300/30 dark:shadow-black/40',
  formHeader: 'mb-10',
  formTitle: 'text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 font-[Clash_Display]',
  formDesc: 'text-slate-500 dark:text-gray-400 font-[Inter] text-sm',

  inputGrid: 'grid grid-cols-1 md:grid-cols-2 gap-6 mb-6',
  group: 'flex flex-col gap-2',
  label: 'text-[11px] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-[0.18em] ml-1',
  input: 'w-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-lg px-5 py-4 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all placeholder:text-slate-300 dark:placeholder:text-gray-600',
  select: 'w-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-lg px-5 py-4 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all cursor-pointer',
  textarea: 'w-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-lg px-5 py-4 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all min-h-[160px] resize-none',

  footer: 'mt-10 flex flex-col md:flex-row items-center gap-6',
  submitBtn: 'flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-lg font-bold uppercase tracking-widest text-xs transition-all shadow-lg active:scale-95 cursor-pointer focus-visible:ring-4 focus-visible:ring-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-400',
  errorMsg: 'text-xs text-red-500 mt-2 font-bold font-[Inter]',
  successMsg: 'text-xs text-green-500 mt-2 font-bold font-[Inter]',
  responseMsg: 'text-[11px] text-slate-400 dark:text-gray-500 font-[Inter]'
}
