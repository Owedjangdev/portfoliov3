import { Navigate, useLocation } from 'react-router-dom'

const DashboardRedirect = () => {
  const location = useLocation()
  const dashboardPath = location.pathname.replace(/^\/dashbord/, '/dashboard')

  return <Navigate to={`${dashboardPath}${location.search}`} replace />
}

export default DashboardRedirect
