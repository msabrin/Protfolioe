# 3D Model Placeholder

Place your `bunny.glb` file in this directory.

**Path expected by the app:** `/public/models/bunny.glb`

## How to get a bunny GLB:
1. **Sketchfab** — Search for "bunny" and download a free GLB
2. **ReadyPlayerMe** or **Mixamo** — Custom character models
3. **Three.js examples** — The Stanford Bunny is available as GLB
4. **Blender** — Model your own and export as GLB

## What happens without the file:
The app shows a procedural fallback bunny built from Three.js primitives
with the same pink rose-gold aesthetic. It's fully functional.

## After placing the file:
The `useGLTF('/models/bunny.glb')` call in `components/three/BunnyModel.tsx`
will automatically pick it up. No code changes needed.
