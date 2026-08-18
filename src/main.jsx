import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Nav from './components/Nav.jsx'
import Welcome from './components/Welcome.jsx'
import About from './components/About.jsx'
import Stewardship from './components/Stewardship.jsx'
import ContactUs from './components/ContactUs.jsx'
import Footer from './components/Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nav />
    <Welcome />
    <About />
    <Stewardship />
    <ContactUs />
    <Footer />
  </StrictMode>,
)
