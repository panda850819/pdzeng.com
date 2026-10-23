import type { Metadata } from "next";
import { Instrument_Serif, Mona_Sans } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Motion } from "@/components/motion";
import "./globals.css";

const instrument = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const mona = Mona_Sans({
  axes: ["wdth"],
  subsets: ["latin"],
  variable: "--font-mona",
  display: "swap",
});

// CJK ships as unicode-range slices; preloading them all would defeat that
export const metadata: Metadata = {
  metadataBase: new URL("https://pdzeng.com"),
  title: { default: "Panda Zeng", template: "%s · Panda Zeng" },
  description: "Panda Zeng — operator, runner, writing about operations and AI.",
  alternates: { canonical: "./" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Panda Zeng",
  alternateName: "熊貓隨口說",
  url: "https://pdzeng.com",
  inLanguage: ["en", "zh-TW"],
  author: {
    "@type": "Person",
    name: "Panda Zeng",
    alternateName: ["熊貓隨口說", "Panda Tseng"],
    url: "https://pdzeng.com",
    knowsAbout: [
      "Company operations",
      "Go-to-market strategy",
      "Software development",
      "AI agents",
      "Workflow automation",
      "Blockchain",
      "DeFi",
    ],
    sameAs: [
      "https://github.com/panda850819",
      "https://x.com/pandazeng1",
      "https://www.linkedin.com/in/pdzeng/",
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant" suppressHydrationWarning className={`${instrument.variable} ${mona.variable}`}>
      <body className="min-h-dvh antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("motion-ok")`,
          }}
        />
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        <a href="#main-content" className="skip-link" lang="en">
          Skip to main content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header />
        <main id="main-content" className="site-main">
          {children}
        </main>
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
