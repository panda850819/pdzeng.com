"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Everything here only runs when motion is welcome. Without JS, or with reduced motion,
// the markup already shows the final state: full signatures, drawn routes, visible halves.
const motionOk = () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Motion() {
  const pathname = usePathname();

  // smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync
  useEffect(() => {
    if (!motionOk()) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.1 });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  useEffect(() => {
    if (!motionOk()) return;
    gsap.registerPlugin(ScrollTrigger);
    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      const q = <T extends Element>(sel: string) => document.querySelector<T>(sel);
      const hero = q<HTMLElement>(".hero");

      if (hero) {
        // hero entrance: the route draws itself; the signature writes itself via the triggers below
        gsap.fromTo(".hero .route path", { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 3.4, ease: "power2.inOut" });
        gsap.from(".hero .route circle", { scale: 0, transformOrigin: "center", duration: 0.5, delay: 0.2 });

        // parallax: the route lags behind the scroll; with a mouse, signature and route drift apart slightly
        gsap.to(".hero .route", {
          y: () => window.innerHeight * 0.3,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
        });
        const hsx = gsap.quickTo(".hero-sig", "x", { duration: 0.9, ease: "power3" });
        const hsy = gsap.quickTo(".hero-sig", "y", { duration: 0.9, ease: "power3" });
        const hrx = gsap.quickTo(".hero .route", "x", { duration: 1.2, ease: "power3" });
        const onMove = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          hsx(nx * 26);
          hsy(ny * 16);
          hrx(-nx * 16);
        };
        hero.addEventListener("pointermove", onMove);
        cleanups.push(() => hero.removeEventListener("pointermove", onMove));
      }

      // message: two rows of large type slide against each other
      const stage = q(".stage");
      if (stage) {
        const st = { trigger: stage, start: "top bottom", end: "bottom top", scrub: true };
        gsap.fromTo(".name-row.a", { xPercent: 0 }, { xPercent: -30, ease: "none", scrollTrigger: st });
        gsap.fromTo(".name-row.b", { xPercent: -30 }, { xPercent: 0, ease: "none", scrollTrigger: st });
        const slash = gsap.fromTo(".slash path", { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power3.inOut", paused: true });
        ScrollTrigger.create({ trigger: stage, start: "top 70%", once: true, onEnter: () => void slash.play() });
      }

      // signatures write themselves once they enter the viewport
      document.querySelectorAll<SVGSVGElement>(".sig").forEach((svg) => {
        const tl = gsap
          .timeline({ paused: true })
          .fromTo(svg.querySelector(".sig-reveal"), { attr: { width: 0 } }, { attr: { width: 760 }, ease: "power2.inOut", duration: 1.1 })
          .fromTo(svg.querySelector(".sig-swash"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "power1.out", duration: 0.35 });
        ScrollTrigger.create({ trigger: svg, start: "top 85%", once: true, onEnter: () => void tl.play() });
      });

      // work vs. off work: the halves slide in from their own sides, then "vs." grows on the seam
      const duel = q(".duel");
      if (duel) {
        gsap
          .timeline({ scrollTrigger: { trigger: duel, start: "top 75%", once: true } })
          .from(".work-half .inner", { x: -80, autoAlpha: 0, duration: 0.9, ease: "expo.out" })
          .from(".off-half .inner", { x: 80, autoAlpha: 0, duration: 0.9, ease: "expo.out" }, "<")
          .from(".vs > span", { scale: 0.2, autoAlpha: 0, duration: 0.8, ease: "back.out(2)" }, "-=.5");
      }

      // the start states are set; the pre-hydration hide (see layout) can lift now
      gsap.set(".hero .route, .hero .sig", { opacity: 1 });
    });

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
