import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BsBriefcaseFill, BsMortarboardFill } from 'react-icons/bs'
import epiphaneImg from '../assets/images/epiphane.webp'
import { aboutStyles as s } from '../styles/about.styles'
import { prefersReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

interface Stat {
  number: string
  label:  string
}

interface ExpItem {
  period:  string
  role:    string
  company: string
  type:    string
  desc:    string
}

interface EduItem {
  period: string
  degree: string
  school: string
  desc:   string
}

const About = () => {
  const { t }      = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.about-image', { opacity: 0, x: -60 }, {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-image', start: 'top 80%', once: true },
      })
      gsap.fromTo('.about-content > *', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: '.about-content', start: 'top 80%', once: true },
      })

      gsap.fromTo('.timeline-item', { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: '.timeline-list', start: 'top 85%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const stats: Stat[] = [
    { number: '3+',  label: t('about.stats.experience') },
    { number: '15+', label: t('about.stats.projects')   },
    { number: '10+', label: t('about.stats.clients')    },
  ]

  const expItems: ExpItem[] = t('about.exp_items', { returnObjects: true }) as ExpItem[]
  const eduItems: EduItem[] = t('about.edu_items', { returnObjects: true }) as EduItem[]

  return (
    <section id="about" ref={sectionRef} className={s.section}>
      <div className={s.container}>

        {/* ── Bloc haut : Photo + Bio ── */}
        <div className={s.topRow}>
          <div className={s.left}>
            <div className={`about-image ${s.imageWrapper}`}>
              <div className={s.imageBg} />
              <img src={epiphaneImg} alt="owedev" className={s.image} />
              <div className={s.expBadge}>
                <span className={s.expBadgeNumber}>3+</span>
                <span className={s.expBadgeLabel}>{t('about.stats.experience')}</span>
              </div>
            </div>
          </div>

          <div className={`about-content ${s.right}`}>
            <span className={s.label}>+ {t('about.label')} +</span>
            <h2 className={s.title}>{t('about.title')}</h2>
            <p className={s.bio}>{t('about.bio')}</p>

            <div className={s.statsWrapper}>
              {stats.map((stat: Stat) => (
                <div key={stat.label} className={`stat-card ${s.statCard}`}>
                  <span className={s.statNumber}>{stat.number}</span>
                  <span className={s.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bloc bas : Timeline Expériences & Formations ── */}
        <div className={s.timelineLayout}>
          
          {/* Section EXPÉRIENCES */}
          <div className={s.timelineSection}>
            <div className={s.timelineHeader}>
              <BsBriefcaseFill className={s.timelineIcon} />
              <span className={s.timelineTitle}>{t('about.experience')}</span>
              <div className={s.timelineLine} />
            </div>

            <ul className={`timeline-list ${s.timelineList}`}>
              {expItems.map((item, i) => (
                <li key={i} className={`timeline-item ${s.timelineItem}`}>
                  <div className={s.timelineDot}><span className={s.timelineDotInner} /></div>
                  <p className={s.timelinePeriod}>{item.period}</p>
                  <p className={s.timelineRole}>{item.role}</p>
                  <div className={s.timelineCompanyRow}>
                    <span className={s.timelineCompany}>{item.company}</span>
                    <span className={s.timelineBadge(item.type)}>{item.type}</span>
                  </div>
                  <p className={s.timelineDesc}>{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Section FORMATIONS */}
          <div className={s.timelineSection}>
            <div className={s.timelineHeader}>
              <BsMortarboardFill className={s.timelineIcon} />
              <span className={s.timelineTitle}>{t('about.education')}</span>
              <div className={s.timelineLine} />
            </div>

            <ul className={`timeline-list ${s.timelineList}`}>
              {eduItems.map((item, i) => (
                <li key={i} className={`timeline-item ${s.timelineItem}`}>
                  <div className={s.timelineDot}><span className={s.timelineDotInner} /></div>
                  <p className={s.timelinePeriod}>{item.period}</p>
                  <p className={s.timelineRole}>{item.degree}</p>
                  <div className={s.timelineCompanyRow}>
                    <span className={s.timelineCompany}>{item.school}</span>
                  </div>
                  <p className={s.timelineDesc}>{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}

export default About
