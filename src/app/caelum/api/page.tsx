import MarkdownDocs from "@/app/components/MarkdownDocs";

export const dynamic = "force-static";

export default function Page() {
  return <MarkdownDocs src="/docs/caelum-docs.md" />;
}
