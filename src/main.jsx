import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './viewportHeight.js'
import Nav from './components/Nav.jsx'
import Welcome from './components/Welcome.jsx'
import Projects from './components/Projects.jsx'
import Stats from './components/Stats.jsx'
import Membership from './components/Membership.jsx'
import ContactUs from './components/ContactUs.jsx'
import Footer from './components/Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <div className="page-content">
        <Nav />
        <Welcome />
        <Projects />
        <Stats />
        <Membership />
        <ContactUs />
        <Footer />
      </div>
  </StrictMode>,
)
