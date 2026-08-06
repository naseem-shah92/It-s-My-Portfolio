import { useEffect } from "react";

/**
 * Observes every element with the `.reveal-on-scroll` class in the document
 * and adds `.in-view` once it enters the viewport, triggering the CSS
 * fade + rise-up transition defined in style.css. Runs once after the
 * full page has mounted.
 */
export function useScrollReveal(): void {
  useEffect(() => {
    const revealEls = document.querySelectorAll<HTMLElement>(".reveal-on-scroll");
    if (!revealEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
