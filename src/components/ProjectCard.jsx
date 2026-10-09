import { useState } from 'react'

export default function ProjectCard({ project }) {
  const [imageFailed, setImageFailed] = useState(false)
  return (
    <article className="project-card">
      <div className="project-card-image">
        {imageFailed ? <span className="project-image-fallback">Preview unavailable</span> :
          <img src={project.image} alt={project.name} loading="lazy" width="400" height="400" onError={() => setImageFailed(true)} />}
      </div>
      <div className="project-card-content">
        <h3><a className="project-open" href={`#project-${project.id}`}>{project.name}<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg></a></h3>
        <p>{project.summary}</p>
        <div className="tech-stack">
          {project.tech.map(tech => (
            <span key={tech} className="skill-tag">{tech}</span>
          ))}
        </div>
      </div>
    </article>
  )
}
