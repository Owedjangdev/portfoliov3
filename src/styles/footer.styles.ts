export const footerStyles = {
  // Fond gris très léger en Light, Noir profond en Dark
  footer: 'bg-slate-50 dark:bg-[#050505] pt-20 pb-10 border-t border-slate-200 dark:border-white/5 transition-colors duration-500',
  container: 'max-w-6xl mx-auto px-6',
  
  // Grid principale
  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16',
  
  // Colonne 1 : Logo & Contact
  logoArea: 'flex flex-col gap-6',
  // Texte adapté aux deux modes
  description: 'text-sm text-slate-600 dark:text-gray-400 leading-relaxed max-w-[280px]',
  contactList: 'flex flex-col gap-3',
  contactItem: 'flex items-center gap-3 text-sm text-slate-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-500 transition-colors cursor-pointer',
  contactIcon: 'text-blue-600 dark:text-blue-500 text-lg',

  // Colonnes 2 & 3 : Liens
  // Titre : Noir en Light, Blanc en Dark
  columnTitle: 'text-xs font-bold text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-8',
  linkList: 'flex flex-col gap-4',
  linkItem: 'flex items-center gap-2 text-sm text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all group',
  linkIcon: 'text-[10px] text-blue-600 dark:text-blue-500 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all',

  // Colonne 4 : Socials
  socialText: 'text-sm text-slate-600 dark:text-gray-400 mb-6 leading-relaxed',
  socialGrid: 'flex gap-3',
  // Icônes avec fond gris clair en Light, fond sombre en Dark
  socialIcon: 'w-10 h-10 rounded-xl bg-slate-200/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300',

  // Barre de copyright
  bottomBar: 'pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4',
  copyright: 'text-[11px] text-slate-500 dark:text-gray-600 tracking-wider',
  credits: 'text-[11px] text-slate-500 dark:text-gray-600'
}