import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../context/theme'
import { HiSun, HiMoon, HiMenuAlt3, HiX, HiChevronDown } from 'react-icons/hi'
import { Link, NavLink } from 'react-router-dom' 
import ReactCountryFlag from 'react-country-flag'
import { navbarStyles as s } from '../styles/navbar.styles'
import useScrolled from '../hooks/useScrolled'
import useLangDropdown from '../hooks/seLangDropdown'
import logo from '../assets/images/logoowedev.jpg'

const languages = [
  { code: 'fr', country: 'FR', label: 'Français' },
  { code: 'en', country: 'US', label: 'English'  },
]

interface NavLinkItem {
  label: string
  to: string
}

const Navbar = () => {
  const { t } = useTranslation()
  const { isDark, toggleTheme } = useTheme()
  const scrolled = useScrolled(20)
  
  // 3. On retire "languages" de la déstructuration car ton hook ne le renvoie pas
  const { langOpen, langRef, currentLang, setLangOpen, changeLang } = useLangDropdown()
  
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // 4. On utilise la liste "languages" définie plus haut
  const activeLang = languages.find(l => l.code === currentLang) ?? languages[0]

  const navLinks: NavLinkItem[] = [
    { label: t('nav.about'),    to: '/' }, // On pointe vers la racine
    { label: t('nav.works'),    to: '/realisations' }, 
    { label: t('nav.services'), to: '/services' },
    { label: t('nav.reviews'),  to: '/temoignages'},
    { label: t('nav.contact'),  to: '/contact' },
  ]

  return (
    <header className={s.header(scrolled || isOpen)}>
      <div className={s.container}>
        <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)} aria-label="OweDev Digitaly - accueil">
          <img src={logo} alt="OweDev Digitaly" className="h-9 w-auto rounded-md md:h-10" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `${s.navLink} ${isActive ? 'text-blue-500' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={s.langButton}
              aria-expanded={langOpen}
              aria-label="Changer de langue"
            >
              <ReactCountryFlag countryCode={activeLang.country} svg style={{ width: '1.1em' }} />
              <span>{activeLang.code.toUpperCase()}</span>
              <HiChevronDown size={12} className={s.chevron(langOpen)} />
            </button>
            
            {langOpen && (
              <div className={s.langDropdown}>
                {/* 5. On boucle sur la constante définie en haut du fichier */}
                {languages.map((lang) => (
                  <button 
                    key={lang.code} 
                    onClick={() => changeLang(lang.code)} 
                    className={s.langItem(currentLang === lang.code)}
                  >
                    <ReactCountryFlag countryCode={lang.country} svg style={{ width: '1.2em' }} />
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={toggleTheme} className={s.themeButton} aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}>
            {isDark ? <HiSun size={18} /> : <HiMoon size={18} />}
          </button>

          <Link to="/contact" className={s.ctaButton}>
            {t('nav.cta')}
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={s.mobileButton}
            aria-expanded={isOpen}
            aria-label="Ouvrir le menu"
          >
            {isOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className={s.mobileMenu}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => s.mobileLink(isActive)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/contact" onClick={() => setIsOpen(false)} className={s.mobileCta}>
            {t('nav.cta')}
          </Link>
        </div>
      )}
    </header>
  )
}

export default Navbar
