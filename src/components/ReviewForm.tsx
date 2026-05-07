import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiUser, HiMail, HiOfficeBuilding, HiBadgeCheck, HiLink, HiStar, HiPaperAirplane } from 'react-icons/hi'
import { testimonialStyles as s } from '../styles/testimonials.styles'
import { supabase } from '../lib/supabaseClient'

interface ReviewFormProps {
  onSuccess: (newReview: any) => void
}

const ReviewForm = ({ onSuccess }: ReviewFormProps) => {
  const { t } = useTranslation()
  const [rating, setRating] = useState(5)
  const [hover, setHover] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const f = s.f // raccourci vers les styles du formulaire

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const newEntry = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      role: formData.get('role'),
      project_name: formData.get('project'),
      content: formData.get('content'),
      rating: rating
    }

    const { data, error } = await supabase
      .from('testimonials')
      .insert([newEntry])
      .select()

    if (!error && data) {
      onSuccess(data[0])
    } else {
      alert("Erreur lors de l'envoi")
    }
    setLoading(false)
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
        </div>
      </form>
    </div>
  )
}

export default ReviewForm