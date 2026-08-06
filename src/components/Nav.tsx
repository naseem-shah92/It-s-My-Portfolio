export default function Nav() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLetsTalk = (e: React.MouseEvent<HTMLButtonElement>) => {
    scrollTo("contact");
    window.dispatchEvent(new Event("start-voice-agent"));
    (e.currentTarget as HTMLButtonElement).blur();
  };

  return (
    <nav>
      <div className="logo">
        AABAN<span>.</span>
      </div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="nav-right">
        <div className="icon-btn">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" />
          </svg>
        </div>
        <button className="btn-talk" onClick={handleLetsTalk}>Let's Talk</button>
      </div>
    </nav>
  );
}
