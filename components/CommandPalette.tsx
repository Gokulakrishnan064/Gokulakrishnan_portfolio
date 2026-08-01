'use client';

import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { Search, Home, User, Laptop, Briefcase, FileCode, Github, Mail, Download, Moon, Sun, Volume2, VolumeX, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useTheme } from 'next-themes';
import { sounds } from '@/lib/sounds';
import { profile } from '@/lib/content';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    setSoundEnabled(sounds.isEnabled());
    
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        sounds.playClick();
        setOpen((open) => !open);
      }
    };
    
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (action: () => void) => {
    sounds.playClick();
    action();
    setOpen(false);
  };

  const toggleSound = () => {
    const nextState = !sounds.isEnabled();
    sounds.setEnabled(nextState);
    setSoundEnabled(nextState);
    if (nextState) {
      setTimeout(() => sounds.playSuccess(), 50);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#050816]/75 backdrop-blur-md" 
        onClick={() => {
          sounds.playClick();
          setOpen(false);
        }} 
      />

      {/* dialog container */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0c1223]/90 p-4 shadow-2xl shadow-cyan/20 animate-scaleIn">
        {/* scanner glow effect */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent animate-shimmer-x" />
        
        <Command className="flex flex-col">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <Search className="h-5 w-5 text-cyan shrink-0" />
            <Command.Input
              placeholder="Type a command or search..."
              className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
              onKeyDown={() => sounds.playTypewriter()}
            />
            <span className="hidden rounded bg-white/10 px-2 py-1 font-mono text-[10px] text-white/50 sm:inline-block">ESC</span>
          </div>

          <Command.List className="mt-3 max-h-72 overflow-y-auto scrollbar-hide flex flex-col gap-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>

            {/* Navigation Group */}
            <Command.Group heading="Navigation" className="text-xs font-semibold tracking-wider text-cyan/70 uppercase px-2 mb-1">
              <Command.Item 
                onSelect={() => runCommand(() => window.location.hash = '#home')}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <Home className="h-4 w-4 text-white/40" />
                  <span>Go to Home</span>
                </div>
                <CornerDownLeft className="h-3 w-3 text-white/30" />
              </Command.Item>
              
              <Command.Item 
                onSelect={() => runCommand(() => window.location.hash = '#about')}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-white/40" />
                  <span>Go to About</span>
                </div>
                <CornerDownLeft className="h-3 w-3 text-white/30" />
              </Command.Item>

              <Command.Item 
                onSelect={() => runCommand(() => window.location.hash = '#skills')}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <Laptop className="h-4 w-4 text-white/40" />
                  <span>Go to Skills</span>
                </div>
                <CornerDownLeft className="h-3 w-3 text-white/30" />
              </Command.Item>

              <Command.Item 
                onSelect={() => runCommand(() => window.location.hash = '#experience')}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="h-4 w-4 text-white/40" />
                  <span>Go to Experience</span>
                </div>
                <CornerDownLeft className="h-3 w-3 text-white/30" />
              </Command.Item>

              <Command.Item 
                onSelect={() => runCommand(() => window.location.hash = '#projects')}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <FileCode className="h-4 w-4 text-white/40" />
                  <span>Go to Projects</span>
                </div>
                <CornerDownLeft className="h-3 w-3 text-white/30" />
              </Command.Item>
            </Command.Group>

            {/* Actions Group */}
            <Command.Group heading="System Actions" className="text-xs font-semibold tracking-wider text-purple/70 uppercase px-2 mt-2 mb-1">
              <Command.Item 
                onSelect={() => runCommand(() => setTheme(theme === 'dark' ? 'light' : 'dark'))}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4 text-purple" />}
                  <span>Switch Theme ({theme === 'dark' ? 'Light Mode' : 'Dark Mode'})</span>
                </div>
                <CornerDownLeft className="h-3 w-3 text-white/30" />
              </Command.Item>

              <Command.Item 
                onSelect={() => {
                  toggleSound();
                  setOpen(false);
                }}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  {soundEnabled ? <VolumeX className="h-4 w-4 text-red-400" /> : <Volume2 className="h-4 w-4 text-emerald-400" />}
                  <span>Toggle Sound Effects ({soundEnabled ? 'Disable' : 'Enable'})</span>
                </div>
                <CornerDownLeft className="h-3 w-3 text-white/30" />
              </Command.Item>

              <Command.Item 
                onSelect={() => runCommand(() => {
                  const a = document.createElement('a');
                  a.href = profile.resumeUrl;
                  a.download = 'Gokulakrishnan_Resume.pdf';
                  a.click();
                })}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <Download className="h-4 w-4 text-white/40" />
                  <span>Download Resume</span>
                </div>
                <CornerDownLeft className="h-3 w-3 text-white/30" />
              </Command.Item>
            </Command.Group>

            {/* Socials Group */}
            <Command.Group heading="Social Profiles" className="text-xs font-semibold tracking-wider text-white/40 uppercase px-2 mt-2 mb-1">
              <Command.Item 
                onSelect={() => runCommand(() => window.open('https://github.com/gokulakrishnan-s', '_blank'))}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <Github className="h-4 w-4 text-white/40" />
                  <span>GitHub Profile</span>
                </div>
                <CornerDownLeft className="h-3 w-3 text-white/30" />
              </Command.Item>

              <Command.Item 
                onSelect={() => runCommand(() => window.open('https://www.linkedin.com/in/gokulakrishnan-s', '_blank'))}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <Github className="h-4 w-4 text-white/40" /> {/* replace with linkedin icon color later if needed */}
                  <span>LinkedIn Connections</span>
                </div>
                <CornerDownLeft className="h-3 w-3 text-white/30" />
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}

// Global hook/toggle functions to trigger from outside
let openCommandPaletteGlobal: (() => void) | null = null;
export function openCommandPalette() {
  if (openCommandPaletteGlobal) {
    openCommandPaletteGlobal();
  }
}

// Provide a custom Wrapper that sets the global trigger
export function CommandPaletteTrigger({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    openCommandPaletteGlobal = () => {
      sounds.playClick();
      setShow(true);
    };
    return () => {
      openCommandPaletteGlobal = null;
    };
  }, []);

  return (
    <>
      {children}
      {show && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#050816]/75 backdrop-blur-md animate-fadeIn" onClick={() => { sounds.playClick(); setShow(false); }} />
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0c1223]/95 p-4 shadow-2xl shadow-cyan/20 animate-scaleIn">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent animate-shimmer-x" />
            <Command className="flex flex-col">
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <Search className="h-5 w-5 text-cyan shrink-0" />
                <Command.Input
                  autoFocus
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent text-sm text-white focus:outline-none"
                  onKeyDown={() => sounds.playTypewriter()}
                />
                <span className="hidden rounded bg-white/10 px-2 py-1 font-mono text-[10px] text-white/50 sm:inline-block">ESC</span>
              </div>
              <Command.List className="mt-3 max-h-72 overflow-y-auto scrollbar-hide flex flex-col gap-1">
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">No results found.</Command.Empty>
                <Command.Group heading="Navigation" className="text-xs font-semibold tracking-wider text-cyan/70 uppercase px-2 mb-1">
                  {[
                    { label: 'Go to Home', icon: Home, hash: '#home' },
                    { label: 'Go to About', icon: User, hash: '#about' },
                    { label: 'Go to Skills', icon: Laptop, hash: '#skills' },
                    { label: 'Go to Experience', icon: Briefcase, hash: '#experience' },
                    { label: 'Go to Projects', icon: FileCode, hash: '#projects' },
                    { label: 'Go to Contact', icon: Mail, hash: '#contact' },
                  ].map((item) => (
                    <Command.Item
                      key={item.hash}
                      onSelect={() => {
                        sounds.playClick();
                        window.location.hash = item.hash;
                        setShow(false);
                      }}
                      className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 text-white/40" />
                        <span>{item.label}</span>
                      </div>
                      <ArrowRight className="h-3 w-3 text-white/30" />
                    </Command.Item>
                  ))}
                </Command.Group>
                
                <Command.Group heading="System Actions" className="text-xs font-semibold tracking-wider text-purple/70 uppercase px-2 mt-2 mb-1">
                  <Command.Item
                    onSelect={() => {
                      sounds.playClick();
                      const { theme, setTheme } = require('next-themes');
                      // Note: dynamically trigger theme change or standard action
                      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
                      const target = currentTheme === 'dark' ? 'light' : 'dark';
                      document.documentElement.setAttribute('data-theme', target);
                      localStorage.setItem('theme', target);
                      // Dispatch synthetic event or let next-themes handle
                      window.dispatchEvent(new Event('theme-change'));
                      setShow(false);
                    }}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Sun className="h-4 w-4 text-yellow-400" />
                      <span>Toggle Dark / Light Theme</span>
                    </div>
                    <ArrowRight className="h-3 w-3 text-white/30" />
                  </Command.Item>

                  <Command.Item
                    onSelect={() => {
                      const nextState = !sounds.isEnabled();
                      sounds.setEnabled(nextState);
                      if (nextState) {
                        sounds.playSuccess();
                      } else {
                        sounds.playClick();
                      }
                      setShow(false);
                    }}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Volume2 className="h-4 w-4 text-emerald-400" />
                      <span>Toggle Cyber SFX (Audio)</span>
                    </div>
                    <ArrowRight className="h-3 w-3 text-white/30" />
                  </Command.Item>

                  <Command.Item
                    onSelect={() => {
                      sounds.playClick();
                      const a = document.createElement('a');
                      a.href = profile.resumeUrl;
                      a.download = 'Gokulakrishnan_Resume.pdf';
                      a.click();
                      setShow(false);
                    }}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Download className="h-4 w-4 text-white/40" />
                      <span>Download Resume (PDF)</span>
                    </div>
                    <ArrowRight className="h-3 w-3 text-white/30" />
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </div>
        </div>
      )}
    </>
  );
}
