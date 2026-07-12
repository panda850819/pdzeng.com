"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// three.js only loads on clients that actually render the hero panda
const Panda3D = dynamic(() => import("./panda3d").then((m) => m.Panda3D), { ssr: false });

export function PandaHero({ className = "" }: { className?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setShow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!show) return null;
  return <Panda3D className={className} />;
}
