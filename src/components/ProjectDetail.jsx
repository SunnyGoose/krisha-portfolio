import { useRef } from 'react'

export default function ProjectDetail({ project }) {
  const demoUrl = project.demo || (project.caseStudy ? '/projects/social-skills/sprint-2-demo.mp4' : null)
  const deckRef = useRef(null)
  const scrollDeck = direction => {
    const deck = deckRef.current
    deck.scrollBy({ left: direction * (deck.firstElementChild.getBoundingClientRect().width + 24), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }
  return (
    <section className={`project-detail${project.caseStudy || project.gallery ? ' project-case-study' : ''}`}>
      <a className="btn" href="#projects" style={{ marginBottom: '2rem' }}>
        ← Back to Projects
      </a>

      {project.caseStudy || project.gallery ? <div className="case-deck">
        <div ref={deckRef} id="project-image-deck" className="case-deck-track" role="region" aria-label={`${project.name} media`} tabIndex="0">
          {(project.gallery || [
            { file: 'mockup.png', alt: 'Social Skills Simulator mockup on a phone', caption: 'Social Skills Simulator · Interface mockup' },
            { file: 'scenario-dark.png', alt: 'Dark-mode scenario selection and document upload', caption: 'Choose a scenario and add personal context' },
            { file: 'conversation.png', alt: 'Group project roleplay with follow-up input and a source reference', caption: 'Practice a conversation and ask follow-up questions' },
            { file: 'scenario-light.png', alt: 'Scenario setup in light mode', caption: 'The interface in light mode' },
          ]).map(({ file, src, type, alt, caption }) => <figure key={src || file} className="case-deck-slide">
            {type === 'video' ? <video src={src} aria-label={alt} controls playsInline preload="metadata"><a href={src}>Open gameplay video</a></video> :
              <a href={src || `/projects/social-skills/${file}`} target="_blank" rel="noopener noreferrer"><img src={src || `/projects/social-skills/${file}`} alt={alt} /></a>}
            <figcaption>{caption}</figcaption>
          </figure>)}
        </div>
        <div className="case-deck-controls">
          <span>Scroll or swipe to explore · Click an image to enlarge</span>
          <button type="button" onClick={() => scrollDeck(-1)} aria-label="Previous image" aria-controls="project-image-deck"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6" /></svg></button>
          <button type="button" onClick={() => scrollDeck(1)} aria-label="Next image" aria-controls="project-image-deck"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></button>
        </div>
      </div> : <div className="project-detail-hero">
        <img src={project.image} alt={project.name} width="800" height="450" />
      </div>}

      <h1>{project.name}</h1>
      {project.subtitle && <p className="case-subtitle">{project.subtitle}<span className="about-intro-dot">.</span></p>}
      {project.facts && <dl className="case-facts">
        {project.facts.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
      </dl>}
      {project.caseStudy && <>
        <p className="case-subtitle">AI-powered communication practice<span className="about-intro-dot">.</span></p>
        <dl className="case-facts">
          <div><dt>Timeline</dt><dd>March–April · 2 sprints</dd></div>
          <div><dt>My role</dt><dd>Full-stack developer</dd></div>
          <div><dt>Team</dt><dd>Krisha U, Sneha M, Elliot H, Jihoon K, and Yumeng Q</dd></div>
        </dl>
      </>}

      <div className="detail-section">
        <h2>Tech Stack</h2>
        <div className="tech-stack">
          {project.tech.map(tech => (
            <span key={tech} className="skill-tag">{tech}</span>
          ))}
        </div>
      </div>

      <div className="detail-section">
        <h2>Overview</h2>
        <p>{project.overview}</p>
        {project.caseStudy && <p>We deployed the application on PythonAnywhere. <a href="https://krisha06.pythonanywhere.com" target="_blank" rel="noopener noreferrer">Try the live Social Skills Simulator</a>.</p>}
      </div>

      {project.caseStudy && <>
        <section className="detail-section">
          <h2>From an idea to a practice session</h2>
          <p>Our early persona centered on a technically confident CS student who finds networking and behavioral interviews difficult. That gave the design a clear goal: make it easier to start a conversation, practice safely, and understand what to improve.</p>
          <h3>Ideation & early design</h3>
          <iframe className="case-pdf" src="/projects/social-skills/ideation.pdf#view=FitH" title="Social Skills Simulator ideation and early design presentation" loading="lazy" />
          <p className="case-demo-note">Scroll inside the viewer to explore the presentation. <a href="/projects/social-skills/ideation.pdf" target="_blank" rel="noopener noreferrer">Open the PDF in a new tab</a>.</p>
          <figure className="case-artifact case-wireflow"><a href="/projects/social-skills/practice-wireflow.png?v=2" target="_blank" rel="noopener noreferrer"><img src="/projects/social-skills/practice-wireflow.png?v=2" alt="Early wireflow connecting a dashboard, scenario selection, conversation, and session feedback" loading="lazy" /></a><figcaption>The first wireflow explored the front-end journey: choose a scenario, rehearse a conversation, review feedback, and try again.</figcaption></figure>
        </section>
        <section className="detail-section">
          <h2>Building in two Agile sprints</h2>
          <p>We organized user stories on a shared scrum board, moving tasks through To do, Working, and Completed across two sprints.</p>
          <div className="case-sprints">
            <div><h3>Sprint 1 · The foundation</h3><p>Hosted chatbot access, natural-language questions, dataset-grounded answers and source visibility. The developer stories covered dataset updates, multiple ingestion methods, shared text cleaning, and runtime prompt selection. A custom upload story added personalized practice context.</p></div>
            <div><h3>Sprint 2 · Practice & reliability</h3><p>Scenario roleplay for CS students and response-accuracy evaluation. Administrator stories brought latency and failure monitoring, usage logs, and knowledge-base clearing or reloading into the website itself.</p></div>
          </div>
          <figure className="case-artifact case-board"><a href="/projects/social-skills/scrum-board.png" target="_blank" rel="noopener noreferrer"><img src="/projects/social-skills/scrum-board.png" alt="Team scrum board with user stories in To do, Working, and Completed columns" loading="lazy" /></a><figcaption>A snapshot of our shared board during development. Select any artifact to view it at full size.</figcaption></figure>
        </section>
        <section className="detail-section">
          <h2>How it works</h2>
          <p>Python and Django connect the interface to the OpenAI Responses API. GPT-4o mini classifies intent so the app can choose between roleplay, scripts, advice, and feedback; the response model is configurable. Django sessions retain conversation history, scenario details, and uploaded context.</p>
          <p>File Search and vector stores retrieve curated communication resources. A shared preprocessing pipeline cleans PDFs, Word documents, spreadsheets, CSV, HTML, and text, with optional image OCR. SQLite and the Django ORM track datasets, source documents, and usage.</p>
          <p>HTML, CSS, JavaScript, and Bootstrap 5 support scenario shortcuts, a conversation view, and light and dark themes. A staff dashboard surfaces request volume, latency, failures, and dataset usage; evaluation commands check intent accuracy and compare generated answers with reference responses.</p>
        </section>

      </>}



      {project.sections?.map(({ title, text, image, alt, caption }) => <section key={title} className="detail-section">
        <h2>{title}</h2>
        <p>{text}</p>
        {image && <figure className="case-artifact case-board"><a href={image} target="_blank" rel="noopener noreferrer"><img src={image} alt={alt} loading="lazy" /></a><figcaption>{caption}</figcaption></figure>}
      </section>)}

      {project.designDocument && <section className="detail-section">
        <h2>Game design document</h2>
        <iframe className="case-pdf" src={project.designDocument} title={`${project.name} game design document`} loading="lazy" />
        <p className="case-demo-note">Scroll inside the viewer to explore the document. <a href={project.designDocument} target="_blank" rel="noopener noreferrer">Open the document in a new tab</a>.</p>
      </section>}

      {project.presentation && <section className="detail-section">
        <h2>Process & progress</h2>
        <iframe className="case-pdf" src={`${project.presentation}#view=FitH`} title={`${project.name} process slides`} loading="lazy" />
        <p className="case-demo-note"><a href={project.presentation} target="_blank" rel="noopener noreferrer">Open the presentation in a new tab</a>.</p>
      </section>}

      {(demoUrl || project.demoEmbed) && <section className="detail-section">
        <h2>{project.demoTitle || 'Demo video'}</h2>
        {project.demoEmbed ? <iframe className="case-demo" src={project.demoEmbed} title={`${project.name} — Demo video`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /> : <video className="case-demo" src={demoUrl} aria-label={`${project.name} — ${project.demoTitle || 'Demo video'}`} controls playsInline preload="metadata">
          <a href={demoUrl}>Download the demo video</a>
        </video>}
        {project.demoEmbed && <p className="case-demo-note"><a href={project.demoLink || project.demoEmbed} target="_blank" rel="noopener noreferrer">Open demo in a new tab</a></p>}
      </section>}

      {project.learnings.length > 0 && <div className="detail-section">
        <h2>What I Learned</h2>
        <ul>
          {project.learnings.map((learning, i) => (
            <li key={i}>{learning}</li>
          ))}
        </ul>
      </div>}

      {project.links.length > 0 && <div className="detail-section">
        <h2>Links</h2>
        {!project.links.some(link => link.url && link.url !== '#') && <p>Project links will be added with the final case study.</p>}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {project.links.filter(link => link.url && link.url !== '#').map((link, i) => (
            <a
              key={i}
              href={link.url}
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>}
    </section>
  )
}
