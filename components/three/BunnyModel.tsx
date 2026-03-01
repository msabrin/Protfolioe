"use client";

import { Suspense, useRef, useState, useEffect, useMemo, Component, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows, Bounds } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { THEME_CONFIG } from "@/components/global/ThemeConfig";

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
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

// ─── Light-mode materials (pink bunny) ───────────────────────────────────────
const roseMat  = new THREE.MeshStandardMaterial({ color: "#FFB6C1", roughness: 0.3, metalness: 0.15 });
const pinkMat  = new THREE.MeshStandardMaterial({ color: "#FF9EAD", roughness: 0.4, metalness: 0.1  });
const eyeMat   = new THREE.MeshStandardMaterial({ color: "#6B2C3A" });
const whiteMat = new THREE.MeshStandardMaterial({ color: "#ffffff"  });

// ─── Dark-mode materials ──────────────────────────────────────────────────────
const dkBodyMat = new THREE.MeshStandardMaterial({
  color: "#110008", roughness: 0.7, metalness: 0.4,
  emissive: new THREE.Color("#4a0010"), emissiveIntensity: 0.25,
});
const dkAccMat = new THREE.MeshStandardMaterial({
  color: "#8B0000", roughness: 0.3, metalness: 0.55,
  emissive: new THREE.Color("#D4AF37"), emissiveIntensity: 0.18,
});
const dkEyeMat = new THREE.MeshStandardMaterial({
  color: "#D4AF37",
  emissive: new THREE.Color("#D4AF37"), emissiveIntensity: 0.9,
});

// ─── Shared animation logic ───────────────────────────────────────────────────
function useBunnyFrame(ref: React.RefObject<THREE.Group | null>) {
  const { pointer } = useThree();
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.5;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -pointer.y * 0.2, 0.05);
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.07;
  });
}

// ─── Light-mode procedural fallback ──────────────────────────────────────────
function FallbackBunny() {
  const ref = useRef<THREE.Group>(null);
  useBunnyFrame(ref);
  return (
    <group ref={ref}>
      <mesh material={roseMat} position={[0, -0.3, 0]}><sphereGeometry args={[0.55, 32, 32]} /></mesh>
      <mesh material={roseMat} position={[0, 0.55, 0]}><sphereGeometry args={[0.38, 32, 32]} /></mesh>
      <mesh material={roseMat} position={[-0.2, 1.25, 0]} rotation={[0, 0, -0.25]}><capsuleGeometry args={[0.1, 0.55, 8, 16]} /></mesh>
      <mesh material={pinkMat} position={[-0.2, 1.25, 0.06]} rotation={[0, 0, -0.25]}><capsuleGeometry args={[0.055, 0.38, 8, 16]} /></mesh>
      <mesh material={roseMat} position={[0.2, 1.25, 0]} rotation={[0, 0, 0.25]}><capsuleGeometry args={[0.1, 0.55, 8, 16]} /></mesh>
      <mesh material={pinkMat} position={[0.2, 1.25, 0.06]} rotation={[0, 0, 0.25]}><capsuleGeometry args={[0.055, 0.38, 8, 16]} /></mesh>
      <mesh material={eyeMat}  position={[-0.14, 0.62, 0.33]}><sphereGeometry args={[0.07, 16, 16]} /></mesh>
      <mesh material={whiteMat} position={[-0.115, 0.638, 0.388]}><sphereGeometry args={[0.025, 8, 8]} /></mesh>
      <mesh material={eyeMat}  position={[0.14, 0.62, 0.33]}><sphereGeometry args={[0.07, 16, 16]} /></mesh>
      <mesh material={whiteMat} position={[0.165, 0.638, 0.388]}><sphereGeometry args={[0.025, 8, 8]} /></mesh>
      <mesh material={pinkMat} position={[0, 0.51, 0.36]}><sphereGeometry args={[0.045, 16, 16]} /></mesh>
      <mesh material={roseMat} position={[0, -0.55, -0.45]}><sphereGeometry args={[0.18, 16, 16]} /></mesh>
      <mesh material={roseMat} position={[-0.62, -0.1, 0]} rotation={[0, 0, 0.5]}><capsuleGeometry args={[0.1, 0.3, 8, 16]} /></mesh>
      <mesh material={roseMat} position={[0.62, -0.1, 0]} rotation={[0, 0, -0.5]}><capsuleGeometry args={[0.1, 0.3, 8, 16]} /></mesh>
      <mesh material={roseMat} position={[-0.25, -0.82, 0.2]} rotation={[0.3, 0, 0]}><capsuleGeometry args={[0.12, 0.25, 8, 16]} /></mesh>
      <mesh material={roseMat} position={[0.25, -0.82, 0.2]} rotation={[0.3, 0, 0]}><capsuleGeometry args={[0.12, 0.25, 8, 16]} /></mesh>
    </group>
  );
}

