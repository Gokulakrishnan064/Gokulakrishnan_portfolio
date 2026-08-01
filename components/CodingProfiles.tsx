'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Award, BrainCircuit, BarChart3, Database } from 'lucide-react';
import { codingProfiles } from '@/lib/content';
import { sounds } from '@/lib/sounds';
import {
  Section,
  SectionHeader,
  fadeUp,
  staggerContainer,
  scaleIn,
} from '@/components/animations';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';

const LANGUAGE_DATA = [
  { subject: 'Python', value: 95, fullMark: 100 },
  { subject: 'Java', value: 85, fullMark: 100 },
  { subject: 'FastAPI', value: 90, fullMark: 100 },
  { subject: 'Spring Boot', value: 80, fullMark: 100 },
  { subject: 'SQL', value: 75, fullMark: 100 },
  { subject: 'TensorFlow', value: 70, fullMark: 100 },
];

const LEETCODE_DATA = [
  { name: 'Easy', value: 20, color: '#10b981' },
  { name: 'Medium', value: 25, color: '#f59e0b' },
  { name: 'Hard', value: 7, color: '#ef4444' },
];

export default function CodingProfiles() {
  const [view, setView] = useState<'cards' | 'stats'>('cards');

  const handleTabChange = (tab: 'cards' | 'stats') => {
    sounds.playClick();
    setView(tab);
  };

  const handleHover = () => {
    sounds.playHover();
  };

  return (
    <Section id="profiles" className="relative section-pad overflow-hidden">
      {/* Immersive Background grid + glowing orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-overlay opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-screen bg-cover bg-center" style={{ backgroundImage: "url('/developer_profile.jpg')" }} />
        <div className="absolute -left-[10%] top-[20%] w-[45vw] h-[45vw] rounded-full bg-cyan/5 blur-[120px] animate-float" />
        <div className="absolute -right-[10%] bottom-[10%] w-[40vw] h-[40vw] rounded-full bg-purple/5 blur-[120px] animate-pulse-ring" />
      </div>

      <SectionHeader
        eyebrow="Profiles & Stats"
        title={
          <>
            Find me <span className="gradient-text">everywhere</span>
          </>
        }
        subtitle="My presence across developer platforms combined with interactive coding metrics."
      />

      {/* Glassmorphic Tabs */}
      <div className="mt-12 flex justify-center">
        <div className="inline-flex rounded-xl glass p-1.5 gap-1.5">
          <button
            onClick={() => handleTabChange('cards')}
            onMouseEnter={handleHover}
            className={`rounded-lg px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
              view === 'cards'
                ? 'bg-cyan text-[#050816] shadow-lg shadow-cyan/25'
                : 'text-foreground/60 hover:text-foreground hover:bg-white/5'
            }`}
          >
            Profile Cards
          </button>
          <button
            onClick={() => handleTabChange('stats')}
            onMouseEnter={handleHover}
            className={`rounded-lg px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
              view === 'stats'
                ? 'bg-purple text-white shadow-lg shadow-purple/25'
                : 'text-foreground/60 hover:text-foreground hover:bg-white/5'
            }`}
          >
            Interactive Stats
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'cards' ? (
          <motion.div
            key="cards"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 max-w-4xl mx-auto"
          >
            {codingProfiles.map((p) => {
              const Icon = p.icon;
              const profileBackgrounds: Record<string, string> = {
                'GitHub': '/developer_profile.jpg',
                'LinkedIn': '/professional_briefcase.jpg',
                'LeetCode': '/tech_languages.jpg',
              };

              return (
                <motion.a
                  key={p.label}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -8 }}
                  onMouseEnter={handleHover}
                  onClick={() => sounds.playClick()}
                  className="group relative overflow-hidden rounded-3xl glass-card p-8 text-center transition-all duration-300 hover:border-cyan/30 hover:glow-cyan"
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 -top-20 mx-auto h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
                    style={{ backgroundColor: p.color }}
                  />
                  <div 
                    className="absolute inset-0 z-0 opacity-[0.06] transition-transform duration-700 group-hover:scale-110 bg-cover bg-center" 
                    style={{ backgroundImage: `url('${profileBackgrounds[p.label] || '/profile_banner.jpg'}')` }} 
                  />

                  <div className="relative z-10 flex flex-col items-center gap-5">
                    {/* Icon with glowing ring */}
                    <span className="relative flex h-16 w-16 items-center justify-center">
                      <span className="absolute inset-0 rounded-2xl glass-light" />
                      <span
                        className="absolute inset-0 rounded-2xl border animate-pulse-ring"
                        style={{ borderColor: `${p.color}35` }}
                      />
                      <Icon className="relative h-7 w-7" style={{ color: p.color }} />
                    </span>

                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground">{p.label}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{p.username}</p>
                    </div>

                    {/* Stat */}
                    <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-2.5">
                      <p className="font-display text-2xl font-bold" style={{ color: p.color }}>
                        {p.stat}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{p.statLabel}</p>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/60 transition-colors group-hover:text-cyan">
                      Visit Profile
                      <ArrowUpRight className="h-4.5 w-4.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="stats"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            {/* Language Radar Chart */}
            <div className="rounded-3xl glass-card p-6 flex flex-col items-center justify-center border border-white/5">
              <div className="flex items-center gap-2 mb-6 self-start">
                <BrainCircuit className="h-5 w-5 text-cyan shrink-0" />
                <h3 className="font-display text-base font-bold text-foreground">Language & Backend Skill Vector</h3>
              </div>
              
              <div className="w-full h-72 flex justify-center text-xs select-none">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={LANGUAGE_DATA}>
                    <PolarGrid stroke="rgba(255,255,255,0.08)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fillOpacity: 0.6 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'currentColor', fillOpacity: 0.4 }} />
                    <Radar
                      name="Expertise"
                      dataKey="value"
                      stroke="#22d3ee"
                      fill="#22d3ee"
                      fillOpacity={0.25}
                    />
                    <Tooltip contentStyle={{ backgroundColor: '#0c1223', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
