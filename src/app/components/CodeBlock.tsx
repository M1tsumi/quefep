export type CodeLanguage = 'swift' | 'objective-c' | 'bash' | 'json' | 'text';

function escapeHtml(code: string): string {
  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function highlightSwift(raw: string): string {
  let code = raw;
  // Strings
  code = code.replace(/("(?:[^"\\]|\\.)*")/g, '<span class="code-string">$1<\/span>');
  // Comments
  code = code.replace(/(\/(?:\/).*?$)/gm, '<span class="code-comment">$1<\/span>');
  // Keywords
  code = code.replace(/\b(let|var|func|class|struct|enum|protocol|import|extension|if|else|switch|case|for|in|while|return|async|await|try|catch|throw)\b/g, '<span class="code-keyword">$1<\/span>');
  // Types / capitalized identifiers
  code = code.replace(/\b([A-Z][A-Za-z0-9_]*)\b/g, '<span class="code-type">$1<\/span>');
  // Numbers
  code = code.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="code-number">$1<\/span>');
  // Function names (identifier followed by parenthesis)
  code = code.replace(/\b([a-zA-Z_][A-Za-z0-9_]*)\s*(?=\()/g, '<span class="code-function">$1<\/span>');
  // Variables / lowercased identifiers that are not already wrapped
  code = code.replace(/\b([a-z_][A-Za-z0-9_]*)\b/g, '<span class="code-variable">$1<\/span>');
  return code;
}

function highlightObjC(raw: string): string {
  let code = raw;
  // Strings
  code = code.replace(/(@?"(?:[^"\\]|\\.)*")/g, '<span class="code-string">$1<\/span>');
  // Comments
  code = code.replace(/(\/(?:\/).*?$)/gm, '<span class="code-comment">$1<\/span>');
  // Directives and keywords
  code = code.replace(/(@interface|@implementation|@end|@autoreleasepool|@protocol|@import|#import|#include)\b/g, '<span class="code-keyword">$1<\/span>');
  // Common types
  code = code.replace(/\b(BOOL|NSInteger|NSUInteger|NSString|NSArray|NSDictionary|NSError|id|void)\b/g, '<span class="code-type">$1<\/span>');
  // Numbers
  code = code.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="code-number">$1<\/span>');
  // Method / function-like identifiers before '(' or ':' patterns
  code = code.replace(/\b([A-Za-z_][A-Za-z0-9_]*)\s*(?=\()/g, '<span class="code-function">$1<\/span>');
  // Variables / lowercased identifiers
  code = code.replace(/\b([a-z_][A-Za-z0-9_]*)\b/g, '<span class="code-variable">$1<\/span>');
  return code;
}

export function highlightCode(code: string, language: CodeLanguage = 'text'): string {
  const escaped = escapeHtml(code);

  switch (language) {
    case 'swift':
      return highlightSwift(escaped);
    case 'objective-c':
      return highlightObjC(escaped);
    default:
      return escaped;
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
      <code dangerouslySetInnerHTML={{ __html: highlighted }} />
    </pre>
  );
}
