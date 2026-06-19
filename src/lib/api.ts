// Client HTTP minimal pour l'API Node.js/Express (remplace Supabase).
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'
const TOKEN_KEY = 'owedev_token'

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
}

interface ApiOptions extends Omit<RequestInit, 'body'> {
  // Joindre le token JWT (routes admin protégées)
  auth?: boolean
  body?: unknown
}

export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { auth, body, headers, ...rest } = options

  const finalHeaders: Record<string, string> = {
    ...(headers as Record<string, string>),
  }

  if (body !== undefined) {
    finalHeaders['Content-Type'] = 'application/json'
  }

  if (auth) {
    const token = tokenStore.get()
    if (token) finalHeaders.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: finalHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const isJson = res.headers.get('content-type')?.includes('application/json')
  const data = isJson ? await res.json() : null

  if (!res.ok) {
    const message = (data && (data as { message?: string }).message) || `Erreur ${res.status}`
    throw new Error(message)
  }

  return data as T
}
