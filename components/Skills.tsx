'use client';

import { motion } from 'framer-motion';
import { skillCategories } from '@/lib/content';
import {
  Section,
  SectionHeader,
  fadeUp,
  staggerContainer,
  scaleIn,
} from '@/components/animations';

/* Marquee row of all skill names */
function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const allSkills = skillCategories.flatMap((c) => c.skills.map((s) => s.name));
  const items = [...allSkills, ...allSkills];

  return (
    <div className="relative flex overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className={`marquee-track ${reverse ? 'marquee-track-reverse' : ''}`}>
        {items.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="flex items-center gap-2 whitespace-nowrap text-sm text-white/40"
          >
            <span className="h-1 w-1 rounded-full bg-cyan/50" />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <Section id="skills" className="relative section-pad overflow-hidden">
      {/* Immersive Background grid + glowing orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-overlay opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-screen bg-cover bg-center" style={{ backgroundImage: "url('/tools_development.jpg')" }} />
        <div className="absolute -right-[10%] top-[10%] w-[45vw] h-[45vw] rounded-full bg-purple/5 blur-[120px] animate-float" />
        <div className="absolute -left-[10%] bottom-[20%] w-[40vw] h-[40vw] rounded-full bg-cyan/5 blur-[120px] animate-pulse-ring" />
      </div>

      <SectionHeader
        eyebrow="Skills"
        title={
          <>
            My <span className="gradient-text">technical</span> arsenal
          </>
        }
        subtitle="Languages, AI, frameworks, databases, and tools I use to build intelligent systems."
      />

      {/* Marquee ticker */}
      <div className="mt-12 flex flex-col gap-1 border-y border-white/5 py-4">
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>

      {/* Category cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillCategories.map((cat) => {
          const CatIcon = cat.icon;
          const isCyan = cat.accent === 'cyan';
          const accentText = isCyan ? 'text-cyan' : 'text-purple';
          const accentBorder = isCyan ? 'hover:border-cyan/40' : 'hover:border-purple/40';
          const accentGlow = isCyan ? 'hover:glow-cyan' : 'hover:glow-purple';
          const accentOrb = isCyan ? 'bg-cyan/15' : 'bg-purple/15';

          const backgrounds: Record<string, string> = {
            'Languages': '/tech_languages.jpg',
            'AI & ML': '/ai_circuits.jpg',
            'Frameworks': '/enterprise_code.jpg',
            'Frontend': '/profile_banner.jpg',
            'Databases': '/database_nodes.jpg',
            'Tools': '/tools_development.jpg',
          };

          return (
            <motion.div
              key={cat.title}
              variants={scaleIn}
              whileHover={{ y: -10 }}
              className={`group relative overflow-hidden rounded-3xl glass-card p-7 transition-all duration-400 ${accentBorder} ${accentGlow}`}
            >
              <div
                className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full ${accentOrb} blur-3xl transition-transform duration-500 group-hover:scale-150`}
              />
              <div 
                className="absolute inset-0 z-0 opacity-[0.06] transition-transform duration-700 group-hover:scale-110 bg-cover bg-center" 
                style={{ backgroundImage: `url('${backgrounds[cat.title] || '/profile_banner.jpg'}')` }} 
              />

              {/* Icon ring */}
              <div className="relative z-10 flex items-center gap-3">
                <span className="relative flex h-12 w-12 items-center justify-center">
                  <span className="absolute inset-0 rounded-xl glass-light" />
                  <span
                    className={`absolute inset-0 rounded-xl border ${isCyan ? 'border-cyan/30' : 'border-purple/30'} animate-pulse-ring`}
                  />
                  <CatIcon className={`relative h-5 w-5 ${accentText}`} />
                </span>
                <h3 className="font-display text-lg font-bold text-foreground">{cat.title}</h3>
              </div>

              {/* Skills */}
              <div className="relative z-10 mt-5 flex flex-wrap gap-2">
                {cat.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-foreground/80 transition-all hover:border-white/15 hover:text-white"
                    >
                      <Icon className="h-4 w-4 text-white/50" />
                      {skill.name}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
