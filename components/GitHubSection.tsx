'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Star,
  GitFork,
  Users,
  BookOpen,
  ArrowUpRight,
  Code2,
} from 'lucide-react';
import {
  Section,
  SectionHeader,
  fadeUp,
  staggerContainer,
  scaleIn,
} from '@/components/animations';
import { profile } from '@/lib/content';

type GitHubData = {
  profile: {
    login: string;
    name: string | null;
    avatar_url: string;
    bio: string | null;
    followers: number;
    following: number;
    public_repos: number;
    html_url: string;
    created_at: string;
  };
  repos: {
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stars: number;
    forks: number;
    topics: string[];
    pushed_at: string;
  }[];
  stats: {
    totalStars: number;
    totalForks: number;
    totalRepos: number;
    languages: { name: string; count: number; percent: number }[];
  };
  contributions: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[];
  topRepos: {
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stars: number;
    forks: number;
    topics: string[];
  }[];
};

const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  Java: '#b07219',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  'Jupyter Notebook': '#DA5B0B',
  'C++': '#f34b7d',
  C: '#555555',
};

const LEVEL_COLORS = [
  'bg-white/[0.04]',
  'bg-cyan/25',
  'bg-cyan/45',
  'bg-cyan/70',
  'bg-cyan',
];

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Star;
  label: string;
  value: number | string;
  accent: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative overflow-hidden rounded-2xl glass-card p-5 transition-all hover:border-cyan/30"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-cyan/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative flex items-center gap-3">
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl glass-light ${accent}`}>
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="font-display text-2xl font-bold text-white">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function GitHubSection() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/github')
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((d) => setData(d))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const weeks = data
    ? Array.from({ length: 53 }, (_, w) => data.contributions.slice(w * 7, w * 7 + 7))
    : [];

  return (
    <Section id="github" className="section-pad">
      <SectionHeader
        eyebrow="GitHub"
        title={
          <>
            Open source <span className="gradient-text">activity</span>
          </>
        }
        subtitle="Repositories, contributions, languages, and live stats from my GitHub."
      />

      {loading && (
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl glass-card" />
          ))}
        </div>
      )}

      {error && (
        <div className="mt-16 rounded-2xl glass-card p-8 text-center">
          <p className="text-muted-foreground">
            Live GitHub stats couldn&apos;t load right now.
          </p>
          <a
            href={`https://github.com/${profile.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan to-purple px-5 py-2.5 text-sm font-semibold text-[#050816]"
          >
            <Github className="h-4 w-4" />
            Visit my GitHub
          </a>
        </div>
      )}

      {data && !error && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 flex flex-col gap-6"
        >
          {/* Profile + stats */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <motion.div variants={fadeUp} className="relative overflow-hidden rounded-2xl glass-card p-6 lg:col-span-1">
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan/15 blur-3xl" />
              <div className="relative flex items-center gap-4">
                <img
                  src={data.profile.avatar_url}
                  alt={data.profile.login}
                  className="h-16 w-16 rounded-xl border border-white/10 object-cover"
                />
                <div>
                  <p className="font-display text-lg font-bold text-white">
                    {data.profile.name || data.profile.login}
                  </p>
                  <p className="text-sm text-cyan-glow">@{data.profile.login}</p>
                </div>
              </div>
              {data.profile.bio && (
                <p className="mt-4 text-sm text-muted-foreground">{data.profile.bio}</p>
              )}
              <a
                href={data.profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-cyan hover:underline"
              >
                View profile <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:col-span-2">
              <StatCard icon={BookOpen} label="Repositories" value={data.stats.totalRepos} accent="text-cyan" />
              <StatCard icon={Star} label="Total Stars" value={data.stats.totalStars} accent="text-yellow-400" />
              <StatCard icon={GitFork} label="Total Forks" value={data.stats.totalForks} accent="text-purple" />
              <StatCard icon={Users} label="Followers" value={data.profile.followers} accent="text-cyan" />
            </div>
          </div>

          {/* Contribution graph */}
          <motion.div variants={fadeUp} className="relative overflow-hidden rounded-2xl glass-card p-6">
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan/10 blur-3xl" />
            <div className="relative mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-white">Contribution Activity</h3>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span>Less</span>
                {LEVEL_COLORS.map((c, i) => (
                  <span key={i} className={`h-2.5 w-2.5 rounded-sm ${c}`} />
                ))}
                <span>More</span>
              </div>
            </div>
            <div className="relative overflow-x-auto scrollbar-hide">
              <div className="flex gap-1">
                {weeks.map((week, w) => (
                  <div key={w} className="flex flex-col gap-1">
                    {week.map((day) => (
                      <motion.div
                        key={day.date}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: w * 0.005 }}
                        className={`h-2.5 w-2.5 rounded-sm ${LEVEL_COLORS[day.level]}`}
                        title={`${day.date}: ${day.count} contributions`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Languages + repos */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <motion.div variants={fadeUp} className="relative overflow-hidden rounded-2xl glass-card p-6">
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-purple/15 blur-3xl" />
              <h3 className="relative mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
                <Code2 className="h-5 w-5 text-cyan" />
                Languages
              </h3>
              <div className="relative flex flex-col gap-3">
                {data.stats.languages.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-white/80">{lang.name}</span>
                      <span className="text-muted-foreground">{lang.percent}%</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: LANG_COLORS[lang.name] || '#22d3ee' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={staggerContainer} className="flex flex-col gap-3 lg:col-span-2">
              <h3 className="font-display text-lg font-bold text-white">Top Repositories</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {data.topRepos.map((repo) => (
                  <motion.a
                    key={repo.name}
                    variants={scaleIn}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col rounded-2xl glass-card p-4 transition-all hover:border-cyan/30 hover:glow-cyan"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-bold text-cyan">{repo.name}</span>
                      <ArrowUpRight className="h-4 w-4 text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" />
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">
                      {repo.description || 'No description provided'}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: LANG_COLORS[repo.language] || '#22d3ee' }}
                          />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" /> {repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="h-3 w-3" /> {repo.forks}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </Section>
  );
}
