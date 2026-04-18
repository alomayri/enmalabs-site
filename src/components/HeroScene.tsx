"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { MotionValue, useReducedMotion } from "framer-motion";
import * as THREE from "three";

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// ── StarField ──

function StarField() {
  const pointsRef = useRef<THREE.Points>(null);
  const reducedMotion = useReducedMotion();

  const positions = useMemo(() => {
    const arr = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      const azimuth = Math.random() * Math.PI * 2;
      const elevation = Math.acos(2 * Math.random() - 1);
      const radius = 8 + Math.random() * 5;
      arr[i * 3] = radius * Math.sin(elevation) * Math.cos(azimuth);
      arr[i * 3 + 1] = radius * Math.cos(elevation);
      arr[i * 3 + 2] = radius * Math.sin(elevation) * Math.sin(azimuth);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (reducedMotion) return;
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = 0.45 + Math.sin(t * 0.6) * 0.12;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.01}
        color="#F5EDDB"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ── OuroborosRing ──

function OuroborosRing() {
  const ringRef = useRef<THREE.Mesh>(null);
  const reducedMotion = useReducedMotion();

  useFrame((state) => {
    if (reducedMotion) return;
    if (!ringRef.current) return;
    const t = state.clock.elapsedTime;
    ringRef.current.rotation.z = t * 0.08;
  });

  return (
    <mesh ref={ringRef} position={[1.2, 0, 0]} scale={1.8} rotation={[Math.PI / 3, 0, 0]}>
      <torusGeometry args={[1, 0.004, 12, 160]} />
      <meshBasicMaterial
        color="#D4913D"
        transparent
        opacity={0.55}
        toneMapped={false}
      />
    </mesh>
  );
}

// ── DustMotes ──

function DustMotes() {
  const pointsRef = useRef<THREE.Points>(null);
  const reducedMotion = useReducedMotion();

  const positions = useMemo(() => {
    const arr = new Float32Array(80 * 3);
    for (let i = 0; i < 80; i++) {
      const r = 1.5 + Math.random() * 2.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(() => {
    if (reducedMotion) return;
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.0015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#D4913D"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ── Ember (glowing vapor inside the vessel) ──

function Ember({ progress }: { progress?: MotionValue<number> }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const reducedMotion = useReducedMotion();

  useFrame((state) => {
    if (reducedMotion) return;
    if (!coreRef.current) return;
    const t = state.clock.elapsedTime;
    const p = progress?.get() ?? 0;
    const pulse = 1 + 0.08 * Math.sin(t * 1.1);
    const scrollScale = lerp(1.0, 1.4, p);
    coreRef.current.scale.setScalar(pulse * scrollScale);
  });

  return (
    <group position={[0, -0.3, 0]}>
      {/* Core bright sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.18, 48, 48]} />
        <meshBasicMaterial color="#F1C98A" toneMapped={false} />
      </mesh>
      {/* Mid halo */}
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial
          color="#D4913D"
          transparent
          opacity={0.25}
          toneMapped={false}
        />
      </mesh>
      {/* Outer diffuse halo */}
      <mesh>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshBasicMaterial
          color="#8A3C24"
          transparent
          opacity={0.12}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// ── Vessel (alembic / cucurbit) — owns scroll parallax ──

function Vessel({ progress }: { progress?: MotionValue<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();

  useFrame((state) => {
    if (reducedMotion) return;
    const p = progress?.get() ?? 0;

    if (groupRef.current) {
      groupRef.current.rotation.y = lerp(0, Math.PI * 0.3, p);
    }

    // Camera parallax
    const cam = state.camera;
    cam.position.y = lerp(-0.3, 0.4, p);
    cam.position.z = lerp(4.6, 3.4, p);
  });

  // Shared glass material — meshPhysicalMaterial with transmission for refractive glass
  const glassMaterial = (
    <meshPhysicalMaterial
      color="#221C17"
      metalness={0.05}
      roughness={0.05}
      transmission={0.92}
      thickness={0.6}
      ior={1.45}
      clearcoat={1}
      clearcoatRoughness={0.08}
      attenuationColor="#8A3C24"
      attenuationDistance={1.2}
      transparent
      opacity={0.9}
    />
  );

  return (
    <group ref={groupRef} position={[1.2, 0, 0]}>
      {/* Round-bottom flask body */}
      <mesh position={[0, -0.4, 0]}>
        <sphereGeometry args={[0.55, 48, 48]} />
        {glassMaterial}
      </mesh>

      {/* Neck — open-ended cylinder */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 0.5, 32, 1, true]} />
        {glassMaterial}
      </mesh>

      {/* Top cap — upper hemisphere only */}
      <mesh position={[0, 0.52, 0]}>
        <sphereGeometry
          args={[0.13, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]}
        />
        {glassMaterial}
      </mesh>

      {/* Ember inside the vessel */}
      <Ember progress={progress} />
    </group>
  );
}

// ── SceneContents ──

function SceneContents({ progress }: { progress?: MotionValue<number> }) {
  return (
    <>
      <color attach="background" args={["#0E0C0A"]} />
      <fog attach="fog" args={["#0E0C0A", 5, 14]} />

      {/* Ambient */}
      <ambientLight intensity={0.2} color="#221C17" />

      {/* Main warm lamp — slightly from above, in front, tracking the vessel */}
      <pointLight
        position={[1.2, 0.8, 2]}
        intensity={3.6}
        color="#D4913D"
        distance={8}
        decay={2}
      />

      {/* Oxblood rim — darker edge from behind-left */}
      <pointLight
        position={[-0.4, -0.4, -1]}
        intensity={0.9}
        color="#8A3C24"
        distance={6}
        decay={2}
      />

      {/* Pale-gold fill */}
      <pointLight
        position={[2.4, 0.2, 2]}
        intensity={0.6}
        color="#F1C98A"
        distance={6}
        decay={2}
      />

      <StarField />
      <Vessel progress={progress} />
      <OuroborosRing />
      <DustMotes />

      <EffectComposer>
        <Bloom intensity={1.6} luminanceThreshold={0.2} mipmapBlur />
        <Vignette offset={0.25} darkness={0.8} />
      </EffectComposer>
    </>
  );
}

// ── HeroScene ──

export function HeroScene({ progress }: { progress?: MotionValue<number> }) {
  return (
    <Canvas
      camera={{ position: [0, -0.3, 4.6], fov: 40 }}
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
