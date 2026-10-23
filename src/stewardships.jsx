import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Nav from './components/Nav.jsx'
import MembershipFilter from './components/MembershipFilter.jsx'
import Footer from './components/Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <div className="page-content">
        <Nav />
        <section id="all-memberships" className="all-projects-page" aria-labelledby="h-all-memberships">
          <div className="all-projects-bg-bubble all-projects-bg-bubble-a" aria-hidden="true"></div>
          <div className="all-projects-bg-bubble all-projects-bg-bubble-b" aria-hidden="true"></div>

          <div className="all-projects-intro">
            <h1 id="h-all-memberships">All memberships</h1>
            <p>
              Explore the foundations, alliances, and standards bodies Red Hat partners
              with to build a resilient, secure, and sustainable open source ecosystem.
            </p>
          </div>

          <MembershipFilter />
        </section>
        <Footer />
      </div>
  </StrictMode>,
)
