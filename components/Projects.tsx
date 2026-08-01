'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Github, ExternalLink, ArrowUpRight, X, Sparkles, Network, ArrowRight } from 'lucide-react';
import { projects, type Project } from '@/lib/content';
import { sounds } from '@/lib/sounds';
import {
  Section,
  SectionHeader,
  staggerContainer,
  scaleIn,
} from '@/components/animations';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const PROJECT_DETAILS: Record<string, {
  challenges: string[];
  solutions: string[];
  architecture: { from: string; to: string; label: string }[];
}> = {
  'BudgetWise AI': {
    challenges: [
      'Extracting clean budget lists and financial models from highly unstructured text responses.',
      'Preventing performance bottlenecks during high-concurrency database queries.'
    ],
    solutions: [
      'Enforced structured output schemas using Gemini JSON-mode prompts paired with robust Pydantic parsers.',
      'Configured optimized asynchronous connection pools with MongoDB and implemented redis-like object caching.'
    ],
    architecture: [
      { from: 'React client UI', to: 'FastAPI Backend', label: 'REST Query' },
      { from: 'FastAPI Backend', to: 'Gemini Agent', label: 'Pydantic Prompt' },
      { from: 'FastAPI Backend', to: 'MongoDB Atlas', label: 'Document Write' }
    ]
  },
  'Pest Detection Agent': {
    challenges: [
      'Executing multi-layered neural network inferences inside server environments without memory leaks.',
      'Generating treatment instructions that translate into offline-friendly summaries.'
    ],
    solutions: [
      'Converted the TensorFlow CNN model weights into an optimized TFLite runtime to reduce cold-start execution latency.',
      'Pipelined classification labels directly into the Gemini API, rendering responses via modular HTML segments.'
    ],
    architecture: [
      { from: 'Client camera', to: 'FastAPI Server', label: 'Image payload' },
      { from: 'FastAPI Server', to: 'TensorFlow CNN', label: 'Disease inference' },
      { from: 'FastAPI Server', to: 'Gemini LLM', label: 'Treatment synthesis' }
    ]
  },
  'Online Auction Bazaar': {
    challenges: [
      'Managing microsecond-level racing conditions when multiple buyers bid on a single product item.',
      'Safeguarding user transaction logs from duplicate execution calls.'
    ],
    solutions: [
      'Applied pessimistic write locks (@Transactional JPA) to block concurrent writes and enforce transactional order.',
      'Engineered an idempotent transaction middleware layer to detect and block duplicate requests.'
    ],
    architecture: [
      { from: 'Client session', to: 'Spring Web Layer', label: 'HTTP Bid' },
      { from: 'Spring Web Layer', to: 'SQL DB Lock', label: 'Write lock' },
      { from: 'SQL DB Lock', to: 'MySQL Server', label: 'Save bid' }
    ]
  }
};

