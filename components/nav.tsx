"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/work/", label: "Work" },
  { href: "/writing/", label: "Writing" },
  { href: "/now/", label: "Now" },
  { href: "/about/", label: "About" },
  { href: "/cv/", label: "CV" },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <header className="glass-bar fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link href="/" className="font-display text-sm font-semibold tracking-tight">
          pdzeng
        </Link>
        <div className="flex items-center gap-1">
          <nav className="flex items-center min-[390px]:gap-0.5 sm:gap-1" aria-label="Main">
            {links.map(({ href, label }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-1.5 py-2.5 text-sm leading-5 transition-colors duration-150 active:scale-95 min-[390px]:px-2 sm:px-3.5 ${
                    href === "/" ? "hidden sm:block " : ""
                  }${
                    active
                      ? "surface-3 text-ink"
                      : "text-muted [@media(hover:hover)]:hover:text-ink"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
