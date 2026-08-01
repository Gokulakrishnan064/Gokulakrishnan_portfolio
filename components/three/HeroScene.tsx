'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, Stars, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { sounds } from '@/lib/sounds';

/* Neural network node positions on a sphere */
const NODE_COUNT = 64;
const RADIUS = 2.3;

function generateNodes(count: number, radius: number): THREE.Vector3[] {
  const nodes: THREE.Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    nodes.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }
  return nodes;
}

type NeuralCoreProps = {
  nodes: THREE.Vector3[];
};

/* The core AI "brain": a distorted glowing sphere with connecting neuron lines + pulsing nodes */
function NeuralCore({ nodes }: NeuralCoreProps) {
  const group = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const nodeRefs = useRef<THREE.Mesh[]>([]);
  const lineRefs = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < 2.2) {
          positions.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z
          );
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [nodes]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.12;
      group.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.4;
      coreRef.current.rotation.z = t * 0.15;
      const s = 1 + Math.sin(t * 1.5) * 0.04;
      coreRef.current.scale.set(s, s, s);
    }
    if (lineRefs.current) {
      const mat = lineRefs.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.15 + Math.sin(t * 0.8) * 0.08;
    }
    nodeRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const pulse = (Math.sin(t * 2 + i * 0.4) + 1) * 0.5;
      const s = 0.04 + pulse * 0.05;
      mesh.scale.set(s, s, s);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.4 + pulse * 0.6;
    });
  });

  return (
    <group ref={group}>
      {/* Inner glowing core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.1, 4]} />
        <MeshDistortMaterial
          color="#22d3ee"
          emissive="#0e7490"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Wireframe shell */}
      <mesh scale={1.35}>
        <icosahedronGeometry args={[1.1, 2]} />
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.15} />
      </mesh>

      {/* Neural connection lines */}
      <lineSegments ref={lineRefs} geometry={geometry}>
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.2} />
      </lineSegments>

      {/* Pulsing neuron nodes */}
      {nodes.map((node, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) nodeRefs.current[i] = el;
          }}
          position={[node.x, node.y, node.z]}
        >
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color="#67e8f9" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

/* Orbiting rings around the brain */
function OrbitRings() {
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringA.current) {
      ringA.current.rotation.x = t * 0.3;
      ringA.current.rotation.y = t * 0.2;
    }
    if (ringB.current) {
      ringB.current.rotation.x = -t * 0.25;
      ringB.current.rotation.z = t * 0.3;
    }
  });

  return (
    <>
      <mesh ref={ringA} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[3.4, 0.012, 16, 100]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[3.9, 0.008, 16, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.3} />
      </mesh>
    </>
  );
}

/* Holographic data sphere behind the brain */
function HoloSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.05;
      ref.current.rotation.x = t * 0.03;
    }
  });
  return (
    <Sphere ref={ref} args={[6, 32, 32]} position={[0, 0, -4]}>
      <meshBasicMaterial color="#0e7490" wireframe transparent opacity={0.08} />
    </Sphere>
  );
}

/* Mouse-driven parallax for the whole scene */
function ParallaxRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += (mouse.x * 0.3 - group.current.rotation.y) * 0.04;
      group.current.rotation.x += (-mouse.y * 0.2 - group.current.rotation.x) * 0.04;
    }
  });

  return <group ref={group}>{children}</group>;
}

