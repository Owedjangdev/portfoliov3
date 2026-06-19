import { createContext, useContext } from 'react'

export interface AuthUser {
  id: string
  email: string
  name: string
}

export interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({}),
  signOut: async () => {},
})

export const useAuth = () => useContext(AuthContext)
