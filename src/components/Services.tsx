import { services } from "../data";

const ARROW_ICON = (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);

export default function Services() {
  return (
    <section className="services" id="skills">
      <div className="section-head">
        <div>
          <div className="section-eyebrow reveal-on-scroll">What I Do</div>
          <div className="section-title reveal-on-scroll">Services Built For Growing Businesses</div>
        </div>
        <p className="section-desc reveal-on-scroll">
          I design and build every part of a website — from the first sketch to the last line of code — so
          you only need one person to trust.
        </p>
      </div>

      <div className="services-list">
        {services.map((service, i) => (
          <div className={`service-row reveal-on-scroll d${i + 1}`} key={service.num}>
            <div className="service-row-num">{service.num}</div>
            <div className="service-row-title">{service.title}</div>
            <div className="service-row-desc">{service.desc}</div>
            <div className="service-row-arrow">{ARROW_ICON}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
