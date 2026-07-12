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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={bricolage.variable}>
      <body className="min-h-dvh antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Aurora />
        <Nav />
        <main id="main-content" className="pt-28">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
