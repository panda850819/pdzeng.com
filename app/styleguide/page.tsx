import type { Metadata } from "next";

export const metadata: Metadata = { title: "Styleguide", robots: { index: false } };

const colors = [
  ["canvas", "bg-canvas hairline-strong"],
  ["ink", "bg-ink"],
  ["muted", "bg-muted"],
  ["faint", "bg-faint"],
  ["bamboo", "bg-bamboo"],
  ["bamboo-dim", "bg-bamboo-dim"],
  ["ember", "bg-ember"],
] as const;

export default function Styleguide() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-16 px-6">
      <section>
        <h1 className="display-tracking font-display text-4xl font-semibold">Styleguide</h1>
        <p className="mt-2 text-muted">Bamboo aurora on deep ink — tokens and primitives.</p>
      </section>

      <section aria-labelledby="sg-color">
        <h2 id="sg-color" className="mb-4 font-display text-xl font-medium">Color</h2>
        <div className="flex flex-wrap gap-4">
          {colors.map(([name, cls]) => (
            <div key={name} className="w-24">
              <div className={`h-16 rounded-md ${cls}`} />
              <p className="mt-1.5 text-xs text-faint">{name}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="sg-type">
        <h2 id="sg-type" className="mb-4 font-display text-xl font-medium">Type</h2>
        <div className="space-y-4">
          <p className="display-tracking font-display text-6xl font-semibold">Display 60</p>
          <p className="display-tracking font-display text-3xl font-semibold">Heading 30</p>
          <p className="text-base">Body 16 — Latin body copy sits at 1.5 line-height.</p>
          <p lang="zh" className="max-w-[65ch] text-base">
            中文內文 16 — 行高 1.75,PingFang TC 優先,不加字距。混排英文 words 時由瀏覽器換行。
          </p>
          <p className="text-sm text-muted">Muted 14 · secondary copy</p>
          <p className="text-xs text-faint tabular-nums">Faint 12 · 2026-07-13 · tabular</p>
        </div>
      </section>

      <section aria-labelledby="sg-surface">
        <h2 id="sg-surface" className="mb-4 font-display text-xl font-medium">Surfaces</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="surface-1 hairline rounded-lg p-5 text-sm text-muted">surface-1 · 0.02</div>
          <div className="surface-2 hairline rounded-lg p-5 text-sm text-muted">surface-2 · 0.04</div>
          <div className="surface-3 hairline-strong rounded-lg p-5 text-sm text-muted">surface-3 · 0.05</div>
        </div>
        <div className="glass mt-4 max-w-md rounded-xl p-6">
          <p className="font-display text-lg font-medium">Glass panel</p>
          <p className="mt-1 text-sm text-muted">Reserved for floating chrome: nav, hero accents.</p>
        </div>
      </section>

      <section aria-labelledby="sg-buttons">
        <h2 id="sg-buttons" className="mb-4 font-display text-xl font-medium">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <button className="rounded-full bg-bamboo px-5 py-2.5 text-sm font-medium text-canvas transition-transform duration-150 active:scale-95">
            Primary
          </button>
          <button className="glass rounded-full px-5 py-2.5 text-sm text-ink transition-transform duration-150 active:scale-95">
            Glass
          </button>
          <button className="surface-2 hairline rounded-full px-5 py-2.5 text-sm text-muted transition-colors duration-150 [@media(hover:hover)]:hover:text-ink">
            Quiet
          </button>
        </div>
      </section>

      <section aria-labelledby="sg-tags">
        <h2 id="sg-tags" className="mb-4 font-display text-xl font-medium">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {["defi", "ai", "ops", "note"].map((t) => (
            <span key={t} className="surface-2 hairline rounded-full px-3 py-1 text-xs text-muted">
              {t}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
