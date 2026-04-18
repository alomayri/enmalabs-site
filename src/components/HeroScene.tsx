"use client";

import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { MotionValue, useReducedMotion } from "framer-motion";
import * as THREE from "three";

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// ── PaintingPlane — the painterly image as a textured plane ─────────────────
// Cover scale: match viewport regardless of aspect. 1.1x margin leaves room
// for parallax drift without exposing edges.

function PaintingPlane() {
  const texture = useTexture("/hero-reference.png");
  const { viewport } = useThree();

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
  }, [texture]);

  const imgAspect = 1408 / 792;
  const vpAspect = viewport.width / viewport.height;
  const [w, h] = useMemo(() => {
    if (vpAspect > imgAspect) {
      const W = viewport.width * 1.1;
      return [W, W / imgAspect];
    }
    const H = viewport.height * 1.1;
    return [H * imgAspect, H];
  }, [viewport.width, viewport.height, vpAspect, imgAspect]);

  return (
    <mesh position={[0, 0, -1]}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

// ── DustMotes — drifting particles in front of the painting ─────────────────
// Low count so the image's own dust in the candle beam stays readable.

function DustMotes() {
  const pointsRef = useRef<THREE.Points>(null);
  const reducedMotion = useReducedMotion();
  const { viewport } = useThree();

  const positions = useMemo(() => {
    const count = 60;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * viewport.width * 1.3;
      arr[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 1.3;
      arr[i * 3 + 2] = Math.random() * 1.2;
    }
    return arr;
  }, [viewport.width, viewport.height]);

  useFrame(() => {
    if (reducedMotion || !pointsRef.current) return;
    pointsRef.current.rotation.y += 0.0006;
    pointsRef.current.rotation.x += 0.0002;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#F1C98A"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ── InteractiveGroup — pointer parallax + scroll dolly ─────────────────────

function InteractiveGroup({
  progress,
  children,
}: {
  progress?: MotionValue<number>;
  children: React.ReactNode;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      setPointer({ x, y });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion]);

  useFrame(() => {
    if (!groupRef.current) return;

    if (!reducedMotion) {
      targetRef.current.x = lerp(targetRef.current.x, -pointer.x * 0.18, 0.06);
      targetRef.current.y = lerp(targetRef.current.y, -pointer.y * 0.12, 0.06);
      groupRef.current.position.x = targetRef.current.x;
      groupRef.current.position.y = targetRef.current.y;
    }

    const p = progress?.get() ?? 0;
    const scale = lerp(1.0, 1.12, p);
    groupRef.current.scale.setScalar(scale);
  });

  return <group ref={groupRef}>{children}</group>;
}

// ── SceneContents ────────────────────────────────────────────────────────────

function SceneContents({ progress }: { progress?: MotionValue<number> }) {
  return (
    <>
      <color attach="background" args={["#0E0C0A"]} />

      <InteractiveGroup progress={progress}>
        <PaintingPlane />
        <DustMotes />
      </InteractiveGroup>

      <EffectComposer>
        <Bloom intensity={0.35} luminanceThreshold={0.72} luminanceSmoothing={0.25} mipmapBlur />
        <Vignette offset={0.35} darkness={0.45} />
      </EffectComposer>
    </>
  );
}

// ── HeroScene ────────────────────────────────────────────────────────────────

export function HeroScene({ progress }: { progress?: MotionValue<number> }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 40 }}
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
