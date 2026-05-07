export const navbarStyles = {
  header: (scrolled: boolean) =>
    `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/80 dark:bg-[#0A0A0F]/80 backdrop-blur-md shadow-sm'
        : 'bg-transparent'
    }`,

  container:
    'max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between',

  logo:
    'text-xl font-bold font-[Clash_Display] text-gray-900 dark:text-white',

  navLink:
    'text-sm font-medium font-[Inter] text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-pointer',

  langButton:
    'flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-500 hover:text-blue-500 transition-all',

  langDropdown:
    'absolute right-0 top-full mt-2 w-36 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#16161F] shadow-lg overflow-hidden z-50',

  langItem: (active: boolean) =>
    `w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
      active
        ? 'text-blue-500 bg-blue-50 dark:bg-blue-500/10'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
    }`,

  themeButton:
    'p-2 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-500 hover:text-blue-500 transition-all',

  mobileButton:
    'md:hidden p-2 text-gray-600 dark:text-gray-300',

  mobileMenu:
    'md:hidden bg-white dark:bg-[#111118] border-t border-gray-100 dark:border-gray-800 px-6 py-4 flex flex-col gap-4',

  mobileLink:
    'text-sm font-medium font-[Inter] text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors cursor-pointer',

  chevron: (open: boolean) =>
    `transition-transform duration-200 ${open ? 'rotate-180' : 'rotate-0'}`,

  ctaButton:
    'hidden md:inline-flex items-center px-5 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold font-[Inter] transition-all duration-300',
}