import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pdzeng.com"),
  title: { default: "Panda Zeng", template: "%s · Panda Zeng" },
  description: "Panda Zeng — personal site: writing, projects, cv.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
