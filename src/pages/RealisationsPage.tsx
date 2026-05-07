import React, { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { HiSearch, HiRefresh } from 'react-icons/hi'
import { rPage as s } from '../styles/realisationsPage.styles'
import gsap from 'gsap'

const RealisationsPage = () => {
  const { t } = useTranslation()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  // 1. Données des projets (À enrichir via JSON plus tard)
  const allProjects = (t('works.items', { returnObjects: true }) as any[]) || []

  // 2. Logique de filtrage
  const filteredProjects = useMemo(() => {
    return allProjects.filter(p => {
      const matchFilter = filter === 'all' || p.category === filter
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.desc.toLowerCase().includes(search.toLowerCase())
      return matchFilter && matchSearch
    })
  }, [filter, search, allProjects])

  // Animation au changement de filtre
  useEffect(() => {
    gsap.fromTo(".project-card", 
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    )
  }, [filter, search])

  return (
    <div className={s.section}>
      <div className={s.container}>
        
        {/* Header */}
        <header className={s.header}>
          <h1 className={s.title}>
            {t('works_page.title')} <span className={s.titleAccent}>{t('works_page.title_accent')}</span>
          </h1>
          <p className={s.subtitle}>{t('works_page.subtitle')}</p>
        </header>

        {/* Stats */}
        <div className={s.statsGrid}>
          <div className={s.statCard}>
            <div className={s.statNumber}>14+</div>
            <div className={s.statLabel}>{t('works_page.stats.delivered')}</div>
          </div>
          <div className={s.statCard}>
            <div className={s.statNumber}>8</div>
            <div className={s.statLabel}>{t('works_page.stats.featured')}</div>
          </div>
          <div className={s.statCard}>
            <div className={s.statNumber}>8+</div>
            <div className={s.statLabel}>{t('works_page.stats.technos')}</div>
          </div>
        </div>

        {/* Controls */}
        <div className={s.controlsWrapper}>
          <div className={s.filterList}>
            {['all', 'web', 'mobile', 'api', 'saas'].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)}
                className={s.filterBtn(filter === cat)}
              >
                {t(`works_page.filters.${cat}`)}
              </button>
            ))}
          </div>

          <div className={s.searchRow}>
            <div className={s.inputWrapper}>
              <input 
                type="text" 
                placeholder={t('works_page.search_placeholder')}
                className={s.input}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className={`${s.actionBtn} ${s.resetBtn}`} onClick={() => {setSearch(''); setFilter('all')}}>
              <HiRefresh size={18} />
            </button>
          </div>
        </div>

        {/* Grille de projets */}
        <div className={s.grid}>
          {filteredProjects.map((p, i) => (
            <div key={i} className={`project-card ${s.card}`}>
              <div className={s.browserBar}>
                <div className={`${s.dot} bg-[#FF5F57]`} />
                <div className={`${s.dot} bg-[#FFBD2E]`} />
                <div className={`${s.dot} bg-[#28C840]`} />
                <div className={s.addressBar}>{p.url}</div>
              </div>
              <div className="aspect-video overflow-hidden">
                 <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold dark:text-white mb-2">{p.title}</h3>
                <p className="text-sm text-slate-500 dark:text-gray-400 line-clamp-2">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default RealisationsPage