import { useEffect, useRef, useState } from 'react'

// Add confirmed public contact details here; Contact uses the same destinations.
export const contactDetails = {
  email: 'krisha.s.ulagadde@gmail.com',
  schoolEmail: 'kulagadde@gatech.edu',
  github: 'https://github.com/SunnyGoose',
  linkedin: 'https://www.linkedin.com/in/krishaulagadde/',
  resume: '/krisha-ulagadde-resume-2026.pdf',
}

export default function Footer() {
  const footerRef = useRef(null)
  const [walking, setWalking] = useState(false)
  const walkerRef = useRef(null)
  const dragStart = useRef(null)
  const [held, setHeld] = useState(false)
  const [falling, setFalling] = useState(false)
  const [paused, setPaused] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const moving = walking && !held && !falling && !paused
  useEffect(() => {
    if (!falling) return
    const timer = setTimeout(() => setFalling(false), 400)
    return () => clearTimeout(timer)
  }, [falling])
  const drop = () => {
    if (!dragStart.current) return
    dragStart.current = null
    const animation = walkerRef.current.getAnimations()[0]
    if (animation) {
      const duration = animation.effect.getTiming().duration
      const distance = walkerRef.current.clientWidth + 240
      animation.currentTime = ((animation.currentTime + offset.x / distance * duration) % duration + duration) % duration
    }
    setHeld(false)
    setFalling(true)
    setOffset({ x: 0, y: 0 })
  }
  useEffect(() => {
    let visible = false
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setWalking(visible && !document.hidden && !preference.matches)
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update() })
    observer.observe(footerRef.current)
    document.addEventListener('visibilitychange', update)
    preference.addEventListener('change', update)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', update)
      preference.removeEventListener('change', update)
    }
  }, [])
  return (
    <footer ref={footerRef}>
      <div className="footer-panel">
      <div className="footer-links">
        <a href="#contact">Get in touch</a>
        {contactDetails.resume && <a href={contactDetails.resume} target="_blank" rel="noopener noreferrer">Résumé</a>}
        {contactDetails.email && <a href={`mailto:${contactDetails.email}`}>Email</a>}
        {contactDetails.github && <a href={contactDetails.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
        {contactDetails.linkedin && <a href={contactDetails.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
      </div>
      <p>© {new Date().getFullYear()} Krisha. All rights reserved.</p>
      </div>
      <div className={`footer-bug-lane${held || falling ? ' footer-bug-picked-up' : ''}`}>
        <div ref={walkerRef} className="intro-walker footer-walker" style={{ animationPlayState: moving ? 'running' : 'paused' }}>
          <button type="button" className={`footer-bug${held ? ' is-held' : ''}${falling ? ' is-falling' : ''}`}
            aria-label="Pick up the ladybug; press Enter to pause or resume walking" aria-pressed={paused}
            style={{ left: offset.x, transform: `translateY(${offset.y}px)` }}
            onClick={event => { if (event.detail === 0) setPaused(value => !value) }}
            onPointerDown={event => {
              if (event.button !== 0 || falling) return
              event.preventDefault()
              event.currentTarget.setPointerCapture(event.pointerId)
              dragStart.current = { x: event.clientX, y: event.clientY }
              setHeld(true)
            }}
            onPointerMove={event => {
              if (!dragStart.current) return
              setOffset({ x: event.clientX - dragStart.current.x, y: Math.min(0, event.clientY - dragStart.current.y) })
            }}
            onPointerUp={drop} onPointerCancel={drop} onLostPointerCapture={drop}>
            <img src={moving ? '/intro-walk.gif' : '/intro-walk-still.png'} alt="" draggable="false" />
          </button>
        </div>
      </div>
    </footer>
  )
}