const PROJECT_CHARTS_DATA: Record<string, { label: string; data: any[]; type: 'line' | 'bar'; dataKeys: string[]; colors: string[] }> = {
  'BudgetWise AI': {
    label: 'Response Latency Comparison (ms) - Lower is Better',
    type: 'bar',
    dataKeys: ['FastAPI', 'NodeJS'],
    colors: ['#22d3ee', '#a855f7'],
    data: [
      { name: 'Cold Start', FastAPI: 180, NodeJS: 340 },
      { name: 'Auth Check', FastAPI: 35, NodeJS: 110 },
      { name: 'AI Recommendation', FastAPI: 820, NodeJS: 990 },
      { name: 'DB Read', FastAPI: 18, NodeJS: 55 }
    ]
  },
  'Pest Detection Agent': {
    label: 'CNN Classification Accuracy & Loss (%) - Higher is Better',
    type: 'line',
    dataKeys: ['Accuracy', 'Val_Accuracy'],
    colors: ['#22d3ee', '#a855f7'],
    data: [
      { name: 'Epoch 1', Accuracy: 58, Val_Accuracy: 52 },
      { name: 'Epoch 2', Accuracy: 72, Val_Accuracy: 68 },
      { name: 'Epoch 3', Accuracy: 86, Val_Accuracy: 80 },
      { name: 'Epoch 4', Accuracy: 93, Val_Accuracy: 89 },
      { name: 'Epoch 5', Accuracy: 98, Val_Accuracy: 94 }
    ]
  },
  'Online Auction Bazaar': {
    label: 'Write Throughput under Heavy Concurrency (Tx/sec) - Higher is Better',
    type: 'bar',
    dataKeys: ['PessimisticLock', 'StandardLock'],
    colors: ['#22d3ee', '#a855f7'],
    data: [
      { name: '100 Bids', PessimisticLock: 98, StandardLock: 96 },
      { name: '500 Bids', PessimisticLock: 490, StandardLock: 380 },
      { name: '1000 Bids', PessimisticLock: 970, StandardLock: 610 },
      { name: '5000 Bids', PessimisticLock: 4850, StandardLock: 1250 }
    ]
  }
};

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isCyan = project.accent === 'cyan';
  const accentText = isCyan ? 'text-cyan' : 'text-purple';
  const accentBg = isCyan ? 'bg-cyan/10' : 'bg-purple/10';
  const accentBorder = isCyan ? 'hover:border-cyan/40' : 'hover:border-purple/40';
  const accentGlow = isCyan ? 'hover:glow-cyan' : 'hover:glow-purple';
  const accentOrb = isCyan ? 'bg-cyan/20' : 'bg-purple/20';

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-10px)`;
  };
  
  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)';
  };

  const handleHover = () => {
    sounds.playHover();
  };

  const projectBackgrounds: Record<string, string> = {
    'BudgetWise AI': '/profile_banner.jpg',
    'Pest Detection Agent': '/ai_circuits.jpg',
    'Online Auction Bazaar': '/database_nodes.jpg',
  };

  return (
    <motion.div variants={scaleIn} className="group perspective-1000">
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onMouseEnter={handleHover}
        onClick={() => {
          sounds.playClick();
          onClick();
        }}
        style={{ transformStyle: 'preserve-3d', transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)' }}
        className={`relative h-full overflow-hidden rounded-3xl glass-card p-8 cursor-pointer ${accentBorder} ${accentGlow}`}
      >
        {/* glow orb */}
        <div
          className={`pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full ${accentOrb} blur-3xl transition-transform duration-700 group-hover:scale-150`}
        />
        <div 
          className="absolute inset-0 z-0 opacity-[0.06] transition-transform duration-700 group-hover:scale-110 bg-cover bg-center" 
          style={{ backgroundImage: `url('${projectBackgrounds[project.title] || '/profile_banner.jpg'}')` }} 
        />

        {/* HUD corners */}
        <div className="hud-corner pointer-events-none absolute inset-3 z-10">
          <span />
        </div>

        <div className="relative z-10" style={{ transform: 'translateZ(40px)' }}>
          {/* index + tagline */}
          <div className="flex items-center justify-between">
            <span className={`font-display text-6xl font-bold opacity-15 ${accentText}`}>
              0{index + 1}
            </span>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${accentBg} ${accentText}`}>
              {project.tagline}
            </span>
          </div>

          <h3 className="mt-6 font-display text-2xl font-bold text-foreground sm:text-3xl">
            {project.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {project.description}
          </p>

          {/* metrics */}
          <div className="mt-5 grid grid-cols-3 gap-2">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-center"
              >
                <p className={`text-xs font-bold ${accentText}`}>{m.value}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          {/* actions */}
          <div className="mt-6 flex items-center justify-between text-xs font-semibold text-cyan-glow group-hover:underline">
            <span>Explore Target Node</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [choiceProject, setChoiceProject] = useState<Project | null>(null);

  const closeOverlay = () => {
    sounds.playClick();
    setSelectedProject(null);
  };

  const details = selectedProject ? PROJECT_DETAILS[selectedProject.title] : null;

  return (
    <Section id="projects" className="relative section-pad overflow-hidden">
      {/* Immersive Background grid + glowing orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-overlay opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-screen bg-cover bg-center" style={{ backgroundImage: "url('/enterprise_code.jpg')" }} />
        <div className="absolute -right-[10%] top-[10%] w-[45vw] h-[45vw] rounded-full bg-purple/5 blur-[120px] animate-float" />
        <div className="absolute -left-[10%] bottom-[20%] w-[40vw] h-[40vw] rounded-full bg-cyan/5 blur-[120px] animate-pulse-ring" />
      </div>

      <SectionHeader
        eyebrow="Projects"
        title={
          <>
            Things I&apos;ve <span className="gradient-text">built</span>
          </>
        }
        subtitle="End-to-end AI products, ML pipelines, and scalable backend systems."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="mt-16 perspective-1000"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard 
              key={p.title} 
              project={p} 
              index={i} 
              onClick={() => {
                if (p.demo && p.demo !== '#') {
                  setChoiceProject(p);
                } else {
                  setSelectedProject(p);
                }
              }} 
            />
          ))}
        </div>
      </motion.div>

      {/* Case Study Slide-Over Panel */}
      <AnimatePresence>
        {selectedProject && details && (
          <div className="fixed inset-0 z-[220] flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeOverlay}
              className="fixed inset-0 bg-[#050816]/85 backdrop-blur-md"
            />

            {/* Slide-over panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="relative z-10 w-full max-w-xl h-full overflow-y-auto bg-[#0a0e1e]/95 border-l border-white/10 p-6 sm:p-10 shadow-2xl shadow-cyan/15 flex flex-col gap-6"
            >
              {/* Close button */}
              <button
                onClick={closeOverlay}
                className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full glass hover:bg-white/15 text-foreground transition-all z-20"
                aria-label="Close case study"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mt-8 flex flex-col gap-6">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-cyan uppercase">{selectedProject.tagline}</span>
                  <h3 className="mt-1 font-display text-3xl font-bold text-foreground">{selectedProject.title}</h3>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">{selectedProject.description}</p>

                {/* Architecture Pipeline with Shimmering Data Flow */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Network className="h-4.5 w-4.5 text-cyan shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground/80">System Architecture Pipeline</span>
                  </div>
                  <div className="flex flex-col gap-5 rounded-2xl border border-white/5 bg-[#050816]/60 p-5 font-mono text-[11px]">
                    {details.architecture.map((item, idx) => (
                      <div key={idx} className="relative flex flex-col gap-1.5">
                        <div className="flex items-center gap-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-[10px] font-bold shadow-sm">
                            {idx + 1}
                          </span>
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="rounded-lg bg-white/[0.03] border border-white/5 px-2.5 py-1 text-white/80 font-semibold">{item.from}</span>
                            <span className="text-cyan-glow font-bold">➔</span>
                            <span className="rounded-lg bg-cyan/10 border border-cyan/15 px-2.5 py-1 text-cyan font-semibold">{item.to}</span>
                          </div>
                        </div>
                        <div className="pl-9 text-[10px] text-muted-foreground">
                          Data payload: <span className="text-white/70 font-semibold">{item.label}</span>
                        </div>

                        {idx < details.architecture.length - 1 && (
                          <div className="absolute left-3 top-6 h-6 w-0.5 overflow-hidden">
                            <div className="h-full w-full bg-cyan/10 relative">
                              <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-cyan to-transparent animate-shimmer-y-fast" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Benchmarks Recharts */}
                {PROJECT_CHARTS_DATA[selectedProject.title] && (
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground/80 block mb-3">
                      Performance Benchmarks
                    </span>
                    <div className="h-52 w-full rounded-2xl border border-white/5 bg-[#050816]/40 p-4 shadow-inner">
                      <p className="text-[9px] text-cyan/70 uppercase tracking-wider font-mono mb-3">
                        {PROJECT_CHARTS_DATA[selectedProject.title].label}
                      </p>
                      <ResponsiveContainer width="100%" height="80%">
                        {PROJECT_CHARTS_DATA[selectedProject.title].type === 'bar' ? (
                          <BarChart data={PROJECT_CHARTS_DATA[selectedProject.title].data}>
                            <XAxis dataKey="name" stroke="#6b7280" fontSize={8} tickLine={false} />
                            <YAxis stroke="#6b7280" fontSize={8} tickLine={false} />
                            <Tooltip contentStyle={{ background: '#0c1223', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', fontSize: 10 }} />
                            {PROJECT_CHARTS_DATA[selectedProject.title].dataKeys.map((key, i) => (
                              <Bar key={key} dataKey={key} fill={PROJECT_CHARTS_DATA[selectedProject.title].colors[i]} radius={[3, 3, 0, 0]} />
                            ))}
                          </BarChart>
                        ) : (
                          <LineChart data={PROJECT_CHARTS_DATA[selectedProject.title].data}>
                            <XAxis dataKey="name" stroke="#6b7280" fontSize={8} tickLine={false} />
                            <YAxis stroke="#6b7280" fontSize={8} tickLine={false} />
                            <Tooltip contentStyle={{ background: '#0c1223', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', fontSize: 10 }} />
                            {PROJECT_CHARTS_DATA[selectedProject.title].dataKeys.map((key, i) => (
                              <Line key={key} type="monotone" dataKey={key} stroke={PROJECT_CHARTS_DATA[selectedProject.title].colors[i]} strokeWidth={2} dot={{ r: 3 }} />
                            ))}
                          </LineChart>
                        )}
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Challenges & Solutions */}
                <div className="grid grid-cols-1 gap-5">
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-400">Technical Challenges</span>
                    <ul className="flex flex-col gap-2">
                      {details.challenges.map((c, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Implemented Solutions</span>
                    <ul className="flex flex-col gap-2">
                      {details.solutions.map((s, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 animate-pulse" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech List */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground/80 block mb-3">Stack Integrated</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tech.map((t) => (
                      <span key={t} className="rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-1 text-xs text-foreground/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="mt-4 flex gap-3">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sounds.playClick()}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl glass-light py-3.5 text-xs font-bold text-foreground transition-all hover:bg-white/10 border border-white/10"
                  >
                    <Github className="h-4 w-4" />
                    Explore Repository Code
                  </a>
                  {selectedProject.demo !== '#' && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sounds.playClick()}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan to-purple py-3.5 text-xs font-bold text-[#050816] transition-transform hover:scale-[1.02]"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Launch Live Demo
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Glassmorphic Project Action Choice Dialog */}
      <AnimatePresence>
        {choiceProject && (
          <div className="fixed inset-0 z-[230] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { sounds.playClick(); setChoiceProject(null); }}
              className="fixed inset-0 bg-[#050816]/80 backdrop-blur-md"
            />

            {/* Dialog Card Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-[#0c1223]/95 p-6 shadow-2xl shadow-cyan/20 text-center flex flex-col gap-5 z-10"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />
              
              <div className="flex flex-col gap-1 mt-2">
                <span className="text-[9px] font-bold tracking-widest text-cyan uppercase font-mono">{choiceProject.tagline}</span>
                <h3 className="font-display text-2xl font-bold text-white">{choiceProject.title}</h3>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed px-1">
                Establish link. Select how you would like to proceed with this deployment node.
              </p>

              {/* Choice CTAs */}
              <div className="flex flex-col gap-2.5 mt-1">
                <button
                  onClick={() => {
                    sounds.playSuccess();
                    window.open(choiceProject.demo, '_blank');
                    setChoiceProject(null);
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl glass-cyan py-3.5 text-xs font-bold text-cyan-glow transition-all hover:scale-[1.02] hover:bg-[#22d3ee]/20"
                >
                  <ExternalLink className="h-4 w-4" />
                  Launch Live Production Demo
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    setSelectedProject(choiceProject);
                    setChoiceProject(null);
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl glass-purple py-3.5 text-xs font-bold text-purple-glow transition-all hover:scale-[1.02] hover:bg-[#a855f7]/20"
                >
                  <Network className="h-4 w-4 text-purple" />
                  Inspect Architecture & Case Study
                </button>
              </div>

              {/* Abort CTA */}
              <button
                onClick={() => { sounds.playClick(); setChoiceProject(null); }}
                className="mt-1 text-[10px] text-muted-foreground/50 hover:text-white/80 transition-all font-mono uppercase tracking-wide"
              >
                [ Abort Connection ]
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  );
}
