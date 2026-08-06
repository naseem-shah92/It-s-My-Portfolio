import { works } from "../data";
import { soleCraftShot, aetherAiShot, rolexShot, kolachiShot } from "../assets/images";

const shotMap: Record<string, string> = {
  solecraft: soleCraftShot,
  aetherai: aetherAiShot,
  rolex: rolexShot,
  kolachi: kolachiShot,
};

const ARROW_ICON = (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);

export default function Works() {
  return (
    <section className="works" id="projects">
      <div className="section-head">
        <div>
          <div className="section-eyebrow reveal-on-scroll">Selected Work</div>
          <div className="section-title reveal-on-scroll">Projects I've Shipped</div>
        </div>
        <p className="section-desc reveal-on-scroll">
          A few live builds — from e-commerce flows to product landing pages, designed and coded end to end.
        </p>
      </div>

      <div className="works-grid">
        {works.map((work, i) => (
          <a
            className={`work-card reveal-on-scroll d${i + 1}`}
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            key={work.id}
          >
            <div className="work-browser">
              <span className="wdot" />
              <span className="wdot" />
              <span className="wdot" />
              <span className="wurl">{work.url.replace("https://", "").replace(/\/$/, "")}</span>
            </div>
            <div className={`work-thumb ${work.thumbClass}`}>
              <img src={shotMap[work.id]} alt={`${work.title} screenshot`} loading="lazy" />
            </div>
            <div className="work-info">
              <div>
                <div className="work-tags">
                  {work.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="work-title">{work.title}</div>
                <div className="work-desc">{work.desc}</div>
              </div>
              <div className="work-arrow">{ARROW_ICON}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
