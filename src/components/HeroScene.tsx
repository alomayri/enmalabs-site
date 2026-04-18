"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

/**
 * Hero 3D motif — a glowing, iridescent form suspended in space.
 * Placeholder for a fal.ai-generated organic model. Reads as "an object
 * with an inner life" — the technology-with-soul metaphor in 3D.
 */

function Soul() {
  const inner = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (inner.current) {
      inner.current.rotation.x = t * 0.10;
      inner.current.rotation.y = t * 0.18;
      inner.current.position.y = Math.sin(t * 0.35) * 0.12;
    }
    if (ring.current) {
      ring.current.rotation.x = t * 0.06 + Math.PI / 6;
      ring.current.rotation.z = t * 0.09;
    }
  });

  return (
    <>
      {/* Thin halo ring — suggests orbit / sacred geometry */}
      <mesh ref={ring} scale={2.6}>
        <torusGeometry args={[1, 0.006, 16, 128]} />
        <meshBasicMaterial color="#E8A861" transparent opacity={0.45} toneMapped={false} />
      </mesh>

      {/* Core object */}
      <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.5}>
        <mesh ref={inner} scale={1.8}>
          <icosahedronGeometry args={[1, 2]} />
          <meshPhysicalMaterial
            metalness={0.85}
            roughness={0.18}
            iridescence={1}
            iridescenceIOR={1.6}
            clearcoat={1}
            clearcoatRoughness={0.1}
            color="#2A2E5E"
            emissive="#7B6BDB"
            emissiveIntensity={0.3}
            flatShading
          />
        </mesh>
      </Float>
    </>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      style={{ position: "absolute", inset: 0 }}
    >
      <Suspense fallback={null}>
        <color attach="background" args={["#0A0E1A"]} />
        <fog attach="fog" args={["#0A0E1A", 5, 15]} />

        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 3, 5]} intensity={2.2} color="#E8A861" />
        <directionalLight position={[-4, -2, 2]} intensity={0.9} color="#7B6BDB" />
        <pointLight position={[0, 0, 3]} intensity={1.4} color="#E8A861" distance={8} />
        <pointLight position={[-3, 2, -2]} intensity={0.8} color="#7B6BDB" distance={8} />

        <Environment preset="night" background={false} />
        <Soul />

        <EffectComposer>
          <Bloom intensity={1.3} luminanceThreshold={0.12} luminanceSmoothing={0.4} mipmapBlur />
          <Vignette offset={0.3} darkness={0.8} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
