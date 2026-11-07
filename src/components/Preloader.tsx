import { useEffect, useState } from "react";

/**
 * Black intro screen. Stays visible until the user scrolls, swipes,
 * presses a key, or clicks — then fades out and adds `.revealed` to
 * <body>, which triggers the hero's entrance animations in sync.
 * The short automatic reveal hands off to the multi-cursor build intro.
 */
export default function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.classList.add("scroll-locked");
    let revealedFlag = false;

    const revealPage = () => {
      if (revealedFlag) return;
      revealedFlag = true;

      setHidden(true);
      document.body.classList.remove("scroll-locked");
      document.body.classList.add("revealed");

      window.removeEventListener("wheel", revealPage);
      window.removeEventListener("touchmove", revealPage);
      window.removeEventListener("keydown", onKeyReveal);
      clearTimeout(fallbackTimer);
    };

    const onKeyReveal = (e: KeyboardEvent) => {
      const keys = ["ArrowDown", "PageDown", " ", "Spacebar", "Enter"];
      if (keys.includes(e.key)) revealPage();
    };

    window.addEventListener("wheel", revealPage, { passive: true });
    window.addEventListener("touchmove", revealPage, { passive: true });
    window.addEventListener("keydown", onKeyReveal);

    const fallbackTimer = setTimeout(revealPage, 1050);

    return () => {
      window.removeEventListener("wheel", revealPage);
      window.removeEventListener("touchmove", revealPage);
      window.removeEventListener("keydown", onKeyReveal);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div
      className={`preloader${hidden ? " hide" : ""}`}
      id="preloader"
      onClick={() => {
        document.body.classList.remove("scroll-locked");
        document.body.classList.add("revealed");
        setHidden(true);
      }}
    >
      <div className="preloader-inner">
        <div className="preloader-mark">
          AABAN<span>.</span>
          <div className="cursor" />
        </div>
        <div className="scroll-hint">
          <span>Scroll to Enter</span>
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
