import { ImageResponse } from "next/og";

// upgrade: per-article OG cards with the zh title need a bundled CJK font subset
export const dynamic = "force-static";
export const alt = "Panda Zeng — pdzeng.com";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0b0d0c",
          color: "#ecf1ee",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            left: 60,
            width: 500,
            height: 500,
            borderRadius: 9999,
            background: "radial-gradient(circle at center, rgba(110,190,150,0.45), transparent 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -180,
            right: -60,
            width: 460,
            height: 460,
            borderRadius: 9999,
            background: "radial-gradient(circle at center, rgba(230,190,120,0.28), transparent 65%)",
          }}
        />
        <div style={{ display: "flex", fontSize: 28, color: "#8fd6b0" }}>pdzeng.com</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 700, letterSpacing: -2 }}>Panda Zeng</div>
          <div style={{ display: "flex", fontSize: 34, color: "#9fa8a3" }}>
            Operations, automation, and everything between DeFi and AI.
          </div>
        </div>
      </div>
    ),
    size
  );
}
