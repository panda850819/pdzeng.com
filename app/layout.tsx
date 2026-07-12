import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Aurora } from "@/components/aurora";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pdzeng.com"),
  title: { default: "Panda Zeng", template: "%s · Panda Zeng" },
  description:
    "Panda Zeng — six years in crypto operations, building automations and writing about DeFi, AI tooling, and the systems in between.",
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
    alternateName: "熊貓隨口說",
    url: "https://pdzeng.com",
    knowsAbout: ["Blockchain", "DeFi", "Operations", "AI agents", "Workflow automation"],
    sameAs: [
      "https://github.com/panda850819",
      "https://x.com/pandazeng1",
      "https://www.linkedin.com/in/wei-chieh-tseng-369303161/",
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={bricolage.variable}>
      <body className="min-h-dvh antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Aurora />
        <Nav />
        <main id="main-content" className="pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
