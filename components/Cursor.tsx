'use client';

import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const outlinePos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const loop = () => {
      outlinePos.current.x = lerp(outlinePos.current.x, pos.current.x, 0.12);
      outlinePos.current.y = lerp(outlinePos.current.y, pos.current.y, 0.12);
      if (outlineRef.current) {
        outlineRef.current.style.left = `${outlinePos.current.x}px`;
        outlineRef.current.style.top = `${outlinePos.current.y}px`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    const onEnter = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a,button,[data-cursor="hover"]')) setHovering(true);
    };
    const onLeave = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a,button,[data-cursor="hover"]')) setHovering(false);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className={hovering ? 'cursor-hover' : ''}>
      {/* Central targeting core */}
      <div ref={dotRef} className="cursor-dot" />

      {/* Futuristic split brackets vector HUD outline */}
      <div ref={outlineRef} className="cursor-outline flex items-center justify-center">
        {/* Rotating inner tech compass ring */}
        <div className="absolute inset-1.5 border border-cyan/15 rounded-full animate-spin-slow pointer-events-none" />
        
        {/* Four lock corners */}
        <div className="absolute h-1.5 w-1.5 border-t border-l border-cyan/60 top-0 left-0 transition-all duration-300 outline-corner" />
        <div className="absolute h-1.5 w-1.5 border-t border-r border-cyan/60 top-0 right-0 transition-all duration-300 outline-corner" />
        <div className="absolute h-1.5 w-1.5 border-b border-l border-cyan/60 bottom-0 left-0 transition-all duration-300 outline-corner" />
        <div className="absolute h-1.5 w-1.5 border-b border-r border-cyan/60 bottom-0 right-0 transition-all duration-300 outline-corner" />
      </div>
    </div>
  );
}
