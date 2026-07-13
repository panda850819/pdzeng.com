const items = [
  "DeFi operations",
  "AI agents",
  "CLI tooling",
  "Workflow automation",
  "On-chain since 2018",
  "Ops × Engineering",
  "Traditional Chinese writing",
  "Taipei · Remote",
];

export function Marquee() {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <span key={item} className="flex items-center whitespace-nowrap">
          <span className="font-display text-sm text-muted">{item}</span>
          <span className="mx-6 h-1 w-1 rounded-full bg-bamboo/60" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee border-y border-line py-4">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
