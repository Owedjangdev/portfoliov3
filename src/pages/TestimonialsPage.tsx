import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiStar } from 'react-icons/hi'
import { supabase } from '../lib/supabaseClient'
import { tPage as s } from '../styles/testimonialsPage.styles'
import { testimonialStyles as cardStyles } from '../styles/testimonials.styles'
import ReviewForm from '../components/ReviewForm' // On utilise ton composant existant


const TestimonialsPage: React.FC = () => {
  const { t } = useTranslation()
  const [reviews, setReviews] = useState<any[]>([])
  const [stats, setStats] = useState({ count: 0, average: 0 })

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) {
      setReviews(data)
      // Calcul des stats dynamiques
      const avg = data.reduce((acc, curr) => acc + curr.rating, 0) / data.length
      setStats({ count: data.length, average: Number(avg.toFixed(1)) || 0 })
    }
  }

  return (
    <div className={s.section}>
      <div className={s.container}>
        
        {/* --- HEADER --- */}
        <header className={s.header}>
          <h1 className={s.title}>
            {t('testimonials_page.title')}
            <span className={s.titleAccent}>{t('testimonials_page.title_accent')}</span>
          </h1>
          <p className={s.subtitle}>{t('testimonials_page.subtitle')}</p>
        </header>

        {/* --- STATS BAR --- */}
        <div className={s.statsBar}>
          <div className={s.statItem}>
            <span className={s.statNumber}>{stats.count}</span>
            <span className={s.statLabel}>{t('testimonials_page.stats.verified')}</span>
          </div>
          <div className={s.statItem}>
            <div className="flex flex-col items-center">
               <div className="flex gap-1 text-yellow-500 mb-2">
                 {[...Array(5)].map((_, i) => (
                   <HiStar key={i} className={i < Math.floor(stats.average) ? 'opacity-100' : 'opacity-30'} />
                 ))}
               </div>
               <span className={s.statNumber}>{stats.average}<span className="text-2xl text-slate-300 dark:text-white/20">/5</span></span>
               <span className={s.statLabel}>{t('testimonials_page.stats.average')}</span>
            </div>
          </div>
        </div>

        {/* --- LIST SECTION --- */}
        <div className={s.listHeader}>
          <span className={s.listLabel}>Ils m'ont fait confiance</span>
          <h2 className={s.listTitle}>
            {t('testimonials_page.list_title')}
            <span className={s.listTitleAccent}>{t('testimonials_page.list_title_accent')}</span>
          </h2>
        </div>

        <div className={s.grid}>
          {reviews.map((item) => (
            <div key={item.id} className={cardStyles.card}>
              <div className={cardStyles.stars}>
                {[...Array(item.rating)].map((_, i) => <HiStar key={i} />)}
              </div>
              <p className={cardStyles.content}>"{item.content}"</p>
              <div className={cardStyles.author}>
                <div className={cardStyles.avatar}>{item.name?.charAt(0)}</div>
                <div className={cardStyles.info}>
                  <span className={cardStyles.name}>{item.name}</span>
                  <span className={cardStyles.role}>{item.role} {item.company ? `@ ${item.company}` : ''}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- FORM SECTION (Utilise ton ReviewForm) --- */}
        <div className={s.formSection}>
          <div className="mb-12">
            <span className={s.listLabel}>Laisser un avis</span>
            <h2 className={s.listTitle} style={{ marginTop: '1rem' }}>
              {t('testimonials_page.form_title')}
              <span className={s.listTitleAccent}>{t('testimonials_page.form_title_accent')}</span>
            </h2>
          </div>
          
          <ReviewForm onSuccess={(newRev) => setReviews(p => [newRev, ...p])} />
        </div>

      </div>
    </div>
  )
}

export default TestimonialsPage