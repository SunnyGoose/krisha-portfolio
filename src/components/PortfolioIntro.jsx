import { useEffect, useRef, useState } from 'react'

export default function PortfolioIntro({ onOpen }) {
  const [opening, setOpening] = useState(false)
  const opened = useRef(false)
  const openingRequested = useRef(false)
  const finish = () => {
    if (opened.current) return
    opened.current = true
    onOpen()
  }
  useEffect(() => {
    const fly = new Image()
    fly.src = '/intro-fly.gif'
  }, [])
  useEffect(() => {
    if (!opening) return
    const timeout = setTimeout(finish, 1900)
    return () => clearTimeout(timeout)
  }, [opening])
  const open = () => {
    if (openingRequested.current) return
    openingRequested.current = true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) finish()
    else setOpening(true)
  }
  return (
    <main id="main-content" className="portfolio-intro" tabIndex="-1">
      <div className={`intro-cover${opening ? ' intro-opening' : ''}`}>
        <div className="intro-composition">
          <div>
            <h1>Krisha<br />Ulagadde<span>.</span></h1>
            <p>Art, interaction & computing.</p>
          </div>
        </div>
        <div className="intro-runway" aria-hidden="true">
          <div className="intro-walker">
            <picture className="intro-flight" onAnimationEnd={event => { if (event.animationName === 'intro-takeoff') finish() }}>
              <source media="(prefers-reduced-motion: reduce)" srcSet="/intro-walk-still.png" />
              <img src={opening ? '/intro-fly.gif' : '/intro-walk.gif'} alt="" />
            </picture>
          </div>
        </div>
        <button type="button" className="intro-open" onClick={open} disabled={opening}>
          <span>{opening ? 'Opening portfolio…' : 'Open portfolio'}</span>
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 12h16m-7-7 7 7-7 7" /></svg>
        </button>
      </div>
    </main>
  )
}
