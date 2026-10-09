import { useEffect, useState } from 'react'

export default function About() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [phase, setPhase] = useState(reducedMotion ? 'rest' : 'walking')
  const [replay, setReplay] = useState(0)
  const [portraitReplay, setPortraitReplay] = useState(0)
  const [nameFlight, setNameFlight] = useState(0)
  useEffect(() => {
    if (phase !== 'walking') return
    const hello = new Image()
    hello.src = '/about-hello.gif?replay=0'
    const timeout = setTimeout(() => setPhase('hello'), 3300)
    return () => clearTimeout(timeout)
  }, [phase])
  return (
    <section className="section about-section">
      <div className="container">
        <div className="about-header">
          <div>
          <h1>About<span>.</span></h1>
          <p>Who am I?</p>
          </div>
          <button type="button" className={`about-artwork about-artwork-${phase}`} aria-label="Replay the ladybug saying hello" title="Click to say hello" onClick={() => {
            if (reducedMotion) return
            setReplay(value => value + 1)
            setPhase('hello')
          }}>
            <picture>
              <source media="(prefers-reduced-motion: reduce)" srcSet="/about-hello-still.png" />
              <img src={phase === 'walking' ? '/about-walk.gif' : phase === 'hello' ? `/about-hello.gif?replay=${replay}` : '/about-hello-still.png'} alt="" width="1938" height="971" onAnimationEnd={event => { if (event.animationName === 'about-walk-in') setPhase('hello') }} />
            </picture>
          </button>
        </div>

        <div className="about-card">
          <div className="about-card-left">
            <h2>Hi, I'm <button type="button" className="about-name" aria-label="Krisha — play the flying ladybug animation" onClick={() => {
              if (reducedMotion) return
              setNameFlight(value => value + 1)
            }}>Krisha{nameFlight > 0 && <img key={nameFlight} className="about-name-flight" src={`/about-fly.gif?flight=${nameFlight}`} alt="" aria-hidden="true" />}</button><span className="about-intro-dot">.</span></h2>
            <p className="about-location">Based in Atlanta, GA</p>
            <p>
              I’m a Computational Media student at Georgia Tech concentrating in Interaction
              Design and Computer Intelligence. I’m especially interested in UI/UX and game
              design, where I can combine creativity, art, and technology to create engaging experiences.
            </p>
            <p>
              Computational Media lets me explore both computer science and the liberal arts,
              giving me a unique perspective on how people interact with technology. Outside
              of class, I enjoy creating digital art and developing games.
            </p>
          </div>

          <button type="button" className="about-portrait" aria-label="Replay my animated self-portrait" title="Click to replay" onClick={() => setPortraitReplay(value => value + 1)}>
            <picture>
              <source media="(prefers-reduced-motion: reduce)" srcSet="/krisha-portrait-still.png" />
              <img src={`/krisha-portrait.gif?replay=${portraitReplay}`} alt="An illustrated self-portrait of Krisha" width="1696" height="1710" />
            </picture>
          </button>
          <div className="about-card-right">
            <div className="skills-section">
              <h2>Design & creative tools</h2>
              <div className="skill-tags">
                {['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Blender', 'Procreate', 'Clip Studio Paint'].map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="skills-section">
              <h2>Development</h2>
              <div className="skill-tags">
                {['Unity', 'C#', 'C', 'HTML/CSS', 'JavaScript', 'React', 'Python', 'SQL', 'VS Code'].map(tool => (
                  <span key={tool} className="skill-tag">{tool}</span>
                ))}
              </div>
            </div>

            <div className="skills-section">
              <h2>Collaboration</h2>
              <div className="skill-tags">
                {['Git', 'GitHub', 'Kanban', 'Agile'].map(interest => (
                  <span key={interest} className="skill-tag">{interest}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="about-leadership" aria-labelledby="leadership-heading">
          <h2 id="leadership-heading">Leadership & Experience<span className="about-intro-dot">.</span></h2>
          <p>Teaching, leading creative teams, and designing experiences for real people.</p>
          <ul className="about-roles">
            <li>
              <span className="skill-tag">CS 1301 PLUS · Peer Instructor</span>
              <p>I lead biweekly Python review sessions for <strong>50+</strong> students, creating interactive activities to build programming and problem-solving skills. I also support <strong>100+</strong> students during weekly lectures.</p>
            </li>
            <li>
              <span className="skill-tag">GT Girls Who Code · Executive Board / Social Media & Design</span>
              <p>I help coordinate meetings, career workshops, and volunteer events averaging <strong>40+</strong> attendees, and manage Instagram, LinkedIn, and Slack communications for <strong>200+</strong> active members and a social audience of <strong>1,000</strong> followers.</p>
            </li>
            <li>
              <span className="skill-tag">GT Video Game Development Club · Project Lead</span>
              <p>After pitching <em>Unraveling</em> to <strong>140+</strong> prospective contributors, I built a multidisciplinary team of <strong>100+</strong> members. I lead Unity/C# development, coordinate work through GitHub and Kanban, and use playtesting feedback to improve gameplay and usability.</p>
            </li>
            <li>
              <span className="skill-tag">Sign Game Labs / PopSign · Researcher & Product Designer</span>
              <p>I conduct UX research and user testing for PopSign, an interactive ASL learning experience. I design interaction flows and UI prototypes for its Unity-based experience, which uses AI-powered hand recognition to provide real-time feedback.</p>
            </li>
            <li>
              <span className="skill-tag">Unique Jewel · Web Developer & Marketing Lead</span>
              <p>I develop a customer-facing website with React, JavaScript, HTML/CSS, and Vercel, and support digital marketing initiatives that contribute to <strong>200+</strong> annual sales and approximately <strong>$15,000</strong> in annual revenue.</p>
            </li>
          </ul>
        </section>

        <div className="projects-cta">
          <a href="#projects" className="btn">Explore my projects<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></a>
        </div>
      </div>
    </section>
  )
}
