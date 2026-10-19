import Link from "next/link";
import { Route } from "@/components/route";
import { Signature } from "@/components/signature";
import { jobs, offWork } from "@/lib/home-data";
import { nowSummary } from "@/lib/now-data";
import { unifiedWriting } from "@/lib/writing";
import { writingHeadline } from "@/lib/writing-display";

const month = (iso: string) => iso.slice(0, 7).replace("-", ".");

export default function Home() {
  const latest = unifiedWriting()
    .filter((post) => post.category === "writing")
    .slice(0, 4);

  return (
    <div className="home" lang="zh-Hant">
      <section className="hero t1" data-hdr aria-label="Panda Zeng">
        <Route dot />
        <h1 className="vh">Panda Zeng</h1>
        <div className="hero-main">
          <div className="hero-sig">
            <Signature id="sig-hero" />
          </div>
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

      <section className="lately t1" data-hdr aria-labelledby="wr-h">
        <div className="inner">
          <h2 id="wr-h">
            <span className="eyebrow">Lately</span>最近寫的
          </h2>
          <ol>
            {latest.map((post) => (
              <li key={post.id}>
                <a
                  href={post.url}
                  {...(post.external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  <time dateTime={post.publishedAt}>{month(post.publishedAt)}</time>
                  <span lang={post.locale === "zh-TW" ? "zh-Hant" : "en"}>{writingHeadline(post)}</span>
                  <i aria-hidden="true">→</i>
                </a>
              </li>
            ))}
          </ol>
          <Link className="g-link" href="/writing/">
            全部文章
          </Link>
        </div>
      </section>
    </div>
  );
}
