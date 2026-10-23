"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { GLYPH } from "@/components/signature";
import { lastLoginLine } from "@/lib/terminal-intro";

const OLIVE = "#282c20";
const NEON = "#b6f36a";
const COMMAND = "whoami";
// Dashes restart on every subpath, so each letter outline gets its own path and they draw in turn
const STROKES = GLYPH.split(/(?<=Z)/);
const DRAW_SECONDS = 1.25;

// Scoped here so none of it ships with the homepage's own CSS
const css = `
.ti{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:16px;
  background:color-mix(in srgb,${OLIVE} 38%,transparent);backdrop-filter:blur(3px);cursor:default;visibility:hidden}
.ti-win{width:min(560px,100%);border-radius:10px;overflow:hidden;background:${OLIVE};color:${NEON};
  border:1px solid color-mix(in srgb,${NEON} 22%,transparent);box-shadow:0 24px 70px -20px rgb(0 0 0/.55);
  font:500 14px/1.6 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;transform-origin:50% 50%}
.ti-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:7px 10px 7px 14px;
  font-size:12px;border-bottom:1px solid color-mix(in srgb,${NEON} 16%,transparent);
  color:color-mix(in srgb,${NEON} 62%,${OLIVE})}
.ti-skip{font:inherit;color:inherit;background:none;border:1px solid currentColor;border-radius:5px;padding:1px 8px;cursor:pointer}
.ti-skip:hover{color:${NEON}}
.ti-body{padding:14px 16px 10px;min-height:208px}
.ti-body p{margin:0;white-space:pre}
.ti-ps{font-weight:700}
.ti-caret{display:inline-block;width:.6em;height:1.15em;margin-left:2px;vertical-align:-.2em;background:${NEON};
  animation:ti-blink 1s steps(1) infinite}
.ti-sig{display:block;width:100%;max-width:400px;height:auto;margin:6px 0 0;overflow:visible}
.ti-sig path{fill:${NEON};fill-opacity:0;stroke:${NEON};stroke-width:2.6;stroke-linejoin:round;
  stroke-dasharray:1;stroke-dashoffset:1}
@keyframes ti-blink{50%{opacity:0}}
@media (max-width:480px){.ti-win{font-size:12.5px}.ti-body{min-height:168px}}
`;

// Decorative only: aria-hidden, the real homepage is already rendered underneath.
// Any key, click or wheel skips; so does the Skip button.
export function TerminalIntroOverlay({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [login] = useState(() => lastLoginLine(new Date()));
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let leaving = false;
    let tl: gsap.core.Timeline | undefined;

    const ctx = gsap.context(() => {
      const cmd = el.querySelector<HTMLElement>(".ti-cmd")!;
      const caret = el.querySelector<HTMLElement>(".ti-caret")!;
      const typed = { n: 0 };
      const parts = gsap.utils.toArray<SVGPathElement>(".ti-sig path");
      const lengths = parts.map((p) => p.getTotalLength());
      const total = lengths.reduce((a, b) => a + b, 0);
      const draw = gsap.timeline();
      parts.forEach((p, i) => draw.to(p, { strokeDashoffset: 0, duration: (DRAW_SECONDS * lengths[i]) / total, ease: "none" }));

      tl = gsap
        .timeline({ onComplete: () => done.current() })
        .fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: "none" })
        .from(".ti-win", { y: 14, scale: 0.97, duration: 0.3, ease: "power3.out" }, "<")
        .to(typed, {
          n: COMMAND.length,
          duration: 0.45,
          ease: `steps(${COMMAND.length})`,
          onUpdate: () => void (cmd.textContent = COMMAND.slice(0, Math.round(typed.n))),
        }, "+=0.15")
        .set(caret, { display: "none" }, "+=0.1")
        .add(draw)
        .to(".ti-sig path", { fillOpacity: 1, strokeWidth: 0, duration: 0.35, ease: "power1.out" }, "-=0.15")
        .to(".ti-win", { scaleY: 0.02, autoAlpha: 0, duration: 0.35, ease: "power3.in" }, "+=0.55")
        .to(el, { autoAlpha: 0, duration: 0.3, ease: "none" }, "-=0.2");
    }, el);

    const skip = () => {
      if (leaving) return;
      leaving = true;
      tl?.kill();
      gsap.to(el, { autoAlpha: 0, duration: 0.18, ease: "none", onComplete: () => done.current() });
    };
    const opts = { capture: true, passive: true } as const;
    window.addEventListener("keydown", skip, opts);
    window.addEventListener("pointerdown", skip, opts);
    window.addEventListener("wheel", skip, opts);

    return () => {
      window.removeEventListener("keydown", skip, opts);
      window.removeEventListener("pointerdown", skip, opts);
      window.removeEventListener("wheel", skip, opts);
      gsap.killTweensOf(el);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className="ti" aria-hidden="true" data-terminal-intro>
      <style>{css}</style>
      <div className="ti-win">
        <div className="ti-bar">
          <span>panda@pdzeng: ~ — zsh</span>
          <button type="button" className="ti-skip" tabIndex={-1}>
            Skip
          </button>
        </div>
        <div className="ti-body">
          <p>{login}</p>
          <p>
            <span className="ti-ps">~ $</span> <span className="ti-cmd" />
            <span className="ti-caret" />
          </p>
          <svg className="ti-sig" viewBox="-80 30 650 270">
            {STROKES.map((d) => (
              <path key={d.slice(0, 24)} d={d} pathLength={1} />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
