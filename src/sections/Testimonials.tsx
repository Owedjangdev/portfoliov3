import { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom' // Pour la redirection
import { supabase } from '../lib/supabaseClient'
import { HiStar, HiPlus } from 'react-icons/hi'
import { testimonialStyles as s } from '../styles/testimonials.styles'

const Testimonials = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [reviews, setReviews] = useState<any[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const fetchRecentReviews = async () => {
      // On utilise .limit(3) pour n'afficher que les 3 derniers avis sur l'accueil
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3) 

      if (data) setReviews(data)
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
          {reviews.length > 0 ? (
            reviews.map((item) => (
              <div key={item.id} className={s.card}>
                <div className={s.stars}>
                  {[...Array(item.rating)].map((_, i) => <HiStar key={i} />)}
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
            <div className="col-span-full text-center py-10 opacity-50 italic text-gray-500">
              Chargement des avis récents...
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
              Voir tous les témoignages →
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Testimonials