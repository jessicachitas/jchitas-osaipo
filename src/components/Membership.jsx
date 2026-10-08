import membershipLogos from "../data/memberships.json";

const logoModules = import.meta.glob("../assets/membership-logos/*", {
  eager: true,
  import: "default",
});
const logoUrls = Object.fromEntries(
  Object.entries(logoModules).map(([path, url]) => [
    path.split("/").pop(),
    url,
  ]),
);

const membershipsWithLogos = membershipLogos.filter((s) => s.logo);

function shuffle(list) {
  const result = [...list];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function LogoRow({ direction, logos }) {
  const rowTiles = [...logos, ...logos];
  return (
    <div className={`logo-row logo-row-${direction}`}>
      <div className="logo-row-track">
        {rowTiles.map((logo, index) => (
          <span
            className="logo-tile"
            key={`${logo.name}-${direction}-${index}`}
          >
            <img
              className="logo-tile-mark"
              src={logoUrls[logo.logo]}
              alt=""
            />
          </span>
        ))}
      </div>
    </div>
  );
}

const rowDirections = ["left", "right", "left", "right", "left"];

function Membership() {
  const rows = rowDirections.map((direction) => ({
    direction,
    logos: shuffle(membershipsWithLogos),
  }));

  return (
    <section className="membership-container" aria-labelledby="h-membership">
      <div className="container membership-copy">
        <h1 id="h-membership">Membership</h1>
        <p>
          We believe in shared membership, partnering across the open source
          ecosystem to build resilient, secure, and sustainable technology
          together.
        </p>
        <a className="btn-cta btn-cta-primary" href="/memberships.html">
          Learn more
        </a>
      </div>
      <div className="transparent-logo-veil">
      <div className="logo-wall" aria-hidden="true">
        {rows.map((row, index) => (
          <LogoRow key={index} direction={row.direction} logos={row.logos} />
        ))}
      </div>
      </div>
    </section>
  );
}

export default Membership;
