import { marked } from "marked";
import fs from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-static";

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
