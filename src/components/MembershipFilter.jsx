import { useMemo, useState } from 'react'
import '@rhds/elements/rh-icon/rh-icon.js'
import memberships from '../data/memberships.json'

const logoModules = import.meta.glob('../assets/membership-logos/*', {
  eager: true,
  import: 'default',
})
const logoUrls = Object.fromEntries(
  Object.entries(logoModules).map(([path, url]) => [path.split('/').pop(), url]),
)

function MembershipFilter() {
  const [search, setSearch] = useState('')

  const filteredMemberships = useMemo(() => {
    const query = search.trim().toLowerCase()
    return memberships.filter((membership) =>
      !query || membership.name.toLowerCase().includes(query),
    )
  }, [search])

  return (
    <div className="all-projects-filter-container">
      <div className="all-projects-toolbar">
        <div className="all-projects-search">
          <rh-icon set="ui" icon="search" aria-hidden="true"></rh-icon>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search memberships"
            aria-label="Search memberships"
          />
        </div>
      </div>

      {filteredMemberships.length === 0 ? (
        <p className="all-projects-empty">No memberships match your search.</p>
      ) : (
        <div className="all-projects-grid">
          {filteredMemberships.map((membership) => {
            const logoSrc = membership.logo ? logoUrls[membership.logo] : undefined
            const content = logoSrc ? (
              <img className="project-tile-logo" src={logoSrc} alt={membership.name} />
            ) : (
              <span className="project-tile-name">{membership.name}</span>
            )

            if (!membership.href) {
              return (
                <div
                  className="project-tile project-tile-disabled project-tile-no-description"
                  key={membership.name}
                  aria-disabled="true"
                  title={membership.name}
                >
                  {content}
                </div>
              )
            }

            return (
              <a
                className="project-tile project-tile-no-description"
                href={membership.href}
                key={membership.name}
                target="_blank"
                rel="noreferrer"
                title={membership.name}
              >
                {content}
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MembershipFilter
