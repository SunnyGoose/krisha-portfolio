import heroVideo from '../assets/hero-video.mp4'
import heroCardVideo from '../assets/hero-card-video.mp4'
import { useRef, useState } from 'react'
import { playVideo } from '../videoPlayback'

export default function Hero() {
  const autoPlay = !globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const cardVideo = useRef(null)
  const backgroundVideo = useRef(null)
  const [backgroundBlocked, setBackgroundBlocked] = useState(false)
  const replayCard = () => playVideo(cardVideo.current, true)
  return (
    <section className="hero">
      <video ref={backgroundVideo} className="hero-video" autoPlay={autoPlay} preload="auto" muted playsInline aria-hidden="true"
        onPlaying={() => setBackgroundBlocked(false)}
        onCanPlay={async (event) => {
          if (await playVideo(event.currentTarget) === false) setBackgroundBlocked(true)
        }}>
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className="hero-card">
        <div className="hero-content">
          <h1 className="hero-title"><a className="hero-name-link" href="#about" aria-label="Krisha Ulagadde — About me">Krisha<br />Ulagadde<span className="hero-title-dot">.</span></a></h1>
          <p className="hero-tagline">
            <span className="hero-education">Computational Media @ Georgia Institute of Technology</span>
            Concentrating in Interaction Design and Intelligence. Passionate about combining art and computing.
          </p>
          <div className="hero-badge">
            <span>Problem solving, creativity & continuous learning</span>
          </div>
          <div className="hero-actions">
            <a href="#projects" className="hero-work-link">Explore my projects
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
            </a>
          </div>
          {backgroundBlocked && <button className="background-play" onClick={() => playVideo(backgroundVideo.current, true)}>Play background animation</button>}
        </div>
        <div className="hero-artwork">
          <button className="hero-video-wrapper" onMouseEnter={replayCard} onFocus={replayCard} onClick={replayCard} aria-label="Replay the ladybug animation" aria-describedby="hero-art-hint">
            <video ref={cardVideo} className="hero-ladybug" autoPlay={autoPlay} preload="auto" muted playsInline aria-hidden="true"
              onCanPlay={(event) => playVideo(event.currentTarget)}>
              <source src={heroCardVideo} type="video/mp4" />
            </video>
          </button>
          <p id="hero-art-hint" className="hero-art-hint">A little curiosity goes a long way.<span>Hover or tap to play again.</span></p>
        </div>
      </div>
    </section>
  )
}
