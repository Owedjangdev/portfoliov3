import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'
import RealisationsPage from './pages/RealisationsPage'
import Footer from './components/Footer'
import TestimonialsPage from './pages/TestimonialsPage'
import Contact from './pages/Contact'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-[#0A0A0F] transition-colors duration-300">
        
        {/* Navbar fixe en haut */}
        <Navbar />
        
        <Routes>
          {/* 1. Page d'accueil */}
          <Route path="/" element={<Home />} />

          {/* 2. Pages spécifiques */}
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/realisations" element={<RealisationsPage />} />

          <Route path="/temoignages" element={<TestimonialsPage />} />
             <Route path="/contact" element={<Contact />} />

          {/* 3. Redirection (TOUJOURS EN DERNIER) */}
          <Route path="*" element={<Home />} />
        </Routes>

        {/* Footer en bas */}
        <Footer />
        
      </div>
    </Router>
  )
}

export default App