import { useTranslation } from 'react-i18next'
import { HiPhone, HiMail, HiLocationMarker, HiChevronRight } from 'react-icons/hi'
import { FaLinkedinIn, FaGithub, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { footerStyles as s } from '../styles/footer.styles'
import logo from '../assets/images/logoowedev.jpg'

const Footer = () => {
  const { t } = useTranslation()

  const navLinks = [
    { label: t('nav.about'), to: '/' },
    { label: t('nav.works'), to: '/realisations' },
    { label: t('nav.services'), to: '/services' },
    { label: t('nav.reviews'), to: '/temoignages' },
    { label: t('nav.contact'), to: '/contact' },
  ]

  const stackItems = t('footer.stack', { returnObjects: true })
  const stackLinks = Array.isArray(stackItems) ? (stackItems as string[]) : []

  const WHATSAPP = '2290154215693'

  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.grid}>

          {/* Colonne 1 : Marque & Contact */}
          <div className={s.logoArea}>
            <Link to="/" className="w-fit">
              <img src={logo} alt="OweDev Digitaly" className="h-11 w-auto rounded-lg" />
            </Link>
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

          {/* Colonne 2 : Stack & Compétences (liens vers Services) */}
          <div>
            <h4 className={s.columnTitle}>{t('footer.columns.stack')}</h4>
            <ul className={s.linkList}>
              {stackLinks.map((item) => (
                <li key={item}>
                  <Link to="/services" className={s.linkItem}>
                    <HiChevronRight className={s.linkIcon} /> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Navigation */}
          <div>
            <h4 className={s.columnTitle}>{t('footer.columns.nav')}</h4>
            <ul className={s.linkList}>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={s.linkItem}>
                    <HiChevronRight className={s.linkIcon} /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 : Réseaux */}
          <div>
            <h4 className={s.columnTitle}>{t('footer.columns.social')}</h4>
            <p className={s.socialText}>{t('footer.social_text')}</p>
            <div className={s.socialGrid}>
              <a href="https://www.linkedin.com/in/owedev" target="_blank" rel="noopener noreferrer" className={s.socialIcon} aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="https://github.com/Owedjangdev" target="_blank" rel="noopener noreferrer" className={s.socialIcon} aria-label="GitHub"><FaGithub /></a>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className={s.socialIcon} aria-label="WhatsApp"><FaWhatsapp /></a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
