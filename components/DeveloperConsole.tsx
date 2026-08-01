'use client';

import { useState, useRef, useEffect } from 'react';
import { Terminal, X, CornerDownLeft } from 'lucide-react';
import { sounds } from '@/lib/sounds';
import { profile, skillCategories, projects } from '@/lib/content';

type LogLine = {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
};

export default function DeveloperConsole() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<LogLine[]>([
    { text: 'GokulOS [Version 2.0.26]', type: 'success' },
    { text: 'Type "help" to see available terminal commands.', type: 'output' },
  ]);
  const [showMatrix, setShowMatrix] = useState(false);
  const [showHack, setShowHack] = useState(false);
  const [booted, setBooted] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [open, history]);

  // Boot telemetry diagnostics check sequence
  useEffect(() => {
    if (open && !booted) {
      setBooted(true);
      setHistory([{ text: 'GOKULOS KERNEL INITIATED // LOAD STAGE 1', type: 'success' }]);
      sounds.playSystemScan();

      const diagnostics = [
        { text: '▸ Accessing GPU framebuffers & WebGL shaders... OK', delay: 250 },
        { text: '▸ Allocating Web Audio context synthesizers... OK', delay: 500 },
        { text: '▸ Validating FastAPI REST connection ports... OK', delay: 750 },
        { text: '▸ Mainframe handshake secure (MongoDB Atlas)... OK', delay: 1000 },
        { text: '▸ Systems online. GokulOS v2.0 Operational.', delay: 1200 },
        { text: '▸ Type "help" to display technical coordinates.', delay: 1400 }
      ];

      diagnostics.forEach((d) => {
        setTimeout(() => {
          setHistory((prev) => [...prev, { text: d.text, type: 'output' }]);
          sounds.playTypewriter();
        }, d.delay);
      });
    }
  }, [open, booted]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    sounds.playClick();
    const newHistory = [...history, { text: `gokul@portfolio:~$ ${cmd}`, type: 'input' as const }];

    switch (trimmed) {
      case 'help':
        newHistory.push(
          { text: 'Available commands:', type: 'success' },
          { text: '  about     - Learn about Gokulakrishnan', type: 'output' },
          { text: '  skills    - View technical arsenal details', type: 'output' },
          { text: '  projects  - Show detailed lists of completed projects', type: 'output' },
          { text: '  stats     - View live performance benchmarks & metrics', type: 'output' },
          { text: '  chat      - Launch Gokul AI Conversational replicas', type: 'output' },
          { text: '  contact   - Display phone, location and email details', type: 'output' },
          { text: '  resume    - Download Gokulakrishnan\'s latest resume PDF', type: 'output' },
          { text: '  matrix    - Launch standard cyber green matrix digital rain', type: 'output' },
          { text: '  hack      - Execute simulated security bypass sequence', type: 'output' },
          { text: '  clear     - Wipe clean the terminal screen log history', type: 'output' }
        );
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'chat':
        newHistory.push({ text: 'Starting conversational agent replicas...', type: 'success' });
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('open-ai-chat'));
        }
        break;
      case 'stats':
        newHistory.push(
          { text: 'SYSTEM BENCHMARKS & TELEMETRY:', type: 'success' },
          { text: '  • FastAPI Response Latency: 45ms (FastAPI async pool)', type: 'output' },
          { text: '  • TensorFlow CNN Inference: 12ms (TFLite converting runtime)', type: 'output' },
          { text: '  • Transaction Integrity: Pessimistic write locks JPA enabled', type: 'output' },
          { text: '  • Sound Synthesizers: Web Audio API Active', type: 'output' },
          { text: '  • Mainframe rendering engine: Three.js WebGL active', type: 'output' }
        );
        break;
      case 'about':
        newHistory.push(
          { text: `Name: ${profile.name}`, type: 'success' },
          { text: `Role: ${profile.role}`, type: 'output' },
          { text: `Education: Final year B.E. Computer Science (AI & ML) at VSB Engineering College. Current CGPA: ${profile.cgpa}`, type: 'output' },
          { text: `Focus: Building intelligent solutions including NLP pipelines, Generative AI models, and FastAPI backend servers.`, type: 'output' }
        );
        break;
      case 'skills':
        skillCategories.forEach(cat => {
          const names = cat.skills.map(s => s.name).join(', ');
          newHistory.push({ text: `[${cat.title}] - ${names}`, type: 'output' });
        });
        break;
      case 'projects':
        projects.forEach((proj, idx) => {
          newHistory.push(
            { text: `${idx + 1}. ${proj.title} - ${proj.tagline}`, type: 'success' },
            { text: `   Tech: ${proj.tech.join(', ')}`, type: 'output' },
            { text: `   Desc: ${proj.description}`, type: 'output' }
          );
        });
        break;
      case 'contact':
        newHistory.push(
          { text: `Email: ${profile.email}`, type: 'output' },
          { text: `Phone: ${profile.phone}`, type: 'output' },
          { text: `Location: ${profile.location}`, type: 'output' }
        );
        break;
      case 'resume':
        newHistory.push({ text: 'Triggering resume download...', type: 'success' });
        setTimeout(() => {
          const a = document.createElement('a');
          a.href = profile.resumeUrl;
          a.download = 'Gokulakrishnan_Resume.pdf';
          a.click();
        }, 300);
        break;
      case 'matrix':
        newHistory.push({ text: 'Accessing neural network mainframe...', type: 'success' });
        newHistory.push({ text: 'Matrix rain enabled for 5 seconds.', type: 'output' });
        setShowMatrix(true);
        sounds.playSuccess();
        setTimeout(() => setShowMatrix(false), 5000);
        break;
      case 'hack':
        newHistory.push({ text: 'WARNING: EXECUTING HOSTILE BYPASS DIALS...', type: 'error' });
        setShowHack(true);
        sounds.playWarning();
        
        let warningInterval = setInterval(() => {
          sounds.playWarning();
        }, 800);

        setTimeout(() => {
          clearInterval(warningInterval);
          setShowHack(false);
          sounds.playSuccess();
          newHistory.push({ text: 'ROOT ACCESS SECURED // SYSTEM OVERRIDE BYPASSED', type: 'success' });
          setHistory([...newHistory]);
        }, 4000);
        break;
      default:
        newHistory.push({ text: `Command not found: "${trimmed}". Type "help" for a list of command guidelines.`, type: 'error' });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => {
          sounds.playClick();
          setOpen(!open);
        }}
        className="fixed bottom-6 right-6 z-[180] flex h-14 w-14 items-center justify-center rounded-full border border-cyan/30 bg-[#0c1223]/90 text-cyan shadow-lg shadow-cyan/20 hover:scale-105 hover:border-cyan hover:glow-cyan transition-all animate-pulse"
        aria-label="Developer Console"
      >
        {open ? <X className="h-6 w-6" /> : <Terminal className="h-6 w-6" />}
      </button>

      {/* Terminal Overlay Dialog */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[180] w-[calc(100vw-3rem)] max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#060a19]/95 shadow-2xl shadow-cyan/15 animate-fadeUp">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="ml-2 font-mono text-xs text-white/50 font-semibold">developer@gokulakrishnan: ~</span>
            </div>
            <button 
              onClick={() => {
                sounds.playClick();
                setOpen(false);
              }}
              className="text-white/40 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Console Content */}
          <div className="h-72 overflow-y-auto px-4 py-3 font-mono text-xs leading-relaxed scrollbar-hide">
            <div className="flex flex-col gap-1.5">
              {history.map((line, idx) => (
                <div
                  key={idx}
                  className={
                    line.type === 'input'
                      ? 'text-white/90'
                      : line.type === 'error'
                      ? 'text-red-400 font-bold'
                      : line.type === 'success'
                      ? 'text-cyan-glow font-bold'
                      : 'text-white/60'
                  }
                >
                  {line.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(input);
            }}
            className="flex items-center border-t border-white/10 bg-white/[0.01] px-4 py-3"
          >
            <span className="mr-2 font-mono text-xs text-cyan">~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                sounds.playTypewriter();
              }}
              placeholder="Type command (try 'help')..."
              className="w-full bg-transparent font-mono text-xs text-white focus:outline-none placeholder:text-white/20"
            />
            <button type="submit" className="text-cyan opacity-40 hover:opacity-100">
              <CornerDownLeft className="h-4 w-4" />
            </button>
          </form>

          {/* Terminal Scanline overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] opacity-15" />
        </div>
      )}

      {/* Cyber Green Matrix Rain fullscreen overlay */}
      {showMatrix && <MatrixOverlay />}

      {/* Security Bypass Hack Overlay */}
      {showHack && <HackOverlay />}
    </>
  );
}

function MatrixOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 16);
    const drops: number[] = Array(columns).fill(1);

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ🤖💻🧠⚡🌐'.split('');

    let animId: number;
    const draw = () => {
      ctx.fillStyle = 'rgba(5, 8, 22, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f0';
      ctx.font = '15px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 16;
        const y = drops[i] * 16;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[300] h-full w-full pointer-events-none"
    />
  );
}

function HackOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animId: number;
    let frame = 0;

    const draw = () => {
      frame++;
      const w = canvas.width;
      const h = canvas.height;

      // Dark red flashing background
      ctx.fillStyle = 'rgba(12, 4, 15, 0.15)';
      ctx.fillRect(0, 0, w, h);

      // Warning scan lines
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.05)';
      ctx.lineWidth = 2;
      const sweepY = (frame * 6) % h;
      ctx.beginPath();
      ctx.moveTo(0, sweepY);
      ctx.lineTo(w, sweepY);
      ctx.stroke();

      // Giant flashing warning tag in center
      ctx.save();
      ctx.fillStyle = frame % 30 < 15 ? 'rgba(239, 68, 68, 0.9)' : 'rgba(239, 68, 68, 0.2)';
      ctx.font = 'bold clamp(1.5rem, 5vw, 3rem) monospace';
      ctx.textAlign = 'center';
      ctx.fillText('🚨 CRITICAL COMPROMISE: ROOT ACCESS BYPASSED 🚨', w / 2, h / 2 - 40);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = '14px monospace';
      ctx.fillText('DIAGNOSING SECURITY CORE SECTORS... BYPASS IN PROGRESS', w / 2, h / 2 + 10);

      // Binary scanning streams
      ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.font = '11px monospace';
      for (let i = 0; i < 20; i++) {
        const text = Math.random() > 0.5 ? '1' : '0';
        const randX = Math.random() * w;
        const randY = Math.random() * h;
        ctx.fillText(text, randX, randY);
      }

      // Draw floating code files
      ctx.fillStyle = 'rgba(239, 68, 68, 0.6)';
      const mockCommands = [
        'OVERRIDE_JPA_TRANSACTION_LOCKS = true',
        'BYPASS_JWT_AUTH_TOKEN = 0x889A2BF3',
        'INJECTING_TENSORFLOW_IMAGE_INFERENCE_DATA = ok',
        'DOWNLOADING_GOKUL_CORE_MAIN_SYSTEM = 100%'
      ];
      ctx.fillText(mockCommands[Math.floor(frame / 10) % mockCommands.length], w / 2, h / 2 + 50);

      animId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[300] h-full w-full pointer-events-none"
    />
  );
}
