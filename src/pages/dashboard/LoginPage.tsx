import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { HiLockClosed, HiMail, HiArrowRight } from 'react-icons/hi'
import { useAuth } from '../../context/auth'
import logoLight from '../../assets/images/logo-light.png'
import logoDark from '../../assets/images/logo-dark.png'

const LoginPage = () => {
  const { signIn, user, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const redirectTo = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/dashboard'

  if (!loading && user) {
    return <Navigate to={redirectTo} replace />
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    const result = await signIn(email.trim(), password)
    setSubmitting(false)

    if (result.error) {
      setError('Identifiants invalides ou compte non autorisé.')
      return
    }

    navigate(redirectTo, { replace: true })
  }

  const inputClass =
    'h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-white/10 dark:bg-white/5 dark:text-white'

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 dark:bg-[#080A12]">
      {/* Halos décoratifs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-500/15" />
        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-cyan-400/15 blur-3xl dark:bg-cyan-500/10" />
      </div>

      <section className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white/80 p-8 shadow-2xl shadow-slate-300/40 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:shadow-black/40">
        {/* Marque */}
        <div className="mb-8 flex flex-col items-center text-center">
          <img src={logoLight} alt="OweDev Digitaly" className="mb-5 h-12 w-auto block dark:hidden" />
          <img src={logoDark} alt="OweDev Digitaly" className="mb-5 h-12 w-auto hidden dark:block" />
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">owedev admin</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Connexion</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Accès réservé à l'administration du portfolio.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">Email</span>
            <span className="relative block">
              <HiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                required
                autoComplete="email"
                className={inputClass}
                placeholder="admin@exemple.com"
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">Mot de passe</span>
            <span className="relative block">
              <HiLockClosed className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                required
                autoComplete="current-password"
                className={inputClass}
                placeholder="••••••••"
              />
            </span>
          </label>

          {error && (
            <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-black text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Connexion...' : (
              <>
                Se connecter
                <HiArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
              </>
            )}
          </button>
        </form>
      </section>
    </main>
  )
}

export default LoginPage