/* Interactive cursor HUD overlay drawing coordinate details in real-time */
function InteractiveHUD() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    // Default centered position
    mouseRef.current.x = window.innerWidth / 2;
    mouseRef.current.y = window.innerHeight / 2;
    mouseRef.current.targetX = window.innerWidth / 2;
    mouseRef.current.targetY = window.innerHeight / 2;

    let animId = 0;
    let angle = 0;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        animId = requestAnimationFrame(render);
        return;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Smooth cursor interpolation
      const mouse = mouseRef.current;
      mouse.targetX += (mouse.x - mouse.targetX) * 0.12;
      mouse.targetY += (mouse.y - mouse.targetY) * 0.12;

      angle += 0.015;

      // Draw crosshair grid lines
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.04)';
      ctx.lineWidth = 1;

      // Vertical crosshair
      ctx.beginPath();
      ctx.moveTo(mouse.targetX, 0);
      ctx.lineTo(mouse.targetX, h);
      ctx.stroke();

      // Horizontal crosshair
      ctx.beginPath();
      ctx.moveTo(0, mouse.targetY);
      ctx.lineTo(w, mouse.targetY);
      ctx.stroke();

      // Centered targeted circle
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(mouse.targetX, mouse.targetY, 20, 0, Math.PI * 2);
      ctx.stroke();

      // Outer dashed tracking ring
      ctx.save();
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(mouse.targetX, mouse.targetY, 44, angle, angle + Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Compass bracket vectors around the cursor target
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.5)';
      ctx.lineWidth = 1.5;
      const bracketSize = 6;
      const bracketDist = 28;

      // Top Left
      ctx.beginPath();
      ctx.moveTo(mouse.targetX - bracketDist, mouse.targetY - bracketDist + bracketSize);
      ctx.lineTo(mouse.targetX - bracketDist, mouse.targetY - bracketDist);
      ctx.lineTo(mouse.targetX - bracketDist + bracketSize, mouse.targetY - bracketDist);
      ctx.stroke();

      // Top Right
      ctx.beginPath();
      ctx.moveTo(mouse.targetX + bracketDist, mouse.targetY - bracketDist + bracketSize);
      ctx.lineTo(mouse.targetX + bracketDist, mouse.targetY - bracketDist);
      ctx.lineTo(mouse.targetX + bracketDist - bracketSize, mouse.targetY - bracketDist);
      ctx.stroke();

      // Bottom Left
      ctx.beginPath();
      ctx.moveTo(mouse.targetX - bracketDist, mouse.targetY + bracketDist - bracketSize);
      ctx.lineTo(mouse.targetX - bracketDist, mouse.targetY + bracketDist);
      ctx.lineTo(mouse.targetX - bracketDist + bracketSize, mouse.targetY + bracketDist);
      ctx.stroke();

      // Bottom Right
      ctx.beginPath();
      ctx.moveTo(mouse.targetX + bracketDist, mouse.targetY + bracketDist - bracketSize);
      ctx.lineTo(mouse.targetX + bracketDist, mouse.targetY + bracketDist);
      ctx.lineTo(mouse.targetX + bracketDist - bracketSize, mouse.targetY + bracketDist);
      ctx.stroke();

      // Coordinates Tag text
      ctx.fillStyle = 'rgba(34, 211, 238, 0.7)';
      ctx.font = '9px monospace';
      const coordX = Math.round(mouse.targetX).toString().padStart(4, '0');
      const coordY = Math.round(mouse.targetY).toString().padStart(4, '0');
      ctx.fillText(`SYS.SCAN // [X:${coordX} Y:${coordY}]`, mouse.targetX + 15, mouse.targetY - 15);

      // Top Left Static Diagnostics
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.fillText('SYS.CORE: READY // ENGAGED', 30, 45);
      ctx.fillText('FRAMEBUFFER: R3F_THREEJS_18.2', 30, 57);
      
      const simulatedMem = (42 + Math.sin(angle * 0.15) * 2.5).toFixed(1);
      ctx.fillText(`BUFFER_LOAD: ${simulatedMem}%`, 30, 69);

      // Bottom Left Static status info
      ctx.fillText('TELEMETRY STATUS: ACTIVE', 30, h - 50);
      ctx.fillText('CORE: SECURE // PORT_3000', 30, h - 38);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="absolute inset-0 pointer-events-none z-10 hidden sm:block"
    />
  );
}

export default function HeroScene() {
  const nodes = useMemo(() => generateNodes(NODE_COUNT, RADIUS), []);

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#22d3ee" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#a855f7" />

        <ParallaxRig>
          <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
            <NeuralCore nodes={nodes} />
          </Float>
          <OrbitRings />
          <HoloSphere />
          <Sparkles count={80} scale={12} size={2} speed={0.3} color="#22d3ee" opacity={0.6} />
        </ParallaxRig>

        <Stars radius={50} depth={50} count={1500} factor={4} fade speed={1} />
      </Canvas>

      {/* 2D HUD Canvas overlay */}
      <InteractiveHUD />
    </div>
  );
}
