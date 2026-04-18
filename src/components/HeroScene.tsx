"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

const RING_LAYOUT = [
  { radius: 0.42, tube: 0.014, opacity: 0.92 },
  { radius: 0.76, tube: 0.012, opacity: 0.56 },
  { radius: 1.12, tube: 0.011, opacity: 0.34 },
  { radius: 1.52, tube: 0.009, opacity: 0.2 },
  { radius: 1.95, tube: 0.008, opacity: 0.12 },
] as const;

function BalsamMotif() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Sprite>(null);
  const rings = useRef<Array<THREE.Mesh | null>>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (group.current) {
      group.current.position.y = Math.sin(t * 0.18) * 0.05;
      group.current.rotation.z = Math.sin(t * 0.08) * 0.035;
    }

    const breath = 1 + Math.sin(t * 1.15) * 0.045;

    if (core.current) {
      core.current.scale.setScalar(0.98 + Math.sin(t * 1.15) * 0.03);
    }

    if (halo.current) {
      const haloScale = 2.45 + Math.sin(t * 1.15) * 0.1;
      halo.current.scale.set(haloScale, haloScale, 1);
      halo.current.material.opacity = 0.22 + Math.sin(t * 1.15) * 0.04;
    }

    rings.current.forEach((ring, index) => {
      if (!ring) {
        return;
      }

      const lag = index * 0.28;
      const pulse = 1 + Math.sin(t * 1.15 - lag) * (0.055 - index * 0.007);
      ring.scale.setScalar(breath * pulse);
      ring.rotation.z = Math.sin(t * 0.12 - lag) * 0.05;

      const material = ring.material as THREE.MeshBasicMaterial;
      material.opacity = RING_LAYOUT[index].opacity + Math.sin(t * 1.15 - lag) * 0.06;
      material.color.set(index === 0 ? "#F0BD55" : "#D59A3F");
      material.needsUpdate = true;
    });
  });

  return (
    <group ref={group} position={[1.05, 0.1, -0.3]}>
      <Billboard follow={false} lockX lockY>
        <sprite ref={halo} scale={2.45}>
          <spriteMaterial
            color="#A7661E"
            opacity={0.22}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      </Billboard>

      {RING_LAYOUT.map((ring, index) => (
        <mesh
          // Rings stay camera-facing and only animate by scale/opacity.
          key={ring.radius}
          ref={(node) => {
            rings.current[index] = node;
          }}
          scale={1}
        >
          <torusGeometry args={[ring.radius, ring.tube, 20, 120]} />
          <meshBasicMaterial
            color={index === 0 ? "#F0BD55" : "#D59A3F"}
            transparent
            opacity={ring.opacity}
            toneMapped={false}
          />
        </mesh>
      ))}

      <mesh ref={core} position={[0, 0, 0.02]}>
        <sphereGeometry args={[0.19, 48, 48]} />
        <meshStandardMaterial
          color="#F5D98B"
          emissive="#F0B548"
          emissiveIntensity={0.9}
          roughness={0.28}
          metalness={0.04}
        />
      </mesh>

      <mesh position={[0, 0, -0.08]}>
        <sphereGeometry args={[0.31, 40, 40]} />
        <meshBasicMaterial color="#A05C1D" transparent opacity={0.16} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Atmosphere() {
  const veil = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (veil.current) {
      veil.current.rotation.z = t * 0.015;
      (veil.current.material as THREE.MeshBasicMaterial).opacity =
        0.08 + Math.sin(t * 0.35) * 0.015;
    }
  });

  return (
    <mesh ref={veil} position={[1.05, 0.1, -1.8]}>
      <circleGeometry args={[2.75, 80]} />
      <meshBasicMaterial color="#7C4F19" transparent opacity={0.08} toneMapped={false} />
    </mesh>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.8], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      style={{ position: "absolute", inset: 0 }}
    >
      <Suspense fallback={null}>
        <color attach="background" args={["#0A0E1A"]} />
        <fog attach="fog" args={["#0A0E1A", 6, 15]} />

        <ambientLight intensity={0.42} color="#2D2019" />
        <pointLight position={[1.05, 0.15, 2.2]} intensity={10} color="#F0BA54" distance={7} decay={2} />
        <pointLight position={[0.2, 0.8, 1.4]} intensity={1.8} color="#E8A861" distance={6} decay={2} />
        <directionalLight position={[2, 1.5, 3]} intensity={0.7} color="#FFF0CD" />

        <Atmosphere />
        <BalsamMotif />

        <EffectComposer>
          <Bloom intensity={0.75} luminanceThreshold={0.3} luminanceSmoothing={0.7} mipmapBlur />
          <Vignette offset={0.2} darkness={0.72} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
