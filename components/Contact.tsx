'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Phone, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { profile, socials } from '@/lib/content';
import { sounds } from '@/lib/sounds';
import {
  Section,
  SectionHeader,
  fadeUp,
  staggerContainer,
  slideInLeft,
  slideInRight,
} from '@/components/animations';

const EarthScene = dynamic(() => import('@/components/three/EarthScene'), { ssr: false });

type Status = 'idle' | 'loading' | 'success' | 'error';

const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const saved = localStorage.getItem('gokulos_contact_form');
    if (saved) {
      try {
        setForm(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleInputChange = (field: string, val: string) => {
    sounds.playTypewriter();
    const updated = { ...form, [field]: val };
    setForm(updated);
    localStorage.setItem('gokulos_contact_form', JSON.stringify(updated));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    sounds.playClick();

    try {
      if (EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID) {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_name: profile.name,
        });
      } else {
        await new Promise((r) => setTimeout(r, 1200));
      }
      sounds.playSuccess();
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      localStorage.removeItem('gokulos_contact_form');
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const inputBase =
    'w-full rounded-xl glass px-4 py-3.5 text-sm text-white placeholder:text-white/30 transition-all focus:border-cyan/50 focus:outline-none focus:ring-2 focus:ring-cyan/20';

  const contactItems = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}`, accent: 'text-cyan' },
    { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}`, accent: 'text-purple' },
    { icon: MapPin, label: 'Location', value: profile.location, href: '#', accent: 'text-cyan' },
  ];

  return (
    <Section id="contact" className="relative section-pad overflow-hidden">
      {/* Immersive Background grid + glowing orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-overlay opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-screen bg-cover bg-center" style={{ backgroundImage: "url('/ai_circuits.jpg')" }} />
        <div className="absolute -left-[10%] top-[20%] w-[45vw] h-[45vw] rounded-full bg-cyan/5 blur-[120px] animate-float" />
        <div className="absolute -right-[10%] bottom-[10%] w-[40vw] h-[40vw] rounded-full bg-purple/5 blur-[120px] animate-pulse-ring" />
      </div>

      <SectionHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s <span className="gradient-text">connect</span>
          </>
        }
        subtitle="Reach out for collaborations, opportunities, or just a developer chat."
      />

      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left: info + 3D earth + socials */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col gap-6"
        >
          <motion.div variants={slideInLeft} className="group relative overflow-hidden rounded-3xl glass-card p-8">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan/15 blur-3xl" />
            <div 
              className="absolute inset-0 z-0 opacity-[0.06] transition-transform duration-700 group-hover:scale-110 bg-cover bg-center" 
              style={{ backgroundImage: "url('/developer_profile.jpg')" }} 
            />

            <h3 className="relative z-10 font-display text-xl font-bold text-white">Get in touch</h3>
            <p className="relative z-10 mt-2 text-sm text-muted-foreground">
              I&apos;m open to AI/ML roles, internships, freelance projects, and collaborations.
            </p>

            {/* contact items */}
            <div className="relative z-10 mt-6 flex flex-col gap-3">
              {contactItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-cyan/30"
                  >
                    <span className={`flex h-10 w-10 items-center justify-center rounded-lg glass-light ${item.accent}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="truncate text-sm font-medium text-white">{item.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* socials */}
            <div className="relative z-10 mt-6">
              <p className="mb-3 label-sm text-white/40">Follow me</p>
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
                      className="flex h-11 w-11 items-center justify-center rounded-xl glass-light transition-all hover:-translate-y-1 hover:border-cyan/40"
                    >
                      <Icon className="h-5 w-5 text-white/60 transition-colors hover:text-cyan" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* 3D Earth */}
          <motion.div variants={slideInLeft} className="relative h-64 overflow-hidden rounded-3xl glass-card">
            <EarthScene />
            <div className="pointer-events-none absolute bottom-4 left-4">
              <p className="label-sm text-cyan/60">Global Reach</p>
              <p className="text-sm font-medium text-white/80">Open to remote &amp; on-site</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: form */}
        <motion.form
          variants={slideInRight}
          onSubmit={handleSubmit}
          className="group relative overflow-hidden flex flex-col gap-4 rounded-3xl glass-card p-8"
        >
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-purple/15 blur-3xl" />
          <div 
            className="absolute inset-0 z-0 opacity-[0.06] transition-transform duration-700 group-hover:scale-110 bg-cover bg-center" 
            style={{ backgroundImage: "url('/profile_banner.jpg')" }} 
          />

          <div className="relative z-10 flex flex-col gap-2">
            <label htmlFor="name" className="label-sm text-white/50">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Jane Doe"
              className={inputBase}
            />
          </div>

          <div className="relative z-10 flex flex-col gap-2">
            <label htmlFor="email" className="label-sm text-white/50">
              Your Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="jane@company.com"
              className={inputBase}
            />
          </div>

          <div className="relative z-10 flex flex-col gap-2">
            <label htmlFor="message" className="label-sm text-white/50">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Tell me about your project or role..."
              className={`${inputBase} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="group mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan to-purple px-6 py-4 text-sm font-semibold text-[#050816] shadow-lg shadow-cyan/25 transition-all hover:scale-[1.02] disabled:opacity-60"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                Send Message
              </>
            )}
          </button>

          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-400"
              >
                <CheckCircle2 className="h-4 w-4" />
                Message sent! I&apos;ll get back to you soon.
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400"
              >
                <AlertCircle className="h-4 w-4" />
                Something went wrong. Please try emailing me directly.
              </motion.div>
            )}
          </AnimatePresence>

          {!EMAILJS_PUBLIC_KEY && (
            <p className="text-xs text-muted-foreground">
              Tip: connect EmailJS to deliver messages straight to my inbox.
            </p>
          )}
        </motion.form>
      </div>
    </Section>
  );
}