// ─── Dark-mode procedural fallback ───────────────────────────────────────────
function DarkFallbackBunny() {
  const ref = useRef<THREE.Group>(null);
  useBunnyFrame(ref);
  return (
    <group ref={ref}>
      <mesh material={dkBodyMat} position={[0, -0.3, 0]}><sphereGeometry args={[0.55, 32, 32]} /></mesh>
      <mesh material={dkBodyMat} position={[0, 0.55, 0]}><sphereGeometry args={[0.38, 32, 32]} /></mesh>
      <mesh material={dkBodyMat} position={[-0.2, 1.25, 0]} rotation={[0, 0, -0.25]}><capsuleGeometry args={[0.1, 0.55, 8, 16]} /></mesh>
      <mesh material={dkAccMat} position={[-0.2, 1.25, 0.06]} rotation={[0, 0, -0.25]}><capsuleGeometry args={[0.055, 0.38, 8, 16]} /></mesh>
      <mesh material={dkBodyMat} position={[0.2, 1.25, 0]} rotation={[0, 0, 0.25]}><capsuleGeometry args={[0.1, 0.55, 8, 16]} /></mesh>
      <mesh material={dkAccMat} position={[0.2, 1.25, 0.06]} rotation={[0, 0, 0.25]}><capsuleGeometry args={[0.055, 0.38, 8, 16]} /></mesh>
      <mesh material={dkEyeMat} position={[-0.14, 0.62, 0.33]}><sphereGeometry args={[0.08, 16, 16]} /></mesh>
      <mesh material={dkEyeMat} position={[0.14, 0.62, 0.33]}><sphereGeometry args={[0.08, 16, 16]} /></mesh>
      <mesh material={dkAccMat} position={[0, 0.51, 0.36]}><sphereGeometry args={[0.045, 16, 16]} /></mesh>
      <mesh material={dkBodyMat} position={[0, -0.55, -0.45]}><sphereGeometry args={[0.18, 16, 16]} /></mesh>
      <mesh material={dkBodyMat} position={[-0.62, -0.1, 0]} rotation={[0, 0, 0.5]}><capsuleGeometry args={[0.1, 0.3, 8, 16]} /></mesh>
      <mesh material={dkBodyMat} position={[0.62, -0.1, 0]} rotation={[0, 0, -0.5]}><capsuleGeometry args={[0.1, 0.3, 8, 16]} /></mesh>
      <mesh material={dkBodyMat} position={[-0.25, -0.82, 0.2]} rotation={[0.3, 0, 0]}><capsuleGeometry args={[0.12, 0.25, 8, 16]} /></mesh>
      <mesh material={dkBodyMat} position={[0.25, -0.82, 0.2]} rotation={[0.3, 0, 0]}><capsuleGeometry args={[0.12, 0.25, 8, 16]} /></mesh>
    </group>
  );
}

// ─── Scene background clearer (makes canvas transparent) ─────────────────────
function ClearBackground() {
  const { scene } = useThree();
  useEffect(() => {
    scene.background = null;
  }, [scene]);
  return null;
}

