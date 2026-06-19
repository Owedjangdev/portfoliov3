import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiMail, HiLocationMarker, HiPaperAirplane, HiCheckCircle, HiXCircle } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'
import { contactStyles as s } from '../styles/contact.styles'
import { api } from '../lib/api'

const Contact = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

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
      // Le backend enregistre en base (MongoDB) ET envoie l'email (Nodemailer)
      await api('/contact', { method: 'POST', body: data })

      setStatus('success')
      form.reset()
      setTimeout(() => setStatus('idle'), 6000)

    } catch (error: unknown) {
      console.error("Erreur:", error)
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : "Une erreur est survenue")
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
              <p className={s.infoDesc}>{t('contact.info.email_desc')}</p>
              <a href={`mailto:${t('footer.contact.email')}`} className={s.infoLink}>{t('footer.contact.email')}</a>
            </div>

            <div className={s.infoCard}>
              <div className={s.iconBox}><FaWhatsapp size={24} /></div>
              <h3 className={s.infoTitle}>WhatsApp</h3>
              <p className={s.infoDesc}>{t('contact.info.whatsapp_desc')}</p>
              <a href="https://wa.me/2290149661431" className={s.infoLink}>{t('footer.contact.phone')} →</a>
            </div>

            <div className={s.infoCard}>
              <div className={s.iconBox}><HiLocationMarker size={24} /></div>
              <h3 className={s.infoTitle}>Localisation</h3>
              <p className={s.infoDesc}>{t('contact.info.location_desc')}</p>
              <span className={s.infoLink}>{t('footer.contact.location')}</span>
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
                  <label htmlFor="contact-name" className={s.label}>{t('contact.name')} *</label>
                  <input id="contact-name" name="name" required autoComplete="name" className={s.input} placeholder={t('contact.placeholders.name')} />
                </div>
                <div className={s.group}>
                  <label htmlFor="contact-email" className={s.label}>{t('contact.email')} *</label>
                  <input id="contact-email" name="email" type="email" required autoComplete="email" className={s.input} placeholder={t('contact.placeholders.email')} />
                </div>
              </div>

              <div className={s.inputGrid}>
                <div className={s.group}>
                  <label htmlFor="contact-phone" className={s.label}>{t('contact.phone')}</label>
                  <input id="contact-phone" name="phone" type="tel" autoComplete="tel" className={s.input} placeholder={t('contact.placeholders.phone')} />
                </div>
                <div className={s.group}>
                  <label htmlFor="contact-project" className={s.label}>{t('contact.project_type')} *</label>
                  <select id="contact-project" name="project_type" required className={s.select}>
                    <option value="">{t('contact.placeholders.project')}</option>
                    <option value="Développement Web">{t('contact.options.web')}</option>
                    <option value="Application Mobile">{t('contact.options.mobile')}</option>
                    <option value="SaaS / B2B">{t('contact.options.saas')}</option>
                    <option value="SEO & Performance">{t('contact.options.seo')}</option>
                  </select>
                </div>
              </div>

              <div className={s.group + " mb-6"}>
                <label htmlFor="contact-budget" className={s.label}>{t('contact.budget')}</label>
                <select id="contact-budget" name="budget" className={s.select}>
                  <option value="">{t('contact.placeholders.budget')}</option>
                  <option value="Moins de 60 000 CFA">{t('contact.options.budget1')}</option>
                  <option value="100 000 - 150 000 CFA">{t('contact.options.budget2')}</option>
                  <option value="Plus de 150 000 CFA">{t('contact.options.budget3')}</option>
                </select>
              </div>

              <div className={s.group}>
                <label htmlFor="contact-message" className={s.label}>{t('contact.message')} *</label>
                <textarea id="contact-message" name="message" required className={s.textarea} placeholder={t('contact.placeholders.message')} />
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
                {status === 'error' && <p role="alert" className={s.errorMsg}>{errorMessage}</p>}
                {status === 'success' && <p role="status" className={s.successMsg}>{t('contact.success')}</p>}
                <p className={s.responseMsg}>{t('contact.response_time')}</p>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact
