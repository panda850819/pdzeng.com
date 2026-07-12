import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Panda Zeng — operations and software, in Web3 since 2017.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6">
      <h1 className="display-tracking font-display text-4xl font-semibold">About</h1>
      <div className="article mt-8" lang="en">
        <p>
          I&apos;m Panda, from Taiwan — a cross-disciplinary professional bridging operations
          management and software development.
        </p>
        <p>
          I entered Web3 in 2017 and never really left: campus ambassador, full-stack engineer,
          marketing, and eventually People &amp; Ops Lead at TONX. The through-line is applying
          technical thinking to how teams and processes actually run.
        </p>
        <p>
          These days I build agent systems and CLI tools that remove repetitive work — my own
          first, then everyone else&apos;s. I write about that process, mostly in Traditional
          Chinese, over in <Link href="/writing/">Writing</Link>.
        </p>
        <p>
          Since 2020 I also run <a href="https://www.instagram.com/walkincat2020/" target="_blank" rel="noreferrer">WalkinCat</a>,
          a media brand about AI, productivity, and Web3.
        </p>
        <p>
          Full history lives on the <Link href="/cv/">CV page</Link>. Reach me on{" "}
          <a href="https://x.com/pandazeng1" target="_blank" rel="noreferrer">X</a> or{" "}
          <a href="https://t.me/pdzeng_talk" target="_blank" rel="noreferrer">Telegram</a>.
        </p>
      </div>
    </div>
  );
}
