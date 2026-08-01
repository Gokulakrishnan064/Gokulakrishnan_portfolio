'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

function EarthCore() {
  const ref = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2.5;
      ringRef.current.rotation.z = t * 0.3;
    }
  });

  return (
    <group>
      <Sphere ref={ref} args={[1.6, 48, 48]}>
        <MeshDistortMaterial
          color="#0e7490"
          emissive="#22d3ee"
          emissiveIntensity={0.25}
          roughness={0.3}
          metalness={0.8}
          distort={0.25}
          speed={1.5}
          wireframe
        />
      </Sphere>
      <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[2.3, 0.01, 16, 120]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export default function EarthScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#22d3ee" />
      <pointLight position={[-5, -5, -5]} intensity={0.6} color="#a855f7" />
      <EarthCore />
      <Stars radius={30} depth={30} count={600} factor={3} fade speed={1} />
    </Canvas>
  );
}
