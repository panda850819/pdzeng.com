"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// Mischief-panda direction (feature grammar, not a clone): cream head, spiky
// top tuft, droopy round ears, big upswept determined eye patches with glints.
const FUR = "#f4f0e4";
const PATCH = "#3a3f45";

function useFacetMaterial(color: string, roughness = 0.5) {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        roughness,
        metalness: 0.06,
        flatShading: true,
      }),
    [color, roughness]
  );
}

function PandaHead() {
  const group = useRef<THREE.Group>(null);
  const leftGlint = useRef<THREE.Mesh>(null);
  const rightGlint = useRef<THREE.Mesh>(null);
  const reduced = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const fur = useFacetMaterial(FUR);
  const patch = useFacetMaterial(PATCH, 0.35);

  useFrame(({ pointer: p, clock }) => {
    if (!group.current || reduced) return;
    const t = clock.elapsedTime;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, p.x * 0.5, 0.06);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -p.y * 0.3, 0.06);
    group.current.position.y = Math.sin(t * 0.8) * 0.1;
    const blink = Math.abs(((t + 1.2) % 4.5) - 0.06) < 0.06 ? 0.05 : 1;
    if (leftGlint.current) leftGlint.current.scale.setScalar(THREE.MathUtils.lerp(leftGlint.current.scale.x, blink, 0.5));
    if (rightGlint.current) rightGlint.current.scale.setScalar(THREE.MathUtils.lerp(rightGlint.current.scale.x, blink, 0.5));
  });

  return (
    <group ref={group} rotation={[0.06, 0, 0]}>
      {/* head */}
      <mesh material={fur} scale={[1.15, 1.02, 1.05]}>
        <icosahedronGeometry args={[1.3, 2]} />
      </mesh>
      {/* top tuft — three faceted spikes, center tallest */}
      <mesh material={fur} position={[0, 1.42, 0]} rotation={[0, 0.4, 0]}>
        <coneGeometry args={[0.22, 0.75, 5]} />
      </mesh>
      <mesh material={fur} position={[-0.34, 1.3, 0.05]} rotation={[0, 0, 0.32]}>
        <coneGeometry args={[0.17, 0.55, 5]} />
      </mesh>
      <mesh material={fur} position={[0.34, 1.3, 0.05]} rotation={[0, 0, -0.32]}>
        <coneGeometry args={[0.17, 0.55, 5]} />
      </mesh>
      {/* ears — droopy, on the sides */}
      <mesh material={patch} position={[-1.18, 0.85, 0.05]} scale={[1, 1.1, 0.8]}>
        <icosahedronGeometry args={[0.46, 1]} />
      </mesh>
      <mesh material={patch} position={[1.18, 0.85, 0.05]} scale={[1, 1.1, 0.8]}>
        <icosahedronGeometry args={[0.46, 1]} />
      </mesh>
      {/* eye patches — bigger, rounder, strong upsweep = 頑皮 determined */}
      <mesh material={patch} position={[-0.52, 0.06, 1.14]} rotation={[0.12, -0.18, 0.5]} scale={[0.36, 0.47, 0.2]}>
        <icosahedronGeometry args={[1, 1]} />
      </mesh>
      <mesh material={patch} position={[0.52, 0.06, 1.14]} rotation={[0.12, 0.18, -0.5]} scale={[0.36, 0.47, 0.2]}>
        <icosahedronGeometry args={[1, 1]} />
      </mesh>
      {/* glints */}
      <mesh ref={leftGlint} position={[-0.56, 0.2, 1.34]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh ref={rightGlint} position={[0.42, 0.2, 1.34]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* nose — small faceted triangle */}
      <mesh material={patch} position={[0, -0.3, 1.4]} rotation={[1.75, 0, 0]}>
        <coneGeometry args={[0.09, 0.12, 4]} />
      </mesh>
      {/* smirk — thin angled bar */}
      <mesh material={patch} position={[-0.22, -0.52, 1.28]} rotation={[0, 0, 0.35]} scale={[1, 0.16, 0.4]}>
        <capsuleGeometry args={[0.05, 0.3, 4, 8]} />
      </mesh>
    </group>
  );
}

export function Panda3D({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5.4], fov: 38 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 5, 6]} intensity={1.8} />
        <pointLight position={[-5, 1, 2]} intensity={10} color="#6ec096" />
        <pointLight position={[3, -3, 4]} intensity={4} color="#e0b878" />
        <PandaHead />
      </Canvas>
    </div>
  );
}
