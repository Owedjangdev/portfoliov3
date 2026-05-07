import { useTranslation } from 'react-i18next'
import { HiPhone, HiMail, HiLocationMarker, HiChevronRight } from 'react-icons/hi'
import { FaLinkedinIn, FaGithub, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { footerStyles as s } from '../styles/footer.styles'

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.works'), href: '#works' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.contact'), href: '#contact' }
  ]

  const stackLinks = [
    "Développement Web & Mobile",
    "API REST & Backend",
    "Architecture Cloud",
    "Consulting Technique"
  ]

  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.grid}>
          
          {/* Colonne 1 : Intro & Contact */}
          <div className={s.logoArea}>
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-blue-600 rounded-lg" /> {/* Remplace par ton vrai logo */}
              <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">
  owe<span className="text-blue-600">dev</span>
</span>            </div>
            <p className={s.description}>{t('footer.description')}</p>
            <div className={s.contactList}>
              <a href={`tel:${t('footer.contact.phone')}`} className={s.contactItem}>
                <HiPhone className={s.contactIcon} /> {t('footer.contact.phone')}
              </a>
              <a href={`mailto:${t('footer.contact.email')}`} className={s.contactItem}>
                <HiMail className={s.contactIcon} /> {t('footer.contact.email')}
              </a>
              <div className={s.contactItem}>
                <HiLocationMarker className={s.contactIcon} /> {t('footer.contact.location')}
              </div>
            </div>
          </div>

          {/* Colonne 2 : Stack */}
          <div>
            <h4 className={s.columnTitle}>{t('footer.columns.stack')}</h4>
            <ul className={s.linkList}>
              {stackLinks.map((item, i) => (
                <li key={i} className={s.linkItem}>
                  <HiChevronRight className={s.linkIcon} /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Navigation */}
          <div>
            <h4 className={s.columnTitle}>{t('footer.columns.nav')}</h4>
            <ul className={s.linkList}>
              {navLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className={s.linkItem}>
                    <HiChevronRight className={s.linkIcon} /> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 : Socials */}
          <div>
            <h4 className={s.columnTitle}>{t('footer.columns.social')}</h4>
            <p className={s.socialText}>{t('footer.social_text')}</p>
            <div className={s.socialGrid}>
              <a href="#" className={s.socialIcon}><FaLinkedinIn /></a>
              <a href="#" className={s.socialIcon}><FaGithub /></a>
              <a href="#" className={s.socialIcon}><FaTwitter /></a>
              <a href="#" className={s.socialIcon}><FaWhatsapp /></a>
            </div>
          </div>

        </div>

        {/* Barre de fin */}
        <div className={s.bottomBar}>
          <p className={s.copyright}>
            © {currentYear} <span className="text-white font-bold">OWEDEV</span>. {t('footer.rights')}
          </p>
          <p className={s.credits}>
            {t('footer.made_by')} <span className="text-blue-500 font-bold">owedev</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer