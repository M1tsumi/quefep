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
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-black/10 dark:border-white/10/60">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1" />
            <div className="flex justify-center">
              <TotalCommitsBadge />
            </div>
            <div className="flex-1 flex justify-end" />
          </div>
          <div className="mt-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Quef Central</h1>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70 max-w-prose mx-auto">
              Portfolio for the projects of Quefep.
              <br />
              <span className="mt-2 text-sm text-black/70 dark:text-white/70 max-w-prose">
                A project by Quefep, for projects by Quefep!
              </span>
            </p>
            <div className="mt-6 flex flex-col items-center gap-3">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href="https://discord.com/users/1051142172130422884" target="_blank" rel="noreferrer" aria-label="Discord profile">
                  <img
                    src="https://img.shields.io/badge/Discord-Profile-5865F2?logo=discord&logoColor=white&style=for-the-badge"
                    alt="Discord profile badge"
                    className="h-7"
                  />
                </a>
                <a href="https://github.com/M1tsumi" target="_blank" rel="noreferrer" aria-label="GitHub profile">
                  <img
                    src="https://img.shields.io/badge/GitHub-M1tsumi-181717?logo=github&logoColor=white&style=for-the-badge"
                    alt="GitHub profile badge"
                    className="h-7"
                  />
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href="/swiftdisc" aria-label="SwiftDisc Docs Badge">
                  <img src="https://img.shields.io/badge/SwiftDisc-Docs-0ea5e9?style=for-the-badge" alt="SwiftDisc Docs" className="h-7" />
                </a>
                <a href="/caelum" aria-label="Caelum Docs Badge">
                  <img src="https://img.shields.io/badge/Caelum-Docs-22c55e?style=for-the-badge" alt="Caelum Docs" className="h-7" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
          <section>
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#78B159]">Featured Projects</h2>
              <span className="mt-2 block text-xs sm:text-sm uppercase tracking-wide text-black/50 dark:text-white/50">
                Powerful Discord libraries, crafted for Apple platforms.
              </span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.35fr)] items-start">
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <article className="rounded-xl border border-[#78B15933] dark:border-[#78B15966] bg-black/5 dark:bg-black/40 px-6 py-5 flex flex-col h-full shadow-sm hover:shadow-md hover:border-[#78B15966] hover:bg-[#78B15910] dark:hover:bg-[#4A7C5930] transition-colors transition-shadow">
                    <header className="flex flex-col gap-1">
                      <h3 className="text-lg font-semibold">SwiftDisc</h3>
                      <p className="text-xs text-black/60 dark:text-white/60">
                        Native Swift Discord API for iOS & macOS bots.
                      </p>
                    </header>
                    {swiftDiscRepo && (
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-black/60 dark:text-white/60">
                        <span>★ {swiftDiscRepo.stars}</span>
                        <span>Forks {swiftDiscRepo.forks}</span>
                        <span>Issues {swiftDiscRepo.issues}</span>
                      </div>
                    )}
                    <div className="mt-4 rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/[0.02] p-3 space-y-3 flex-1">
                      <p className="text-sm text-black/70 dark:text-white/70">
                        Zero-dependency library with async/await, typed models, and full v10 REST + Gateway support.
                      </p>
                      <div className="flex flex-wrap gap-2 text-[11px] text-black/70 dark:text-white/70">
                        <span className="rounded-full bg-black/10 dark:bg-white/5 px-3 py-1">Async/Await</span>
                        <span className="rounded-full bg-black/10 dark:bg-white/5 px-3 py-1">Zero Dependencies</span>
                        <span className="rounded-full bg-black/10 dark:bg-white/5 px-3 py-1">Type-Safe Models</span>
                        <span className="rounded-full bg-black/10 dark:bg-white/5 px-3 py-1">Gateway v10</span>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-2 text-[11px] text-black/60 dark:text-white/60">
                        <a
                          href="/swiftdisc"
                          className="hover:text-[#0ea5e9] underline-offset-2 hover:underline"
                        >
                          Docs
                        </a>
                        <span className="hidden sm:inline text-black/40 dark:text-white/40">·</span>
                        <a
                          href="/swiftdisc/getting-started"
                          className="hover:text-[#0ea5e9] underline-offset-2 hover:underline"
                        >
                          Getting Started
                        </a>
                      </div>
                      <a
                        href="https://github.com/M1tsumi/SwiftDisc"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-[#78B159] px-4 py-2 text-xs font-medium text-black hover:bg-[#4A7C59] hover:text-white transition-colors w-full sm:w-auto"
                      >
                        View on GitHub
                      </a>
                    </div>
                  </article>

                  <article className="rounded-xl border border-[#78B15933] dark:border-[#78B15966] bg-black/5 dark:bg-black/40 px-6 py-5 flex flex-col h-full shadow-sm hover:shadow-md hover:border-[#78B15966] hover:bg-[#78B15910] dark:hover:bg-[#4A7C5930] transition-colors transition-shadow">
                    <header className="flex flex-col gap-1">
                      <h3 className="text-lg font-semibold">Caelum</h3>
                      <p className="text-xs text-black/60 dark:text-white/60">
                        Objective-C native Discord automation toolkit.
                      </p>
                    </header>
                    {caelumRepo && (
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-black/60 dark:text-white/60">
                        <span>★ {caelumRepo.stars}</span>
                        <span>Forks {caelumRepo.forks}</span>
                        <span>Issues {caelumRepo.issues}</span>
                      </div>
                    )}
                    <div className="mt-4 rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/[0.02] p-3 space-y-3 flex-1">
                      <p className="text-sm text-black/70 dark:text-white/70">
                        Built for long-running bots with shard management, robust rate limiting, and familiar Foundation
                        patterns.
                      </p>
                      <div className="flex flex-wrap gap-2 text-[11px] text-black/70 dark:text-white/70">
                        <span className="rounded-full bg-black/10 dark:bg-white/5 px-3 py-1">Pure Objective-C</span>
                        <span className="rounded-full bg-black/10 dark:bg-white/5 px-3 py-1">Gateway v10</span>
                        <span className="rounded-full bg-black/10 dark:bg-white/5 px-3 py-1">REST API</span>
                        <span className="rounded-full bg-black/10 dark:bg-white/5 px-3 py-1">Zero Swift Dependencies</span>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-2 text-[11px] text-black/60 dark:text-white/60">
                        <a
                          href="/caelum"
                          className="hover:text-[#22c55e] underline-offset-2 hover:underline"
                        >
                          Docs
                        </a>
                        <span className="hidden sm:inline text-black/40 dark:text-white/40">·</span>
                        <a
                          href="/caelum/getting-started"
                          className="hover:text-[#22c55e] underline-offset-2 hover:underline"
                        >
                          Getting Started
                        </a>
                      </div>
                      <a
                        href="https://github.com/M1tsumi/Caelum"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-[#78B159] px-4 py-2 text-xs font-medium text-black hover:bg-[#4A7C59] hover:text-white transition-colors w-full sm:w-auto"
                      >
                        View on GitHub
                      </a>
                    </div>
                  </article>
                </div>
              </div>

              <div className="rounded-xl border border-[#78B15933] dark:border-[#78B15966] bg-black/5 dark:bg-black/30 px-6 py-5 flex flex-col h-full shadow-sm hover:shadow-md hover:border-[#78B15966] transition-colors transition-shadow">
                <header className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">Quef Central Discord</h3>
                    <p className="mt-1 text-xs text-black/60 dark:text-white/60">
                      Sliding into the frog pond? Tap the invite below.
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-[#5865F280] bg-[#5865F210] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-[#5865F2]">
                    Community
                  </span>
                </header>
                <div className="mt-4 flex-1 rounded-lg border border-black/10 dark:border-white/10 bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617] px-4 py-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-white">
                    <span className="font-medium">Quef Central</span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#22c55e]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
                      Online
                    </span>
                  </div>
                  <div className="mt-3 text-[11px] text-white/70">
                    <p>Home base for SwiftDisc and Caelum users, release notes, and low-noise chat.</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-white/60">
                    <span>Text & voice channels</span>
                    <span>Friendly, moderated</span>
                  </div>
                </div>
                <a
                  href="https://discord.gg/6nS2KqxQtj"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-[#5865F2] px-4 py-2 text-xs font-medium text-white hover:bg-[#4752C4] transition-colors w-full"
                  aria-label="Join the Quef Central Discord server"
                >
                  Join Server
                </a>
              </div>
            </div>
          </section>

          <CommitHistory />
        </div>
      </main>

      <footer className="border-t border-black/10 dark:border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="text-xs text-black/60 dark:text-white/60">© {new Date().getFullYear()} Quef Central</div>
          <Image src={PepeMain} alt="Pepe" className="h-10 w-auto transform transition-transform duration-300 hover:-translate-y-1 hover:-rotate-3" />
        </div>
      </footer>
    </div>
  );
}

