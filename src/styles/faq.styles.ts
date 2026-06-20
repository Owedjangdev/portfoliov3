export const faqStyles = {
  section: 'relative py-24 bg-white dark:bg-[#0A0A0F] overflow-hidden',
  container: 'max-w-3xl mx-auto px-6',
  
  header: 'text-center mb-16',
  label: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] mb-4 border border-blue-100 dark:border-blue-500/20 inline-block',
  title: 'text-3xl sm:text-4xl md:text-5xl font-black font-[Clash_Display] text-gray-900 dark:text-white leading-tight break-words',
  titleAccent: 'font-[Clash_Display] bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent ml-2',

  // Accordion
  wrapper: 'flex flex-col gap-4',
  item: 'group border border-gray-100 dark:border-white/5 rounded-lg bg-gray-50/50 dark:bg-white/5 overflow-hidden transition-all duration-300',
  itemActive: 'border-blue-500/30 bg-white dark:bg-white/[0.07] shadow-xl shadow-blue-500/5',
  
  questionBtn: 'w-full flex items-center justify-between p-6 text-left outline-none',
  questionText: 'text-base md:text-lg font-bold text-gray-900 dark:text-white transition-colors group-hover:text-blue-600',
  icon: 'w-5 h-5 text-blue-500 transition-transform duration-300',
  
  answerWrapper: 'grid transition-all duration-300 ease-in-out',
  answerContent: 'overflow-hidden',
  answerText: 'px-6 pb-6 text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed'
}
