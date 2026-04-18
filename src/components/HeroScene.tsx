"use client";

import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { MotionValue, useReducedMotion } from "framer-motion";
import * as THREE from "three";

/**
 * Hero 3D motif — a glowing, iridescent form suspended in space.
 * Placeholder for a fal.ai-generated organic model. Reads as "an object
 * with an inner life" — the technology-with-soul metaphor in 3D.
 *
 * Accepts an optional `progress` MotionValue<number> (0..1) from the
 * parent scroll container. When provided, camera parallax and object
 * transforms are driven by scroll position. Falls back to time-based
 * animation when absent.
 */

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

interface SoulProps {
  progress?: MotionValue<number>;
}

function Soul({ progress }: SoulProps) {
  const inner = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const outerRing = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const reducedMotion = useReducedMotion();

  useFrame((state) => {
    if (reducedMotion) return;

    const t = state.clock.elapsedTime;
    const p = progress?.get() ?? 0;
    const hasScroll = progress !== undefined;

    // Breathing pulse always active regardless of scroll
    const breathingPulse = 0.1 * Math.sin(t * 0.6);

    if (inner.current) {
      inner.current.rotation.x = t * 0.10;
      inner.current.rotation.y = t * 0.18;
      inner.current.position.y = Math.sin(t * 0.35) * 0.12;
      // Scroll-driven quarter-rotation on z
      inner.current.rotation.z = hasScroll ? lerp(0, Math.PI * 0.5, p) : 0;
    }

    if (ring.current) {
      ring.current.rotation.x = t * 0.06 + Math.PI / 6;
      ring.current.rotation.z = t * 0.09;
      // Scroll-driven ring scale lerp 2.6 → 3.2
      const ringScale = hasScroll ? lerp(2.6, 3.2, p) : 2.6;
      ring.current.scale.setScalar(ringScale);
    }

    if (outerRing.current) {
      outerRing.current.rotation.x = t * 0.03 + Math.PI / 4;
      outerRing.current.rotation.z = -t * 0.05;
    }

    if (matRef.current) {
      const baseEmissive = hasScroll ? lerp(0.3, 0.9, p) : 0.3;
      matRef.current.emissiveIntensity = baseEmissive + breathingPulse;
    }

    // Scroll-driven camera parallax
    if (hasScroll) {
      state.camera.position.z = lerp(4.2, 2.8, p);
      state.camera.rotation.y = lerp(0, 0.08, p);
    }
  });

  return (
    <>
      {/* Outer halo — depth plane, very faint */}
      <mesh ref={outerRing} scale={4.2}>
        <torusGeometry args={[1, 0.003, 12, 128]} />
        <meshBasicMaterial color="#E8A861" transparent opacity={0.12} toneMapped={false} />
      </mesh>

      {/* Inner halo ring — suggests orbit / sacred geometry */}
      <mesh ref={ring} scale={2.6}>
        <torusGeometry args={[1, 0.006, 16, 128]} />
        <meshBasicMaterial color="#E8A861" transparent opacity={0.45} toneMapped={false} />
      </mesh>

      {/* Core object */}
      <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.5}>
        <mesh ref={inner} scale={1.8}>
          <icosahedronGeometry args={[1, 2]} />
          <meshPhysicalMaterial
            ref={matRef}
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

interface ParticlesProps {
  progress?: MotionValue<number>;
}

function Particles({ progress }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const reducedMotion = useReducedMotion();

  const count = 60;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (reducedMotion) return;
    if (!pointsRef.current) return;

    const t = state.clock.elapsedTime;
    // Slow drift rotation
    pointsRef.current.rotation.y = t * 0.04;
    pointsRef.current.rotation.x = t * 0.02;

    // Subtle opacity boost with scroll
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    if (progress !== undefined) {
      const p = progress.get();
      mat.opacity = lerp(0.6, 0.9, p);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#E8A861"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface BloomControllerProps {
  progress?: MotionValue<number>;
}

function SceneContents({ progress }: BloomControllerProps) {
  const bloomRef = useRef<{ intensity: number } | null>(null);
  const reducedMotion = useReducedMotion();

  // We can't mutate Bloom intensity post-mount via ref easily,
  // so we set a static intensity. The bloom intensifies visually
  // due to emissive intensity increasing on scroll.
  // For a dynamic bloom we'd need a custom pass; skipping per perf budget.
  void bloomRef;
  void reducedMotion;

  return (
    <>
      <color attach="background" args={["#0A0E1A"]} />
      <fog attach="fog" args={["#0A0E1A", 5, 15]} />

      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 3, 5]} intensity={2.2} color="#E8A861" />
      <directionalLight position={[-4, -2, 2]} intensity={0.9} color="#7B6BDB" />
      <pointLight position={[0, 0, 3]} intensity={1.4} color="#E8A861" distance={8} />
      <pointLight position={[-3, 2, -2]} intensity={0.8} color="#7B6BDB" distance={8} />

      <Environment preset="night" background={false} />
      <Soul progress={progress} />
      <Particles progress={progress} />

      <EffectComposer>
        <Bloom intensity={1.6} luminanceThreshold={0.12} luminanceSmoothing={0.4} mipmapBlur />
        <Vignette offset={0.3} darkness={0.8} />
      </EffectComposer>
    </>
  );
}

export function HeroScene({ progress }: { progress?: MotionValue<number> }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      style={{ position: "absolute", inset: 0 }}
    >
      <Suspense fallback={null}>
        <SceneContents progress={progress} />
      </Suspense>
    </Canvas>
  );
}
