import { useState, useEffect, useRef } from 'react'
import { flushSync } from 'react-dom'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Projects, { sampleProjects } from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectDetail from './components/ProjectDetail'
import PortfolioIntro from './components/PortfolioIntro'

export default function App() {
  const [hash, setHash] = useState(window.location.hash)
  const [showIntro, setShowIntro] = useState(() => {
    if (window.location.hash) return false
    try { return sessionStorage.getItem('portfolio-opened') !== '1' }
    catch { return true }
  })
  const firstVisit = useRef(true)
  const selectedProject = sampleProjects.find(project => hash === `#project-${project.id}`)
  const activeSection = hash === '#about' ? 'about' : hash === '#contact' ? 'contact' : 'home'

  useEffect(() => {
    const navigate = () => {
      const update = () => flushSync(() => setHash(window.location.hash))
      if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.startViewTransition(update).ready.catch(() => {})
      } else update()
    }
    window.addEventListener('hashchange', navigate)
    return () => window.removeEventListener('hashchange', navigate)
  }, [])

  useEffect(() => {
    if (showIntro && !hash) return
    document.title = `${selectedProject?.name || (activeSection === 'home' ? 'Portfolio' : activeSection === 'about' ? 'About' : 'Contact')} — Krisha Ulagadde`
    const frame = requestAnimationFrame(() => {
      if (!firstVisit.current) document.getElementById('main-content').focus({ preventScroll: true })
      firstVisit.current = false
      if (hash === '#projects') document.getElementById('projects')?.scrollIntoView()
      else window.scrollTo(0, 0)
    })
    return () => cancelAnimationFrame(frame)
  }, [hash, activeSection, selectedProject, showIntro])

  if (showIntro && !hash) return <PortfolioIntro onOpen={() => {
    try { sessionStorage.setItem('portfolio-opened', '1') }
    catch { /* Entry still works when browser storage is unavailable. */ }
    const open = () => {
      flushSync(() => setShowIntro(false))
      document.getElementById('main-content')?.focus({ preventScroll: true })
    }
    if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.startViewTransition(open).ready.catch(() => {})
    } else open()
  }} />

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content" onClick={(event) => {
        event.preventDefault()
        document.getElementById('main-content').focus()
        document.getElementById('main-content').scrollIntoView()
      }}>Skip to content</a>
      <Navigation activeSection={selectedProject || hash === '#projects' ? 'work' : activeSection} />
      <main id="main-content" tabIndex="-1">
        {selectedProject ? <ProjectDetail project={selectedProject} /> : <>
          {activeSection === 'home' && <><Hero /><Projects /></>}
          {activeSection === 'about' && <About />}
          {activeSection === 'contact' && <Contact />}
        </>}
      </main>
      <Footer />
    </div>
  )
}
