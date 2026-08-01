'use client';

import { motion } from 'framer-motion';
import { Award, Calendar } from 'lucide-react';
import { certifications } from '@/lib/content';
import {
  Section,
  SectionHeader,
  fadeUp,
  staggerContainer,
} from '@/components/animations';

export default function Certifications() {
  return (
    <Section id="certifications" className="relative section-pad overflow-hidden">
      {/* Immersive Background grid + glowing orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-overlay opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-screen bg-cover bg-center" style={{ backgroundImage: "url('/tech_languages.jpg')" }} />
        <div className="absolute -right-[10%] top-[10%] w-[45vw] h-[45vw] rounded-full bg-purple/5 blur-[120px] animate-float" />
        <div className="absolute -left-[10%] bottom-[20%] w-[40vw] h-[40vw] rounded-full bg-cyan/5 blur-[120px] animate-pulse-ring" />
      </div>

      <SectionHeader
        eyebrow="Certifications"
        title={
          <>
            Credentials &amp; <span className="gradient-text">achievements</span>
          </>
        }
        subtitle="Internships, specializations, and self-driven certifications."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="perspective-1000 mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {certifications.map((cert) => {
          const isCyan = cert.accent === 'cyan';
          const accentText = isCyan ? 'text-cyan' : 'text-purple';
          const accentGlow = isCyan ? 'hover:glow-cyan' : 'hover:glow-purple';
          const accentBorder = isCyan ? 'hover:border-cyan/40' : 'hover:border-purple/40';
          const accentOrb = isCyan ? 'bg-cyan/15' : 'bg-purple/15';

          const getCertBackground = (title: string) => {
            if (title.includes('Java')) return '/tech_languages.jpg';
            if (title.includes('Machine Learning') || title.includes('ML')) return '/ai_circuits.jpg';
            if (title.includes('SQL')) return '/database_nodes.jpg';
            return '/graduation_icon.jpg';
          };

          return (
            <motion.div
              key={cert.title}
              variants={fadeUp}
              whileHover={{ rotateY: 8, rotateX: -4, y: -10 }}
              style={{ transformStyle: 'preserve-3d' }}
              className={`group relative overflow-hidden rounded-3xl glass-card p-6 transition-all duration-500 ${accentBorder} ${accentGlow}`}
            >
              <div
                className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full ${accentOrb} blur-3xl transition-transform duration-700 group-hover:scale-150`}
              />
              <div 
                className="absolute inset-0 z-0 opacity-[0.06] transition-transform duration-700 group-hover:scale-110 bg-cover bg-center" 
                style={{ backgroundImage: `url('${getCertBackground(cert.title)}')` }} 
              />

              {/* Ribbon icon */}
              <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl glass-light ${accentText}`}>
                  <Award className="h-6 w-6" />
                </span>

                <h3 className="mt-4 font-display text-base font-bold leading-tight text-white">
                  {cert.title}
                </h3>
                <p className={`mt-1 text-sm font-medium ${accentText}`}>{cert.issuer}</p>
                <p className="mt-2 text-xs text-muted-foreground">{cert.description}</p>

                <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {cert.year}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
