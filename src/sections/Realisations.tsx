import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { worksStyles as s } from '../styles/realisations.styles'

// 1. Importation des images locales
import studenaImg from '../assets/images/projet1.webp'
import nealixImg from '../assets/images/coinplace.webp'
import shieldImg from '../assets/images/floraproject.webp'
import { Link } from 'react-router-dom'

interface Project {
  id: number
  title: string
  desc: string
  url: string
  image: string
}

// 2. Création d'une map pour lier le nom dans le JSON à l'importation réelle
const imageMap: Record<string, string> = {
  "medicals": studenaImg,
  "coinplace": nealixImg,
  "flora": shieldImg
}

const Realisations = () => {
  const { t, i18n } = useTranslation()
  const trackRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)
  const [projects, setProjects] = useState<Project[]>([])

  // Charger les données du JSON
  useEffect(() => {
    const data = t('works.items', { returnObjects: true })
    if (Array.isArray(data)) {
      setProjects(data as Project[])
    }
  }, [t, i18n.language])

  // Préparer la liste pour le défilement infini (triple la liste)
  const infiniteProjects = projects.length > 0 ? [...projects, ...projects, ...projects] : []

  // Animation GSAP
  useEffect(() => {
    if (projects.length === 0 || !trackRef.current) return

    const track = trackRef.current
    const scrollDistance = track.scrollWidth / 3

    const ctx = gsap.context(() => {
      animationRef.current = gsap.to(track, {
        x: -scrollDistance,
        duration: 35, 
        ease: 'none',
        repeat: -1,
        onRepeat: () => {
          gsap.set(track, { x: 0 })
        }
      })
    })

    return () => ctx.revert()
  }, [projects])

  const handleMouseEnter = () => animationRef.current?.pause()
  const handleMouseLeave = () => animationRef.current?.play()

  if (projects.length === 0) return null

  return (
    <section id="works" className={s.section}>
      <div className={s.container}>
        
        <div className={s.header}>
          <span className={s.label}>{t('works.label')}</span>
          <h2 className={s.title}>
            {t('works.title')}
            <span className={s.titleAccent}>{t('works.title_accent')}</span>
          </h2>
        </div>

        <div 
          className={s.scrollWrapper}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div ref={trackRef} className={s.track}>
            {infiniteProjects.map((project, index) => (
              <div key={`${project.id}-${index}`} className={s.card}>
                
                {/* Barre style Navigateur Mac */}
                <div className={s.browserBar}>
                  <div className={s.dotBlue} />
                  <div className={s.dotYellow} />
                  <div className={s.dotGreen} />
                  <div className={s.addressBar}>{project.url}</div>
                </div>

                {/* Image du Projet avec Mapping Local */}
                <div className={s.imageWrapper}>
                  <img 
                    src={imageMap[project.image]} 
                    alt={project.title} 
                    className={s.image}
                  />
                  <div className={s.overlay}>
                    <span className="bg-white text-blue-600 px-5 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-xl">
                      Détails du projet
                    </span>
                  </div>
                </div>

                {/* Infos du Projet */}
                <div className={s.content}>
                  <h3 className={s.projectTitle}>{project.title}</h3>
                  <p className={s.projectDesc}>{project.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={s.buttonWrapper}>
          <Link to="/realisations" className={s.button}>
            {t('works.view_more')}
          </Link>
        </div>
        
      </div>
    </section>
  )
}

export default Realisations