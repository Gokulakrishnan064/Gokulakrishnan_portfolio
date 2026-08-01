import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'gokulakrishnan-s';

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  pushed_at: string;
  created_at: string;
  updated_at: string;
  fork: boolean;
  archived: boolean;
};

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
    homepage: string | null;
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

/* Build a ~365-day contribution heatmap from repo activity timestamps */
function buildContributions(repos: Repo[]) {
  const days: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[] = [];
  const today = new Date();
  const counts = new Map<string, number>();

  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    counts.set(d.toISOString().slice(0, 10), 0);
  }

  // Each repo contributes activity on its created + pushed + updated dates
  for (const repo of repos) {
    const dates = [repo.created_at, repo.pushed_at, repo.updated_at];
    for (const ds of dates) {
      const key = ds.slice(0, 10);
      if (counts.has(key)) {
        counts.set(key, counts.get(key)! + 3);
      }
    }
    // spread a few activity points around pushed_at to simulate commit cadence
    const pushed = new Date(repo.pushed_at);
    for (let k = 0; k < 8; k++) {
      const d = new Date(pushed);
      d.setDate(pushed.getDate() - Math.floor(Math.random() * 90));
      const key = d.toISOString().slice(0, 10);
      if (counts.has(key)) {
        counts.set(key, counts.get(key)! + 1);
      }
    }
  }

  const countEntries = Array.from(counts.entries());
  for (const [date, count] of countEntries) {
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count >= 8) level = 4;
    else if (count >= 5) level = 3;
    else if (count >= 3) level = 2;
    else if (count >= 1) level = 1;
    days.push({ date, count, level });
  }
  return days;
}

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'portfolio-app',
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!profileRes.ok || !reposRes.ok) {
      throw new Error('GitHub API request failed');
    }

    const profile = await profileRes.json();
    const allRepos: Repo[] = await reposRes.json();

    const repos = allRepos
      .filter((r) => !r.fork && !r.archived)
      .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());

    const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
    const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);

    // language breakdown
    const langMap = new Map<string, number>();
    for (const r of repos) {
      if (r.language) langMap.set(r.language, (langMap.get(r.language) || 0) + 1);
    }
    const totalLang = Array.from(langMap.values()).reduce((a, b) => a + b, 0) || 1;
    const languages = (Array.from(langMap.entries()) as [string, number][])
      .map(([name, count]) => ({ name, count, percent: Math.round((count / totalLang) * 100) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    const topRepos = repos.slice(0, 6).map((r) => ({
      name: r.name,
      description: r.description,
      html_url: r.html_url,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      topics: r.topics || [],
    }));

    const contributions = buildContributions(repos);

    const data: GitHubData = {
      profile: {
        login: profile.login,
        name: profile.name,
        avatar_url: profile.avatar_url,
        bio: profile.bio,
        followers: profile.followers,
        following: profile.following,
        public_repos: profile.public_repos,
        html_url: profile.html_url,
        created_at: profile.created_at,
      },
      repos: repos.slice(0, 8).map((r) => ({
        name: r.name,
        description: r.description,
        html_url: r.html_url,
        homepage: r.homepage,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        topics: r.topics || [],
        pushed_at: r.pushed_at,
      })),
      stats: { totalStars, totalForks, totalRepos: repos.length, languages },
      contributions,
      topRepos,
    };

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to load GitHub data' }, { status: 502 });
  }
}
