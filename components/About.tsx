'use client';

import { motion } from 'framer-motion';
import {
  Sparkles,
  Cpu,
  Network,
  Bot,
  GraduationCap,
  MapPin,
  Zap,
  Target,
  Rocket,
} from 'lucide-react';
import { about, profile } from '@/lib/content';
import {
  Reveal,
  Section,
  SectionHeader,
  Counter,
  fadeUp,
  staggerContainer,
} from '@/components/animations';

const focusAreas = [
  { icon: Cpu, label: 'Machine Learning' },
  { icon: Network, label: 'Computer Vision' },
  { icon: Sparkles, label: 'Generative AI' },
  { icon: Bot, label: 'Backend Systems' },
];

export default function About() {
  return (
    <Section id="about" className="relative section-pad overflow-hidden">
      {/* Immersive Background grid + glowing orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-overlay opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-screen bg-cover bg-center" style={{ backgroundImage: "url('/profile_banner.jpg')" }} />
        <div className="absolute -left-[10%] top-[20%] w-[45vw] h-[45vw] rounded-full bg-cyan/5 blur-[120px] animate-float" />
        <div className="absolute -right-[10%] bottom-[10%] w-[40vw] h-[40vw] rounded-full bg-purple/5 blur-[120px] animate-pulse-ring" />
      </div>

      <SectionHeader
        eyebrow="About"
        title={
          <>
            Engineering <span className="gradient-text">intelligence</span> into products
          </>
        }
        subtitle="A passionate AI & ML student turning research into real, deployable systems."
      />

      <div className="relative z-10 mx-auto mt-16 max-w-6xl">
        {/* Bento grid */}
        <div className="grid auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {/* Big profile card */}
          <Reveal
            variants={fadeUp}
            className="col-span-2 row-span-2 md:col-span-2 md:row-span-2"
          >
            <div className="group relative h-full overflow-hidden rounded-3xl glass-card gradient-border-card p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan/15 blur-3xl transition-transform duration-700 group-hover:scale-125" />
              <div 
                className="absolute inset-0 z-0 opacity-[0.09] mix-blend-overlay transition-transform duration-700 group-hover:scale-110 bg-cover bg-center" 
                style={{ backgroundImage: "url('/profile_banner.jpg')" }} 
              />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="relative">
                    <div className="absolute inset-0 animate-spin-slow rounded-full bg-gradient-to-r from-cyan via-purple to-cyan opacity-60 blur-md" />
                    <div className="relative flex h-20 w-20 overflow-hidden items-center justify-center rounded-full border border-white/10 bg-[#050816] shadow-lg shadow-cyan/15">
                      <img src="/logo.jpg" alt="GK" className="h-full w-full object-cover" />
                    </div>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl glass-light text-cyan">
                    <Sparkles className="h-4 w-4" />
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground">{profile.name}</h3>
                  <p className="mt-1 text-sm text-cyan-glow">AI &amp; ML Engineer</p>
                  <div className="mt-4 flex flex-col gap-1.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <GraduationCap className="h-3.5 w-3.5 text-cyan" />
                      {profile.college}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-purple" />
                      {profile.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* CGPA counter */}
          <Reveal variants={fadeUp} delay={0.05}>
            <div className="group relative h-full overflow-hidden rounded-3xl glass-card p-6 transition-all hover:border-cyan/30">
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan/15 blur-2xl" />
              <div 
                className="absolute inset-0 z-0 opacity-[0.08] transition-transform duration-700 group-hover:scale-110 bg-cover bg-center" 
                style={{ backgroundImage: "url('/cgpa_icon.jpg')" }} 
              />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <Zap className="h-6 w-6 text-cyan" />
                <div>
                  <p className="font-display text-4xl font-bold text-foreground">
                    <Counter to={7.7} decimals={1} />
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">CGPA</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Projects counter */}
          <Reveal variants={fadeUp} delay={0.1}>
            <div className="group relative h-full overflow-hidden rounded-3xl glass-card p-6 transition-all hover:border-purple/30">
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-purple/15 blur-2xl" />
              <div 
                className="absolute inset-0 z-0 opacity-[0.08] transition-transform duration-700 group-hover:scale-110 bg-cover bg-center" 
                style={{ backgroundImage: "url('/projects_icon.jpg')" }} 
              />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <Rocket className="h-6 w-6 text-purple" />
                <div>
                  <p className="font-display text-4xl font-bold text-foreground">
                    <Counter to={3} suffix="+" />
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">AI Projects Built</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Focus row */}
          <Reveal variants={fadeUp} delay={0.15} className="col-span-2">
            <div className="group relative overflow-hidden flex h-full flex-col justify-center gap-3 rounded-3xl glass-card p-6">
              <div 
                className="absolute inset-0 z-0 opacity-[0.06] transition-transform duration-700 group-hover:scale-110 bg-cover bg-center" 
                style={{ backgroundImage: "url('/core_focus_icon.jpg')" }} 
              />
              <p className="relative z-10 label-sm text-cyan/60">Core Focus</p>
              <div className="relative z-10 grid grid-cols-2 gap-2">
                {focusAreas.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={f.label}
                      className="flex items-center gap-2 rounded-xl glass-light px-3 py-2 text-xs text-foreground/75"
                    >
                      <Icon className="h-4 w-4 text-cyan" />
                      {f.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Internships */}
          <Reveal variants={fadeUp} delay={0.2}>
            <div className="group relative h-full overflow-hidden rounded-3xl glass-card p-6 transition-all hover:border-cyan/30">
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan/15 blur-2xl" />
              <div 
                className="absolute inset-0 z-0 opacity-[0.08] transition-transform duration-700 group-hover:scale-110 bg-cover bg-center" 
                style={{ backgroundImage: "url('/internship_icon.jpg')" }} 
              />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <Target className="h-6 w-6 text-cyan" />
                <div>
                  <p className="font-display text-4xl font-bold text-foreground">
                    <Counter to={2} />
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Internships</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Grad year */}
          <Reveal variants={fadeUp} delay={0.25}>
            <div className="group relative h-full overflow-hidden rounded-3xl glass-card p-6 transition-all hover:border-purple/30">
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-purple/15 blur-2xl" />
              <div 
                className="absolute inset-0 z-0 opacity-[0.08] transition-transform duration-700 group-hover:scale-110 bg-cover bg-center" 
                style={{ backgroundImage: "url('/graduation_icon.jpg')" }} 
              />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <GraduationCap className="h-6 w-6 text-purple" />
                <div>
                  <p className="font-display text-4xl font-bold text-foreground">2027</p>
                  <p className="mt-1 text-xs text-muted-foreground">Graduating</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Narrative paragraphs */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {about.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              className="text-sm leading-relaxed text-muted-foreground"
            >
              {p}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
