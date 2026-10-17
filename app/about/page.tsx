import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Panda Zeng — operations, in Web3 since 2018.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6">
      <h1 className="display-tracking font-display text-4xl font-semibold">About</h1>
      <div className="article mt-8" lang="en">
        <p>
          I&apos;m Panda Zeng (also Panda Tseng), from Taiwan. I work in operations. Most recently, I
          was Ops Manager at Yei Finance from January to August 2026. Before that, at TONX, I built
          operations from scratch and grew the team from 10 to 50 as People &amp; Ops Lead.
        </p>
        <p>
          I entered Web3 in 2018 and never really left. My path has included full-stack
          engineering, marketing, operations, and People &amp; Ops leadership.
        </p>
        <p>
          Since leaving Yei Finance at the end of August, I&apos;ve been in a transition: running,
          strength training, learning how AI changes operations work, and keeping notes on
          investing. What I&apos;m focused on right now is on the <Link href="/now/">Now page</Link>,
          and I write mostly in Traditional Chinese over in <Link href="/writing/">Writing</Link>.
        </p>
        <p>
          In 2020, I co-founded <a href="https://www.instagram.com/walkincat2020/" target="_blank" rel="noreferrer">WalkinCat</a>.
          The media brand, which covers AI, productivity, and Web3, is currently paused.
        </p>
        <p>
          Full history lives on the <Link href="/cv/">CV page</Link>. Reach me on{" "}
          <a href="https://x.com/pandazeng1" target="_blank" rel="noreferrer">X</a>,{" "}
          <a href="https://www.linkedin.com/in/pdzeng/" target="_blank" rel="noreferrer">LinkedIn</a>, or{" "}
          <a href="https://t.me/pdzeng" target="_blank" rel="noreferrer">Telegram</a>.
        </p>
      </div>
    </div>
  );
}
