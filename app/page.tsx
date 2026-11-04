import type { Metadata } from "next";
import Link from "next/link";
import { Route } from "@/components/route";
import { Signature } from "@/components/signature";
import { TerminalIntro } from "@/components/terminal-intro";
import { jobs, offWork } from "@/lib/home-data";
import { nowSummary } from "@/lib/now-data";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site-meta";

// Home only: OG/Twitter set in the root layout would override every child page's derived og:title
export const metadata: Metadata = {
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: "Panda Zeng",
    locale: "zh_TW",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
};

export default function Home() {
  return (
    <div className="home" lang="zh-Hant">
      <section className="hero t1" data-hdr aria-label="Panda Zeng">
        <Route dot />
        <h1 className="vh">Panda Zeng</h1>
        <div className="hero-main">
          <div className="hero-sig">
            <Signature id="sig-hero" />
          </div>
          <p className="hero-role" lang="en">
            Operations Manager
          </p>
        </div>
        <Link className="now" href="/now/">
          <span className="kicker">Now</span>
          {nowSummary}
        </Link>
      </section>

      <section className="duel" aria-label="工作與工作之外">
        <div className="half work-half" data-hdr>
          <div className="inner">
            <h2>
              <span className="eyebrow">Work</span>工作
            </h2>
            <ul className="rows jobs">
              {jobs.map((job) => (
                <li key={`${job.company}-${job.role}`}>
                  <b>
                    {job.href ? (
                      <a className="co" href={job.href} target="_blank" rel="noreferrer">
                        {job.company}
                        <i aria-hidden="true">↗</i>
                      </a>
                    ) : (
                      job.company
                    )}
                  </b>
                  <span>{job.role}</span>
                  <time>{job.period}</time>
                </li>
              ))}
            </ul>
            <Link className="g-link" href="/work/">
              看完整經歷
            </Link>
          </div>
          <span className="vs" aria-hidden="true">
            <span>vs.</span>
          </span>
        </div>
        <div className="half off-half" data-hdr>
          <div className="inner">
            <h2>
              <span className="eyebrow">Off work</span>工作之外
            </h2>
            <ul className="rows offs">
              {offWork.map((item) => (
                <li key={item.title}>
                  <b>{item.title}</b>
                  <span>{item.detail}</span>
                </li>
              ))}
            </ul>
            <Link className="g-link" href="/writing/">
              讀我寫的東西
            </Link>
          </div>
        </div>
      </section>

      <section className="lately t1" data-hdr aria-label="熊貓隨口說">
        <div className="inner">
          <Link className="g-link" href="/substack/">
            熊貓隨口說 →
          </Link>
        </div>
      </section>
      <TerminalIntro />
    </div>
  );
}
