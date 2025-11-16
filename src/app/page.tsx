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
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-[#78B159]">Projects</h2>
              <span className="text-xs uppercase tracking-wide text-black/50 dark:text-white/50">Docs • Repo • Get Started</span>
            </div>
            <div className="mt-4 grid gap-6 lg:grid-cols-3 items-stretch">
              <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2 auto-rows-fr">
                <article className="rounded-lg border border-[#78B15933] dark:border-[#78B15966] p-5 bg-black/10 dark:bg-black/40 hover:bg-[#78B1591f] dark:hover:bg-[#4A7C5940] transition-colors flex flex-col h-full">
                  <h3 className="text-lg font-semibold">SwiftDisc</h3>
                  <p className="mt-2 text-sm text-black/70 dark:text-white/70 flex-1">A Swift native Discord API wrapper.</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                      <a
                        href="/swiftdisc"
                        className="text-xs uppercase tracking-wide px-3 py-1 rounded-full border border-[#0ea5e980] text-[#0ea5e9] hover:bg-[#0ea5e920]"
                      >
                        Docs
                      </a>
                      <a
                        href="https://github.com/M1tsumi/SwiftDisc"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs uppercase tracking-wide px-3 py-1 rounded-full border border-[#78B15980] text-black bg-[#78B159] hover:bg-[#4A7C59] hover:text-white"
                      >
                        Repo
                      </a>
                      <a
                        href="/swiftdisc/getting-started"
                        className="text-xs uppercase tracking-wide px-3 py-1 rounded-full border border-[#78B15980] text-[#78B159] hover:bg-[#78B15920]"
                      >
                        Getting Started
                      </a>
                    </div>
                  </article>

                <article className="rounded-lg border border-[#78B15933] dark:border-[#78B15966] p-5 bg-black/10 dark:bg-black/40 hover:bg-[#78B1591f] dark:hover.bg-[#4A7C5940] transition-colors flex flex-col h-full">
                  <h3 className="text-lg font-semibold">Caelum</h3>
                  <p className="mt-2 text-sm text-black/70 dark:text-white/70 flex-1">Objective-C first Discord automation toolkit.</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                      <a
                        href="/caelum"
                        className="text-xs uppercase tracking-wide px-3 py-1 rounded-full border border-[#22c55e80] text-[#22c55e] hover:bg-[#22c55e20]"
                      >
                        Docs
                      </a>
                      <a
                        href="https://github.com/M1tsumi/Caelum"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs uppercase tracking-wide px-3 py-1 rounded-full border border-[#78B15980] text-black bg-[#78B159] hover:bg-[#4A7C59] hover:text-white"
                      >
                        Repo
                      </a>
                      <a
                        href="/caelum/getting-started"
                        className="text-xs uppercase tracking-wide px-3 py-1 rounded-full border border-[#78B15980] text-[#78B159] hover:bg-[#78B15920]"
                      >
                        Getting Started
                      </a>
                  </div>
                </article>
              </div>

              <div className="rounded-lg border border-[#78B15933] dark:border-[#78B15966] bg-black/5 dark:bg-black/30 p-5 flex flex-col h-full">
                <h3 className="text-base font-medium text-center">Quef Central Discord</h3>
                <p className="mt-1 text-sm text-black/70 dark:text-white/70 text-center">Sliding into the frog pond? Tap the invite below.</p>
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
