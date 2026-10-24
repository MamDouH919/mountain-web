"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  AdaptiveDpr,
  Environment,
  Float,
  Lightformer,
  MeshDistortMaterial,
} from "@react-three/drei";
import * as THREE from "three";

type Pointer = { x: number; y: number };

/**
 * Tracks the pointer across the whole window, not just the canvas. The hero
 * text sits on top of the canvas and would otherwise swallow the events.
 * Values are normalised to [-1, 1].
 */
function useWindowPointer() {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return pointer;
}

function MetalCore({ pointer, reducedMotion }: { pointer: React.RefObject<Pointer>; reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  // Shrink on narrow canvases (phones) so the object frames instead of cropping.
  const viewportWidth = useThree((state) => state.viewport.width);
  const scale = Math.min(1, viewportWidth / 5.5);

  useFrame((_, delta) => {
    if (!group.current || !mesh.current) return;
    const speed = reducedMotion ? 0.03 : 0.12;

    // Slow idle spin on the mesh itself.
    mesh.current.rotation.y += delta * speed;
    mesh.current.rotation.x += delta * speed * 0.4;

    // The whole group leans toward the cursor, eased so it never feels twitchy.
    const { x, y } = pointer.current;
    const ease = 1 - Math.exp(-delta * 2.5);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.45, ease);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.3, ease);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, x * 0.15, ease);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, y * 0.1, ease);
  });

  return (
    <group ref={group} scale={scale}>
      <Float speed={reducedMotion ? 0 : 1.2} rotationIntensity={0.25} floatIntensity={0.6}>
        <mesh ref={mesh}>
          <icosahedronGeometry args={[1.35, 64]} />
          <MeshDistortMaterial
            color="#0d0d0f"
            metalness={1}
            roughness={0.18}
            distort={reducedMotion ? 0.15 : 0.32}
            speed={reducedMotion ? 0.3 : 1.4}
            envMapIntensity={1.4}
          />
        </mesh>
      </Float>
      <NodeRing />
    </group>
  );
}

/** A tilted orbit of data nodes around the core, for the "network" feel. */
function NodeRing({ count = 140 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.15 + Math.sin(i * 12.9898) * 0.12;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = Math.sin(i * 78.233) * 0.06;
      arr[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.08;
  });

  return (
    <points ref={ref} rotation={[0.45, 0, 0.2]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#ffffff" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

/**
 * Procedural studio lighting. Built from Lightformers so no HDR file is fetched
 * from a CDN at runtime. The orange strip matches --brand and gives the
 * metal its warm rim.
 */
function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer form="rect" intensity={2.2} position={[0, 4, -4]} scale={[10, 1.2, 1]} />
      <Lightformer form="rect" intensity={1.2} position={[-5, 0, 1]} rotation-y={Math.PI / 2} scale={[8, 1.5, 1]} />
      <Lightformer form="rect" intensity={3} color="#ff6a2b" position={[5, -1, 0]} rotation-y={-Math.PI / 2} scale={[6, 0.6, 1]} />
      <Lightformer form="ring" intensity={0.8} position={[0, 0, 6]} scale={3} />
    </Environment>
  );
}

export default function HeroScene({
  reducedMotion = false,
  onReady,
}: {
  reducedMotion?: boolean;
  onReady?: () => void;
}) {
  const pointer = useWindowPointer();
  const wrapper = useRef<HTMLDivElement>(null);
  // Stop rendering once the hero scrolls away, so the GPU is free for the rest
  // of the page. Mobile browsers otherwise drop layers and paint them black.
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="size-full">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 40 }}
        dpr={[1, 1.5]}
        frameloop={inView ? "always" : "never"}
        gl={{ antialias: true, alpha: true }}
        onCreated={() => onReady?.()}
        aria-hidden
      >
        <Studio />
        <MetalCore pointer={pointer} reducedMotion={reducedMotion} />
        <AdaptiveDpr pixelated={false} />
      </Canvas>
    </div>
  );
}
