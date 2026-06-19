import { useEffect, useMemo, useState } from 'react'
import { api, tokenStore } from '../lib/api'
import { AuthContext, type AuthContextType, type AuthUser } from './auth'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const restoreSession = async () => {
      if (!tokenStore.get()) {
        if (mounted) setLoading(false)
        return
      }
      try {
        const { user: current } = await api<{ user: AuthUser }>('/auth/me', { auth: true })
        if (mounted) setUser(current)
      } catch {
        tokenStore.clear()
        if (mounted) setUser(null)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    restoreSession()

    return () => {
      mounted = false
    }
  }, [])

  const value = useMemo<AuthContextType>(() => ({
    user,
    loading,
    signIn: async (email, password) => {
      try {
        const { token, user: current } = await api<{ token: string; user: AuthUser }>('/auth/login', {
          method: 'POST',
          body: { email, password },
        })
        tokenStore.set(token)
        setUser(current)
        return {}
      } catch (error) {
        return { error: error instanceof Error ? error.message : 'Connexion impossible' }
      }
    },
    signOut: async () => {
      tokenStore.clear()
      setUser(null)
    },
  }), [loading, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
