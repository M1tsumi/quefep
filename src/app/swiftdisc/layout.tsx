 import type { ReactNode } from 'react';
 import Image from 'next/image';
 import PepeEvil from '@/app/assets/pepe-evil.png';
 import Toc from '@/app/components/Toc';
 export default function SwiftDiscLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="hidden md:block w-72 shrink-0 border-r border-black/10 dark:border-white/10 p-6 sticky top-0 h-screen overflow-y-auto">
        <a href="/" className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-black/10 dark:border-white/15 hover:bg-black/[.05] dark:hover:bg-white/[.06]">Home</a>
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
        <div className="border-b border-black/10 dark:border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 bg-white/70 dark:bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-black/30 z-10">
          <div className="text-sm text-black/60 dark:text-white/60">SwiftDisc Documentation</div>
          <a href="/" className="text-xs px-3 py-1 rounded-md border border-black/10 dark:border-white/15 hover:bg-black/[.05] dark:hover:bg-white/[.06]">Home</a>
        </div>
        <div className="max-w-5xl mx-auto px-6 py-8 xl:flex xl:items-start xl:gap-8">
          <div id="doc-content" className="prose dark:prose-invert max-w-none flex-1">
            {children}
          </div>
          <Toc contentSelector="#doc-content" />
        </div>
      </main>
    </div>
  );
}
