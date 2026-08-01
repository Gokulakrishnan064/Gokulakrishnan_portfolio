'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap, Sun, Moon, Volume2, VolumeX, Search } from 'lucide-react';
import { navLinks } from '@/lib/content';
import { sounds } from '@/lib/sounds';
import { openCommandPalette } from '@/components/CommandPalette';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');
  const [mounted, setMounted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    setSoundEnabled(sounds.isEnabled());

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map((l) => l.href.slice(1));
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      if (current) setActive(`#${current}`);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    sounds.playClick();
    setActive(href);
    setOpen(false);
  };

  const handleHover = () => {
    sounds.playHover();
  };

  const toggleSound = () => {
    sounds.playClick();
    const nextState = !sounds.isEnabled();
    sounds.setEnabled(nextState);
    setSoundEnabled(nextState);
    if (nextState) {
      setTimeout(() => sounds.playSuccess(), 50);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[100] flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6 ${
          scrolled ? 'glass-card' : 'bg-transparent'
        }`}
      >
        <a 
          href="#home" 
          onClick={() => handleLinkClick('#home')}
          onMouseEnter={handleHover}
          className="group flex items-center gap-2"
        >
          <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-white/10 shadow-lg shadow-cyan/15 transition-transform group-hover:scale-110">
            <img src="/logo.jpg" alt="GK" className="h-full w-full object-cover" />
          </div>
          <span className="font-display text-base font-bold tracking-tight text-foreground">
            Gokul<span className="text-cyan-glow">.</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleLinkClick(link.href)}
              onMouseEnter={handleHover}
              className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-cyan ${
                active === link.href ? 'text-cyan' : 'text-foreground/75'
              }`}
            >
              {link.label}
              {active === link.href && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-lg bg-cyan/10 ring-1 ring-cyan/30"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Cmd+K trigger search */}
          <button
            onClick={() => openCommandPalette()}
            onMouseEnter={handleHover}
            className="flex h-10 w-10 items-center justify-center rounded-xl glass-light text-foreground/70 hover:text-cyan transition-all"
            aria-label="Search Palette"
          >
            <Search className="h-4.5 w-4.5" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={handleHover}
            className="flex h-10 w-10 items-center justify-center rounded-xl glass-light text-foreground/70 hover:text-purple transition-all"
            aria-label="Toggle sound design"
          >
            {soundEnabled ? <Volume2 className="h-4.5 w-4.5 text-cyan" /> : <VolumeX className="h-4.5 w-4.5 text-foreground/40" />}
          </button>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => {
                sounds.playClick();
                setTheme(theme === 'dark' ? 'light' : 'dark');
              }}
              onMouseEnter={handleHover}
              className="flex h-10 w-10 items-center justify-center rounded-xl glass-light text-foreground/70 hover:text-yellow-400 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>
          )}

          {/* Desktop Contact CTA */}
          <div className="hidden lg:block ml-2">
            <button
              onClick={() => {
                sounds.playClick();
                window.dispatchEvent(new Event('open-ai-chat'));
              }}
              onMouseEnter={handleHover}
              className="rounded-xl bg-gradient-to-r from-cyan to-purple px-5 py-2.5 text-sm font-semibold text-[#050816] shadow-lg shadow-cyan/20 transition-transform hover:scale-105"
            >
              Gokul AI Chat
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              setOpen((v) => !v);
            }}
            onMouseEnter={handleHover}
            className="flex h-10 w-10 items-center justify-center rounded-lg glass text-foreground lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-x-4 top-20 z-50 rounded-2xl glass-card p-4 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  onMouseEnter={handleHover}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    active === link.href
                      ? 'bg-cyan/10 text-cyan'
                      : 'text-foreground/75 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  sounds.playClick();
                  setOpen(false);
                  window.dispatchEvent(new Event('open-ai-chat'));
                }}
                onMouseEnter={handleHover}
                className="mt-2 rounded-lg bg-gradient-to-r from-cyan to-purple px-4 py-3 text-center text-sm font-semibold text-[#050816]"
              >
                Gokul AI Chat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
