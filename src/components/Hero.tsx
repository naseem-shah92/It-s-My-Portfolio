import { aabanPhoto } from "../assets/images";

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLetsTalk = (e: React.MouseEvent<HTMLButtonElement>) => {
    scrollTo("contact");
    window.dispatchEvent(new Event("start-voice-agent"));
    (e.currentTarget as HTMLButtonElement).blur();
  };

  const handleViewProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    scrollTo("projects");
    (e.currentTarget as HTMLButtonElement).blur();
  };

  return (
    <section className="hero" id="home">
      <div className="hero-left">
        <div className="eyebrow">
          <span className="dot" />
          Available for Freelance Work
        </div>
        <h1>
          <span className="reveal-wrap">
            <span className="reveal-line d1">FULL STACK</span>
          </span>
          <span className="reveal-wrap">
            <span className="reveal-line d2">
              <span className="outline-text">DEVE</span>
              <span className="accent-text">LOPER</span>
            </span>
          </span>
        </h1>
        <p className="sub">
          I'm dedicated to bringing your vision to life by crafting unique, highly aesthetic, and impactful
          websites for businesses — from first pixel to production.{" "}
          <strong>Currently taking on new freelance projects.</strong>
        </p>
        <div className="cta-row">
          <button className="btn-fill" onClick={handleLetsTalk}>
            Start a Project <span className="arrow">→</span>
          </button>
          <button
            className="btn-outline"
            onClick={handleViewProjects}
          >
            View Projects
          </button>
        </div>
      </div>

      <div className="hero-right">
        <div className="photo-card">
          <div className="frame-corner tl" />
          <div className="frame-corner br" />
          <img src={aabanPhoto} alt="Aaban Shah" />
          <div className="reveal-panel p1" />
          <div className="reveal-panel p2" />
          <div className="photo-tag">
            <span className="dot" />
            <span>Aaban Shah — Developer</span>
          </div>
        </div>
      </div>
    </section>
  );
}
