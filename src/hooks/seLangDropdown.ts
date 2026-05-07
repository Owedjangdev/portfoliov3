import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

interface UseLangDropdownReturn {
  langOpen: boolean
  langRef: React.RefObject<HTMLDivElement | null>
  currentLang: string
  setLangOpen: React.Dispatch<React.SetStateAction<boolean>>
  changeLang: (code: string) => void
}
const useLangDropdown = (): UseLangDropdownReturn => {
  const { i18n }                = useTranslation()
  const [langOpen, setLangOpen] = useState<boolean>(false)
  const langRef                 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const changeLang = (code: string): void => {
    i18n.changeLanguage(code)
    localStorage.setItem('lang', code)
    setLangOpen(false)
  }

  return {
    langOpen,
    langRef,
    currentLang: i18n.language,
    setLangOpen,
    changeLang,
  }
}

export default useLangDropdown