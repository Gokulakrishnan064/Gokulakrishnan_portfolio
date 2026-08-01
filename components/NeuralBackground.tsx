'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 75;
    const connectionDistance = 120;
    const mouseConnectionDistance = 180;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const isLight = theme === 'light';
      const colors = isLight 
        ? ['rgba(8,145,178,0.25)', 'rgba(147,51,234,0.25)'] 
        : ['rgba(34,211,238,0.4)', 'rgba(168,85,247,0.4)'];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
          color: colors[Math.random() > 0.5 ? 0 : 1]
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLight = theme === 'light';
      
      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Boundary collision
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Connect to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * (isLight ? 0.08 : 0.15);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Gradient lines for premium aesthetics
            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grad.addColorStop(0, p1.color.replace(/[\d.]+\)$/, `${alpha})`));
            grad.addColorStop(1, p2.color.replace(/[\d.]+\)$/, `${alpha})`));
            
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect to mouse pointer
        if (mouseRef.current.active) {
          const mDist = Math.hypot(p1.x - mouseRef.current.x, p1.y - mouseRef.current.y);
          if (mDist < mouseConnectionDistance) {
            const mAlpha = (1 - mDist / mouseConnectionDistance) * (isLight ? 0.12 : 0.25);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            
            ctx.strokeStyle = isLight 
              ? `rgba(8,145,178,${mAlpha})` 
              : `rgba(34,211,238,${mAlpha})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resizeCanvas);
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-20 bg-[#050816]/98 transition-colors duration-500"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
