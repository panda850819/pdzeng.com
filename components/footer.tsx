import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { Route } from "@/components/route";
import { Signature } from "@/components/signature";
import { meetingHref, pages, socials } from "@/lib/site-links";

const footerPages = [{ href: "/", label: "首頁" }, ...pages];

const feeds = [
  { href: "/rss.xml", label: "RSS" },
  { href: "https://pdzeng.substack.com/subscribe", label: "Newsletter" },
];

export function Footer() {
  return (
    <footer className="foot" lang="zh-Hant" data-hdr=".fcard">
      <div className="fcard">
        <div className="ftab" aria-hidden="true" />
        <Route mirrored />
        <div className="fsig">
          <Signature id="sig-foot" />
        </div>
        <div className="fcta">
          <h2 className="fcta-title">歡迎聊聊</h2>
          <ContactCta href={meetingHref}>歡迎聊聊</ContactCta>
          <p className="fcta-note">
            <a href={meetingHref} target="_blank" rel="noreferrer">
              calendly.com/pdzeng/meetings
            </a>
          </p>
        </div>
        <div className="fcols">
          <ul>
            <li>
              <span className="kicker">頁面</span>
            </li>
            {footerPages.map(({ href, label }) => (
              <li key={href}>
                <Link className="cjk" href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <ul>
            <li>
              <span className="kicker">找我</span>
            </li>
            {socials.map(({ href, label }) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noreferrer">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="legal">
        <span>© {new Date().getFullYear()} Panda Zeng</span>
        <span className="feeds">
          {feeds.map(({ href, label }) => (
            <a key={href} href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
              {label}
            </a>
          ))}
          <span>pdzeng.com</span>
        </span>
      </div>
    </footer>
  );
}
