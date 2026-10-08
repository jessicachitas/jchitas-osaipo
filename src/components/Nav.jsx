import navLinks from '../data/nav_links.json'
import OsaipoLogo from './OsaipoLogo'
import '@rhds/elements/rh-navigation-primary/rh-navigation-primary.js'
import '@rhds/elements/rh-navigation-primary/rh-navigation-primary-item.js'
import '@rhds/elements/rh-icon/rh-icon.js'
import '@rhds/elements/rh-scheme-toggle/rh-scheme-toggle.js'
import '@rhds/elements/rh-navigation-primary/rh-navigation-primary-lightdom.css'

function Nav() {
  return (
    <>
      <rh-navigation-primary role="navigation">
    <a href="/" slot="logo">
        <OsaipoLogo height="32" width="127" />
    </a>

    {navLinks.map((link) => (
      <rh-navigation-primary-item key={link.label}>
        <a href={link.href}>
          {link.label}
          {link.external && (
            <>&nbsp;<rh-icon set="microns" icon="external-link"></rh-icon></>
          )}
        </a>
      </rh-navigation-primary-item>
    ))}
    <rh-scheme-toggle slot="event"></rh-scheme-toggle>
</rh-navigation-primary>
    </>
  )
}

export default Nav
