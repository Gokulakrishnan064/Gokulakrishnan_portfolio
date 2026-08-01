'use client';

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  animate,
  type Variants,
} from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';

/* ---------- Variants ---------- */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: 'easeOut' } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const clipReveal: Variants = {
  hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  visible: { opacity: 1, clipPath: 'inset(0 0 0 0)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

/* ---------- Wrapper components ---------- */

type RevealProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'center' | 'left';
}) {
  return (
    <div
      className={`flex flex-col gap-4 ${
        align === 'center' ? 'items-center text-center' : 'items-start text-left'
      }`}
    >
      <Reveal>
        <span className="inline-flex items-center gap-2.5 rounded-full glass-light px-4 py-2 label-sm text-cyan/70">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-cyan" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
          </span>
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="display-lg text-white">{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.16}>
          <p
            className={`max-w-2xl text-base text-muted-foreground ${
              align === 'center' ? 'mx-auto' : ''
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- Animated Counter ---------- */

export function Counter({
  to,
  suffix = '',
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ---------- Parallax ---------- */

export function Parallax({
  children,
  offset = 100,
  className = '',
}: {
  children: ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/* ---------- Scroll progress bar ---------- */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[150] h-[3px] origin-left bg-gradient-to-r from-cyan via-purple to-cyan"
    />
  );
}
