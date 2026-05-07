export const worksStyles = {
  // Fond adapté pour faire ressortir les cartes blanches en mode clair
  section: 'relative py-24 bg-slate-50 dark:bg-[#0A0A0F] overflow-hidden transition-colors duration-500',
  container: 'max-w-6xl mx-auto px-6',
  
  header: 'flex flex-col items-center text-center mb-16',
  label: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-4 border border-blue-100 dark:border-blue-500/20',
  title: 'text-4xl md:text-5xl font-black font-[Clash_Display] text-slate-900 dark:text-white',
  titleAccent: 'italic font-serif font-light text-blue-700 dark:text-blue-400 ml-2',

  // Zone de défilement
  scrollWrapper: 'relative w-full overflow-hidden py-10 rounded-3xl', 
  track: 'flex gap-6 md:gap-8',

  // Carte style Browser
  card: 'flex flex-col min-w-[300px] md:min-w-[420px] bg-white dark:bg-[#16161F] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-500',
  
  browserBar: 'flex items-center gap-1.5 px-4 py-3 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5',
  dotBlue: 'w-2 h-2 rounded-full bg-blue-400',
  dotYellow: 'w-2 h-2 rounded-full bg-[#FFBD2E]',
  dotGreen: 'w-2 h-2 rounded-full bg-[#28C840]',
  addressBar: 'flex-1 bg-white dark:bg-[#0A0A0F] rounded-md h-5 mx-3 flex items-center px-3 text-[9px] text-slate-400 dark:text-gray-500 font-mono truncate border border-slate-100 dark:border-white/5',

  imageWrapper: 'relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-white/5',
  image: 'w-full h-full object-cover transition-transform duration-700 hover:scale-105',
  overlay: 'absolute inset-0 bg-blue-600/10 opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]',

  content: 'p-6 flex flex-col gap-2 whitespace-normal', 
  projectTitle: 'text-lg md:text-xl font-bold text-slate-900 dark:text-white',
  projectDesc: 'text-xs md:text-sm text-slate-500 dark:text-gray-400 leading-relaxed line-clamp-2',

  buttonWrapper: 'mt-12 flex justify-center',
  button: 'group flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg'
}