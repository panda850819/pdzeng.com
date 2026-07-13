"use client";

import dynamic from "next/dynamic";

// three.js loads lazily on the client; rendered at all viewports (small in-flow
// on mobile, large absolute on md+ — placement comes from the caller's classes)
const Panda3D = dynamic(() => import("./panda3d").then((m) => m.Panda3D), { ssr: false });

export function PandaHero({ className = "" }: { className?: string }) {
  return <Panda3D className={className} />;
}
