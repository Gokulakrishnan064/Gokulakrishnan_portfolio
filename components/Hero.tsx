'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Download, Mail } from 'lucide-react';
import { profile, socials } from '@/lib/content';
import { fadeUp, staggerContainer } from '@/components/animations';

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false });

const ROLES = [
  'AI Engineer',
  'Machine Learning Developer',
  'Backend Developer',
];

function TypedRole() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = ROLES[idx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && text.length < full.length) {
      timeout = setTimeout(() => setText(full.slice(0, text.length + 1)), 70);
    } else if (!deleting && text.length === full.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(full.slice(0, text.length - 1)), 35);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, idx]);

  return (
    <span className="inline-flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          className="gradient-text"
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
      <span className="ml-0.5 inline-block h-[1em] w-[3px] animate-pulse bg-cyan" />
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden pt-28"
    >
      {/* 3D scene layer */}
      <div className="absolute inset-0 z-0 opacity-90">
        <HeroScene />
      </div>

      {/* Grid + vignette overlays */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-grid-overlay opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#050816]/60 via-transparent to-[#050816]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-7"
        >
          {/* Availability badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-2 label-sm text-white/60"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for AI / ML Roles 2026
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} className="display-xl text-white">
            Hi, I&apos;m{' '}
            <span className="gradient-text animate-gradient">Gokulakrishnan</span>
          </motion.h1>

          {/* Typed role */}
          <motion.div
            variants={fadeUp}
            className="display-md font-normal text-white/70"
          >
            <TypedRole />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-base text-muted-foreground sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan to-purple px-7 py-3.5 text-sm font-semibold text-[#050816] shadow-lg shadow-cyan/25 transition-transform hover:scale-[1.04]"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
              View Projects
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="group inline-flex items-center gap-2 rounded-xl glass px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-cyan/40 hover:glow-cyan"
            >
              <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              Download Resume
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-xl glass px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-purple/40 hover:glow-purple"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div variants={fadeUp} className="mt-4 flex items-center gap-3">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group relative flex h-12 w-12 items-center justify-center rounded-xl glass transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40"
                >
                  <Icon className="h-5 w-5 text-white/60 transition-colors group-hover:text-cyan" />
                  <span
                    className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-30"
                    style={{ backgroundColor: s.color }}
                  />
                </a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        aria-label="Scroll down"
      >
        <span className="label-sm text-white/30">Scroll</span>
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/15 p-1">
          <span className="h-1.5 w-1 animate-scroll-pill rounded-full bg-cyan" />
        </div>
      </motion.a>
    </section>
  );
}
