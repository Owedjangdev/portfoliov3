import nodemailer from 'nodemailer'
import { env } from '../config/env.js'

let transporter = null

function getTransporter() {
  if (!env.smtp.host || !env.smtp.user || !env.smtp.pass) {
    return null
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.secure,
      auth: { user: env.smtp.user, pass: env.smtp.pass },
    })
  }
  return transporter
}

// Envoie un email de notification pour un nouveau message de contact.
// Ne fait pas échouer la requête si le SMTP n'est pas configuré.
export async function sendContactEmail(data) {
  const tx = getTransporter()
  if (!tx) {
    console.warn('✉️  SMTP non configuré — email de contact ignoré (message tout de même enregistré).')
    return { sent: false }
  }

  const html = `
    <h2>Nouveau message du portfolio</h2>
    <ul>
      <li><strong>Nom:</strong> ${data.name}</li>
      <li><strong>Email:</strong> ${data.email}</li>
      <li><strong>Téléphone:</strong> ${data.phone || '—'}</li>
      <li><strong>Type de projet:</strong> ${data.project_type || '—'}</li>
      <li><strong>Budget:</strong> ${data.budget || '—'}</li>
    </ul>
    <p><strong>Message:</strong></p>
    <p>${(data.message || '').replace(/\n/g, '<br/>')}</p>
  `

  await tx.sendMail({
    from: env.smtp.from,
    to: env.smtp.to,
    replyTo: data.email,
    subject: data.subject || `Nouveau message de ${data.name}`,
    html,
  })

  return { sent: true }
}