// ─── GLB model — rotation + slow spin only, Bounds handles fit ───────────────
function ModelMesh({ path, isDark }: { path: string; isDark: boolean }) {
  const groupRef    = useRef<THREE.Group>(null);
  const { scene }   = useGLTF(path);
  const { pointer } = useThree();
  const cloned      = useMemo(() => scene.clone(true), [scene]);

  // No auto-spin — Bounds needs a static model to measure correctly.
  // User rotates freely with OrbitControls.
  useFrame((_state, delta) => {
    const g = groupRef.current;
    if (!g) return;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -pointer.y * 0.15, 0.05);
  });

  return isDark ? (
    <group ref={groupRef} rotation={[0, Math.PI, 0]}>
      <primitive object={cloned} />
    </group>
  ) : (
    <group ref={groupRef}>
      <primitive object={cloned} />
    </group>
  );
}

// ─── Themed scene — Bounds auto-fits the camera to whatever size the GLB is ──
function ThemedScene({ isDark }: { isDark: boolean }) {
  const cfg      = isDark ? THEME_CONFIG.dark : THEME_CONFIG.light;
  const fallback = isDark ? <DarkFallbackBunny /> : <FallbackBunny />;
  return (
    <GLBErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <Bounds fit clip margin={1.8}>
          <ModelMesh path={cfg.model} isDark={isDark} />
        </Bounds>
      </Suspense>
    </GLBErrorBoundary>
  );
}

// ─── Exported canvas ──────────────────────────────────────────────────────────
export default function BunnyCanvas({ isDark = false }: { isDark?: boolean }) {
  const cfg = isDark ? THEME_CONFIG.dark : THEME_CONFIG.light;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      useGLTF.preload(THEME_CONFIG.light.model);
      useGLTF.preload(THEME_CONFIG.dark.model);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[420px] md:h-[480px] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-pink-blush/40 border-t-rose-gold animate-spin" />
      </div>
    );
  }

  const bgImage = isDark
    ? "url('/DarkTheme/models/background.png')"
    : "url('/WhiteTheme/models/background.png')";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isDark ? "dark-canvas" : "light-canvas"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full h-[420px] md:h-[480px] relative overflow-hidden cursor-grab active:cursor-grabbing"
      >
        {/* Theme background image — fallback colour shown if the file is missing */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: isDark ? "#0a0005" : "#FFF0F5",
            backgroundImage: bgImage,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Canvas — must be absolute so background shows through */}
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "transparent" }}
        >
          {/* Null the scene background so WebGL clears to transparent */}
          <ClearBackground />

          <ambientLight    color={cfg.lights.ambient.color}     intensity={cfg.lights.ambient.intensity} />
          <directionalLight
            position={[3, 5, 3]}
            color={cfg.lights.directional.color}
            intensity={cfg.lights.directional.intensity}
            castShadow
          />
          <pointLight position={cfg.lights.point1.position} color={cfg.lights.point1.color} intensity={cfg.lights.point1.intensity} />
          <pointLight position={cfg.lights.point2.position} color={cfg.lights.point2.color} intensity={cfg.lights.point2.intensity} />

          {/* Extra lights so dark.glb is clearly visible */}
          {isDark && (
            <>
              <ambientLight intensity={1.5} />
              <directionalLight position={[5, 5, 5]} intensity={2} />
              <pointLight position={[-5, 5, -5]} color="#ff007f" intensity={2} />
            </>
          )}

          <ThemedScene isDark={isDark} />

          <ContactShadows position={[0, -1.3, 0]} opacity={0.25} scale={4} blur={2} color={cfg.shadowColor} />

          <OrbitControls enableZoom={true} enableRotate={true} enablePan={true} dampingFactor={0.08} enableDamping />
          <Environment preset={cfg.envPreset} />
        </Canvas>
      </motion.div>
    </AnimatePresence>
  );
}
