"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

/**
 * Hero 3D motif — placeholder organic form.
 *
 * Current: an icosahedron with subtle distortion + transmission material,
 * wrapped in warm rim light. Reads as "an object with an inner life" —
 * the technology-with-soul metaphor in 3D form.
 *
 * Swap this geometry with a fal.ai-generated GLB later via <Gltf/>.
 */

function Soul() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.08;
    ref.current.rotation.y = t * 0.15;
    ref.current.position.y = Math.sin(t * 0.4) * 0.08;
  });

  return (
    <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.4}>
      <mesh ref={ref} scale={1.3}>
        <icosahedronGeometry args={[1, 16]} />
        <MeshTransmissionMaterial
          samples={6}
          resolution={512}
          thickness={0.6}
          roughness={0.15}
          anisotropy={0.5}
          chromaticAberration={0.04}
          distortion={0.2}
          distortionScale={0.4}
          temporalDistortion={0.1}
          color="#7B6BDB"
          attenuationColor="#E8A861"
          attenuationDistance={0.4}
        />
      </mesh>
    </Float>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.4], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 3, 4]} intensity={1.6} color="#E8A861" />
        <directionalLight position={[-3, -2, -2]} intensity={0.6} color="#7B6BDB" />
        <pointLight position={[0, 0, 2]} intensity={1.2} color="#E8A861" distance={6} />
        <Environment preset="sunset" background={false} />
        <Soul />
        <EffectComposer>
          <Bloom intensity={0.8} luminanceThreshold={0.15} luminanceSmoothing={0.4} mipmapBlur />
          <Vignette offset={0.35} darkness={0.7} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
