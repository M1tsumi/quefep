import { marked } from "marked";
import fs from "fs/promises";
import path from "path";
import { tokenize, type CodeLanguage } from "@/app/components/CodeBlock";

export const dynamic = "force-static";

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

async function getDocsHtml(): Promise<string> {
  const docsPath = path.join(process.cwd(), "swiftdisc-docs.md");
  const markdown = await fs.readFile(docsPath, "utf8");
  return marked.parse(markdown);
}

export default async function Page() {
  const html = await getDocsHtml();

  return (
    <article
      className="prose dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
