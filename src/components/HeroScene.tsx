"use client";

import { useRef, useMemo, Suspense, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Billboard } from "@react-three/drei";
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
    const arr = new Float32Array(220 * 3);
    for (let i = 0; i < 220; i++) {
      const azimuth = (Math.random() * 2 - 1) * Math.PI;
      const elevation = -0.1 + Math.random() * 1.0;
      const radius = 8 + Math.random() * 6;
      arr[i * 3] = radius * Math.cos(elevation) * Math.cos(azimuth);
      arr[i * 3 + 1] = radius * Math.sin(elevation);
      arr[i * 3 + 2] = radius * Math.cos(elevation) * Math.sin(azimuth) - 4;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (reducedMotion) return;
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = 0.6 + Math.sin(t * 0.8) * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#EDEAF5"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ── ForegroundFlora ──

function FloraLeaf({
  x,
  y,
  z,
  index,
  alphaMap,
}: {
  x: number;
  y: number;
  z: number;
  index: number;
  alphaMap: THREE.CanvasTexture;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const reducedMotion = useReducedMotion();
  const scaleX = 0.25 + Math.random() * 0.2;
  const scaleY = 0.6 + Math.random() * 0.5;

  useFrame((state) => {
    if (reducedMotion) return;
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.z = Math.sin(t * 0.6 + index) * 0.04;
  });

  return (
    <Billboard follow={false} lockX lockY>
      <mesh ref={meshRef} position={[x, y, z]} scale={[scaleX, scaleY, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#0B0D2A"
          transparent
          opacity={0.92}
          alphaMap={alphaMap}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Billboard>
  );
}

function ForegroundFlora() {
  const alphaMap = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(32, 52, 2, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.55, "rgba(255,255,255,0.7)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(32, 4);
    ctx.bezierCurveTo(50, 10, 58, 30, 50, 52);
    ctx.bezierCurveTo(42, 64, 22, 64, 14, 52);
    ctx.bezierCurveTo(6, 30, 14, 10, 32, 4);
    ctx.closePath();
    ctx.fill();
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  const leaves = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      x: -4 + Math.random() * 8,
      y: -1.6 + Math.random() * 0.3,
      z: 1.2 + Math.random() * 1.2,
      index: i,
    }));
  }, []);

  return (
    <>
      {leaves.map((leaf, i) => (
        <FloraLeaf key={i} {...leaf} alphaMap={alphaMap} />
      ))}
    </>
  );
}

// ── DustMotes ──

