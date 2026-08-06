const WHATSAPP_NUMBER = "923313774329";
const WHATSAPP_MESSAGE = "Hi Aaban, I'd like to talk about a website project.";

const GITHUB_URL = "https://github.com/naseem-shah92";
const INSTAGRAM_URL = "https://instagram.com/muhammadaabanshah";

const WHATSAPP_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.92C21.96 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.66-.6-2.92-1.26-4.82-4.2-4.97-4.4-.15-.2-1.19-1.58-1.19-3.01 0-1.43.75-2.13 1.02-2.42.26-.29.58-.36.77-.36h.56c.18 0 .42-.07.65.5.24.58.82 2.01.89 2.16.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.18-.31.4-.44.53-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.45.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.2-.29.4-.24.66-.14.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.13.07.75-.17 1.43Z" />
  </svg>
);

const GITHUB_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.58 2 12.19c0 4.49 2.87 8.3 6.84 9.65.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.46-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.55 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 2.5-.35c.85 0 1.7.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.19C22 6.58 17.52 2 12 2Z" />
  </svg>
);

const INSTAGRAM_ICON = (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" />
  </svg>
);

export default function Contact() {
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section className="contact" id="contact">
      <div className="contact-inner reveal-on-scroll">
        <div className="eyebrow">
          <span className="dot" />
          Let's Work Together
        </div>
        <h2 className="contact-title">
          Got A Project?
          <br />
          <span className="outline-text">Let's </span>
          <span className="accent-text">Talk.</span>
        </h2>
        <p className="contact-sub">
          Tell me what you're building — I usually reply within a few hours.
        </p>

        <a className="btn-fill contact-whatsapp" href={whatsappHref} target="_blank" rel="noopener noreferrer">
          {WHATSAPP_ICON}
          Message on WhatsApp
        </a>

        <div className="contact-socials">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="icon-btn">
            {GITHUB_ICON}
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="icon-btn">
            {INSTAGRAM_ICON}
          </a>
        </div>
      </div>

      <footer className="site-footer">
        <div className="logo">
          AABAN<span>.</span>
        </div>
        <p>© {new Date().getFullYear()} Aaban Shah. Built with React &amp; TypeScript.</p>
      </footer>
    </section>
  );
}
