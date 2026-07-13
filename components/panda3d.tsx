"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// MetaMask-fox direction: chunky faceted planes, flat shading, color blocking.
const FUR = "#f7f9f8";
const PATCH = "#1b1e20";

function useFacetMaterial(color: string) {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: 0.55,
        metalness: 0.08,
        flatShading: true,
      }),
    [color]
  );
}

function PandaHead() {
  const group = useRef<THREE.Group>(null);
  const leftEye = useRef<THREE.Mesh>(null);
  const rightEye = useRef<THREE.Mesh>(null);
  const reduced = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const fur = useFacetMaterial(FUR);
  const patch = useFacetMaterial(PATCH);

  useFrame(({ pointer: p, clock }) => {
    if (!group.current || reduced) return;
    const t = clock.elapsedTime;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, p.x * 0.55, 0.06);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -p.y * 0.35, 0.06);
    group.current.position.y = Math.sin(t * 0.8) * 0.12;
    const blink = Math.abs(((t + 1.2) % 4.5) - 0.06) < 0.06 ? 0.12 : 1;
    if (leftEye.current) leftEye.current.scale.y = THREE.MathUtils.lerp(leftEye.current.scale.y, blink, 0.5);
    if (rightEye.current) rightEye.current.scale.y = THREE.MathUtils.lerp(rightEye.current.scale.y, blink, 0.5);
  });

  return (
    <group ref={group}>
      {/* head — icosahedron detail 1 keeps big visible facets */}
      <mesh material={fur} scale={[1.18, 1, 1.05]}>
        <icosahedronGeometry args={[1.3, 1]} />
      </mesh>
      {/* ears */}
      <mesh material={patch} position={[-1.02, 1.04, -0.1]} rotation={[0, 0, 0.3]}>
        <icosahedronGeometry args={[0.44, 0]} />
      </mesh>
      <mesh material={patch} position={[1.02, 1.04, -0.1]} rotation={[0, 0, -0.3]}>
        <icosahedronGeometry args={[0.44, 0]} />
      </mesh>
      {/* eye patches — faceted, seated on the head surface */}
      <mesh material={patch} position={[-0.52, 0.08, 1.2]} rotation={[0.15, -0.25, -0.5]} scale={[0.36, 0.5, 0.2]}>
        <icosahedronGeometry args={[1, 1]} />
      </mesh>
      <mesh material={patch} position={[0.52, 0.08, 1.2]} rotation={[0.15, 0.25, 0.5]} scale={[0.36, 0.5, 0.2]}>
        <icosahedronGeometry args={[1, 1]} />
      </mesh>
      {/* eyes */}
      <mesh ref={leftEye} position={[-0.48, 0.1, 1.42]}>
        <icosahedronGeometry args={[0.1, 1]} />
        <meshStandardMaterial color="#ffffff" roughness={0.15} flatShading />
      </mesh>
      <mesh ref={rightEye} position={[0.48, 0.1, 1.42]}>
        <icosahedronGeometry args={[0.1, 1]} />
        <meshStandardMaterial color="#ffffff" roughness={0.15} flatShading />
      </mesh>
      <mesh position={[-0.45, 0.1, 1.5]}>
        <icosahedronGeometry args={[0.05, 1]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.2} flatShading />
      </mesh>
      <mesh position={[0.5, 0.1, 1.5]}>
        <icosahedronGeometry args={[0.05, 1]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.2} flatShading />
      </mesh>
      {/* muzzle + nose */}
      <mesh material={fur} position={[0, -0.42, 1.1]} scale={[0.45, 0.34, 0.32]}>
        <icosahedronGeometry args={[1, 1]} />
      </mesh>
      <mesh material={patch} position={[0, -0.26, 1.42]} scale={[1.2, 0.8, 0.7]}>
        <icosahedronGeometry args={[0.11, 0]} />
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
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 5, 6]} intensity={1.7} />
        <pointLight position={[-5, 1, 2]} intensity={9} color="#6ec096" />
        <pointLight position={[3, -3, 4]} intensity={4} color="#e0b878" />
        <PandaHead />
      </Canvas>
    </div>
  );
}
