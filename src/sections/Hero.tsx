import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-scroll'
import { Link as RouterLink } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import { SiWordpress } from 'react-icons/si'
import { MdPhoneIphone } from 'react-icons/md'
import { TbSeo, TbCode } from 'react-icons/tb'
import gsap from 'gsap'
import owedevImg from '../assets/images/owedev.webp'
import { heroStyles as s } from '../styles/hero.styles'
import { prefersReducedMotion } from '../lib/motion'

interface Service {
  icon: React.ReactNode
  label: string
}

interface FloatingCard {
  icon: React.ReactNode
  label: string
  color: string
  position: string
}

const Hero = () => {
  const { t }    = useTranslation()
  const leftRef  = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.hero-badge',    { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo('.hero-greeting', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6 }, '-=0.3')
        .fromTo('.hero-name',     { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.7 }, '-=0.3')
        .fromTo('.hero-title',    { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6 }, '-=0.3')
        .fromTo('.hero-desc',     { opacity: 0, y: 20  }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
        .fromTo('.hero-cta',      { opacity: 0, y: 20  }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .fromTo('.hero-services', { opacity: 0, y: 20  }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .fromTo('.hero-image',    { opacity: 0, x: 60, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.9 }, '-=0.8')
        .fromTo('.float-card',    { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.15 }, '-=0.4')

      gsap.utils.toArray<HTMLElement>('.float-card').forEach((card, i) => {
        gsap.to(card, {
          y: i % 2 === 0 ? -10 : 10,
          duration: 2 + i * 0.3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.2,
        })
      })

    })

    return () => ctx.revert()
  }, [])

  const services: Service[] = [
    { icon: <TbSeo size={14} />,         label: 'SEO'        },
    { icon: <SiWordpress size={14} />,   label: 'WordPress'  },
    { icon: <TbCode size={14} />,        label: 'Dev Web'    },
    { icon: <MdPhoneIphone size={14} />, label: 'Dev Mobile' },
  ]

 const floatingCards: FloatingCard[] = [
  // En haut à droite (SEO)
  { 
    icon: <TbSeo size={18} />, 
    label: t('hero.cards.seo'), 
    color: 'text-green-500 bg-green-500/10 border-green-500/20', 
    position: 'absolute -top-4 -right-4 md:-top-6 md:-right-6' 
  },
  // Milieu Gauche (WordPress) -> On le passe à gauche pour équilibrer
  { 
    icon: <SiWordpress size={18} />, 
    label: t('hero.cards.wordpress'), 
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20', 
    position: 'absolute top-1/4 -left-8 md:top-1/3 md:-left-12' 
  },
  // Milieu Droite (Web Dev)
  { 
    icon: <TbCode size={18} />, 
    label: t('hero.cards.web'), 
    color: 'text-purple-500 bg-purple-500/10 border-purple-500/20', 
    position: 'absolute top-1/2 -right-8 md:bottom-1/4 md:-right-10' 
  },
  // En bas au centre/droite (Mobile)
  { 
    icon: <MdPhoneIphone size={18} />, 
    label: t('hero.cards.mobile'), 
    color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20', 
    position: 'absolute -bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:right-4' 
  },
]
  return (
    <section id="hero" className={s.section}>
      <div className={s.container}>
        <div ref={leftRef} className={s.left}>

          <div className={`hero-badge ${s.badge}`}>
            <span className={s.badgeDot} />
            {t('hero.available')}
          </div>

          <p className={`hero-greeting ${s.greeting}`}>
            {t('hero.greeting')}
          </p>

          <h1 className={`hero-name ${s.name}`}>
            owedev
          </h1>

          <h2 className={`hero-title ${s.title}`}>
            {t('hero.title_start')}{' '}
            <span className={s.titleAccent('from-blue-500 to-cyan-400')}>
              {t('hero.accent1')}
            </span>{' '}
            {t('hero.title_mid')}{' '}
            <span className={s.titleAccent('from-green-400 to-emerald-500')}>
              {t('hero.accent2')}
            </span>{' '}
            {t('hero.title_end')}{' '}
            <span className={s.titleAccent('from-purple-500 to-violet-500')}>
              {t('hero.accent3')}
            </span>
          </h2>

          <p className={`hero-desc ${s.description}`}>
            {t('hero.description')}
          </p>

          <div className={`hero-cta ${s.ctaWrapper}`}>
            <Link to="works" spy smooth duration={500} offset={-72} className={s.ctaPrimary}>
              {t('hero.cta_primary')}
              <HiArrowRight size={16} />
            </Link>
            <RouterLink to="/contact" className={s.ctaSecondary}>
              {t('hero.cta_secondary')}
            </RouterLink>
          </div>

          <div className={`hero-services ${s.services}`}>
            {services.map((service: Service) => (
              <span key={service.label} className={s.serviceTag}>
                {service.icon}
                {service.label}
              </span>
            ))}
          </div>

        </div>

        <div ref={rightRef} className={s.right}>
          <div className={`hero-image ${s.imageWrapper}`}>
            <div className={s.imageBg} />

            <img
              src={owedevImg}
              alt="owedev — Full Stack Developer & SEO Expert"
              className={s.image}
              width="384"
              height="480"
              fetchPriority="high"
            />
            {floatingCards.map((card: FloatingCard) => (
              <div
                key={card.label}
                className={`float-card ${card.position} flex items-center gap-2 px-3 py-2 rounded-lg border backdrop-blur-md bg-white/85 dark:bg-[#16161F]/85 shadow-[0_8px_24px_rgb(15,23,42,0.12)] dark:shadow-[0_8px_28px_rgb(0,0,0,0.45)] ${card.color} text-[10px] md:text-xs font-semibold font-[Inter] whitespace-nowrap z-20 transition-transform duration-300 hover:scale-105`}
              >
                <span className="flex items-center justify-center">
                  {card.icon}
                </span>
                {card.label}
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero
