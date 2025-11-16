export type CodeLanguage = 'swift' | 'objective-c' | 'bash' | 'json' | 'text';

function escapeHtml(code: string): string {
  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function highlightCode(code: string, _language: CodeLanguage = 'text'): string {
  // For now, rely on VS Code's editor coloring and keep runtime output simple
  // and robust by only escaping HTML.
  return escapeHtml(code);
}

interface CodeBlockProps {
  code: string;
  language?: CodeLanguage;
}

export default function CodeBlock({ code, language = 'text' }: CodeBlockProps) {
  const highlighted = highlightCode(code, language);

  return (
    <pre className="code-block">
      <code dangerouslySetInnerHTML={{ __html: highlighted }} />
    </pre>
  );
}
