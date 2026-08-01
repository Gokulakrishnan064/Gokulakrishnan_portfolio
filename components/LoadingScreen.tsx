'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGS = [
  { p: 5, text: 'system_core: Initializing GokulOS kernel v2.0...' },
  { p: 15, text: 'webgl_service: Allocating 3D shaders and orbit lines...' },
  { p: 28, text: 'modules: Compiling components/three/HeroScene.tsx...' },
  { p: 40, text: 'modules: Importing @react-three/drei library...' },
  { p: 52, text: 'github_api: Executing live telemetry fetch from github.com...' },
  { p: 68, text: 'recharts: Calibrating vector grid axes and layout bounds...' },
  { p: 82, text: 'sounds: Mapping Web Audio synthesizer nodes...' },
  { p: 92, text: 'ux: Compiling command palette index entries...' },
  { p: 100, text: 'system: Calibration complete. Ready to boot.' }
];

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [printedLogs, setPrintedLogs] = useState<string[]>([]);

  useEffect(() => {
    // Disable body scroll when loading screen is visible
    document.body.style.overflow = 'hidden';
    
    let p = 0;
    const tick = setInterval(() => {
      p += Math.random() * 5 + 2;
      if (p >= 100) {
        p = 100;
        clearInterval(tick);
        setTimeout(() => {
          setVisible(false);
          // Restore body overflow style
          document.body.style.overflow = 'unset';
          setTimeout(onDone, 700);
        }, 400);
      }
      const currentProgress = Math.min(p, 100);
      setProgress(currentProgress);

      // Add matching logs based on progress threshold
      const activeLogs = LOGS.filter(log => log.p <= currentProgress)
                            .map(log => log.text);
      setPrintedLogs(activeLogs);
    }, 50);

    return () => {
      clearInterval(tick);
      document.body.style.overflow = 'unset';
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050816]"
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/5 blur-3xl" />
          </div>

          {/* Logo mark */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-8 flex h-20 w-20 items-center justify-center"
          >
            <span className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-cyan/25" />
            <span className="absolute inset-3 animate-spin-rev rounded-full border border-cyan/15" />
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/10 shadow-lg shadow-cyan/30">
              <img src="/logo.jpg" alt="GK" className="h-full w-full object-cover" />
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="relative w-64 overflow-hidden rounded-full bg-white/5 mb-6">
            <div className="h-[2px]" />
            <motion.div
              className="loader-bar absolute top-0 left-0 h-full rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Log Window */}
          <div className="w-80 h-32 overflow-hidden rounded-xl border border-white/5 bg-[#080d20]/50 p-4 font-mono text-[10px] text-white/40 flex flex-col gap-1 select-none">
            <div className="flex items-center justify-between border-b border-white/5 pb-1 mb-1">
              <span>GokulOS Boot Telemetry</span>
              <span className="text-cyan animate-pulse">● LOAD</span>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col gap-1 justify-end">
              {printedLogs.slice(-4).map((log, index) => (
                <div key={index} className="truncate">
                  <span className="text-cyan font-bold mr-1">&gt;</span> {log}
                </div>
              ))}
            </div>
          </div>

          {/* Counter */}
          <p className="mt-4 font-display text-sm font-bold tabular-nums text-white/30">
            {Math.round(progress).toString().padStart(3, '0')}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
