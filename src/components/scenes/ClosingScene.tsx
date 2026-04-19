"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import * as THREE from "three";
import { cx, layout, scene, surfaces, typography } from "@/lib/design-system";

export type ClosingSceneProps = {
  id?: string;
  eyebrow: string;
  title: string;
  sub: string;
  children?: React.ReactNode;
};

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function seededUnit(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function lerpVal(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function randomSpherePoint(seed: number, radius: number): [number, number, number] {
  const theta = seededUnit(seed) * Math.PI * 2;
  const phi = Math.acos(2 * seededUnit(seed + 1) - 1);
  return [
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi),
  ];
}

function randomVolumePoint(seed: number): [number, number, number] {
  return [
    (seededUnit(seed + 2) - 0.5) * 13,
    (seededUnit(seed + 3) - 0.5) * 7.5,
    (seededUnit(seed + 4) - 0.5) * 8,
  ];
}

function ParticleField({ progress }: { progress: MotionValue<number> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const COUNT = scene.closing.particleCount;

  const { initial, target } = useMemo(() => {
    const start = new Float32Array(COUNT * 3);
    const end = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const [x, y, z] = randomVolumePoint(i * 5 + 1);
      start[i * 3] = x;
      start[i * 3 + 1] = y;
      start[i * 3 + 2] = z;

      const [tx, ty, tz] = randomSpherePoint(i * 7 + 2, 1.4 + seededUnit(i * 11 + 3) * 0.55);
      end[i * 3] = tx;
      end[i * 3 + 1] = ty;
      end[i * 3 + 2] = tz;
    }

    return { initial: start, target: end };
  }, [COUNT]);

  useFrame((state) => {
    const points = pointsRef.current;
    const attribute = points?.geometry.getAttribute("position") as THREE.BufferAttribute | undefined;
    const positions = attribute?.array as Float32Array | undefined;

    if (!points || !attribute || !positions) return;

    const raw = progress.get();
    const converge = clamp01(
      (raw - scene.closing.convergenceStart) /
        (scene.closing.convergenceEnd - scene.closing.convergenceStart),
    );

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = lerpVal(initial[i * 3], target[i * 3], converge * 0.72);
      positions[i * 3 + 1] = lerpVal(initial[i * 3 + 1], target[i * 3 + 1], converge * 0.72);
      positions[i * 3 + 2] = lerpVal(initial[i * 3 + 2], target[i * 3 + 2], converge * 0.72);
    }

    attribute.needsUpdate = true;
    points.rotation.y += scene.closing.fieldRotationStep;
    points.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[initial.slice(), 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.032}
        color={scene.closingField}
        transparent
        opacity={0.72}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Embers({ progress }: { progress: MotionValue<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  const lanterns = useMemo(
    () =>
      Array.from({ length: scene.closing.emberCount }, (_, i) => ({
        position: randomVolumePoint(i * 9 + 40),
        size: 0.12 + seededUnit(i * 13 + 2) * 0.12,
        drift: 0.15 + seededUnit(i * 17 + 3) * 0.2,
        phase: seededUnit(i * 19 + 5) * Math.PI * 2,
      })),
    [],
  );

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    const raw = progress.get();
    const settle = clamp01(raw * 0.8);

    group.children.forEach((child, index) => {
      const mesh = child as THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
      const config = lanterns[index];
      const time = state.clock.elapsedTime;
      mesh.position.y =
        config.position[1] + Math.sin(time * config.drift + config.phase) * 0.18 * (1 - settle * 0.4);
      mesh.position.x = config.position[0] + Math.cos(time * 0.11 + config.phase) * 0.08;
      mesh.material.opacity = 0.28 + (Math.sin(time * 0.7 + config.phase) + 1) * 0.16;
    });
  });

  return (
    <group ref={groupRef}>
      {lanterns.map((lantern, index) => (
        <mesh key={`${lantern.position.join(":")}-${index}`} position={lantern.position}>
          <circleGeometry args={[lantern.size * 0.5, 24]} />
          <meshBasicMaterial
            color={scene.closingLantern}
            toneMapped={false}
            transparent
            opacity={0.36}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function CoreGlow({ progress }: { progress: MotionValue<number> }) {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const core = coreRef.current;
    if (!core) return;

    const raw = progress.get();
    const reveal = clamp01((raw - 0.48) / 0.4);
    const scale = 0.38 + reveal * 0.5;
    core.scale.setScalar(scale);
  });

  return (
    <mesh ref={coreRef} position={[0, -0.1, -0.8]}>
      <sphereGeometry args={[0.22, 48, 48]} />
      <meshBasicMaterial color={scene.closingCore} toneMapped={false} transparent opacity={0.12} />
    </mesh>
  );
}

function SceneContents({ progress }: { progress: MotionValue<number> }) {
  return (
    <>
      <ambientLight intensity={0.18} />
      <ParticleField progress={progress} />
      <Embers progress={progress} />
      <CoreGlow progress={progress} />
      <EffectComposer>
        <Bloom
          intensity={scene.closingBloom.intensity}
          luminanceThreshold={scene.closingBloom.threshold}
          luminanceSmoothing={scene.closingBloom.smoothing}
          mipmapBlur
        />
        <Vignette
          offset={scene.closingBloom.vignetteOffset}
          darkness={scene.closingBloom.vignetteDarkness}
        />
      </EffectComposer>
    </>
  );
}

export function ClosingScene({ id, eyebrow, title, sub, children }: ClosingSceneProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const panelOpacity = useTransform(
    scrollYProgress,
    [scene.closing.textRevealStart, scene.closing.textRevealEnd],
    [0.25, 1],
  );
  const panelY = useTransform(
    scrollYProgress,
    [scene.closing.textRevealStart, scene.closing.textRevealEnd],
    [scene.closing.panelLift, 0],
  );
  const panelScale = useTransform(scrollYProgress, [0, 0.4], [0.985, 1]);

  if (reducedMotion) {
    return (
      <section
        id={id}
        className="relative overflow-hidden border-t border-rule bg-[radial-gradient(ellipse_at_50%_22%,rgba(241,201,138,0.14),transparent_38%),linear-gradient(180deg,rgba(14,12,10,1)_0%,rgba(14,12,10,0.98)_100%)]"
      >
        <div className={cx(layout.narrative, layout.compactSectionSpace, "relative px-6 text-center")}>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-56 max-w-5xl bg-[radial-gradient(circle,rgba(241,201,138,0.08),transparent_64%)]"
          />
          <div
            className={cx(
              "relative mx-auto max-w-5xl",
              layout.panelPadLarge,
              surfaces.quietPanel,
              "bg-ink/78 shadow-[0_30px_120px_rgba(14,12,10,0.78)]",
            )}
          >
            <p className={typography.eyebrow}>{eyebrow}</p>
            <h2 className={cx("mt-6", typography.ctaTitle)}>{title}</h2>
            <p className={cx("mx-auto mt-8 max-w-2xl", typography.bodyLarge)}>{sub}</p>
            {children && <div className="mx-auto mt-10 max-w-xl">{children}</div>}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative overflow-hidden border-t border-rule"
      style={{ height: scene.closing.stageHeight }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-ink">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_50%_22%,rgba(241,201,138,0.08),transparent_38%),linear-gradient(180deg,rgba(14,12,10,0.16)_0%,rgba(14,12,10,0.64)_100%)]"
        />
        <Canvas
          camera={{ position: [0, 0, 6.5], fov: 42 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
          style={{ position: "absolute", inset: 0, zIndex: 0 }}
        >
          <Suspense fallback={null}>
            <SceneContents progress={scrollYProgress} />
          </Suspense>
        </Canvas>

        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <motion.div
            style={{ opacity: panelOpacity, y: panelY, scale: panelScale }}
            className={cx(
              "mx-auto w-full max-w-5xl text-center",
              layout.panelPadLarge,
              surfaces.quietPanel,
              "bg-ink/78 shadow-[0_30px_120px_rgba(14,12,10,0.78)]",
            )}
          >
            <p className={typography.eyebrow}>{eyebrow}</p>
            <h2 className={cx("mt-6", typography.ctaTitle)}>{title}</h2>
            <p className={cx("mx-auto mt-8 max-w-2xl", typography.bodyLarge)}>{sub}</p>
            {children && <div className="mx-auto mt-10 max-w-xl">{children}</div>}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
