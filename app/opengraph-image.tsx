import { ImageResponse } from "next/og";
import { GLYPH } from "@/components/signature";

// upgrade: per-article OG cards with the zh title need a bundled CJK font subset
export const dynamic = "force-static";
export const alt = "Panda Zeng — pdzeng.com";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Hex equivalents of the site tokens (satori has no oklch): --olive, --cream, --neon.
const OLIVE = "#282c20";
const CREAM = "#f4f4ed";
const NEON = "#b6f36a";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 28,
          background: NEON,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "48px 56px",
            borderRadius: 28,
            background: OLIVE,
            color: CREAM,
          }}
        >
          <div style={{ display: "flex", width: "100%", justifyContent: "space-between", fontSize: 26 }}>
            <span>Panda Zeng</span>
            <span style={{ color: NEON }}>pdzeng.com</span>
          </div>
          <svg width="760" height="316" viewBox="-80 30 650 270">
            <path d={GLYPH} fill={NEON} />
            <path d="M-50 286C140 270 360 252 566 226" fill="none" stroke={NEON} strokeWidth="5" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", fontSize: 30, opacity: 0.8 }}>Operator, runner, writing about operations and AI.</div>
        </div>
      </div>
    ),
    size
  );
}
