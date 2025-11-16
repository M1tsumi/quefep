 import type { ReactNode } from 'react';
 import Image from 'next/image';
 import PepeEvil from '@/app/assets/pepe-evil.png';
 export default function SwiftDiscLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="hidden md:block w-72 shrink-0 border-r border-black/10 dark:border-white/10 p-6 sticky top-0 h-screen overflow-y-auto">
        <div className="text-xl font-semibold">SwiftDisc Docs</div>
        <div className="mt-2 text-xs text-black/60 dark:text-white/60">Fast, ergonomic Swift Discord library</div>
        <div className="mt-4">
          <Image src={PepeEvil} alt="Pepe" className="rounded-md" placeholder="empty" />
        </div>
        <nav className="mt-6 space-y-2 text-sm">
          <a href="/swiftdisc" className="block hover:underline">Overview</a>
          <a href="/swiftdisc/getting-started" className="block hover:underline">Getting Started</a>
          <div className="mt-4 text-[10px] uppercase tracking-wide text-black/60 dark:text-white/60">API Reference</div>
          <a href="/swiftdisc/api" className="block hover:underline">Index</a>
          <a href="/swiftdisc/api/client" className="block hover:underline">Client</a>
          <a href="/swiftdisc/api/rest" className="block hover:underline">REST</a>
          <a href="/swiftdisc/api/gateway" className="block hover:underline">Gateway</a>
          <a href="/swiftdisc/api/models" className="block hover:underline">Models</a>
          <a href="/swiftdisc/api/errors" className="block hover:underline">Errors</a>
          <a href="/swiftdisc/api/utils" className="block hover:underline">Utils</a>
          <div className="mt-4 text-[10px] uppercase tracking-wide text-black/60 dark:text-white/60">Resources</div>
          <a href="/swiftdisc/faq" className="block hover:underline">FAQ</a>
          <a href="/swiftdisc/changelog" className="block hover:underline">Changelog</a>
        </nav>
      </aside>
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <header className="mb-6 pb-4 border-b border-black/10 dark:border-white/10">
            <h1 className="text-2xl font-semibold">SwiftDisc Documentation</h1>
            <p className="mt-1 text-sm text-black/60 dark:text-white/60">Guides, API reference, and examples to build Discord bots with Swift.</p>
          </header>
          <div className="prose dark:prose-invert max-w-none">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
