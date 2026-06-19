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
    'flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-500 hover:text-blue-500 transition-all',

  langDropdown:
    'absolute right-0 top-full mt-2 w-36 rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#16161F] shadow-lg overflow-hidden z-50',

  langItem: (active: boolean) =>
    `w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
      active
        ? 'text-blue-500 bg-blue-50 dark:bg-blue-500/10'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
    }`,

  themeButton:
    'p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-500 hover:text-blue-500 transition-all',

  mobileButton:
    'md:hidden flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors',

  mobileMenu:
    'md:hidden border-t border-gray-100 dark:border-white/10 bg-white dark:bg-[#0D0D14] px-4 pt-3 pb-5 flex flex-col gap-1.5 shadow-xl shadow-black/5',

  mobileLink: (active: boolean) =>
    `flex items-center rounded-xl px-4 py-3.5 text-base font-bold font-[Inter] transition-colors cursor-pointer ${
      active
        ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5'
    }`,

  mobileCta:
    'mt-2 flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-3.5 text-sm font-bold font-[Inter] transition-colors',

  chevron: (open: boolean) =>
    `transition-transform duration-200 ${open ? 'rotate-180' : 'rotate-0'}`,

  ctaButton:
    'hidden md:inline-flex items-center px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold font-[Inter] transition-all duration-300',
}
