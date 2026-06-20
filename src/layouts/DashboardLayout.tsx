import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  HiFolderOpen,
  HiChatAlt2,
  HiMail,
  HiTag,
  HiUsers,
  HiCog,
  HiViewGrid,
  HiLogout,
  HiSun,
  HiMoon,
} from 'react-icons/hi'
import { useAuth } from '../context/auth'
import { useTheme } from '../context/theme'
import logoLight from '../assets/images/logo-light.png'
import logoDark from '../assets/images/logo-dark.png'

const navItems = [
  { label: 'Vue globale', to: '/dashboard', icon: HiViewGrid, end: true },
  { label: 'Projets', to: '/dashboard/projects', icon: HiFolderOpen },
  { label: 'Témoignages', to: '/dashboard/testimonials', icon: HiChatAlt2 },
  { label: 'Messages', to: '/dashboard/messages', icon: HiMail },
  { label: 'Catégories', to: '/dashboard/categories', icon: HiTag },
  { label: 'Utilisateurs', to: '/dashboard/users', icon: HiUsers },
  { label: 'Paramètres', to: '/dashboard/settings', icon: HiCog },
]

const DashboardLayout = () => {
  const { signOut, user } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/dashboard/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 dark:bg-[#080A12] dark:text-white">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200 bg-white px-4 py-6 dark:border-white/10 dark:bg-[#0D101B] lg:block">
        <div className="mb-10 px-2">
          <img src={logoLight} alt="OweDev Digitaly" className="h-9 w-auto block dark:hidden" />
          <img src={logoDark} alt="OweDev Digitaly" className="h-9 w-auto hidden dark:block" />
          <p className="mt-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">Dashboard admin</p>
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  [
                    'group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/25'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white',
                  ].join(' ')
                }
              >
                <Icon size={18} className="shrink-0" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-white/[0.04]">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-black uppercase text-white">
              {user?.email?.charAt(0) ?? 'A'}
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Connecté</p>
              <p className="truncate text-sm font-black">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-3 py-3 text-sm font-black text-red-600 transition hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/15"
          >
            <HiLogout size={18} />
            Déconnexion
          </button>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur dark:border-white/10 dark:bg-[#0D101B]/90 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Administration</p>
              <h2 className="text-xl font-black">Centre de contrôle</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
              >
                {isDark ? <HiSun size={18} /> : <HiMoon size={18} />}
              </button>
              <button
                onClick={handleSignOut}
                className="rounded-xl bg-red-50 px-3 py-2 text-xs font-black text-red-600 dark:bg-red-500/10 sm:px-4 sm:py-2.5 lg:hidden"
              >
                Déconnexion
              </button>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:hidden">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    [
                      'whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold',
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
