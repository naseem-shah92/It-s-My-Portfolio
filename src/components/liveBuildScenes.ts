type Scene = { label: string; targets: HTMLElement[]; anchor?: HTMLElement };

const select = (selector: string) => Array.from(document.querySelectorAll<HTMLElement>(selector));

export function getBuildScenes(narrow: boolean): Scene[] {
  const groups = (selector: string, size: number, label: string): Scene[] => {
    const targets = select(selector);
    const scenes: Scene[] = [];
    for (let index = 0; index < targets.length; index += size) {
      scenes.push({ label, targets: targets.slice(index, index + size), anchor: targets[index] });
    }
    return scenes;
  };

  const heroText = select("#home h1 .reveal-wrap, #home .sub, #home .cta-row");
  const portrait = select("#home .photo-card");

  return [
    { label: "Starting the canvas", targets: select("nav .logo, nav .nav-links, nav .nav-right, #home .eyebrow") },
    ...(narrow
      ? [
          { label: "Placing the portrait", targets: portrait, anchor: portrait[0] },
          { label: "Building the hero", targets: heroText, anchor: heroText[0] },
        ]
      : [{ label: "Building the hero", targets: [...heroText.slice(0, 2), ...portrait, ...heroText.slice(2)] }]),
    {
      label: "Adding services",
      anchor: select("#skills .section-head")[0],
      targets: select(".marquee-strip, #skills .section-head > *, #skills .service-row:first-child"),
    },
    ...groups("#skills .service-row:not(:first-child)", narrow ? 2 : 4, "Building service rows"),
    {
      label: "Setting up selected work",
      anchor: select("#projects .section-head")[0],
      targets: select("#projects .section-head > *"),
    },
    ...groups("#projects .work-card", narrow ? 1 : 2, "Placing project cards"),
    {
      label: "Connecting the contact section",
      anchor: select("#contact .contact-inner")[0],
      targets: select("#contact .contact-inner > *, #contact .site-footer"),
    },
  ].map(scene => ({ ...scene, targets: scene.targets.filter(element => element.getClientRects().length > 0) }))
    .filter(scene => scene.targets.length > 0);
}
