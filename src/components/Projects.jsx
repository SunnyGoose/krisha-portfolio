import ProjectCard from './ProjectCard'
import { useEffect, useRef, useState } from 'react'

// Portfolio projects
export const sampleProjects = [
  {
    id: 1,
    name: 'Social Skills Simulator',
    summary: 'AI-powered communication practice for career fairs, interviews, and team discussions, with roleplay, personalized advice, and document uploads.',
    image: '/projects/social-skills/mockup.png',
    tech: ['Python', 'Django', 'OpenAI', 'RAG', 'Bootstrap', 'SQLite', 'PythonAnywhere'],
    overview: 'A space for CS students to rehearse conversations before they matter. Students describe a situation, then practice with an AI recruiter, interviewer, or teammate—or ask for a script, advice, or constructive feedback.',
    caseStudy: true,
    learnings: [],
    links: [{ label: 'Try the live app', url: 'https://krisha06.pythonanywhere.com' }, { label: 'Ideation & early design (PDF)', url: '/projects/social-skills/ideation.pdf' }]
  },
  {
    id: 2,
    name: 'Baking PawPaw',
    summary: 'A cozy Unity cooking game with a Gemini-powered cat assistant, virtual ingredient storage, and personalized recipe suggestions.',
    image: '/projects/baking-pawpaw/preview.jpg',
    tech: ['Unity', 'C#', 'TextMeshPro', 'Gemini', 'Google Apps Script'],
    subtitle: 'A cozy kitchen with an AI cat companion',
    facts: [
      { label: 'Timeline', value: 'September 2025 · HackGT 12' },
      { label: 'My role', value: 'Developer & UI Designer' },
      { label: 'Team', value: 'Krisha U, Hongbi A, Annie Z, and Sneha M' },
    ],
    overview: 'Meet PawPaw, a talking cat powered by Google Gemini. In this cozy cooking game, players keep track of ingredients in a virtual fridge and cabinet, ask cooking questions, and discover recipes tailored to what they have. An achievement system adds another playful layer to the experience.',
    sections: [
      { title: 'Two ways to cook with PawPaw', text: 'Chat with PawPaw is a dedicated space for cooking questions. Bake with PawPaw is a separate recipe feature: players select their preferred difficulty and available cooking time, and Gemini suggests recipes using the ingredients in their fridge and cabinet.' },
      { title: 'My contribution', text: 'I developed the interactive UI, ingredient tracking, and scene navigation in Unity and C#. I also integrated Gemini through Google Apps Script, connecting the cooking assistant to the game.' },
      { title: 'Built together at HackGT 12', text: 'Our team brought together experience in game development, chatbot APIs, and art. As Computational Media majors, we divided the artwork and programming across the team, working through a steep learning curve and GitHub collaboration challenges to bring an interactive game and AI assistant together.' },
    ],
    gallery: [
      { src: '/projects/baking-pawpaw/cover.jpg', alt: 'Baking PawPaw logo and PawPaw wearing a chef hat in the illustrated kitchen', caption: 'Meet PawPaw in the cozy kitchen' },
      { src: '/projects/baking-pawpaw/fridge.jpg', alt: 'Virtual fridge with eggs, butter, and cream cheese beside the ingredient selection panel', caption: 'Track refrigerated ingredients' },
      { src: '/projects/baking-pawpaw/cabinet.jpg', alt: 'Virtual cabinet with flour, oil, chocolate, baking soda, baking powder, and brown sugar', caption: 'Keep pantry ingredients in the cabinet' },
      { src: '/projects/baking-pawpaw/bake.jpg', alt: 'Bake with PawPaw screen with Easy, Medium, and Hard difficulty choices and a cooking time input', caption: 'Bake with PawPaw · Choose difficulty and cooking time' },
      { src: '/projects/baking-pawpaw/chat.jpg', alt: 'Cat-shaped chat interface with a welcome message from PawPaw and a text input', caption: 'Chat with PawPaw · Ask cooking questions' },
      { src: '/projects/baking-pawpaw/logo.png', alt: 'Baking PawPaw logo featuring a cat paw and chef hat', caption: 'Baking PawPaw · Project logo' },
    ],
    learnings: ['Connecting a Unity game to Gemini through Google Apps Script.', 'Bringing interactive UI, ingredient tracking, and scene navigation together in C#.', 'Collaborating on artwork and programming through GitHub during a hackathon.'],
    links: [
      { label: 'GitHub', url: 'https://github.com/SunnyGoose/BakingPawPaw' },
      { label: 'View on Devpost', url: 'https://devpost.com/software/hackgt-project#submission-history' }
    ]
  },
  {
    id: 3,
    name: 'Career Platform',
    summary: 'A full-stack hiring platform with job search, candidate discovery, interactive maps, application tracking, and a satirical take on hiring culture.',
    image: '/projects/recruitment/preview.png',
    tech: ['Python', 'Django', 'SQLite', 'HTML/CSS', 'JavaScript', 'Bootstrap', 'Leaflet'],
    subtitle: 'Practical hiring tools with a sense of humor',
    facts: [
      { label: 'Timeline', value: 'February–March 2026' },
      { label: 'Process', value: 'Agile · 2 sprints' },
      { label: 'Team', value: 'Krisha U, Sneha M, Yumeng Q, Elliot H, and Jihoon K' },
    ],
    overview: 'A shared platform for job seekers and recruiters to discover opportunities, manage applications, and communicate throughout the hiring process. Playful copy and satirical commentary on hiring culture give the application personality while role-based accounts and permissions support separate workflows for each side of recruitment.',
    sections: [
      { title: 'For job seekers', text: 'Professional profiles showcase a headline, skills, education, work experience, and external links, with controls to make a profile private or hide individual fields. Job seekers filter active opportunities by title, skills, location, salary range, remote availability, and visa sponsorship; explore locations through clickable map markers; and apply with a tailored message. Application tracking shows progress through Applied, Review, Interview, Offer, and Closed.' },
      { title: 'For recruiters', text: 'Recruiters create and edit postings with company details, descriptions, required skills, salary, and location information. Candidate discovery searches public profiles by skills, location, and keywords in work experience. Named, pinned searches can be revisited to refresh the matching candidate list. A keyword-matching system compares job titles and descriptions with profile skills and ranks candidates by a calculated match percentage. Recruiters can update application stages and view applicant locations on a map filtered by job posting.' },
      { title: 'How it works', text: 'Python, Django, and SQLite support relational data modeling, authentication, permissions, and hiring workflows. HTML/CSS, JavaScript, and Bootstrap provide the interface, while Leaflet displays job and applicant locations. Address geocoding converts posting addresses to coordinates for the maps. Built-in conversation threads support direct messaging, and a reusable Django admin action exports selected records as CSV files.' },
      { title: 'Building in two Agile sprints', text: 'We organized user stories on a shared task management board with Product Backlog, To-Do, In Progress, and Done columns. The sprint plan divided the work between the job-seeker foundation and recruiter tools, keeping the goals for each role visible throughout development.', image: '/projects/recruitment/board.jpg', alt: 'Task management board for Objects and Design Project 2 with Product Backlog, To-Do, In Progress, and Done columns', caption: 'Our shared board captured user stories and their development status.' },
      { title: 'Sprint 1 · Job-seeker foundations', text: 'The first sprint planned profiles, privacy controls, filtered job search, applications with tailored notes, application status tracking, skill-based job recommendations, and map exploration with distance filters and a preferred commute radius. Recruiter posting management and administrator user and role management were also part of the sprint goals.' },
      { title: 'Sprint 2 · Recruiter workflows', text: 'The second sprint planned candidate search, a hiring pipeline, in-platform messaging and email outreach, saved searches with new-match notifications, candidate recommendations, office location markers, and applicant location clusters. Administrator goals covered job-post moderation and CSV exports.' },
    ],
    gallery: [
      { src: '/projects/recruitment/mockup.jpg', alt: 'GT Careers mockup showing the job platform on a laptop', caption: 'GT Careers · Interface mockup' },
      { src: '/projects/recruitment/welcome.jpg', alt: 'GT Job Platform welcome screen with login and signup options', caption: 'A playful welcome to the job search' },
      { src: '/projects/recruitment/jobs.jpg', alt: 'Open jobs list with filter and job map buttons', caption: 'Browse available jobs' },
      { src: '/projects/recruitment/job-details.jpg', alt: 'Job details showing salary, location, visa sponsorship, skills, and description', caption: 'Review a posting before applying' },
      { src: '/projects/recruitment/profile.jpg', alt: 'Professional profile with a private status, visibility toggle, and education and experience fields', caption: 'Profiles with privacy controls' },
      { src: '/projects/recruitment/map.jpg', alt: 'Leaflet job map centered on Atlanta with locate and job list controls', caption: 'Explore job locations on a map' },
      { src: '/projects/recruitment/applications.jpg', alt: 'Application tracking page titled The Rejection Pipeline with an Applied status', caption: 'Application tracking with satirical copy' },
    ],
    demoEmbed: 'https://www.youtube.com/embed/LqjtGtxaLQM?si=NA8Z165A8jaVtcPL',
    demoLink: 'https://www.youtube.com/watch?v=LqjtGtxaLQM',
    learnings: [],
    links: [{ label: 'Try the live app', url: 'https://krisha05.pythonanywhere.com' }]
  },
  {
    id: 4,
    name: 'Deafinitely Delicious',
    summary: 'An undergraduate research project exploring American Sign Language learning through a cozy, narrative-driven mobile cooking game.',
    image: '/projects/deafinitely-delicious/preview.png',
    tech: ['Unity', 'C#', 'ASL', 'Sign Language Recognition Toolkit'],
    subtitle: 'Learning ASL through cooking and connection',
    facts: [
      { label: 'Timeline', value: 'August 2025–May 2026' },
      { label: 'My role', value: 'UI Artwork & UX Research' },
      { label: 'Project team', value: 'Krisha U, Katelyn G, Nix P, Ngan D, Katya G, Dylan L, Bridgette C, Jay P, Prajval M, Christina W, and Jebin W' },
    ],
    overview: 'Approximately 90–95% of deaf children are born to hearing parents, many of whom have little or no prior experience with American Sign Language (ASL). Developed through the Georgia Tech Vertically Integrated Projects (VIP) undergraduate research program, Deafinitely Delicious aims to help bridge this communication gap through a narrative-driven educational mobile cooking game. Players inherit their grandmother’s restaurant, practicing ASL as they communicate with customers and prepare meals.',
    sections: [
      { title: 'My contribution', text: 'I contributed UI artwork and UX research. My artwork included updates to the kitchen and restaurant, Grandma’s house, appliance pop-ups, and item placeholders, supporting the visual experience of the game’s ASL learning activities.' },
      { title: 'ASL as part of play', text: 'The design connects taking orders, studying signs, collecting ingredients and tools, cooking, and serving customers. A cookbook provides recipes and sign references, while study sessions offer video demonstrations and practice. Camera-based sign recognition connects ASL practice to dialogue and cooking minigames.' },
      { title: 'A research prototype', text: 'The design document reports functional mobile dialogue, study sessions, and ASL cooking minigames, with ingredient collection and the narrative prologue still in development. It also records recognition challenges caused by lighting, camera positioning, and subtle hand-shape differences; some interactions use placeholder signs while the team works on reliable gameplay.' },
      { title: 'Designing for learning', text: 'The game design emphasizes self-paced exploration, repeated practice, visual feedback, hints, and gradual difficulty. Its restaurant setting and family narrative give players a reason to revisit signs as they learn recipes and connect with the characters. Subtitles and visual cues are part of the accessibility goals.' },
    ],
    gallery: [
      { src: '/projects/deafinitely-delicious/cover.png', alt: 'Deafinitely Delicious artwork showing two characters at a restaurant table beneath the game title and an illustrated signing hand', caption: 'Deafinitely Delicious · Game artwork' },
      { src: '/projects/deafinitely-delicious/gameplay.mp4', type: 'video', alt: 'Deafinitely Delicious gameplay video', caption: 'Gameplay video · A walkthrough of several different scenes from the mobile game' },
    ],
    presentation: '/projects/deafinitely-delicious/full-progress.pdf',
    designDocument: 'https://docs.google.com/document/d/1XfAM8SJrym6r8g9Le9WB2z-GKJykwOsK2d8dv5OKCNM/preview',
    learnings: [],
    links: [
      { label: 'Full progress presentation', url: 'https://docs.google.com/presentation/d/1skaA5iQFYDFfMOsX6zirVhM8XXOp6IsVJS3_1z3Jdx0/edit?usp=sharing' },
      { label: 'Game design document', url: 'https://docs.google.com/document/d/1XfAM8SJrym6r8g9Le9WB2z-GKJykwOsK2d8dv5OKCNM/edit?usp=sharing' },
      { label: 'Project wiki', url: 'https://ccg.gatech.edu/index.php?title=Deafinitely_Delicious' },
      { label: 'GitHub', url: 'https://github.com/d3adb0lt/deafinitely-delicious' },
    ]
  }
]

