'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { ScrollProgress } from '@/components/animations';
import { ThemeProvider } from 'next-themes';

const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false });
const CommandPaletteTrigger = dynamic(() => import('@/components/CommandPalette').then(mod => mod.CommandPaletteTrigger), { ssr: false });
const DeveloperConsole = dynamic(() => import('@/components/DeveloperConsole'), { ssr: false });
const GokulAIChat = dynamic(() => import('@/components/GokulAIChat'), { ssr: false });
const NeuralBackground = dynamic(() => import('@/components/NeuralBackground'), { ssr: false });
const Cursor = dynamic(() => import('@/components/Cursor'), { ssr: false });
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const About = dynamic(() => import('@/components/About'), { ssr: false });
const Skills = dynamic(() => import('@/components/Skills'), { ssr: false });
const Experience = dynamic(() => import('@/components/Experience'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects'), { ssr: false });
const CodingProfiles = dynamic(() => import('@/components/CodingProfiles'), { ssr: false });
const Certifications = dynamic(() => import('@/components/Certifications'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleOpenChat = () => {
      setIsChatOpen(true);
    };
    window.addEventListener('open-ai-chat', handleOpenChat);
    return () => {
      window.removeEventListener('open-ai-chat', handleOpenChat);
    };
  }, []);

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
      <CommandPaletteTrigger>
        <main className="relative min-h-screen w-full overflow-x-hidden">
          <LoadingScreen onDone={() => setLoaded(true)} />
          <Cursor />
          <div className="ambient-orbs" />

          {loaded && (
            <>
              <NeuralBackground />
              <ScrollProgress />
              <Navbar />
              <Hero />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <CodingProfiles />
              <Certifications />
              <Contact />
              <Footer />
              <DeveloperConsole />
              <GokulAIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
            </>
          )}
        </main>
      </CommandPaletteTrigger>
    </ThemeProvider>
  );
}
