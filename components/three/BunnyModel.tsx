"use client";

import { Suspense, useRef, useState, useEffect, Component, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// ─── Set to true once you've placed bunny.glb in /public/models/ ─────────────
// When false the procedural fallback bunny is shown immediately — no 404 fetch.
const HAS_BUNNY_GLB = false;
const BUNNY_GLB_PATH = "/models/bunny.glb";

// ─── Error Boundary ───────────────────────────────────────────────────────────
interface EBState { hasError: boolean }
class GLBErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  EBState
> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

// ─── Materials (created once, outside any component) ─────────────────────────
const roseMat = new THREE.MeshStandardMaterial({
  color: new THREE.Color("#FFB6C1"),
  roughness: 0.3,
  metalness: 0.15,
});
const pinkMat = new THREE.MeshStandardMaterial({
  color: new THREE.Color("#FF9EAD"),
  roughness: 0.4,
  metalness: 0.1,
});
const eyeMat  = new THREE.MeshStandardMaterial({ color: "#6B2C3A" });
const whiteMat = new THREE.MeshStandardMaterial({ color: "#ffffff" });

// ─── Procedural fallback bunny ────────────────────────────────────────────────
function FallbackBunny() {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.5;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointer.y * 0.2,
      0.05
    );
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.07;
  });

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh material={roseMat} position={[0, -0.3, 0]}>
        <sphereGeometry args={[0.55, 32, 32]} />
      </mesh>
      {/* Head */}
      <mesh material={roseMat} position={[0, 0.55, 0]}>
        <sphereGeometry args={[0.38, 32, 32]} />
      </mesh>
      {/* Left ear outer */}
      <mesh material={roseMat} position={[-0.2, 1.25, 0]} rotation={[0, 0, -0.25]}>
        <capsuleGeometry args={[0.1, 0.55, 8, 16]} />
      </mesh>
      {/* Left ear inner */}
      <mesh material={pinkMat} position={[-0.2, 1.25, 0.06]} rotation={[0, 0, -0.25]}>
        <capsuleGeometry args={[0.055, 0.38, 8, 16]} />
      </mesh>
      {/* Right ear outer */}
      <mesh material={roseMat} position={[0.2, 1.25, 0]} rotation={[0, 0, 0.25]}>
        <capsuleGeometry args={[0.1, 0.55, 8, 16]} />
      </mesh>
      {/* Right ear inner */}
      <mesh material={pinkMat} position={[0.2, 1.25, 0.06]} rotation={[0, 0, 0.25]}>
        <capsuleGeometry args={[0.055, 0.38, 8, 16]} />
      </mesh>
      {/* Eyes */}
      <mesh material={eyeMat} position={[-0.14, 0.62, 0.33]}>
        <sphereGeometry args={[0.07, 16, 16]} />
      </mesh>
      <mesh material={whiteMat} position={[-0.115, 0.638, 0.388]}>
        <sphereGeometry args={[0.025, 8, 8]} />
      </mesh>
      <mesh material={eyeMat} position={[0.14, 0.62, 0.33]}>
        <sphereGeometry args={[0.07, 16, 16]} />
      </mesh>
      <mesh material={whiteMat} position={[0.165, 0.638, 0.388]}>
        <sphereGeometry args={[0.025, 8, 8]} />
      </mesh>
      {/* Nose */}
      <mesh material={pinkMat} position={[0, 0.51, 0.36]}>
        <sphereGeometry args={[0.045, 16, 16]} />
      </mesh>
      {/* Tail */}
      <mesh material={roseMat} position={[0, -0.55, -0.45]}>
        <sphereGeometry args={[0.18, 16, 16]} />
      </mesh>
      {/* Arms */}
      <mesh material={roseMat} position={[-0.62, -0.1, 0]} rotation={[0, 0, 0.5]}>
        <capsuleGeometry args={[0.1, 0.3, 8, 16]} />
      </mesh>
      <mesh material={roseMat} position={[0.62, -0.1, 0]} rotation={[0, 0, -0.5]}>
        <capsuleGeometry args={[0.1, 0.3, 8, 16]} />
      </mesh>
      {/* Feet */}
      <mesh material={roseMat} position={[-0.25, -0.82, 0.2]} rotation={[0.3, 0, 0]}>
        <capsuleGeometry args={[0.12, 0.25, 8, 16]} />
      </mesh>
      <mesh material={roseMat} position={[0.25, -0.82, 0.2]} rotation={[0.3, 0, 0]}>
        <capsuleGeometry args={[0.12, 0.25, 8, 16]} />
      </mesh>
    </group>
  );
}

// ─── GLB loader ───────────────────────────────────────────────────────────────
function BunnyMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(BUNNY_GLB_PATH);
  const { pointer } = useThree();
  const cloned = scene.clone(true);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.4;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointer.y * 0.25,
      0.05
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      pointer.x * 0.15,
      0.05
    );
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
  });

  return (
    <group ref={groupRef} scale={1.8} position={[0, -0.8, 0]}>
      <primitive object={cloned} />
    </group>
  );
}

// ─── Scene with error + suspense boundaries ───────────────────────────────────
function BunnyScene() {
  // Skip the network request entirely when no GLB has been provided yet.
  if (!HAS_BUNNY_GLB) {
    return <FallbackBunny />;
  }
  return (
    <GLBErrorBoundary fallback={<FallbackBunny />}>
      <Suspense fallback={<FallbackBunny />}>
        <BunnyMesh />
      </Suspense>
    </GLBErrorBoundary>
  );
}

// ─── Exported canvas ─────────────────────────────────────────────────────────
// The `mounted` guard ensures the Canvas is NEVER rendered on the server or
// during SSR hydration — only after the client has fully mounted.
export default function BunnyCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Only preload when the file actually exists to avoid 404 errors
    if (HAS_BUNNY_GLB && typeof window !== "undefined") {
      useGLTF.preload(BUNNY_GLB_PATH);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[420px] md:h-[480px] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-pink-blush/40 border-t-rose-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-[420px] md:h-[480px] cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0.5, 3.5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.8} color="#FFD6E0" />
        <directionalLight
          position={[3, 5, 3]}
          intensity={1.5}
          color="#FFF3E8"
          castShadow
        />
        <pointLight position={[-3, 2, 2]} intensity={0.8} color="#FFB6C1" />
        <pointLight position={[0, -2, 3]} intensity={0.5} color="#F0C060" />

        <BunnyScene />

        <ContactShadows
          position={[0, -1.3, 0]}
          opacity={0.25}
          scale={4}
          blur={2}
          color="#B76E79"
        />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.6}
          minPolarAngle={Math.PI / 3}
          dampingFactor={0.08}
          enableDamping
        />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}
