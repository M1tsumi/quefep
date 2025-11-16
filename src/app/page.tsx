 import Image from 'next/image';
 import PepeMain from '@/app/assets/pepe-main.png';
 import CommitHistory from '@/app/components/CommitHistory';
 export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-black/10 dark:border-white/10/60">
        <div className="max-w-5xl mx-auto px-6 py-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Quef Central</h1>
          <p className="mt-2 text-sm text-black/70 dark:text-white/70 max-w-prose mx-auto">
            Portfolio for the projects of Quefep.
            <br />
            <span className="mt-2 text-sm text-black/70 dark:text-white/70 max-w-prose">
              A project by Quefep, for projects by Quefep!
            </span>
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
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
            <a href="/swiftdisc" aria-label="SwiftDisc Docs Badge">
              <img src="https://img.shields.io/badge/SwiftDisc-Docs-0ea5e9?style=for-the-badge" alt="SwiftDisc Docs" className="h-7" />
            </a>
            <a href="/caelum" aria-label="Caelum Docs Badge">
              <img src="https://img.shields.io/badge/Caelum-Docs-22c55e?style=for-the-badge" alt="Caelum Docs" className="h-7" />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
          <section>
            <h2 className="text-xl font-medium text-[#78B159]">Projects</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <article className="rounded-lg border border-[#78B15933] dark:border-[#78B15966] p-5 bg-black/10 dark:bg-black/40 hover:bg-[#78B1591f] dark:hover:bg-[#4A7C5940] transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold">SwiftDisc</h3>
                  <a
                    href="https://github.com/M1tsumi/SwiftDisc"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm px-3 py-1 rounded-full border border-[#78B15980] bg-[#78B159] text-black hover:bg-[#4A7C59] hover:border-[#4A7C59] transition-colors"
                  >
                    View Repo
                  </a>
                </div>
                <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                  A Swift native Discord API Wrapper!
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href="/swiftdisc"
                    className="text-xs uppercase tracking-wide px-3 py-1 rounded-full border border-[#0ea5e980] text-[#0ea5e9] hover:bg-[#0ea5e920]"
                  >
                    Docs
                  </a>
                  <a
                    href="/swiftdisc/getting-started"
                    className="text-xs uppercase tracking-wide px-3 py-1 rounded-full border border-[#78B15980] text-[#78B159] hover:bg-[#78B15920]"
                  >
                    Getting Started
                  </a>
                </div>
              </article>

              <article className="rounded-lg border border-[#78B15933] dark:border-[#78B15966] p-5 bg-black/10 dark:bg-black/40 hover:bg-[#78B1591f] dark:hover:bg-[#4A7C5940] transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold">Caelum</h3>
                  <a
                    href="https://github.com/M1tsumi/Caelum"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm px-3 py-1 rounded-full border border-[#78B15980] bg-[#78B159] text-black hover:bg-[#4A7C59] hover:border-[#4A7C59] transition-colors"
                  >
                    View Repo
                  </a>
                </div>
                <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                  The first Objective-C Discord API Wrapper!
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href="/caelum"
                    className="text-xs uppercase tracking-wide px-3 py-1 rounded-full border border-[#22c55e80] text-[#22c55e] hover:bg-[#22c55e20]"
                  >
                    Docs
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
          </section>

          <section>
            <div className="rounded-lg border border-[#78B15933] dark:border-[#78B15966] p-5 bg-black/10 dark:bg-black/40 hover:bg-[#78B1591f] dark:hover:bg-[#4A7C5940] transition-colors flex items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-medium">Join the Community</h3>
                <p className="mt-1 text-sm text-black/70 dark:text-white/70">Get updates, share ideas, and get support.</p>
              </div>
              <a
                href="https://discord.gg/6nS2KqxQtj"
                target="_blank"
                rel="noreferrer"
                className="text-sm px-4 py-2 rounded-full border border-[#78B15980] bg-[#78B159] text-black shadow-sm hover:bg-[#4A7C59] hover:border-[#4A7C59] hover:text-white transition-colors"
              >
                Join Server
              </a>
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
