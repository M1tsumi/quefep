import Image from 'next/image';
import PepeMain from '@/app/assets/pepe-main.png';
import CommitHistory from '@/app/components/CommitHistory';
import TotalCommitsBadge from '@/app/components/TotalCommitsBadge';

interface GithubRepoSummary {
  stars: number;
  forks: number;
  issues: number;
}

async function fetchRepoSummary(repo: string): Promise<GithubRepoSummary | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    });

    if (!res.ok) return null;

    const data = (await res.json()) as {
      stargazers_count?: number;
      forks_count?: number;
      open_issues_count?: number;
    };

    return {
      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
      issues: data.open_issues_count ?? 0,
    };
  } catch {
    return null;
  }
}

export default async function Home() {
  const [swiftDiscRepo, caelumRepo] = await Promise.all([
    fetchRepoSummary('M1tsumi/SwiftDisc'),
    fetchRepoSummary('M1tsumi/Caelum'),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0a0a0a]">
      <header className="border-b border-black/10 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1" />
            <div className="flex justify-center">
              <TotalCommitsBadge />
            </div>
            <div className="flex-1 flex justify-end" />
          </div>
          <div className="mt-10 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Quef Central</h1>
            <p className="mt-4 text-base text-black/60 dark:text-white/60 max-w-2xl mx-auto">
              Discord API libraries and developer tools for Swift and Objective-C.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href="https://discord.com/users/1051142172130422884" target="_blank" rel="noreferrer" aria-label="Discord profile">
                  <img
                    src="https://img.shields.io/badge/Discord-Profile-5865F2?logo=discord&logoColor=white&style=for-the-badge"
                    alt="Discord profile badge"
                    className="h-8"
                  />
                </a>
                <a href="https://github.com/M1tsumi" target="_blank" rel="noreferrer" aria-label="GitHub profile">
                  <img
                    src="https://img.shields.io/badge/GitHub-M1tsumi-181717?logo=github&logoColor=white&style=for-the-badge"
                    alt="GitHub profile badge"
                    className="h-8"
                  />
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href="/swiftdisc" aria-label="SwiftDisc Docs Badge">
                  <img src="https://img.shields.io/badge/SwiftDisc-Docs-0ea5e9?style=for-the-badge" alt="SwiftDisc Docs" className="h-8" />
                </a>
                <a href="/caelum" aria-label="Caelum Docs Badge">
                  <img src="https://img.shields.io/badge/Caelum-Docs-22c55e?style=for-the-badge" alt="Caelum Docs" className="h-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
          {/* Projects Section */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Projects</h2>
              <p className="mt-3 text-sm text-black/60 dark:text-white/60">
                Production-ready Discord libraries for Apple platforms
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* SwiftDisc Card */}
              <article className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.02] p-8 hover:border-[#0ea5e9]/50 dark:hover:border-[#0ea5e9]/50 hover:shadow-xl hover:shadow-[#0ea5e9]/5 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold group-hover:text-[#0ea5e9] transition-colors">SwiftDisc</h3>
                    <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                      Modern Discord API wrapper for Swift
                    </p>
                  </div>
                  {swiftDiscRepo && (
                    <div className="flex items-center gap-3 text-xs text-black/50 dark:text-white/50">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {swiftDiscRepo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {swiftDiscRepo.forks}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <p className="text-sm leading-relaxed text-black/70 dark:text-white/70">
                    Native async/await Discord API client with zero dependencies. Full REST and Gateway v10 support with type-safe models.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {['Async/Await', 'Zero Dependencies', 'Type-Safe', 'Gateway v10'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center justify-between gap-4">
                    <div className="flex gap-4 text-sm">
                      <a href="/swiftdisc" className="text-[#0ea5e9] hover:underline">
                        Docs
                      </a>
                      <a href="/swiftdisc/getting-started" className="text-black/60 dark:text-white/60 hover:text-[#0ea5e9] dark:hover:text-[#0ea5e9]">
                        Get Started
                      </a>
                    </div>
                    <a
                      href="https://github.com/M1tsumi/SwiftDisc"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 text-sm font-medium rounded-lg bg-[#0ea5e9] text-white hover:bg-[#0284c7] transition-colors"
                    >
                      GitHub →
                    </a>
                  </div>
                </div>
              </article>

              {/* Caelum Card */}
              <article className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.02] p-8 hover:border-[#22c55e]/50 dark:hover:border-[#22c55e]/50 hover:shadow-xl hover:shadow-[#22c55e]/5 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold group-hover:text-[#22c55e] transition-colors">Caelum</h3>
                    <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                      Discord automation for Objective-C
                    </p>
                  </div>
                  {caelumRepo && (
                    <div className="flex items-center gap-3 text-xs text-black/50 dark:text-white/50">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {caelumRepo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {caelumRepo.forks}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <p className="text-sm leading-relaxed text-black/70 dark:text-white/70">
                    Production-ready Objective-C library with shard management, robust rate limiting, and familiar Foundation patterns for long-running bots.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {['Pure Objective-C', 'Gateway v10', 'REST API', 'Zero Swift Deps'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center justify-between gap-4">
                    <div className="flex gap-4 text-sm">
                      <a href="/caelum" className="text-[#22c55e] hover:underline">
                        Docs
                      </a>
                      <a href="/caelum/getting-started" className="text-black/60 dark:text-white/60 hover:text-[#22c55e] dark:hover:text-[#22c55e]">
                        Get Started
                      </a>
                    </div>
                    <a
                      href="https://github.com/M1tsumi/Caelum"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 text-sm font-medium rounded-lg bg-[#22c55e] text-white hover:bg-[#16a34a] transition-colors"
                    >
                      GitHub →
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </section>

          {/* Community Section */}
          <section>
            <div className="max-w-3xl mx-auto">
              <article className="group rounded-2xl border border-[#5865F2]/20 dark:border-[#5865F2]/30 bg-gradient-to-br from-[#5865F2]/5 via-transparent to-transparent dark:from-[#5865F2]/10 p-8 hover:border-[#5865F2]/50 dark:hover:border-[#5865F2]/50 hover:shadow-xl hover:shadow-[#5865F2]/10 transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold">Discord Community</h3>
                      <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-[#5865F2]/20 text-[#5865F2]">
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-black/60 dark:text-white/60">
                      Join the community for support, updates, and discussions
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-[#1e1f22] to-[#2b2d31] p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white font-semibold">Quef Central</span>
                    <div className="flex items-center gap-2 text-sm text-[#22c55e]">
                      <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                      Online
                    </div>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed mb-4">
                    Get help with SwiftDisc and Caelum, stay updated on releases, and connect with other developers building Discord bots.
                  </p>
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>Text & voice channels</span>
                    <span>Moderated community</span>
                  </div>
                </div>

                <a
                  href="https://discord.gg/6nS2KqxQtj"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 text-sm font-semibold rounded-lg bg-[#5865F2] text-white hover:bg-[#4752C4] transition-colors"
                  aria-label="Join the Quef Central Discord server"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  Join Discord Server
                </a>
              </article>
            </div>
          </section>

          <CommitHistory />
        </div>
      </main>

      <footer className="border-t border-black/10 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="text-sm text-black/60 dark:text-white/60">
            © {new Date().getFullYear()} Quef Central
          </div>
          <Image 
            src={PepeMain} 
            alt="Pepe" 
            className="h-12 w-auto opacity-80 hover:opacity-100 transform transition-all duration-300 hover:-translate-y-1 hover:scale-110" 
          />
        </div>
      </footer>
    </div>
  );
}