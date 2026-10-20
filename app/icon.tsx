import { ImageResponse } from "next/og";
import { FaviconMark } from "@/components/favicon-mark";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<FaviconMark size={size.width} />, size);
}
