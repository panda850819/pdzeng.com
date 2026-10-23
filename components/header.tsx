"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ContactCta } from "@/components/contact-cta";
import { ThemeToggle } from "@/components/theme-toggle";
import { pages, socials } from "@/lib/site-links";

declare global {
  interface Window {
    __lenis?: { stop(): void; start(): void };
  }
}

const isCurrent = (pathname: string, href: string) => pathname.startsWith(href);

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLAnchorElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // The strip stays clear at the top of the page (over the hero on home), then turns solid in the
  // colours of whatever `[data-hdr]` block sits under it; pages without any fall back to t1.
  useEffect(() => {
    const root = document.documentElement;
    const strip = stripRef.current;
    if (!strip) return;
    const paint = () => {
      const h = strip.offsetHeight;
      const mid = h / 2;
      const hero = document.querySelector(".hero");
      root.classList.toggle("scrolled", hero ? hero.getBoundingClientRect().bottom <= h : window.scrollY > 0);
      const under = Array.from(document.querySelectorAll<HTMLElement>("[data-hdr]")).filter((el) => {
        const r = el.getBoundingClientRect();
        return r.left <= 20 && r.right > 20 && r.top <= mid && r.bottom > mid;
      });
      const src = under[under.length - 1];
      if (!src) {
        root.style.removeProperty("--hdr-bg");
        root.style.removeProperty("--hdr-fg");
        return;
      }
      // a block whose own background is see-through (the footer) names the child to read instead
      const cs = getComputedStyle((src.dataset.hdr && src.querySelector(src.dataset.hdr)) || src);
      root.style.setProperty("--hdr-bg", cs.backgroundColor);
      root.style.setProperty("--hdr-fg", cs.color);
    };
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    root.classList.add("js-hdr");
    // the theme switch repaints the sections a frame later, so read their colours after it
    const repaint = () => requestAnimationFrame(paint);
    window.addEventListener("scroll", paint, { passive: true });
    window.addEventListener("resize", paint);
    window.addEventListener("themechange", repaint);
    scheme.addEventListener("change", repaint);
    paint();
    return () => {
      window.removeEventListener("scroll", paint);
      window.removeEventListener("resize", paint);
      window.removeEventListener("themechange", repaint);
      scheme.removeEventListener("change", repaint);
    };
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = open ? "hidden" : "";
    window.__lenis?.[open ? "stop" : "start"]();
    if (open) sheetRef.current?.querySelector<HTMLAnchorElement>(".pages a")?.focus();
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const close = () => {
    setOpen(false);
    menuBtnRef.current?.focus();
  };

  return (
    <header className="site-header" lang="zh-Hant">
      <div className="hdr" ref={stripRef} aria-hidden="true" />
      <Link className="lockup" href="/" aria-label="Panda Zeng 首頁">
        <span className="s">Panda</span>
        <span className="g">ZENG</span>
      </Link>
      <nav className="topnav" aria-label="主選單">
        {pages.map(({ href, label }) => (
          <Link key={href} href={href} aria-current={isCurrent(pathname, href) ? "page" : undefined}>
            {label}
          </Link>
        ))}
      </nav>
      <div className="topright">
        <ContactCta />
        <ThemeToggle />
        <a
          ref={menuBtnRef}
          className="menu-btn"
          href="#mnav"
          role="button"
          aria-label="開啟選單"
          aria-controls="mnav"
          aria-expanded={open}
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
          // role="button" promises Space as well as Enter
          onKeyDown={(e) => {
            if (e.key !== " ") return;
            e.preventDefault();
            setOpen(true);
          }}
        >
          <svg viewBox="0 0 18 12" aria-hidden="true">
            <path d="M1 2h16M7 10h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </a>
      </div>
      <div
        ref={sheetRef}
        className={`mnav${open ? " open" : ""}`}
        id="mnav"
        role="dialog"
        aria-modal="true"
        aria-label="選單"
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target === e.currentTarget || target.closest("a")) setOpen(false);
        }}
      >
        <button type="button" className="close" aria-label="關閉選單" onClick={close}>
          <span aria-hidden="true">×</span>
        </button>
        <span className="kicker">頁面</span>
        <ul className="pages">
          {pages.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} aria-current={isCurrent(pathname, href) ? "page" : undefined}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="social">
          <li>
            <span className="kicker">找我</span>
          </li>
          {socials.map(({ href, label }) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noreferrer">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <ContactCta />
      </div>
    </header>
  );
}
