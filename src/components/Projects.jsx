import { useEffect, useLayoutEffect, useRef } from "react";
import projects from "../data/projects.json";

const logoModules = import.meta.glob("../assets/project-logos/*", {
  eager: true,
  import: "default",
});
const logoUrls = Object.fromEntries(
  Object.entries(logoModules).map(([path, url]) => [
    path.split("/").pop(),
    url,
  ]),
);

const projectCards = projects.filter((project) => project.featured);
const cards = [...projectCards, ...projectCards];
const EASE_DURATION_MS = 500;
const CAROUSEL_SPEED_PX_PER_SEC = 60;

function Projects() {
  const carouselRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateLoopDistance = () => {
      const seamCard = track.children[projectCards.length];
      if (!seamCard) return;
      const distance = seamCard.offsetLeft;
      if (!distance) return;
      track.style.setProperty("--carousel-distance", `${distance}px`);
      track.style.setProperty(
        "--carousel-duration",
        `${distance / CAROUSEL_SPEED_PX_PER_SEC}s`,
      );
    };

    updateLoopDistance();
    window.addEventListener("resize", updateLoopDistance);
    return () => window.removeEventListener("resize", updateLoopDistance);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    const track = trackRef.current;
    if (!carousel || !track) return;

    let frame;

    const rampPlaybackRateTo = (target) => {
      cancelAnimationFrame(frame);
      const animation = track.getAnimations()[0];
      if (!animation) return;

      if (target > 0 && animation.playState === "paused") animation.play();

      const start = animation.playbackRate;
      const startTime = performance.now();

      const step = (now) => {
        const t = Math.min((now - startTime) / EASE_DURATION_MS, 1);
        const eased = t * (2 - t);
        animation.playbackRate = start + (target - start) * eased;
        if (t < 1) {
          frame = requestAnimationFrame(step);
        } else if (target === 0) {
          animation.pause();
        }
      };
      frame = requestAnimationFrame(step);
    };

    const handleEnter = () => rampPlaybackRateTo(0);
    const handleLeave = () => rampPlaybackRateTo(1);

    carousel.addEventListener("pointerenter", handleEnter);
    carousel.addEventListener("pointerleave", handleLeave);

    return () => {
      cancelAnimationFrame(frame);
      carousel.removeEventListener("pointerenter", handleEnter);
      carousel.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <section
      id="explore-projects"
      className="projects-container"
      aria-labelledby="h-explore-projects"
    >
      <div className="container explore-projects-intro">
        <h1 id="h-explore-projects">Explore projects</h1>
        <p>
          Explore Red Hat’s contributions to thousands of open source projects
          across AI, cloud, Linux, automation, security, and more.
        </p>
        <a className="btn-cta btn-cta-primary" href="/projects.html">
          Explore projects
        </a>
      </div>

      <div
        className="project-carousel"
        role="group"
        aria-label="Featured open source projects"
        ref={carouselRef}
      >
        <div className="project-carousel-track" ref={trackRef}>
          {cards.map((project, index) => (
            <a
              className="project-card"
              href={project.href}
              key={`${project.logo}-${index}`}
              target="_blank"
              rel="noreferrer"
              tabIndex={index < projectCards.length ? 0 : -1}
              aria-hidden={index >= projectCards.length}
            >
              <img
                className="project-card-logo"
                src={logoUrls[project.logo]}
                alt={project.name}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
