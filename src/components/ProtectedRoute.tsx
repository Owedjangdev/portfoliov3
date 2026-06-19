import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/auth'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-sm font-black text-white">
        Chargement de la session...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/dashboard/login" replace state={{ from: location }} />
  }

  return children
}

export default ProtectedRoute
