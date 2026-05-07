export const heroStyles = {
  section:
    'relative min-h-screen flex items-center pt-[72px] bg-white dark:bg-[#0A0A0F] overflow-hidden',

  container:
    'max-w-6xl mx-auto px-6 w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12 py-16 md:py-20',

  left:
    'flex-1 flex flex-col gap-5 z-10 text-center md:text-left items-center md:items-start',

  badge:
    'inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-500 text-xs font-semibold w-fit',

  badgeDot:
    'w-2 h-2 rounded-full bg-green-500 animate-pulse',

  greeting:
    'text-gray-500 dark:text-gray-400 text-base md:text-lg font-medium font-[Inter]',

  name:
    'text-4xl sm:text-5xl md:text-7xl font-black font-[Clash_Display] text-gray-900 dark:text-white leading-none tracking-tight',

  title:
    'text-xl sm:text-2xl md:text-3xl font-bold font-[Clash_Display] leading-snug text-gray-800 dark:text-gray-100',

  titleAccent: (color: string) =>
    `bg-gradient-to-r ${color} bg-clip-text text-transparent`,

  description:
    'text-sm md:text-base text-gray-500 dark:text-gray-400 font-[Inter] max-w-lg leading-relaxed',

  ctaWrapper:
    'flex items-center gap-4 flex-wrap justify-center md:justify-start',

  ctaPrimary:
    'inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold font-[Inter] transition-all duration-300 shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 cursor-pointer',

  ctaSecondary:
    'inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold font-[Inter] hover:border-blue-500 hover:text-blue-500 transition-all duration-300 cursor-pointer',

  services:
    'flex items-center gap-3 flex-wrap pt-2 justify-center md:justify-start',

  serviceTag:
    'flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 text-xs font-medium font-[Inter] border border-gray-200 dark:border-white/10',

   right:
    'flex-1 flex justify-center items-center relative z-10 w-full mt-12 md:mt-0', // Ajout d'une marge en haut pour le mobile

  imageWrapper:
    'relative w-64 h-72 sm:w-72 sm:h-80 md:w-96 md:h-[480px] mx-auto', // Légèrement agrandi sur mobile pour laisser de la place aux badges

  imageBg:
    'absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10 blur-2xl scale-110',

  image:
    'relative w-full h-full object-cover object-top rounded-3xl shadow-2xl',

  bgBlob1:
    'absolute top-20 right-20 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none',

  bgBlob2:
    'absolute bottom-20 left-10 w-72 h-72 rounded-full bg-purple-500/5 blur-3xl pointer-events-none',// Dans heroStyles
 




}