import { ImageResponse } from "next/og";
import { FaviconMark } from "@/components/favicon-mark";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<FaviconMark size={size.width} />, size);
}
