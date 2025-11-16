import hljs from 'highlight.js/lib/core';
import swift from 'highlight.js/lib/languages/swift';
import objectivec from 'highlight.js/lib/languages/objectivec';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';

export type CodeLanguage = 'swift' | 'objective-c' | 'bash' | 'json' | 'text';

hljs.registerLanguage('swift', swift);
hljs.registerLanguage('objectivec', objectivec);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);

function escapeHtml(code: string): string {
  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const LANGUAGE_MAP: Record<CodeLanguage, string | null> = {
  swift: 'swift',
  'objective-c': 'objectivec',
  bash: 'bash',
  json: 'json',
  text: null,
};

export function highlightCode(code: string, language: CodeLanguage = 'text'): string {
  const lang = LANGUAGE_MAP[language];

  if (!lang) {
    return escapeHtml(code);
  }

  try {
    const result = hljs.highlight(code, { language: lang });
    return result.value;
  } catch {
    return escapeHtml(code);
  }
}

interface CodeBlockProps {
  code: string;
  language?: CodeLanguage;
}

export default function CodeBlock({ code, language = 'text' }: CodeBlockProps) {
  const highlighted = highlightCode(code, language);

  return (
    <pre className="code-block">
      <code className="hljs" dangerouslySetInnerHTML={{ __html: highlighted }} />
    </pre>
  );
}
