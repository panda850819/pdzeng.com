"use client";

import { useEffect, useRef } from "react";

/**
 * Glass panda mascot. Eyes track the pointer (assistantly-style interactivity);
 * the head tilts a touch toward it. Pure CSS material — same glass language as
 * the chrome. Idle float + blink come from globals.css; pointer tracking bails
 * on reduced motion and coarse pointers.
 */
export function Panda({ className = "" }: { className?: string }) {
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const head = headRef.current;
    if (!head) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const pupils = head.querySelectorAll<HTMLElement>("[data-pupil]");
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = head.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / window.innerWidth;
        const dy = (e.clientY - cy) / window.innerHeight;
        const px = Math.max(-1, Math.min(1, dx * 2.5));
        const py = Math.max(-1, Math.min(1, dy * 2.5));
        pupils.forEach((p) => {
          p.style.transform = `translate(${px * 3.5}px, ${py * 3}px)`;
        });
        head.style.transform = `rotate(${px * 4}deg)`;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`panda-float ${className}`} aria-hidden>
      <div ref={headRef} className="relative h-44 w-44 transition-transform duration-300 ease-out">
        {/* ears */}
        <div className="absolute -top-3 left-1 h-14 w-14 rounded-full border border-(--glass-border) bg-(--panda-patch) shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]" />
        <div className="absolute -top-3 right-1 h-14 w-14 rounded-full border border-(--glass-border) bg-(--panda-patch) shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]" />
        {/* face */}
        <div
          className="absolute inset-0 rounded-full border border-(--glass-border)"
          style={{
            background: "color-mix(in srgb, var(--panda-fur) 70%, transparent)",
            backdropFilter: "blur(14px) saturate(1.3)",
            WebkitBackdropFilter: "blur(14px) saturate(1.3)",
            boxShadow: "inset 0 1px 0 var(--glass-highlight), inset 0 -12px 24px rgba(0,0,0,0.06)",
          }}
        >
          {/* eye patches */}
          <div className="absolute top-[34%] left-[16%] h-14 w-11 -rotate-12 rounded-[50%] bg-(--panda-patch)">
            <div className="panda-eye absolute top-[30%] left-[32%] h-4 w-4 rounded-full bg-white/90">
              <div data-pupil className="absolute top-1 left-1 h-2 w-2 rounded-full bg-black transition-transform duration-75" />
            </div>
          </div>
          <div className="absolute top-[34%] right-[16%] h-14 w-11 rotate-12 rounded-[50%] bg-(--panda-patch)">
            <div className="panda-eye absolute top-[30%] right-[32%] h-4 w-4 rounded-full bg-white/90">
              <div data-pupil className="absolute top-1 left-1 h-2 w-2 rounded-full bg-black transition-transform duration-75" />
            </div>
          </div>
          {/* nose + mouth */}
          <div className="absolute top-[64%] left-1/2 h-3 w-4 -translate-x-1/2 rounded-[45%] bg-(--panda-patch)" />
          <div className="absolute top-[72%] left-1/2 h-3 w-px -translate-x-1/2 bg-(--panda-patch) opacity-60" />
        </div>
      </div>
    </div>
  );
}
