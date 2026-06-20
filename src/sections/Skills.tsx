import { useEffect, useRef, type ReactNode } from 'react' 
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  SiHtml5, 
  SiCss, // On l'importe sous le nom SiCss s'il existe, ou simplement SiCss
  SiJavascript, 
  SiReact, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiNodedotjs,
  SiExpress,
  SiFigma,
  SiSupabase,
  SiFirebase
} from 'react-icons/si'
// Note : Si SiCss3 ne marche toujours pas, utilise l'import ci-dessous :
// import { SiCss } from 'react-icons/si'

import owedevImg from '../assets/images/owedev.webp'
import { skillsStyles as s } from '../styles/skills.styles'
import { prefersReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

interface Skill {
  name: string
}

const iconMap: Record<string, ReactNode> = {
  "HTML5": <SiHtml5 className="text-[#E34F26] text-2xl md:text-3xl" />,
  "CSS3": <SiCss className="text-[#1572B6] text-2xl md:text-3xl" />, // Utilisation du nouveau nom
  "JavaScript": <SiJavascript className="text-[#F7DF1E] text-2xl md:text-3xl rounded-sm" />,
  "React": <SiReact className="text-[#61DAFB] text-2xl md:text-3xl" />,
  "Next.js": <SiNextdotjs className="text-black dark:text-white text-2xl md:text-3xl" />,
  "Tailwind": <SiTailwindcss className="text-[#06B6D4] text-2xl md:text-3xl" />,
  "Node.js": <SiNodedotjs className="text-[#339933] text-2xl md:text-3xl" />,
  "Express": <SiExpress className="text-gray-600 dark:text-gray-400 text-2xl md:text-3xl" />,
  "Figma": <SiFigma className="text-[#F24E1E] text-2xl md:text-3xl" />,
  "React Native": <SiReact className="text-[#61DAFB] text-2xl md:text-3xl" />,
  "Supabase": <SiSupabase className="text-[#3ECF8E] text-2xl md:text-3xl" />,
  "Firebase": <SiFirebase className="text-[#FFCA28] text-2xl md:text-3xl" />
}

const Skills = () => {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.from(".orbit-item", {
        scale: 0,
        opacity: 0,
        duration: 1.2,
        stagger: { each: 0.1, from: "center" },
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".orbit-container",
          start: "top 80%",
        }
      })

      const items = gsap.utils.toArray<HTMLElement>(".orbit-item")
      items.forEach((item) => {
        gsap.to(item, {
          x: "random(-8, 8)",
          y: "random(-8, 8)",
          duration: "random(2, 4)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const skills = t('skills.items', { returnObjects: true }) as Skill[]

  const getPosition = (index: number, total: number) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const orbitRadius = isMobile 
      ? (index % 2 === 0 ? 115 : 155) 
      : (index < 5 ? 190 : 310)

    const angle = (index / total) * Math.PI * 2
    const x = Math.cos(angle) * orbitRadius
    const y = Math.sin(angle) * orbitRadius

    return {
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`,
      transform: 'translate(-50%, -50%)'
    }
  }

  return (
    <section id="skills" ref={sectionRef} className={s.section}>
      <div className={s.container}>
        <div className={s.header}>
          <span className={s.label}>{t('skills.label')}</span>
          <h2 className={s.title}>
            {t('skills.title')}{' '}
            <span className={s.titleAccent}>{t('skills.title_accent')}</span>
          </h2>
        </div>

        <div className={`orbit-container ${s.orbitContainer}`}>
          <div className={`${s.orbitRing} w-[230px] h-[230px] md:w-[380px] md:h-[380px]`} />
          <div className={`${s.orbitRing} w-[310px] h-[310px] md:w-[620px] md:h-[620px]`} />

          <div className={s.centerWrapper}>
            <img src={owedevImg} alt="owedev avatar" className={s.centerImage} />
          </div>

          {skills.map((skill, i) => (
            <div 
              key={skill.name} 
              className={`orbit-item ${s.techCard}`}
              style={getPosition(i, skills.length)}
            >
              <div className={s.iconBox}>
                {iconMap[skill.name] || <span className="text-xs">?</span>}
              </div>
              <span className={s.iconName}>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
