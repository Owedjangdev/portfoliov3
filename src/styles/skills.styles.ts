export const skillsStyles = {
  section: 'relative py-10 bg-white dark:bg-[#0A0A0F] overflow-hidden',
  container: 'max-w-6xl mx-auto px-6 flex flex-col items-center',
  
  // Header
  header: 'text-center mb-20',
  label: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-4 border border-blue-100 dark:border-blue-500/20 inline-block',
  title: 'text-4xl md:text-6xl font-black font-[Clash_Display] text-gray-900 dark:text-white',
  titleAccent: 'italic font-serif font-light text-blue-700 dark:text-blue-400 ml-2',

  // Orbit System
  orbitContainer: 'relative w-full aspect-square max-w-[600px] flex items-center justify-center',
  
  // Photo Centrale
  centerWrapper: 'relative z-20 w-32 h-32 md:w-44 md:h-44 rounded-full p-2 bg-white dark:bg-[#16161F] border-2 border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.2)]',
  centerImage: 'w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500',
  
  // Cercles d'orbite (pointillés)
  orbitRing: 'absolute rounded-full border border-dashed border-gray-200 dark:border-white/10',
  
  // Icônes de technologie
  techCard: 'absolute z-30 flex flex-col items-center gap-2 group',
  iconBox: 'w-12 h-12 md:w-16 md:h-16 bg-white dark:bg-[#16161F] border border-gray-100 dark:border-white/10 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-blue-500/20 group-hover:border-blue-500/50 transition-all duration-300',
  iconName: 'text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity',
}