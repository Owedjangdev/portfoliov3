import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'
import { HiMail, HiLocationMarker, HiPaperAirplane, HiCheckCircle, HiXCircle } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'
import { contactStyles as s } from '../styles/contact.styles'
import { supabase } from '../lib/supabaseClient'

const Contact = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')

    const form = e.currentTarget
    const formData = new FormData(form)
    
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      project_type: formData.get('project_type') as string,
      budget: formData.get('budget') as string,
      message: formData.get('message') as string,
      subject: `Nouveau projet: ${formData.get('project_type')} - De ${formData.get('name')}`
    }

    try {
      // 1. BACKEND (SUPABASE)
      const { error: dbError } = await supabase.from('contact_messages').insert([data])
      if (dbError) throw new Error(`DB: ${dbError.message}`)

      // 2. EMAIL (EMAILJS)
      const emailRes = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        data
      )
      if (emailRes.status !== 200) throw new Error(`EmailJS: ${emailRes.text}`)

      setStatus('success')
      form.reset()
      setTimeout(() => setStatus('idle'), 6000)

    } catch (error: any) {
      console.error("Erreur:", error)
      setStatus('error')
      setErrorMessage(error.message || "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className={s.section}>
      <div className={s.container}>
        
        {/* --- HEADER INTERACTIF --- */}
        <div className={s.introWrapper}>
          <span className={s.introLabel}>{t('contact.intro_label')}</span>
          <h2 className={s.introTitle}>
            {t('contact.intro_title')}
            <span className={s.introAccent}>{t('contact.intro_accent')}</span>
          </h2>
          <p className={s.introDesc}>{t('contact.intro_desc')}</p>
        </div>

        <div className={s.grid}>
          
          {/* --- INFOS (GAUCHE) --- */}
          <div className={s.infoColumn}>
            <div className={s.infoCard}>
              <div className={s.iconBox}><HiMail size={24} /></div>
              <h3 className={s.infoTitle}>Email</h3>
              <p className={s.infoDesc}>Pour toute demande professionnelle ou collaboration.</p>
              <a href="mailto:oweedev@gmail.com" className={s.infoLink}>oweedev@gmail.com</a>
            </div>

            <div className={s.infoCard}>
              <div className={s.iconBox}><FaWhatsapp size={24} /></div>
              <h3 className={s.infoTitle}>WhatsApp</h3>
              <p className={s.infoDesc}>Réponse rapide garantie. Disponible du lundi au vendredi.</p>
              <a href="https://wa.me/22997957777" className={s.infoLink}>+229 0149661431 →</a>
            </div>

            <div className={s.infoCard}>
              <div className={s.iconBox}><HiLocationMarker size={24} /></div>
              <h3 className={s.infoTitle}>Localisation</h3>
              <p className={s.infoDesc}>Basé au Bénin. Ouvert aux opportunités internationales.</p>
              <span className={s.infoLink}>Cotonou, Bénin</span>
            </div>
          </div>

          {/* --- FORMULAIRE (DROITE) --- */}
          <div className={s.formCard}>
            <div className={s.formHeader}>
              <h3 className={s.formTitle}>{t('contact.title')}{t('contact.subtitle')}</h3>
              <p className={s.formDesc}>{t('contact.desc')}</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={s.inputGrid}>
                <div className={s.group}>
                  <label className={s.label}>{t('contact.name')} *</label>
                  <input name="name" required className={s.input} placeholder={t('contact.placeholders.name')} />
                </div>
                <div className={s.group}>
                  <label className={s.label}>{t('contact.email')} *</label>
                  <input name="email" type="email" required className={s.input} placeholder={t('contact.placeholders.email')} />
                </div>
              </div>

              <div className={s.inputGrid}>
                <div className={s.group}>
                  <label className={s.label}>{t('contact.phone')}</label>
                  <input name="phone" className={s.input} placeholder={t('contact.placeholders.phone')} />
                </div>
                <div className={s.group}>
                  <label className={s.label}>{t('contact.project_type')} *</label>
                  <select name="project_type" required className={s.select}>
                    <option value="">{t('contact.placeholders.project')}</option>
                    <option value="Développement Web">{t('contact.options.web')}</option>
                    <option value="Application Mobile">{t('contact.options.mobile')}</option>
                    <option value="SaaS / B2B">{t('contact.options.saas')}</option>
                    <option value="SEO & Performance">{t('contact.options.seo')}</option>
                  </select>
                </div>
              </div>

              <div className={s.group + " mb-6"}>
                <label className={s.label}>{t('contact.budget')}</label>
                <select name="budget" className={s.select}>
                  <option value="">{t('contact.placeholders.budget')}</option>
                  <option value="Petit Budget">{t('contact.options.budget1')}</option>
                  <option value="Budget Moyen">{t('contact.options.budget2')}</option>
                  <option value="Gros Budget">{t('contact.options.budget3')}</option>
                </select>
              </div>

              <div className={s.group}>
                <label className={s.label}>{t('contact.message')} *</label>
                <textarea name="message" required className={s.textarea} placeholder={t('contact.placeholders.message')} />
              </div>

              <div className={s.footer}>
                <button 
                  type="submit" 
                  disabled={loading || status === 'success'} 
                  className={`${s.submitBtn} ${status === 'success' ? 'bg-green-600' : ''}`}
                >
                  {loading ? 'Traitement...' : 
                   status === 'success' ? <><HiCheckCircle size={20}/> Envoyé !</> : 
                   status === 'error' ? <><HiXCircle size={20}/> Erreur</> : 
                   <><HiPaperAirplane className="rotate-90"/> {t('contact.send')}</>}
                </button>
                {status === 'error' && <p className="text-red-500 text-[10px] mt-2 font-bold">{errorMessage}</p>}
                <p className={s.responseMsg}>Réponse garantie sous 24h</p>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact