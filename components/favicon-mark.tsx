import { GLYPH } from "@/components/signature";

// Hex equivalents of the site tokens (satori has no oklch): --olive, --neon.
const OLIVE = "#282c20";
const NEON = "#b6f36a";

// Glyph bounds are x -66.7..546, y 52.8..282.3; the swash is dropped because it vanishes at 16px.
const VIEW = { x: -76, y: 43, width: 632, height: 249 };

// The signature glyph centered on olive, shared by app/icon, app/apple-icon and scripts/gen-favicon.mjs.
export function FaviconMark({ size }: { size: number }) {
  const width = Math.round(size * 0.94);
  const height = Math.round((width * VIEW.height) / VIEW.width);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: OLIVE,
      }}
    >
      <svg width={width} height={height} viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.width} ${VIEW.height}`}>
        <path d={GLYPH} fill={NEON} />
      </svg>
    </div>
  );
}
