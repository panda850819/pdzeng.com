"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const FUR = "#f4f6f5";
const PATCH = "#17191b";

function useToyMaterial(color: string) {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: 0.35,
        metalness: 0.05,
      }),
    [color]
  );
}

function PandaHead() {
  const group = useRef<THREE.Group>(null);
  const leftEye = useRef<THREE.Mesh>(null);
  const rightEye = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const reduced = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const fur = useToyMaterial(FUR);
  const patch = useToyMaterial(PATCH);

  useFrame(({ pointer: p, clock }) => {
    if (!group.current || reduced) return;
    pointer.current = p;
    const t = clock.elapsedTime;
    // ease toward the cursor, add a slow idle bob
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, p.x * 0.55, 0.06);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -p.y * 0.35, 0.06);
    group.current.position.y = Math.sin(t * 0.8) * 0.12;
    // blink every ~4.5s
    const blink = Math.abs(((t + 1.2) % 4.5) - 0.06) < 0.06 ? 0.12 : 1;
    if (leftEye.current) leftEye.current.scale.y = THREE.MathUtils.lerp(leftEye.current.scale.y, blink, 0.5);
    if (rightEye.current) rightEye.current.scale.y = THREE.MathUtils.lerp(rightEye.current.scale.y, blink, 0.5);
  });

  return (
    <group ref={group}>
      {/* head */}
      <mesh material={fur} scale={[1.15, 1, 1.05]}>
        <sphereGeometry args={[1.3, 48, 48]} />
      </mesh>
      {/* ears */}
      <mesh material={patch} position={[-1.02, 1.02, -0.1]}>
        <sphereGeometry args={[0.42, 32, 32]} />
      </mesh>
      <mesh material={patch} position={[1.02, 1.02, -0.1]}>
        <sphereGeometry args={[0.42, 32, 32]} />
      </mesh>
      {/* eye patches — flattened, angled into the face */}
      <mesh material={patch} position={[-0.52, 0.08, 1.27]} rotation={[0.15, -0.25, -0.5]} scale={[0.34, 0.48, 0.18]}>
        <sphereGeometry args={[1, 32, 32]} />
      </mesh>
      <mesh material={patch} position={[0.52, 0.08, 1.27]} rotation={[0.15, 0.25, 0.5]} scale={[0.34, 0.48, 0.18]}>
        <sphereGeometry args={[1, 32, 32]} />
      </mesh>
      {/* eyes */}
      <mesh ref={leftEye} position={[-0.48, 0.1, 1.43]}>
        <sphereGeometry args={[0.09, 24, 24]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} />
      </mesh>
      <mesh ref={rightEye} position={[0.48, 0.1, 1.43]}>
        <sphereGeometry args={[0.09, 24, 24]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} />
      </mesh>
      <mesh position={[-0.45, 0.1, 1.5]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial color="#050505" roughness={0.2} />
      </mesh>
      <mesh position={[0.5, 0.1, 1.5]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial color="#050505" roughness={0.2} />
      </mesh>
      {/* muzzle + nose + mouth */}
      <mesh material={fur} position={[0, -0.42, 1.08]} scale={[0.42, 0.32, 0.3]}>
        <sphereGeometry args={[1, 32, 32]} />
      </mesh>
      <mesh material={patch} position={[0, -0.28, 1.38]} scale={[1, 0.75, 0.7]}>
        <sphereGeometry args={[0.11, 24, 24]} />
      </mesh>
      <mesh material={patch} position={[0, -0.52, 1.32]} scale={[0.5, 1, 0.5]}>
        <capsuleGeometry args={[0.02, 0.14, 4, 8]} />
      </mesh>
    </group>
  );
}

export function Panda3D({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5.2], fov: 38 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 5, 6]} intensity={1.6} />
        {/* bamboo rim + warm fill echo the aurora palette */}
        <pointLight position={[-5, 1, 2]} intensity={9} color="#6ec096" />
        <pointLight position={[3, -3, 4]} intensity={4} color="#e0b878" />
        <PandaHead />
      </Canvas>
    </div>
  );
}
