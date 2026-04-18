"use client";

import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
  MotionValue,
} from "framer-motion";
import * as THREE from "three";
import { useAmbient } from "@/components/audio/useAmbient";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BalsamApp = {
  name: string;
  platform: string;
  kind: string;
  tagline: string;
  description: string;
  status: "In development" | "Private beta" | "Concept";
};

export type BalsamSceneProps = {
  eyebrow: string;
  heading: string;
  app: BalsamApp;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// ─── Screen CanvasTexture ─────────────────────────────────────────────────────

function useScreenTexture(): THREE.CanvasTexture {
  return useMemo(() => {
    const cvs = document.createElement("canvas");
    cvs.width = 512;
    cvs.height = 1024;
    const ctx = cvs.getContext("2d")!;
    const g = ctx.createRadialGradient(256, 512, 30, 256, 512, 500);
    g.addColorStop(0, "#F5D98B");
    g.addColorStop(0.4, "#E8A861");
    g.addColorStop(1, "#0A0E1A");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 1024);
    return new THREE.CanvasTexture(cvs);
  }, []);
}

// ─── Phone 3D model ───────────────────────────────────────────────────────────

interface PhoneModelProps {
  scrollYProgress: MotionValue<number>;
}

function PhoneModel({ scrollYProgress }: PhoneModelProps) {
  const phoneRef = useRef<THREE.Group>(null);
  const breathRef = useRef<THREE.Mesh>(null);
  const texture = useScreenTexture();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = scrollYProgress.get();

    if (phoneRef.current) {
      // Rotate y: lerp from -0.4 → +0.4 based on scroll progress
      phoneRef.current.rotation.y = lerp(-0.4, 0.4, p);
      // Small bob on x
      phoneRef.current.rotation.x = Math.sin(t * 0.55) * 0.04;
      // Scale: 0.95 → 1.05 as p goes 0 → 1
      const s = lerp(0.95, 1.05, p);
      phoneRef.current.scale.setScalar(s);
    }

    if (breathRef.current) {
      // Breathing motif: pulsing circle
      const pulse = 1 + 0.06 * Math.sin(t * 1.6);
      breathRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={phoneRef}>
      {/* Phone body */}
      <RoundedBox
        args={[1.6, 3.4, 0.25]}
        radius={0.18}
        smoothness={6}
      >
        <meshPhysicalMaterial
          color="#0A0E1A"
          metalness={0.7}
          roughness={0.25}
          clearcoat={1}
        />
      </RoundedBox>

      {/* Screen plane — slightly in front */}
      <mesh position={[0, 0, 0.14]}>
        <planeGeometry args={[1.45, 3.2]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Breathing center circle — on top of screen */}
      <mesh ref={breathRef} position={[0, 0, 0.15]}>
        <circleGeometry args={[0.18, 40]} />
        <meshBasicMaterial
          color="#F5D98B"
          transparent
          opacity={0.55}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// ─── Three.js Scene Contents ──────────────────────────────────────────────────

interface SceneContentsProps {
  scrollYProgress: MotionValue<number>;
}

function SceneContents({ scrollYProgress }: SceneContentsProps) {
  return (
    <>
      <ambientLight intensity={0.35} color="#1A1A2A" />
      <directionalLight position={[3, 4, 5]} intensity={1.4} color="#E8A861" />
      <pointLight position={[-2, 1, 3]} intensity={0.8} color="#7B6BDB" />

      <Suspense fallback={null}>
        <PhoneModel scrollYProgress={scrollYProgress} />
      </Suspense>

      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.6}
          mipmapBlur
        />
        <Vignette offset={0.25} darkness={0.7} />
      </EffectComposer>
    </>
  );
}

// ─── CSS-only phone fallback (reduced motion) ─────────────────────────────────

function CSSPhone() {
  return (
    <div
      aria-hidden
      className="mx-auto"
      style={{
        width: "160px",
        height: "340px",
        borderRadius: "22px",
        background:
          "radial-gradient(ellipse at 50% 60%, #F5D98B 0%, #E8A861 30%, #0A0E1A 85%)",
        border: "1px solid #1F2435",
        boxShadow: "0 0 40px rgba(232,168,97,0.12)",
        position: "relative",
      }}
    >
      {/* Breathing dot representation */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "rgba(245,217,139,0.5)",
        }}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function BalsamScene({ eyebrow, heading, app }: BalsamSceneProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(sectionRef, { margin: "-25% 0px -25% 0px" });

  useAmbient({ frequency: 140, detune: 10, filterCutoff: 720, gain: 0.5, active: inView });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Text block fades in on scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.15], [24, 0]);

  // Floating labels parallax
  const topLabelY = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const bottomLabelY = useTransform(scrollYProgress, [0, 1], [0, 16]);

  // ── Reduced-motion fallback ────────────────────────────────────────────────
  if (reducedMotion) {
    return (
      <section className="border-t border-rule bg-mist-soft/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Eyebrow */}
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.42em] text-whisper">
            {eyebrow}
          </p>

          {/* Heading */}
          <h2 className="font-display text-5xl leading-tight tracking-tight text-paper">
            {heading}
          </h2>

          {/* Two-column layout */}
          <div className="mt-12 grid gap-12 md:grid-cols-[1fr_1.2fr]">
            {/* Left: text */}
            <div className="space-y-6">
              <h3 className="font-display text-3xl text-paper">{app.name}</h3>

              {/* Meta */}
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-rule bg-mist px-3 py-1 font-mono text-xs text-whisper">
                  {app.platform}
                </span>
                <span className="rounded-full border border-rule bg-mist px-3 py-1 font-mono text-xs text-whisper">
                  {app.kind}
                </span>
                <span className="rounded-full border border-rule bg-mist px-3 py-1 font-mono text-xs text-positive">
                  {app.status}
                </span>
              </div>

              <p className="font-display text-xl italic text-ember">
                {app.tagline}
              </p>
              <p className="text-whisper">{app.description}</p>

              {/* Detail list */}
              <dl className="space-y-1 font-mono text-xs text-whisper">
                <div className="flex gap-2">
                  <dt className="text-paper/50">Platform</dt>
                  <dd>{app.platform}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-paper/50">Kind</dt>
                  <dd>{app.kind}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-paper/50">Status</dt>
                  <dd className="text-positive">{app.status}</dd>
                </div>
              </dl>
            </div>

            {/* Right: CSS phone */}
            <div className="flex flex-col items-center justify-center gap-6">
              {/* Top floating label */}
              <div className="w-full max-w-xs">
                <div className="h-px bg-gradient-to-r from-transparent via-ember to-transparent" />
                <div className="mt-2 inline-flex rounded-full border border-rule bg-ink/60 px-4 py-2 backdrop-blur-md">
                  <span className="font-mono text-xs text-whisper">
                    Tonight&#39;s session — 38 min
                  </span>
                </div>
              </div>

              <CSSPhone />

              {/* Bottom floating label */}
              <div className="inline-flex rounded-full border border-rule bg-ink/60 px-4 py-2 backdrop-blur-md">
                <span className="font-mono text-xs text-whisper">
                  Since Tuesday — 4 sessions
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Full animated layout ───────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      className="relative border-t border-rule bg-mist-soft/30"
      style={{ height: "250vh" }}
    >
      {/* Sticky 100vh pinned frame */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Ambient radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(232,168,97,0.07),transparent_55%)]"
        />

        {/* Two-column grid */}
        <div className="relative z-10 grid h-full md:grid-cols-[1fr_1.2fr]">
          {/* ── LEFT: Text content ── */}
          <div className="flex flex-col justify-center px-8 md:px-14">
            <motion.div
              style={{ opacity: textOpacity, y: textY }}
              className="space-y-5"
            >
              {/* Eyebrow */}
              <p className="font-mono text-xs uppercase tracking-[0.42em] text-whisper">
                {eyebrow}
              </p>

              {/* Section heading */}
              <h2 className="font-display text-4xl leading-tight tracking-tight text-paper md:text-5xl">
                {heading}
              </h2>

              {/* App name */}
              <h3 className="font-display text-2xl text-paper md:text-3xl">
                {app.name}
              </h3>

              {/* Meta pills */}
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-rule bg-mist px-3 py-1 font-mono text-xs text-whisper">
                  {app.platform}
                </span>
                <span className="rounded-full border border-rule bg-mist px-3 py-1 font-mono text-xs text-whisper">
                  {app.kind}
                </span>
                <span className="rounded-full border border-rule bg-mist px-3 py-1 font-mono text-xs text-positive">
                  {app.status}
                </span>
              </div>

              {/* Tagline */}
              <p className="font-display text-xl italic text-ember">
                {app.tagline}
              </p>

              {/* Description */}
              <p className="max-w-prose text-whisper">{app.description}</p>

              {/* Detail list */}
              <dl className="space-y-1 border-t border-rule pt-4 font-mono text-xs text-whisper">
                <div className="flex items-center gap-3">
                  <dt className="w-16 text-paper/40">Platform</dt>
                  <dd>{app.platform}</dd>
                </div>
                <div className="flex items-center gap-3">
                  <dt className="w-16 text-paper/40">Kind</dt>
                  <dd>{app.kind}</dd>
                </div>
                <div className="flex items-center gap-3">
                  <dt className="w-16 text-paper/40">Status</dt>
                  <dd className="text-positive">{app.status}</dd>
                </div>
              </dl>
            </motion.div>
          </div>

          {/* ── RIGHT: 3D Canvas + floating labels ── */}
          <div className="relative flex items-center justify-center">
            {/* Top-right floating "dashboard glass" label */}
            <motion.div
              style={{ y: topLabelY }}
              className="absolute right-6 top-8 z-20 flex flex-col items-end gap-1"
            >
              {/* Ember glow line above */}
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-ember to-transparent" />
              <div className="rounded-full border border-rule bg-ink/60 px-4 py-2 backdrop-blur-md">
                <span className="font-mono text-xs text-whisper">
                  Tonight&#39;s session — 38 min
                </span>
              </div>
            </motion.div>

            {/* Three.js canvas — absolutely fills right column */}
            <Canvas
              camera={{ position: [0, 0, 6], fov: 38 }}
              gl={{ alpha: true, antialias: true }}
              dpr={[1, 2]}
              style={{ position: "absolute", inset: 0 }}
            >
              <Suspense fallback={null}>
                <SceneContents scrollYProgress={scrollYProgress} />
              </Suspense>
            </Canvas>

            {/* Bottom floating "dashboard glass" label */}
            <motion.div
              style={{ y: bottomLabelY }}
              className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2"
            >
              <div className="rounded-full border border-rule bg-ink/60 px-4 py-2 backdrop-blur-md">
                <span className="font-mono text-xs text-whisper">
                  Since Tuesday — 4 sessions
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
