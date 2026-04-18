"use client";

import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
  type MotionValue,
} from "framer-motion";
import * as THREE from "three";
import { useAmbient } from "@/components/audio/useAmbient";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ClosingSceneProps = {
  eyebrow: string;
  title: string;
  sub: string;
  children?: React.ReactNode;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function lerpVal(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

/** Muller sphere sampling — uniform random point on sphere surface of radius r */
function randomSpherePoint(r: number): [number, number, number] {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
  ];
}

// ─── Particles ───────────────────────────────────────────────────────────────

interface ParticlesProps {
  progress: MotionValue<number>;
}

function Particles({ progress }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const COUNT = 800;

  const { initial, target } = useMemo(() => {
    const init = new Float32Array(COUNT * 3);
    const tgt = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const [x, y, z] = randomSpherePoint(5);
      init[i * 3] = x;
      init[i * 3 + 1] = y;
      init[i * 3 + 2] = z;

      // Tight cluster around origin — tiny random offset
      const [tx, ty, tz] = randomSpherePoint(0.08);
      tgt[i * 3] = tx;
      tgt[i * 3 + 1] = ty;
      tgt[i * 3 + 2] = tz;
    }
    return { initial: init, target: tgt };
  }, []);

  // Working positions buffer (mutated every frame)
  const positions = useMemo(() => new Float32Array(COUNT * 3), []);

  useFrame(() => {
    const p = clamp01(progress.get());

    // Move each particle toward center
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = lerpVal(initial[i * 3], target[i * 3], p);
      positions[i * 3 + 1] = lerpVal(initial[i * 3 + 1], target[i * 3 + 1], p);
      positions[i * 3 + 2] = lerpVal(initial[i * 3 + 2], target[i * 3 + 2], p);
    }

    const pts = pointsRef.current;
    if (pts) {
      const geo = pts.geometry as THREE.BufferGeometry;
      const attr = geo.getAttribute("position") as THREE.BufferAttribute;
      attr.set(positions);
      attr.needsUpdate = true;
      // Slow global rotation for organic feel
      pts.rotation.y += 0.002;
    }

    // Core sphere: scale lerps 0 → 1 only after p > 0.6
    if (coreRef.current) {
      const coreP = clamp01((p - 0.6) / 0.4);
      const s = lerpVal(0, 1, coreP);
      coreRef.current.scale.setScalar(s);
    }
  });

  return (
    <>
      {/* Particle field */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#F1C98A"
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Central glowing core — appears when convergence is ~complete */}
      <mesh ref={coreRef} scale={0}>
        <sphereGeometry args={[0.18, 48, 48]} />
        <meshBasicMaterial color="#F5D98B" toneMapped={false} />
      </mesh>
    </>
  );
}

// ─── Scene contents ───────────────────────────────────────────────────────────

interface SceneContentsProps {
  progress: MotionValue<number>;
}

function SceneContents({ progress }: SceneContentsProps) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <Particles progress={progress} />
      <EffectComposer>
        <Bloom
          intensity={1.4}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.5}
          mipmapBlur
        />
        <Vignette offset={0.3} darkness={0.8} />
      </EffectComposer>
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ClosingScene({ eyebrow, title, sub, children }: ClosingSceneProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(sectionRef, { margin: "-25% 0px -25% 0px" });

  useAmbient({ frequency: 180, detune: 14, filterCutoff: 900, gain: 0.7, active: inView });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Text block animation
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.15], [24, 0]);

  // ── Reduced-motion fallback ──────────────────────────────────────────────
  if (reducedMotion) {
    return (
      <section className="relative border-t border-rule overflow-hidden">
        <div className="relative mx-auto max-w-5xl px-6 py-28 text-center md:py-40">
          <p className="font-mono text-xs uppercase tracking-[0.42em] text-whisper">
            {eyebrow}
          </p>
          <h2 className="mt-6 font-display text-5xl md:text-7xl text-paper">
            {title}
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg text-whisper md:text-xl">
            {sub}
          </p>
          {children && (
            <div className="mx-auto mt-10 max-w-xl">{children}</div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-rule overflow-hidden"
      style={{ height: "220vh" }}
    >
      {/* Sticky pinned frame */}
      <div className="sticky top-0 h-screen overflow-hidden bg-ink">
        {/* Three.js particle canvas — behind text */}
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
          style={{ position: "absolute", inset: 0, zIndex: 0 }}
        >
          <Suspense fallback={null}>
            <SceneContents progress={scrollYProgress} />
          </Suspense>
        </Canvas>

        {/* Foreground text */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="mx-auto max-w-5xl rounded-3xl border border-rule bg-mist/30 p-10 backdrop-blur-xl shadow-[0_20px_80px_rgba(212,145,61,0.18)] md:p-16"
          >
            <p className="font-mono text-xs uppercase tracking-[0.42em] text-whisper">
              {eyebrow}
            </p>

            <h2 className="mt-6 font-display leading-tight text-paper [font-size:clamp(3.5rem,8vw,7rem)]">
              {title}
            </h2>

            <p className="mx-auto mt-8 max-w-xl text-lg text-whisper md:text-xl">
              {sub}
            </p>

            {children && (
              <div className="mx-auto mt-10 max-w-xl">{children}</div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
