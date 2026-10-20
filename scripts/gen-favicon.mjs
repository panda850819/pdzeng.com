// Packs app/favicon.ico (16 + 32, PNG entries) from the same FaviconMark render as app/icon.tsx,
// and writes 16/32/180 previews to /tmp/favicon-preview. Run with `bun scripts/gen-favicon.mjs`.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { ImageResponse } from "next/og";
import { FaviconMark } from "../components/favicon-mark.tsx";

const ROOT = join(import.meta.dir, "..");
const PREVIEW = "/tmp/favicon-preview";

async function render(size) {
  const res = new ImageResponse(createElement(FaviconMark, { size }), { width: size, height: size });
  return Buffer.from(await res.arrayBuffer());
}

// ICONDIR + one ICONDIRENTRY per image, each pointing at an embedded PNG
function packIco(images) {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, png }, i) => {
    const at = 6 + 16 * i;
    header.writeUInt8(size >= 256 ? 0 : size, at);
    header.writeUInt8(size >= 256 ? 0 : size, at + 1);
    header.writeUInt16LE(1, at + 4);
    header.writeUInt16LE(32, at + 6);
    header.writeUInt32LE(png.length, at + 8);
    header.writeUInt32LE(offset, at + 12);
    offset += png.length;
  });
  return Buffer.concat([header, ...images.map((image) => image.png)]);
}

const pngs = new Map();
for (const size of [16, 32, 180]) pngs.set(size, await render(size));

mkdirSync(PREVIEW, { recursive: true });
for (const [size, png] of pngs) writeFileSync(join(PREVIEW, `${size}.png`), png);

writeFileSync(join(ROOT, "app", "favicon.ico"), packIco([16, 32].map((size) => ({ size, png: pngs.get(size) }))));
console.log(`wrote app/favicon.ico and ${PREVIEW}/{16,32,180}.png`);
