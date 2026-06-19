import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiUser, HiMail, HiOfficeBuilding, HiBadgeCheck, HiLink, HiStar, HiPaperAirplane } from 'react-icons/hi'
import { testimonialStyles as s } from '../styles/testimonials.styles'
import { api } from '../lib/api'

interface ReviewFormProps {
  onSuccess?: () => void
}

const getReviewSubmitError = (error: unknown, fallback: string) => {
  if (!(error instanceof Error)) return fallback

  if (import.meta.env.DEV) {
    return `${fallback} (${error.message})`
  }

  return fallback
}

const ReviewForm = ({ onSuccess }: ReviewFormProps) => {
  const { t } = useTranslation()
  const [rating, setRating] = useState(5)
  const [hover, setHover] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const f = s.f // raccourci vers les styles du formulaire

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')
    setSuccessMessage('')
    
    const form = e.currentTarget
    const formData = new FormData(form)
    const newEntry = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim() || null,
      company: String(formData.get('company') ?? '').trim() || null,
      role: String(formData.get('role') ?? '').trim() || null,
      project_name: String(formData.get('project') ?? '').trim() || null,
      content: String(formData.get('content') ?? '').trim(),
      rating,
    }

    try {
      await api('/testimonials', { method: 'POST', body: newEntry })
      onSuccess?.()
      form.reset()
      setCharCount(0)
      setRating(5)
      setSuccessMessage(t('testimonials.form.success'))
    } catch (error) {
      console.error('Erreur envoi témoignage:', error)
      setErrorMessage(getReviewSubmitError(error, t('testimonials.form.error')))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={f.container}>
      <form onSubmit={handleSubmit}>
        <div className={f.grid}>
          {/* Nom */}
          <div className={f.group}>
            <div className={f.labelWrapper}><HiUser className={f.labelIcon} /><span className={f.label}>{t('testimonials.form.name')} *</span></div>
            <input name="name" required className={f.input} placeholder={t('testimonials.form.placeholder_name')} />
          </div>
          {/* Email */}
          <div className={f.group}>
            <div className={f.labelWrapper}><HiMail className={f.labelIcon} /><span className={f.label}>{t('testimonials.form.email')}</span></div>
            <input name="email" type="email" className={f.input} placeholder={t('testimonials.form.placeholder_email')} />
          </div>
          {/* Entreprise */}
          <div className={f.group}>
            <div className={f.labelWrapper}><HiOfficeBuilding className={f.labelIcon} /><span className={f.label}>{t('testimonials.form.company')}</span></div>
            <input name="company" className={f.input} placeholder={t('testimonials.form.placeholder_company')} />
          </div>
          {/* Rôle */}
          <div className={f.group}>
            <div className={f.labelWrapper}><HiBadgeCheck className={f.labelIcon} /><span className={f.label}>{t('testimonials.form.role')}</span></div>
            <input name="role" className={f.input} placeholder={t('testimonials.form.placeholder_role')} />
          </div>
          {/* Projet */}
          <div className={f.group}>
            <div className={f.labelWrapper}><HiLink className={f.labelIcon} /><span className={f.label}>{t('testimonials.form.project')}</span></div>
            <input name="project" className={f.input} placeholder={t('testimonials.form.placeholder_project')} />
          </div>
          {/* Stars */}
          <div className={f.group}>
            <div className={f.labelWrapper}><HiStar className={f.labelIcon} /><span className={f.label}>{t('testimonials.form.rating')} *</span></div>
            <div className={f.starWrapper}>
              {[1, 2, 3, 4, 5].map((num) => (
                <HiStar
                  key={num}
                  size={24}
                  className={`${f.star} ${(hover || rating) >= num ? 'text-yellow-500' : 'text-gray-800'}`}
                  onMouseEnter={() => setHover(num)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(num)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mt-6 flex flex-col gap-2">
          <div className={f.labelWrapper}><span className={f.label}>{t('testimonials.form.content')} *</span></div>
          <textarea 
            name="content" required className={f.textarea}
            placeholder={t('testimonials.form.placeholder_content')}
            onChange={(e) => setCharCount(e.target.value.length)}
          />
          <div className="flex justify-between items-center">
            <span className={f.charCount}>{charCount} / 1000</span>
            <span className={f.disclaimer}>{t('testimonials.form.helper_disclaimer')}</span>
          </div>
        </div>

        <div className={f.footer}>
          <button type="submit" disabled={loading} className={f.submitBtn}>
            <HiPaperAirplane className="rotate-90" />
            {loading ? '...' : t('testimonials.form.submit')}
          </button>
          {successMessage && <p className="text-xs font-semibold text-green-400">{successMessage}</p>}
          {errorMessage && <p className="text-xs font-semibold text-red-400">{errorMessage}</p>}
        </div>
      </form>
    </div>
  )
}

export default ReviewForm
