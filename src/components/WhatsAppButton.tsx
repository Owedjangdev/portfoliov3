import { FaWhatsapp } from 'react-icons/fa'

// Numéro au format international sans le "+" ni espaces (requis par wa.me)
const PHONE = '2290154215693'

const WhatsAppButton = () => {
  return (
    <a
      href={`https://wa.me/${PHONE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter sur WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/30 transition-transform duration-200 hover:scale-110 hover:bg-[#1ebe5d] focus:outline-none focus-visible:ring-4 focus-visible:ring-green-500/40"
    >
      <FaWhatsapp className="h-7 w-7" />
      {/* Halo pulsant pour attirer l'œil */}
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" />
    </a>
  )
}

export default WhatsAppButton
