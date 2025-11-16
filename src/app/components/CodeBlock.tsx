export type CodeLanguage = 'swift' | 'objective-c' | 'bash' | 'json' | 'text';

type TokenType = 'plain' | 'keyword' | 'type' | 'string' | 'number' | 'comment';

interface Token {
  type: TokenType;
  text: string;
}

function tokenizeSwiftLike(code: string): Token[] {
  const tokens: Token[] = [];
  const pattern = /(\/\/.*$|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|\b\d+(?:\.\d+)?\b|\b(?:import|let|var|func|class|struct|enum|protocol|extension|if|else|for|while|in|return|guard|try|await|async|public|internal|private|fileprivate|open|static|where|throws|rethrows|do|catch|switch|case|default)\b|\b[A-Z][A-Za-z0-9_]*\b)/gm;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(code)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'plain', text: code.slice(lastIndex, match.index) });
    }

    const value = match[0];

    let type: TokenType = 'plain';
    if (value.startsWith('//') || value.startsWith('/*')) {
      type = 'comment';
    } else if (value.startsWith('"')) {
      type = 'string';
    } else if (/^\d/.test(value)) {
      type = 'number';
    } else if (/^(import|let|var|func|class|struct|enum|protocol|extension|if|else|for|while|in|return|guard|try|await|async|public|internal|private|fileprivate|open|static|where|throws|rethrows|do|catch|switch|case|default)$/.test(value)) {
      type = 'keyword';
    } else if (/^[A-Z][A-Za-z0-9_]*$/.test(value)) {
      type = 'type';
    }

    tokens.push({ type, text: value });
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < code.length) {
    tokens.push({ type: 'plain', text: code.slice(lastIndex) });
  }

  return tokens;
}

function tokenize(code: string, language: CodeLanguage = 'text'): Token[] {
  switch (language) {
    case 'swift':
    case 'objective-c':
      return tokenizeSwiftLike(code);
    default:
      return [{ type: 'plain', text: code }];
  }
}

interface CodeBlockProps {
  code: string;
  language?: CodeLanguage;
}

export default function CodeBlock({ code, language = 'text' }: CodeBlockProps) {
  const tokens = tokenize(code, language);

  return (
    <pre className="code-block">
      <code>
        {tokens.map((token, index) => (
          <span
            key={index}
            className={
              token.type === 'plain'
                ? undefined
                : `code-token code-${token.type}`
            }
          >
            {token.text}
          </span>
        ))}
      </code>
    </pre>
  );
}
