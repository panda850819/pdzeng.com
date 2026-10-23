"use client";

import { useEffect, useState, type ComponentType } from "react";
import { createPortal } from "react-dom";
import { INTRO_KEY, shouldPlayIntro } from "@/lib/terminal-intro";

type Overlay = ComponentType<{ onDone: () => void }>;

// Loader only: the server-rendered homepage stays as is, and the overlay code is fetched
// after the first paint, so LCP never waits on it.
export function TerminalIntro() {
  const [Overlay, setOverlay] = useState<Overlay | null>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!shouldPlayIntro({ seen, reduced })) return;

    let live = true;
    const frame = requestAnimationFrame(() => {
      void import("./terminal-intro-overlay").then((m) => {
        if (!live) return;
        try {
          sessionStorage.setItem(INTRO_KEY, "1");
        } catch {}
        setOverlay(() => m.TerminalIntroOverlay);
      });
    });
    return () => {
      live = false;
      cancelAnimationFrame(frame);
    };
  }, []);

  // portalled to <body> so no transformed ancestor (the page template) can capture position: fixed
  return Overlay ? createPortal(<Overlay onDone={() => setOverlay(null)} />, document.body) : null;
}
