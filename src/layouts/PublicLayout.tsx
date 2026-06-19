import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0F] transition-colors duration-300">
      <Navbar />
      <Outlet />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default PublicLayout
