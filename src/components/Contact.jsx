import { useState, useEffect, useRef } from 'react'
import { contactDetails } from './Footer'

export default function Contact() {
  const [artworkReplay, setArtworkReplay] = useState(0)
  const [formData, setFormData] = useState(() => {
    try {
      const draft = JSON.parse(sessionStorage.getItem('contact-draft') || '{}')
      return Object.fromEntries(['name', 'email', 'message'].map(key => [key, typeof draft?.[key] === 'string' ? draft[key] : '']))
    } catch { return { name: '', email: '', message: '' } }
  })
  const [status, setStatus] = useState('')
  const emailRequested = useRef(false)
  const [emailOpened, setEmailOpened] = useState(false)
  const emailHref = `mailto:${contactDetails.email}?subject=${encodeURIComponent(`Portfolio enquiry from ${formData.name.replace(/[\r\n]/g, ' ')}`)}&body=${encodeURIComponent(formData.message)}`

  const handleEmailClick = (event) => {
    if (emailRequested.current || !event.currentTarget.closest('form').reportValidity()) {
      event.preventDefault()
      return
    }
    emailRequested.current = true
    setEmailOpened(true)
    setStatus('Email app requested. Send your message there; your draft remains here.')
  }

  useEffect(() => {
    try { sessionStorage.setItem('contact-draft', JSON.stringify(formData)) }
    catch { /* The current form stays intact if browser storage is unavailable. */ }
  }, [formData])

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    setStatus('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!event.currentTarget.closest('form').reportValidity()) return
    if (!contactDetails.email) {
      try {
        sessionStorage.setItem('contact-draft', JSON.stringify(formData))
        setStatus('Draft saved in this browser tab. Your message has not been sent.')
      } catch { setStatus('Your browser could not save this draft. Copy your message before leaving this page.') }
      return
    }
    try {
      await navigator.clipboard.writeText(`To: ${contactDetails.email}\nSubject: Portfolio enquiry from ${formData.name}\n\n${formData.message}`)
      setStatus('Draft copied. Paste it into a new email and send it there. Your draft remains here.')
    } catch {
      setStatus(`Could not copy automatically. Copy your message above and email it to ${contactDetails.email}. Your draft remains here.`)
    }
  }

  return (
    <section className="section contact-section">
      <div className="container">
        <header className="contact-header">
          <div>
            <h1>Get in touch<span>.</span></h1>
            <p>Have an idea in mind? I'd love to hear about it.</p>
          </div>
          <button type="button" className="contact-artwork" aria-label="Replay envelope animation" title="Replay envelope animation" onClick={() => setArtworkReplay(count => count + 1)}>
            <picture>
              <source media="(prefers-reduced-motion: reduce)" srcSet="/contact-envelope-still.png" />
              <img src={`/contact-envelope.gif?replay=${artworkReplay}`} alt="" width="2048" height="2048" />
            </picture>
          </button>
        </header>
        <div className="contact-layout">
          <div className="contact-info">
            <h2>Say hello</h2>
            <div className="contact-emails">
              {contactDetails.email && <a href={`mailto:${contactDetails.email}`}><span>Personal</span>{contactDetails.email}</a>}
              {contactDetails.schoolEmail && <a href={`mailto:${contactDetails.schoolEmail}`}><span>Georgia Tech</span>{contactDetails.schoolEmail}</a>}
            </div>
            <div className="contact-socials">
              {contactDetails.github && <a href={contactDetails.github} target="_blank" rel="noopener noreferrer">GitHub<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg></a>}
              {contactDetails.linkedin && <a href={contactDetails.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg></a>}
            </div>
            {contactDetails.resume && <div className="contact-resume">
              <h2>My résumé</h2>
              <p>A closer look at my experience and education.</p>
              <div className="resume-actions contact-socials">
                <a href={contactDetails.resume} target="_blank" rel="noopener noreferrer">View résumé<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg></a>
                <a href={contactDetails.resume} download>Download résumé<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5" /></svg></a>
              </div>
            </div>}
          </div>
          <div className="contact-message">
            <h2>Start a conversation</h2>
            <p className="contact-note">Write a message below, then choose Email me to open your email app.</p>
            {!contactDetails.email && <p className="contact-note">Contact details are being updated. You can save a message draft here for now.</p>}
            <form onSubmit={event => { event.preventDefault() }}>
              <div className="contact-form-row">
                <div className="form-field">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" autoComplete="email" spellCheck={false} value={formData.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required />
              </div>
              {contactDetails.email && <a href={emailHref} className="btn contact-email-launch" aria-disabled={emailOpened} onClick={handleEmailClick}>{emailOpened ? 'Email app requested' : 'Email me'}</a>}
              {emailOpened && <button type="button" className="contact-email-reset" onClick={() => { emailRequested.current = false; setEmailOpened(false); setStatus('') }}>Prepare another email</button>}
              <button type="button" onClick={handleSubmit} className="btn">{contactDetails.email ? 'Copy email draft' : 'Save draft'}<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></button>
              <p className="form-status" role="status">{status}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
