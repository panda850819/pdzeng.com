const socials = [
  { label: "GitHub", href: "https://github.com/panda850819" },
  { label: "X", href: "https://x.com/pandazeng1" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/wei-chieh-tseng-369303161/" },
  { label: "Telegram", href: "https://t.me/pdzeng_talk" },
  { label: "RSS", href: "/rss.xml" },
];

export function Footer() {
  return (
    <footer className="mx-auto mt-28 w-full max-w-5xl px-6 pb-12">
      <div className="hairline flex flex-wrap items-center justify-between gap-4 rounded-lg border-x-0 border-b-0 pt-6">
        <p className="text-sm text-faint">© {new Date().getFullYear()} Panda Zeng</p>
        <ul className="flex flex-wrap gap-4">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                className="text-sm text-muted transition-colors duration-150 [@media(hover:hover)]:hover:text-ink"
                {...(s.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
