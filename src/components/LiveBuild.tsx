import { useLayoutEffect, useRef, useState } from "react";
import { getBuildScenes } from "./liveBuildScenes";
import "./LiveBuild.css";

const workers = [
  { name: "Layout", color: "#83dbff", x: .20, y: .27 },
  { name: "Design", color: "#8ef2ba", x: .76, y: .23 },
  { name: "Frontend", color: "#d4ff3d", x: .53, y: .72 },
  { name: "Copy", color: "#ffc476", x: .30, y: .60 },
  { name: "Motion", color: "#ff9bc6", x: .78, y: .64 },
  { name: "Assets", color: "#83f1e5", x: .44, y: .36 },
  { name: "Review", color: "#cbadff", x: .58, y: .47 },
];

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
const ease = (value: number) => {
  const t = clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
};
const mix = (from: number, to: number, amount: number) => from + (to - from) * amount;

export default function LiveBuild() {
  const [label, setLabel] = useState("");
  const overlay = useRef<HTMLDivElement>(null);
  const finishRef = useRef(() => {});

  useLayoutEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scroller = document.scrollingElement;
    const canvas = overlay.current;
    if (motion.matches || window.location.hash || !scroller || !canvas) return;

    const narrow = window.innerWidth <= 980;
    const workerCount = narrow ? 5 : 7;
    const sceneDuration = narrow ? 1900 : 2420;
    const handoffTime = narrow ? 620 : 790;
    const scenes = getBuildScenes(narrow);
    if (!scenes.length) return;

    const targets = scenes.flatMap(scene => scene.targets);
    const cursors = Array.from(canvas.querySelectorAll<HTMLElement>(".live-build-pointer"));
    const outlines = Array.from(canvas.querySelectorAll<HTMLElement>(".live-build-selection"));
    const total = scenes.length * sceneDuration;
    let frame = 0;
    let timer = 0;
    let started = false;
    let stopped = false;
    let beganAt: number | undefined;
    let lastScene = -1;
    let anchorTops: number[] = [];
    const boxes = new Map<HTMLElement, DOMRect>();
    const bounds = (element: HTMLElement) => {
      const saved = boxes.get(element);
      if (saved) return saved;
      const rect = element.getBoundingClientRect();
      boxes.set(element, rect);
      return rect;
    };

    const clear = () => {
      window.clearTimeout(timer);
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      document.body.classList.remove("build-session");
      for (const target of targets) delete target.dataset.buildState;
      for (const outline of outlines) outline.hidden = true;
    };

    const finish = () => {
      if (stopped) return;
      stopped = true;
      clear();
      scroller.scrollTop = 0;
      setLabel("");
    };
    finishRef.current = finish;

    const markPoint = (scene: number, index: number) => {
      const { targets: elements } = scenes[scene];
      const element = elements[index % elements.length];
      const rect = bounds(element);
      const helper = Math.floor(index / elements.length);
      const x = rect.left + (helper ? rect.width * (.3 + .16 * (helper % 3)) : 8);
      const y = rect.top + (helper ? rect.height * (.32 + .11 * (helper % 4)) : 9);
      return { x: clamp(x, 12, window.innerWidth - 88), y: clamp(y, 20, window.innerHeight - 76) };
    };

    const draw = (now: number) => {
      if (stopped) return;
      beganAt ??= now;
      const time = now - beganAt;
      const sceneIndex = Math.min(scenes.length - 1, Math.floor(time / sceneDuration));
      const elapsed = time - sceneIndex * sceneDuration;
      const next = Math.min(sceneIndex + 1, scenes.length - 1);
      const handoff = sceneDuration - handoffTime;
      const ending = ease((time - (total - 360)) / 1150);
      const camera = ease((elapsed - handoff) / (handoffTime - 20));
      scroller.scrollTop = mix(mix(anchorTops[sceneIndex], anchorTops[next], camera), 0, ending);

      if (lastScene !== sceneIndex) {
        for (let index = Math.max(0, lastScene); index < sceneIndex; index += 1) {
          for (const target of scenes[index].targets) target.dataset.buildState = "placed";
        }
        lastScene = sceneIndex;
        setLabel(`${String(sceneIndex + 1).padStart(2, "0")} / ${scenes.length}  ·  ${scenes[sceneIndex].label}`);
      }

      const revealAt = narrow ? 480 : 625;
      const sceneTargets = scenes[sceneIndex].targets;
      sceneTargets.forEach((element, index) => {
        const finishesHandoff = next !== sceneIndex && sceneTargets.length > 1 && index === sceneTargets.length - 1;
        const placementTime = finishesHandoff ? handoff : revealAt + index * 110;
        if (elapsed >= placementTime && element.dataset.buildState === "pending") {
          element.dataset.buildState = "placed";
        }
      });
      if (next !== sceneIndex && elapsed >= sceneDuration - 390) {
        scenes[next].targets[0].dataset.buildState = "placed";
      }

      boxes.clear();

      // Workers leave in waves. The last workers stay on the current section
      // while the first are already moving to the next one.
      for (let index = 0; index < workerCount; index += 1) {
        const worker = workers[index];
        const cursor = cursors[index];
        const current = markPoint(sceneIndex, index);
        const incoming = markPoint(next, index);
        const travel = ease((elapsed - handoff - (index % 4) * 95 + 155) / (handoffTime - 245));
        const entrance = ease((time - index * 55) / 590);
        const fromX = mix(window.innerWidth * worker.x, current.x, entrance);
        const fromY = mix(window.innerHeight * worker.y, current.y, entrance);
        const x = mix(fromX, incoming.x, travel) + Math.sin(time / 185 + index * 2) * 6;
        const y = mix(fromY, incoming.y, travel) + Math.cos(time / 220 + index * 3) * 5;
        cursor.style.transform = `translate3d(${x}px,${y}px,0)`;
        cursor.style.opacity = String((1 - ending) * Math.min(1, .35 + entrance));
      }

      const active = [
        ...scenes[sceneIndex].targets.map((element, index) => ({ element, opacity: (1 - camera * .68) * ease((elapsed - index * 95) / 300) })),
        ...(next !== sceneIndex && elapsed >= handoff - 130
          ? scenes[next].targets.map(element => ({ element, opacity: ease((elapsed - handoff + 130) / 480) * .72 }))
          : []),
      ];
      outlines.forEach((outline, index) => {
        const mark = active[index];
        if (!mark) {
          outline.hidden = true;
          return;
        }
        const rect = bounds(mark.element);
        outline.hidden = rect.bottom < 0 || rect.top > window.innerHeight;
        outline.style.transform = `translate3d(${rect.left}px,${rect.top}px,0)`;
        outline.style.width = `${rect.width}px`;
        outline.style.height = `${rect.height}px`;
        outline.style.opacity = String(mark.opacity * (1 - ending));
      });

      if (time >= total + 790) finish();
      else frame = window.requestAnimationFrame(draw);
    };

    const start = () => {
      if (started || stopped || !document.body.classList.contains("revealed")) return;
      started = true;
      observer.disconnect();
      timer = window.setTimeout(() => {
        const inset = clamp(window.innerHeight * .1, 62, 108);
        const maxScroll = scroller.scrollHeight - scroller.clientHeight;
        let previousTop = 0;
        anchorTops = scenes.map(({ anchor }) => {
          if (anchor) previousTop = clamp(anchor.getBoundingClientRect().top + scroller.scrollTop - inset, 0, maxScroll);
          return previousTop;
        });
        cursors.forEach((cursor, index) => { cursor.hidden = index >= workerCount; });
        frame = window.requestAnimationFrame(draw);
      }, 610);
    };

    const observer = new MutationObserver(start);
    document.body.classList.add("build-session");
    for (const target of targets) target.dataset.buildState = "pending";
    observer.observe(document.body, { attributeFilter: ["class"] });
    start();

    const onKey = (event: KeyboardEvent) => {
      if (started && (event.key === "Escape" || event.key === "Tab")) finish();
    };
    const onMotionChange = () => { if (motion.matches) finish(); };
    window.addEventListener("keydown", onKey);
    motion.addEventListener("change", onMotionChange);

    return () => {
      clear();
      window.removeEventListener("keydown", onKey);
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div className="live-build" ref={overlay} hidden={!label}>
      <div className="live-build-canvas" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => (
          <div key={index} className="live-build-selection" style={{ color: workers[index % workers.length].color }} hidden><i /><i /></div>
        ))}
        {workers.map(worker => (
          <div className="live-build-pointer" key={worker.name} style={{ color: worker.color }} hidden>
            <svg width="17" height="19" viewBox="0 0 16 18" fill="none">
              <path d="M2 2l12 7-5 1.1-2.2 5.5L2 2Z" fill="currentColor" stroke="#101010" strokeLinejoin="round" />
            </svg>
            <span>{worker.name}</span>
          </div>
        ))}
      </div>
      <div className="live-build-console">
        <span className="live-build-status" aria-hidden="true"><i />{label}</span>
        <button type="button" onClick={() => finishRef.current()}>Skip intro <span aria-hidden="true">↗</span></button>
      </div>
    </div>
  );
}
