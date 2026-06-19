import React, { useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { HiCode, HiDeviceMobile } from 'react-icons/hi'
import { TbSeo } from 'react-icons/tb'
import gsap from 'gsap'
import { sPage as s } from '../styles/servicesPage.styles'
import Skills from '../sections/Skills'
import { prefersReducedMotion } from '../lib/motion'

interface ServiceItem {
  id: string
  title: string
  desc: string
  tags: string[]
}

const iconMap: Record<string, React.ReactNode> = {
  "01": <HiCode size={28} />,
  "02": <HiDeviceMobile size={28} />,
  "03": <TbSeo size={28} />,
}

const ServicesPage: React.FC = () => {
  const { t } = useTranslation()
  const pageRef = useRef<HTMLDivElement>(null)

  const services = useMemo(() => {
    const rawData = t('services_page.items', { returnObjects: true })
    return Array.isArray(rawData) ? (rawData as ServiceItem[]) : []
  }, [t])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (services.length > 0 && !prefersReducedMotion()) {
      const ctx = gsap.context(() => {
        gsap.fromTo(".service-card", 
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
        )
      }, pageRef)
      return () => ctx.revert()
    }
  }, [services])

  return (
    <div ref={pageRef} className="min-h-screen bg-white dark:bg-[#0A0A0F]">
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.header}>
            <span className={s.label}>{t('services_page.label')}</span>
            <h1 className={s.title}>
              {t('services_page.title')}
              <span className={s.titleAccent}>{t('services_page.title_accent')}</span>
            </h1>
            <p className={s.subtitle}>{t('services_page.subtitle')}</p>
          </div>

          <div className={s.grid}>
            {services.map((item) => (
              <div key={item.id} className={`service-card ${s.card}`}>
                <span className={s.number}>{item.id}</span>
                <div className={s.iconWrapper}>
                  {iconMap[item.id] || <HiCode size={28} />}
                </div>
                <h3 className={s.cardTitle}>{item.title}</h3>
                <p className={s.cardDesc}>{item.desc}</p>
                <div className={s.tagWrapper}>
                  {Array.isArray(item.tags) && item.tags.map((tag) => (
                    <span key={tag} className={s.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Skills />
    </div>
  )
}

export default ServicesPage
