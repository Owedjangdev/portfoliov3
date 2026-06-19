import { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {HiRefresh } from 'react-icons/hi'
import { rPage as s } from '../styles/realisationsPage.styles'
import gsap from 'gsap'
import studenaImg from '../assets/images/projet1.webp'
import nealixImg from '../assets/images/coinplace.webp'
import shieldImg from '../assets/images/floraproject.webp'
import asmaintenanceImg from '../assets/images/prozect4.png'
import constructeursImg from '../assets/images/prozect5.png'
import talentoImg from '../assets/images/prozect6.png'
import { prefersReducedMotion } from '../lib/motion'
import { fetchPublicProjects, type PublicProject } from '../lib/projects'

const imageMap: Record<string, string> = {
  medicals: studenaImg,
  coinplace: nealixImg,
  flora: shieldImg,
  asmaintenance: asmaintenanceImg,
  constructeurs: constructeursImg,
  talento: talentoImg
}

const resolveProjectImage = (image: string) => imageMap[image] ?? image

const toHref = (url: string) => (/^https?:\/\//.test(url) ? url : `https://${url}`)

const RealisationsPage = () => {
  const { t, i18n } = useTranslation()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [allProjects, setAllProjects] = useState<PublicProject[]>([])

  useEffect(() => {
    let mounted = true
    fetchPublicProjects(i18n.language)
      .then((data) => { if (mounted) setAllProjects(data) })
      .catch((error) => console.error('Erreur chargement projets:', error))
    return () => { mounted = false }
  }, [i18n.language])

  const filteredProjects = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return allProjects.filter(p => {
      const categories = (p.category ?? '').split(' ')
      const matchFilter = filter === 'all' || categories.includes(filter)
      const matchSearch = !normalizedSearch ||
        p.title.toLowerCase().includes(normalizedSearch) ||
        p.desc.toLowerCase().includes(normalizedSearch)

      return matchFilter && matchSearch
    })
  }, [filter, search, allProjects])

  useEffect(() => {
    if (prefersReducedMotion()) return

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
          <span className={s.label}>{t('works_page.label')}</span>
          <h1 className={s.title}>
            {t('works_page.title')} <span className={s.titleAccent}>{t('works_page.title_accent')}</span>
          </h1>
          <p className={s.subtitle}>{t('works_page.subtitle')}</p>
        </header>

        {/* Stats */}
        <div className={s.statsGrid}>
          <div className={s.statCard}>
            <div className={s.statNumber}>{allProjects.length}+</div>
            <div className={s.statLabel}>{t('works_page.stats.delivered')}</div>
          </div>
          <div className={s.statCard}>
            <div className={s.statNumber}>{filteredProjects.length}</div>
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
            <a
              key={`${p.title}-${i}`}
              href={toHref(p.url)}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-card ${s.card} cursor-pointer`}
            >
              <div className={s.browserBar}>
                <div className={`${s.dot} bg-[#FF5F57]`} />
                <div className={`${s.dot} bg-[#FFBD2E]`} />
                <div className={`${s.dot} bg-[#28C840]`} />
                <div className={s.addressBar}>{p.url}</div>
              </div>
              <div className="aspect-video overflow-hidden">
                 <img
                   src={resolveProjectImage(p.image)}
                   alt={p.title}
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                   loading={i < 3 ? 'eager' : 'lazy'}
                 />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold dark:text-white mb-2">{p.title}</h3>
                <p className="text-sm text-slate-500 dark:text-gray-400 line-clamp-2">{p.desc}</p>
              </div>
            </a>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className={s.emptyState}>
            {t('works_page.no_results')}
          </div>
        )}

      </div>
    </div>
  )
}

export default RealisationsPage
