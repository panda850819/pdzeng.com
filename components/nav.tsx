"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/writing/", label: "Writing" },
  { href: "/projects/", label: "Projects" },
  { href: "/about/", label: "About" },
  { href: "/cv/", label: "CV" },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <header className="glass-bar fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link href="/" className="hidden font-display text-sm font-semibold tracking-tight sm:block">
          pdzeng
        </Link>
        <div className="flex items-center gap-1">
          <nav className="flex items-center gap-0.5 sm:gap-1" aria-label="Main">
            {links.map(({ href, label }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-2.5 py-1.5 text-sm transition-colors duration-150 active:scale-95 sm:px-3.5 ${
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
