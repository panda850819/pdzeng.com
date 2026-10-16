import { contactHref } from "@/lib/site-links";

export function ContactCta() {
  return (
    <a className="cta" href={contactHref} target="_blank" rel="noreferrer">
      聯絡我合作
      <svg viewBox="0 0 14 14" aria-hidden="true">
        <path d="M3 11 11 3M5 3h6v6" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    </a>
  );
}
