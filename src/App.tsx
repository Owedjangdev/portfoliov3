import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import DashboardLayout from './layouts/DashboardLayout'
import ProtectedRoute from './components/ProtectedRoute'

const Home = lazy(() => import('./pages/Home'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const RealisationsPage = lazy(() => import('./pages/RealisationsPage'))
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'))
const Contact = lazy(() => import('./pages/Contact'))
const DashboardHome = lazy(() => import('./pages/dashboard/DashboardHome'))
const DashboardSectionPage = lazy(() => import('./pages/dashboard/DashboardSectionPage'))
const ProjectsDashboardPage = lazy(() => import('./pages/dashboard/ProjectsDashboardPage'))
const TestimonialsDashboardPage = lazy(() => import('./pages/dashboard/TestimonialsDashboardPage'))
const MessagesDashboardPage = lazy(() => import('./pages/dashboard/MessagesDashboardPage'))
const LoginPage = lazy(() => import('./pages/dashboard/LoginPage'))
const DashboardRedirect = lazy(() => import('./pages/dashboard/DashboardRedirect'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="min-h-screen bg-white dark:bg-[#0A0A0F]" />}>
        <Routes>
          <Route path="/dashbord/*" element={<DashboardRedirect />} />
          <Route path="/dashboard/login" element={<LoginPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="projects" element={<ProjectsDashboardPage />} />
            <Route path="testimonials" element={<TestimonialsDashboardPage />} />
            <Route path="messages" element={<MessagesDashboardPage />} />
            <Route
              path="categories"
              element={
                <DashboardSectionPage
                  title="Catégories"
                  description="Organiser les projets, services et contenus par catégories claires et maintenables."
                  actionLabel="Créer une catégorie"
                />
              }
            />
            <Route
              path="users"
              element={
                <DashboardSectionPage
                  title="Utilisateurs"
                  description="Préparer la gestion des rôles admin, éditeur et lecteur pour sécuriser le back-office."
                />
              }
            />
            <Route
              path="settings"
              element={
                <DashboardSectionPage
                  title="Paramètres"
                  description="Centraliser les réglages du site, les informations publiques et les préférences du dashboard."
                />
              }
            />
          </Route>

          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="realisations" element={<RealisationsPage />} />
            <Route path="temoignages" element={<TestimonialsPage />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
