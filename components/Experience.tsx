'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/lib/content';
import { sounds } from '@/lib/sounds';
import {
  Section,
  SectionHeader,
  slideInLeft,
  slideInRight,
  staggerContainer,
} from '@/components/animations';

export default function Experience() {
  const getBackground = (org: string) => {
    if (org.includes('CodeAlpha')) return '/professional_briefcase.jpg';
    if (org.includes('Infosys')) return '/tools_development.jpg';
    return '/graduation_icon.jpg';
  };

  const handleHover = () => {
    sounds.playHover();
  };

  return (
    <Section id="experience" className="relative section-pad overflow-hidden">
      {/* Immersive Background grid + glowing orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-overlay opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-screen bg-cover bg-center" style={{ backgroundImage: "url('/professional_briefcase.jpg')" }} />
        <div className="absolute -left-[10%] top-[20%] w-[45vw] h-[45vw] rounded-full bg-cyan/5 blur-[120px] animate-float" />
        <div className="absolute -right-[10%] bottom-[10%] w-[40vw] h-[40vw] rounded-full bg-purple/5 blur-[120px] animate-pulse-ring" />
      </div>

      <SectionHeader
        eyebrow="Experience"
        title={
          <>
            My <span className="gradient-text">journey</span> so far
          </>
        }
        subtitle="Internships, research, and academic milestones in AI & ML."
      />

      <div className="relative z-10 mx-auto mt-16 max-w-4xl">
        <div className="relative">
          {/* glowing vertical line */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-cyan via-purple to-transparent sm:left-1/2 sm:-translate-x-1/2" />
          {/* traveling pulse */}
          <motion.div
            className="absolute left-4 top-0 h-24 w-px bg-gradient-to-b from-cyan to-transparent sm:left-1/2 sm:-translate-x-1/2"
            animate={{ y: ['0%', '400%', '0%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col gap-14"
          >
            {experiences.map((exp, i) => {
              const Icon = exp.icon;
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={exp.org}
                  variants={isLeft ? slideInLeft : slideInRight}
                  className={`relative flex items-start gap-6 pl-12 sm:pl-0 ${
                    isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* pulsing node */}
                  <div className="absolute left-4 top-3 z-10 -translate-x-1/2 sm:left-1/2">
                    <span className="relative flex h-5 w-5 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-50" />
                      <span className="relative inline-flex h-5 w-5 rounded-full border-2 border-cyan bg-[#050816]" />
                      <span className="absolute inset-1.5 rounded-full bg-cyan" />
                    </span>
                  </div>

                  {/* card */}
                  <div className="w-full sm:w-[calc(50%-2rem)]">
                    <div 
                      onMouseEnter={handleHover}
                      className="group relative overflow-hidden rounded-2xl glass-card p-6 transition-all duration-300 hover:border-cyan/30 hover:glow-cyan"
                    >
                      <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-cyan/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div 
                        className="absolute inset-0 z-0 opacity-[0.06] transition-transform duration-700 group-hover:scale-110 bg-cover bg-center" 
                        style={{ backgroundImage: `url('${getBackground(exp.org)}')` }} 
                      />

                      {/* header */}
                      <div className="relative z-10 flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl glass-light text-cyan">
                            <Icon className="h-5 w-5" />
                          </span>
                          <div>
                            <h3 className="font-display text-base font-bold leading-snug text-white">
                              {exp.role}
                            </h3>
                            <p className="text-sm font-medium text-cyan-glow">{exp.org}</p>
                          </div>
                        </div>
                        <span className="shrink-0 rounded-full border border-purple/30 bg-purple/10 px-2.5 py-1 text-[11px] font-medium text-purple-glow whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>

                      {/* bullets */}
                      <ul className="relative z-10 mt-4 flex flex-col gap-1.5 pl-1">
                        {exp.bullets.map((b, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                            {b}
                          </li>
                        ))}
                      </ul>

                      {/* tags */}
                      <div className="relative z-10 mt-4 flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/5 bg-white/[0.03] px-2.5 py-1 text-xs text-white/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="hidden w-[calc(50%-2rem)] sm:block" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
