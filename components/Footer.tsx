'use client';

import { Zap, ArrowUp } from 'lucide-react';
import { socials, profile } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-white/5 px-5 py-14 sm:px-8 md:px-12 lg:px-16 xl:px-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-40 w-[80vw] -translate-x-1/2 rounded-full bg-cyan/5 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8">
        {/* Logo */}
        <a href="#home" className="group flex items-center gap-2">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan to-purple text-[#050816] shadow-lg shadow-cyan/30 transition-transform group-hover:scale-110">
            <Zap className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-bold text-white">
            Gokul<span className="text-cyan-glow">.</span>
          </span>
        </a>

        {/* Socials */}
        <div className="flex gap-3">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-xl glass-light text-white/60 transition-all hover:-translate-y-1 hover:border-cyan/40 hover:text-cyan"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-muted-foreground">
          Designed &amp; Developed by{' '}
          <span className="font-medium text-white">{profile.name}</span> © 2026
        </p>

        {/* Back to top */}
        <a
          href="#home"
          className="group inline-flex items-center gap-2 rounded-full glass-light px-5 py-2.5 text-xs font-medium text-white/60 transition-all hover:border-cyan/40 hover:text-cyan"
        >
          Back to top
          <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
