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
// "Cover" scale: match viewport regardless of aspect. Margin (1.1) gives
// room for the parallax drift without exposing edges.

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

// ── CandleGlow — pulsing additive sphere at the candle position in the image
// Image candle is roughly at (x=0.92, y=0.30 from top). Converted to world
// coords relative to the viewport-sized plane. Flicker uses three offset sines
// to fake noise without a shader.

function CandleGlow() {
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const reducedMotion = useReducedMotion();
  const { viewport } = useThree();

  useFrame((state) => {
    if (reducedMotion) return;
    if (!coreRef.current || !haloRef.current) return;
    const t = state.clock.elapsedTime;
    const flicker =
      0.82 +
      0.12 * Math.sin(t * 6.1) +
      0.06 * Math.sin(t * 11.3) +
      0.04 * Math.sin(t * 17.7);
    const coreMat = coreRef.current.material as THREE.MeshBasicMaterial;
    const haloMat = haloRef.current.material as THREE.MeshBasicMaterial;
    coreMat.opacity = 0.55 * flicker;
    haloMat.opacity = 0.22 * flicker;
    const scale = 1 + 0.04 * (flicker - 1);
    coreRef.current.scale.setScalar(scale);
    haloRef.current.scale.setScalar(scale);
  });

  const candleX = (0.92 - 0.5) * viewport.width;
  const candleY = (0.5 - 0.30) * viewport.height;

  return (
    <group position={[candleX, candleY, 0.1]}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshBasicMaterial
          color="#FFCE8A"
          transparent
          opacity={0.55}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshBasicMaterial
          color="#D4913D"
          transparent
          opacity={0.22}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ── FlaskEmber — soft glow inside the painted flask (centered at ~x=0.68, y=0.55)
// Subtle; respects the painting's own light. Tiny pulse tied to scroll progress.

function FlaskEmber({ progress }: { progress?: MotionValue<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const reducedMotion = useReducedMotion();
  const { viewport } = useThree();

  useFrame((state) => {
    if (reducedMotion || !meshRef.current) return;
    const t = state.clock.elapsedTime;
    const p = progress?.get() ?? 0;
    const pulse = 1 + 0.06 * Math.sin(t * 1.3);
    const scrollScale = lerp(1.0, 1.25, p);
    meshRef.current.scale.setScalar(pulse * scrollScale);
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.18 + 0.06 * Math.sin(t * 0.9);
  });

  const x = (0.68 - 0.5) * viewport.width;
  const y = (0.5 - 0.55) * viewport.height;

  return (
    <mesh ref={meshRef} position={[x, y, 0.05]}>
      <sphereGeometry args={[0.22, 24, 24]} />
      <meshBasicMaterial
        color="#F1C98A"
        transparent
        opacity={0.22}
        toneMapped={false}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// ── DustMotes — drifting particles in front of the painting ─────────────────
// Keep the count low so the image's own dust in the candle beam stays readable.

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

// ── InteractiveGroup — owns pointer parallax + scroll dolly ─────────────────
// The whole scene lives inside this group so parallax and zoom apply uniformly.
// Target positions are lerped toward every frame for smooth tracking.

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
      // Parallax: plane shifts opposite to cursor for depth illusion.
      targetRef.current.x = lerp(targetRef.current.x, -pointer.x * 0.18, 0.06);
      targetRef.current.y = lerp(targetRef.current.y, -pointer.y * 0.12, 0.06);
      groupRef.current.position.x = targetRef.current.x;
      groupRef.current.position.y = targetRef.current.y;
    }

    // Scroll dolly — subtle zoom-in, scaled with scroll progress.
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
        <CandleGlow />
        <FlaskEmber progress={progress} />
        <DustMotes />
      </InteractiveGroup>

      <EffectComposer>
        <Bloom intensity={0.7} luminanceThreshold={0.6} luminanceSmoothing={0.2} mipmapBlur />
        <Vignette offset={0.35} darkness={0.55} />
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
