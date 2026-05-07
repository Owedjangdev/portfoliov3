import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HiChevronDown } from 'react-icons/hi'
import { faqStyles as s } from '../styles/faq.styles'

gsap.registerPlugin(ScrollTrigger)

interface FAQItem {
  q: string
  a: string
}

const FAQ = () => {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // --- SÉCURITÉ IMPORTANTE ---
  // On récupère les données avec returnObjects: true
  const rawData = t('faq.items', { returnObjects: true })
  
  // On s'assure que 'items' est bien un tableau, sinon on met un tableau vide
  const items = Array.isArray(rawData) ? (rawData as FAQItem[]) : []

  // Debug pour voir ce que i18next reçoit (Regarde ta console F12)
  useEffect(() => {
    console.log("FAQ Items reçus :", items)
  }, [items])

  useEffect(() => {
    if (items.length === 0) return

    const ctx = gsap.context(() => {
      gsap.from(".faq-item", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".faq-wrapper",
          start: "top 85%",
          once: true // L'animation ne se joue qu'une fois
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [items])

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section id="faq" ref={sectionRef} className={s.section}>
      <div className={s.container}>
        
        <div className={s.header}>
          <span className={s.label}>{t('faq.label')}</span>
          <h2 className={s.title}>
            {t('faq.title')}
            <span className={s.titleAccent}>{t('faq.title_accent')}</span>
          </h2>
        </div>

        <div className={`faq-wrapper ${s.wrapper}`}>
          {items.length > 0 ? (
            items.map((item, index) => (
              <div 
                key={index} 
                className={`faq-item ${s.item} ${activeIndex === index ? s.itemActive : ''}`}
                style={{ opacity: 1 }} // Force l'opacité initiale si GSAP bug
              >
                <button 
                  onClick={() => toggleAccordion(index)}
                  className={s.questionBtn}
                >
                  <span className={s.questionText}>{item.q}</span>
                  <HiChevronDown className={`${s.icon} ${activeIndex === index ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`${s.answerWrapper} ${activeIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className={s.answerContent}>
                    <p className={s.answerText}>
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Message si le JSON est vide ou mal lu
            <div className="text-center py-10">
               <p className="text-gray-500 italic">Chargement des questions...</p>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}

export default FAQ