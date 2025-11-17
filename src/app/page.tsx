 import Image from 'next/image';
import PepeMain from '@/app/assets/pepe-main.png';
import CommitHistory from '@/app/components/CommitHistory';
import TotalCommitsBadge from '@/app/components/TotalCommitsBadge';

export default function Home() {
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
                    <header className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold">SwiftDisc</h3>
                        <p className="mt-1 text-xs text-black/60 dark:text-white/60">
                          Native Swift Discord API for iOS & macOS bots.
                        </p>
                      </div>
                      <span className="inline-flex items-center rounded-full border border-[#0ea5e980] bg-[#0ea5e910] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-[#0ea5e9]">
                        Swift
                      </span>
                    </header>
                    <p className="mt-4 text-sm text-black/70 dark:text-white/70 flex-1">
                      Zero-dependency library with async/await, typed models, and full v10 REST + Gateway support.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-black/70 dark:text-white/70">
                      <span className="rounded-full bg-black/10 dark:bg-white/5 px-3 py-1">Async/Await</span>
                      <span className="rounded-full bg-black/10 dark:bg-white/5 px-3 py-1">Zero Dependencies</span>
                      <span className="rounded-full bg-black/10 dark:bg-white/5 px-3 py-1">Type-Safe Models</span>
                      <span className="rounded-full bg-black/10 dark:bg-white/5 px-3 py-1">Gateway v10</span>
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
                    <header className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold">Caelum</h3>
                        <p className="mt-1 text-xs text-black/60 dark:text-white/60">
                          Objective-C native Discord automation toolkit.
                        </p>
                      </div>
                      <span className="inline-flex items-center rounded-full border border-[#22c55e80] bg-[#22c55e10] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-[#22c55e]">
                        Objective-C
                      </span>
                    </header>
                    <p className="mt-4 text-sm text-black/70 dark:text-white/70 flex-1">
                      Built for long-running bots with shard management, robust rate limiting, and familiar Foundation
                      patterns.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-black/70 dark:text-white/70">
                      <span className="rounded-full bg-black/10 dark:bg-white/5 px-3 py-1">Pure Objective-C</span>
                      <span className="rounded-full bg-black/10 dark:bg-white/5 px-3 py-1">Gateway v10</span>
                      <span className="rounded-full bg-black/10 dark:bg-white/5 px-3 py-1">REST API</span>
                      <span className="rounded-full bg-black/10 dark:bg-white/5 px-3 py-1">Zero Swift Dependencies</span>
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

              <div className="rounded-xl border border-[#78B15933] dark:border-[#78B15966] bg-black/5 dark:bg-black/30 px-5 py-6 flex flex-col h-full">
                <h3 className="text-base font-medium text-center">Quef Central Discord</h3>
                <p className="mt-1 text-sm text-black/70 dark:text-white/70 text-center">
                  Sliding into the frog pond? Tap the invite below.
                </p>
                <div className="mt-4 flex-1 flex items-center justify-center">
                  <a
                    href="https://discord.gg/6nS2KqxQtj"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full max-w-sm block"
                    aria-label="Join the Quef Central Discord server"
                  >
                    <img
                      src="https://invidget.switchblade.xyz/6nS2KqxQtj"
                      alt="Discord invite for Quef Central"
                      className="w-full rounded-2xl border border-black/10 dark:border-white/10 shadow-lg dark:shadow-black/40"
                      loading="lazy"
                    />
                  </a>
                </div>
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

