"use client";
import { useEffect, useState } from "react";

type Item = { id: string; text: string };

export default function Toc({ contentSelector = "#doc-content" }: { contentSelector?: string }) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const root = document.querySelector(contentSelector);
    if (!root) return;
    const headings = Array.from(root.querySelectorAll("h2, h3")) as HTMLElement[];
    const list: Item[] = headings
      .filter((el) => !!el.textContent)
      .map((el) => {
        if (!el.id) {
          const slug = el.textContent!.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
          el.id = slug || Math.random().toString(36).slice(2);
        }
        return { id: el.id, text: el.textContent! };
      });
    setItems(list);
  }, [contentSelector]);

  if (!items.length) return null;

  return (
    <nav aria-label="On this page" className="hidden xl:block xl:w-64 shrink-0">
      <div className="sticky top-20 p-4 border-l border-black/10 dark:border-white/10">
        <div className="text-xs uppercase tracking-wide text-black/60 dark:text-white/60 mb-2">On this page</div>
        <ul className="space-y-2 text-sm">
          {items.map((it) => (
            <li key={it.id}>
              <a href={`#${it.id}`} className="hover:underline">
                {it.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