function DustMotes() {
  const pointsRef = useRef<THREE.Points>(null);
  const reducedMotion = useReducedMotion();

  const positions = useMemo(() => {
    const arr = new Float32Array(70 * 3);
    for (let i = 0; i < 70; i++) {
      const r = 0.4 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) + 0.15;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(() => {
    if (reducedMotion) return;
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.002;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#B8BAFF"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ── Wing ──

interface WingProps {
  side: 1 | -1;
  upper: boolean;
  pivotRef: RefObject<THREE.Group | null>;
  alphaMap: THREE.CanvasTexture;
}

function Wing({ side, upper, pivotRef, alphaMap }: WingProps) {
  const posY = upper ? 0.1 : -0.15;
  const posX = side * (upper ? 0.3 : 0.22);
  const baseRotZ = side * (upper ? 0.2 : 0.15);
  const scaleX = upper ? 0.65 : 0.5;
  const scaleY = upper ? 0.5 : 0.38;

  return (
    <group ref={pivotRef} position={[side * 0.02, 0, 0]}>
      <mesh
        position={[posX, posY, 0]}
        rotation={[0, 0, baseRotZ]}
        scale={[scaleX, scaleY, 1]}
      >
        <planeGeometry args={[1, 1]} />
        <meshPhysicalMaterial
          color="#8C52FF"
          emissive="#B8BAFF"
          emissiveIntensity={0.55}
          transparent
          opacity={0.72}
          roughness={0.25}
          metalness={0.1}
          side={THREE.DoubleSide}
          toneMapped={false}
          depthWrite={false}
          alphaMap={alphaMap}
        />
      </mesh>
    </group>
  );
}

// ── LuminousMoth ──

function LuminousMoth({ progress }: { progress?: MotionValue<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const ulPivot = useRef<THREE.Group>(null);
  const urPivot = useRef<THREE.Group>(null);
  const llPivot = useRef<THREE.Group>(null);
  const lrPivot = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();
  const { camera } = useThree();

  const wingAlpha = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.6, "rgba(255,255,255,0.6)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = progress?.get() ?? 0;
    const hasScroll = progress !== undefined;

    if (reducedMotion) {
      // Static mid-flap pose
      if (ulPivot.current) ulPivot.current.rotation.y = -0.45;
      if (urPivot.current) urPivot.current.rotation.y = 0.45;
      if (llPivot.current) llPivot.current.rotation.y = -0.35;
      if (lrPivot.current) lrPivot.current.rotation.y = 0.35;
      return;
    }

    const flap = Math.sin(t * 4.2);

    if (ulPivot.current) ulPivot.current.rotation.y = -flap * 0.9;
    if (urPivot.current) urPivot.current.rotation.y = flap * 0.9;
    if (llPivot.current) llPivot.current.rotation.y = -flap * 0.7 + 0.1;
    if (lrPivot.current) lrPivot.current.rotation.y = flap * 0.7 - 0.1;

    if (bodyRef.current) {
      const pulse = 1 + 0.04 * Math.sin(t * 1.2);
      bodyRef.current.scale.set(pulse, 2.2 * pulse, pulse);
    }

    if (groupRef.current) {
      groupRef.current.position.y = 0.15 + Math.sin(t * 0.4) * 0.08;
      groupRef.current.rotation.z = Math.sin(t * 0.25) * 0.03;
      if (hasScroll) {
        groupRef.current.rotation.y = lerp(0, Math.PI * 0.25, p);
      }
    }

    if (hasScroll) {
      camera.position.z = lerp(4.8, 3.2, p);
      camera.position.y = lerp(0.3, 0.8, p);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.15, 0]}>
      {/* Body */}
      <mesh ref={bodyRef} scale={[1, 2.2, 1]} /* initial stretch; updated each frame */>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshPhysicalMaterial
          color="#2A2455"
          emissive="#B8BAFF"
          emissiveIntensity={0.35}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Wings — upper */}
      <Wing side={-1} upper pivotRef={ulPivot} alphaMap={wingAlpha} />
      <Wing side={1} upper pivotRef={urPivot} alphaMap={wingAlpha} />

      {/* Wings — lower */}
      <Wing side={-1} upper={false} pivotRef={llPivot} alphaMap={wingAlpha} />
      <Wing side={1} upper={false} pivotRef={lrPivot} alphaMap={wingAlpha} />
    </group>
  );
}

// ── SideCreatures ──

function MiniMoth({
  startX,
  startY,
  z,
  phaseOffset,
}: {
  startX: number;
  startY: number;
  z: number;
  phaseOffset: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const ulPivot = useRef<THREE.Group>(null);
  const urPivot = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();

  const wingAlpha = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(32, 32, 2, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.6, "rgba(255,255,255,0.5)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime + phaseOffset;

    groupRef.current.position.x = startX + Math.sin(t * 0.15) * 0.3;
    groupRef.current.position.y = startY + Math.sin(t * 0.22) * 0.2;

    if (reducedMotion) return;
    const flap = Math.sin(t * 3.5);
    if (ulPivot.current) ulPivot.current.rotation.y = -flap * 0.8;
    if (urPivot.current) urPivot.current.rotation.y = flap * 0.8;
  });

  return (
    <group ref={groupRef} position={[startX, startY, z]} scale={0.3}>
      <mesh scale={[1, 2.2, 1]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshPhysicalMaterial
          color="#2A2455"
          emissive="#B8BAFF"
          emissiveIntensity={0.4}
          metalness={0.2}
          roughness={0.5}
        />
      </mesh>
      <group ref={ulPivot} position={[-0.02, 0, 0]}>
        <mesh position={[-0.3, 0.1, 0]} rotation={[0, 0, -0.2]} scale={[0.65, 0.5, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshPhysicalMaterial
            color="#8C52FF"
            emissive="#B8BAFF"
            emissiveIntensity={0.55}
            transparent
            opacity={0.65}
            roughness={0.3}
            metalness={0.1}
            side={THREE.DoubleSide}
            toneMapped={false}
            depthWrite={false}
            alphaMap={wingAlpha}
          />
        </mesh>
      </group>
      <group ref={urPivot} position={[0.02, 0, 0]}>
        <mesh position={[0.3, 0.1, 0]} rotation={[0, 0, 0.2]} scale={[0.65, 0.5, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshPhysicalMaterial
            color="#8C52FF"
            emissive="#B8BAFF"
            emissiveIntensity={0.55}
            transparent
            opacity={0.65}
            roughness={0.3}
            metalness={0.1}
            side={THREE.DoubleSide}
            toneMapped={false}
            depthWrite={false}
            alphaMap={wingAlpha}
          />
        </mesh>
      </group>
    </group>
  );
}

function SideCreatures() {
  return (
    <>
      <MiniMoth startX={-3.2} startY={0.5} z={-0.5} phaseOffset={0} />
      <MiniMoth startX={3.4} startY={0.7} z={-0.3} phaseOffset={2.7} />
    </>
  );
}

// ── SceneContents ──

function SceneContents({ progress }: { progress?: MotionValue<number> }) {
  return (
    <>
      <color attach="background" args={["#0B0D2A"]} />
      <fog attach="fog" args={["#0B0D2A", 6, 18]} />

      <ambientLight intensity={0.25} color="#1E2242" />
      <pointLight
        position={[0, 0.2, 2]}
        intensity={2.4}
        color="#B8BAFF"
        distance={8}
        decay={2}
      />
      <pointLight
        position={[-2, 1, -1]}
        intensity={1.4}
        color="#8C52FF"
        distance={7}
        decay={2}
      />
      <directionalLight position={[2, 3, 4]} intensity={0.9} color="#E8A861" />

      <StarField />
      <ForegroundFlora />
      <SideCreatures />
      <LuminousMoth progress={progress} />
      <DustMotes />

      <EffectComposer>
        <Bloom intensity={1.8} luminanceThreshold={0.15} luminanceSmoothing={0.4} mipmapBlur />
        <Vignette offset={0.25} darkness={0.8} />
      </EffectComposer>
    </>
  );
}

// ── HeroScene ──

export function HeroScene({ progress }: { progress?: MotionValue<number> }) {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 4.8], fov: 38 }}
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
