"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// Vinyl-toy direction: clean faceted silhouette, graphic black patches AS the
// eyes (no eyeballs — that was the uncanny part), single glint, upswept tilt.
const FUR = "#f7f9f8";
const PATCH = "#141719";

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
    // blink = glints wink out briefly
    const blink = Math.abs(((t + 1.2) % 4.5) - 0.06) < 0.06 ? 0.05 : 1;
    if (leftGlint.current) leftGlint.current.scale.setScalar(THREE.MathUtils.lerp(leftGlint.current.scale.x, blink, 0.5));
    if (rightGlint.current) rightGlint.current.scale.setScalar(THREE.MathUtils.lerp(rightGlint.current.scale.x, blink, 0.5));
  });

  return (
    <group ref={group} rotation={[0.06, 0, 0]}>
      {/* head — detail 2 keeps facets but cleans the silhouette */}
      <mesh material={fur} scale={[1.15, 1.02, 1.05]}>
        <icosahedronGeometry args={[1.3, 2]} />
      </mesh>
      {/* ears — symmetric, slightly back */}
      <mesh material={patch} position={[-0.95, 1.05, -0.12]}>
        <icosahedronGeometry args={[0.4, 1]} />
      </mesh>
      <mesh material={patch} position={[0.95, 1.05, -0.12]}>
        <icosahedronGeometry args={[0.4, 1]} />
      </mesh>
      {/* eye patches ARE the eyes — upswept outer tilt reads confident */}
      <mesh material={patch} position={[-0.5, 0.1, 1.16]} rotation={[0.12, -0.2, 0.38]} scale={[0.38, 0.5, 0.2]}>
        <icosahedronGeometry args={[1, 1]} />
      </mesh>
      <mesh material={patch} position={[0.5, 0.1, 1.16]} rotation={[0.12, 0.2, -0.38]} scale={[0.38, 0.5, 0.2]}>
        <icosahedronGeometry args={[1, 1]} />
      </mesh>
      {/* one glint per eye, upper-outer — smooth spheres so they read as light */}
      <mesh ref={leftGlint} position={[-0.58, 0.26, 1.36]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh ref={rightGlint} position={[0.42, 0.26, 1.36]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* muzzle + nose — small, low, calm */}
      <mesh material={fur} position={[0, -0.5, 1.05]} scale={[0.44, 0.3, 0.3]}>
        <icosahedronGeometry args={[1, 1]} />
      </mesh>
      <mesh material={patch} position={[0, -0.38, 1.34]} scale={[1.25, 0.7, 0.6]}>
        <icosahedronGeometry args={[0.1, 1]} />
      </mesh>
    </group>
  );
}

export function Panda3D({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5.2], fov: 38 }}
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
