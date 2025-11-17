"use client";

import { useEffect, useState } from "react";
import { marked } from "marked";
import { tokenize, type CodeLanguage } from "@/app/components/CodeBlock";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function highlight(code: string, lang?: string): string {
  const normalized = (lang || "").toLowerCase();
  let language: CodeLanguage = "text";

  if (normalized === "swift") {
    language = "swift";
  } else if (normalized === "objective-c" || normalized === "objc") {
    language = "objective-c";
  } else if (normalized === "bash" || normalized === "sh") {
    language = "bash";
  } else if (normalized === "json") {
    language = "json";
  }

  const tokens = tokenize(code, language);
  return tokens
    .map((token) => {
      const text = escapeHtml(token.text);
      if (token.type === "plain") {
        return text;
      }
      const type = token.type;
      return `<span class="code-token code-${type}">${text}</span>`;
    })
    .join("");
}

const renderer = new marked.Renderer();

renderer.code = (code, infostring) => {
  const lang = (infostring || "").split(/\s+/)[0];
  const html = highlight(code, lang);
  return `<pre class="code-block"><code>${html}\n</code></pre>`;
};

marked.use({ renderer });

interface MarkdownDocsProps {
  src: string;
}

export default function MarkdownDocs({ src }: MarkdownDocsProps) {
  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(src);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const markdown = await res.text();
        const rendered = marked.parse(markdown) as string;
        if (!cancelled) {
          setHtml(rendered);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to load markdown docs", error);
          setError("Failed to load documentation.");
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [src]);

  if (error) {
    return (
      <article className="prose dark:prose-invert max-w-none">
        <p>{error}</p>
      </article>
    );
  }

  if (html === null) {
    return (
      <article className="prose dark:prose-invert max-w-none">
        <p>Loading documentation
hellip;</p>
      </article>
    );
  }

  return (
    <article
      className="prose dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
