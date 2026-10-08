import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Nav from './components/Nav.jsx'
import ProjectFilter from './components/ProjectFilter.jsx'
import Footer from './components/Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <div className="page-content">
        <Nav />
        <section id="all-projects" className="all-projects-page" aria-labelledby="h-all-projects">
          <div className="all-projects-bg-bubble all-projects-bg-bubble-a" aria-hidden="true"></div>
          <div className="all-projects-bg-bubble all-projects-bg-bubble-b" aria-hidden="true"></div>

          <div className="all-projects-intro">
            <h1 id="h-all-projects">All projects</h1>
            <p>
              Explore Red Hat&rsquo;s contributions to thousands of open source projects across AI,
              cloud, Linux, automation, security, and more.
            </p>
          </div>

          <ProjectFilter />
        </section>
        <Footer />
      </div>
  </StrictMode>,
)
