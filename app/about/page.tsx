import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Panda Zeng — Operations × AI, in Web3 since 2018.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6">
      <h1 className="display-tracking font-display text-4xl font-semibold">About</h1>
      <div className="article mt-8" lang="en">
        <p>
          I&apos;m Panda, from Taiwan. I&apos;m an Ops Manager at Yei Finance, working across
          operations, AI systems, and workflow automation.
        </p>
        <p>
          I entered Web3 in 2018 and never really left. My path has included full-stack
          engineering, marketing, operations, and People &amp; Ops leadership. Software remains
          part of my background and how I approach operational systems.
        </p>
        <p>
          These days I build agent systems and CLI tools that remove repetitive work — my own
          first, then everyone else&apos;s. I write about that process, mostly in Traditional
          Chinese, over in <Link href="/writing/">Writing</Link>.
        </p>
        <p>
          In 2020, I co-founded <a href="https://www.instagram.com/walkincat2020/" target="_blank" rel="noreferrer">WalkinCat</a>.
          The media brand, which covers AI, productivity, and Web3, is currently paused.
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
