import { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom' // Pour la redirection
import { api } from '../lib/api'
import { TestimonialCardSkeleton } from '../components/Skeletons'
import { HiStar, HiPlus } from 'react-icons/hi'
import { testimonialStyles as s } from '../styles/testimonials.styles'

interface Review {
  id: string | number
  name?: string
  role?: string
  company?: string
  content?: string
  rating?: number
}

const Testimonials = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const fetchRecentReviews = async () => {
      try {
        // ?limit=3 pour n'afficher que les 3 derniers avis sur l'accueil
        const data = await api<Review[]>('/testimonials?limit=3')
        setReviews(data)
      } catch (error) {
        console.error('Erreur chargement témoignages:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRecentReviews()
  }, [])

  return (
    <section id="testimonials" ref={sectionRef} className={s.section}>
      <div className={s.container}>
        
        {/* Header : Le bouton redirige maintenant vers la page dédiée */}
        <div className={s.header}>
          <div className={s.headerLeft}>
            <span className={s.label}>{t('testimonials.label')}</span>
            <h2 className={s.title}>
              {t('testimonials.title')}
              <span className={s.titleAccent}>{t('testimonials.title_accent')}</span>
            </h2>
          </div>
          
          <button 
            onClick={() => navigate('/temoignages')} 
            className={s.ctaBtn}
          >
            <HiPlus /> {t('testimonials.cta')}
          </button>
        </div>

        {/* Grille limitée aux plus récents */}
        <div className={s.grid}>
          {loading ? (
            [...Array(3)].map((_, i) => <TestimonialCardSkeleton key={i} />)
          ) : reviews.length > 0 ? (
            reviews.map((item) => (
              <div key={item.id} className={s.card}>
                <div className={s.stars}>
                  {[...Array(item.rating ?? 5)].map((_, i) => <HiStar key={i} />)}
                </div>
                <p className={s.content}>"{item.content}"</p>
                <div className={s.author}>
                  <div className={s.avatar}>{item.name?.charAt(0)}</div>
                  <div className={s.info}>
                    <span className={s.name}>{item.name}</span>
                    <span className={s.role}>
                      {item.role} {item.company ? `@ ${item.company}` : ''}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={s.emptyState}>
              {t('testimonials.empty')}
            </div>
          )}
        </div>

        {/* Petit lien discret en dessous si tu as beaucoup d'avis */}
        {reviews.length >= 3 && (
          <div className="mt-12 text-center">
            <button 
              onClick={() => navigate('/temoignages')}
              className="text-sm font-bold text-blue-600 hover:underline underline-offset-4"
            >
              {t('testimonials.view_all')}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Testimonials
