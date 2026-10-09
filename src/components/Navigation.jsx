import ladybug from '../assets/ladybug.png'

export default function Navigation({ activeSection }) {
  return (
    <nav aria-label="Main navigation">
      <div className="nav-container">
        <a className="nav-logo-group" href="#home" aria-label="Krisha Ulagadde — Home">
          <img src={ladybug} alt="" className="nav-ladybug" width="44" height="44" />
          <span className="nav-logo">Krisha Ulagadde</span>
        </a>
        <ul className="nav-links">
          {[['work', '#projects', 'Work'], ['about', '#about', 'About'], ['contact', '#contact', 'Contact']].map(([section, href, label]) => (
            <li key={section}><a href={href} className={activeSection === section ? 'active' : ''} aria-current={activeSection === section ? 'page' : undefined}>{label}</a></li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