export default function Projects() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(!document.hidden)
  const running = visible && pageVisible

  useEffect(() => {
    const section = sectionRef.current
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let lift = 0
    const update = () => {
      frame = 0
      const top = section.getBoundingClientRect().top + lift
      lift = preference.matches ? 0 : Math.max(0, Math.min(240, (innerHeight - top) * .45))
      section.style.setProperty('--projects-parallax', `${-lift}px`)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    preference.addEventListener('change', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      preference.removeEventListener('change', schedule)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    observer.observe(sectionRef.current)
    const updateVisibility = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', updateVisibility)
    updateVisibility()
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  return (
    <section ref={sectionRef} id="projects" className={`section projects-section${running ? ' work-animation-running' : ''}`}>
      {['top', 'bottom'].map(edge => <div key={edge} className={`work-bug-lane work-bug-${edge}`} aria-hidden="true">
        <div className="work-bug-travel">
          <picture>
            <source media="(prefers-reduced-motion: reduce)" srcSet="/work-ladybug-still.png" />
            <img src={running ? '/work-ladybug.gif' : '/work-ladybug-still.png'} alt="" width="2048" height="2048" />
          </picture>
        </div>
      </div>)}
      <div className="container">
        <h2>Projects</h2>
        <p>Selected work in design and development. More projects coming soon.</p>
        <div className="projects-grid">
          {sampleProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
