import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useTheme } from '@/hooks/useTheme';

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const { isDark } = useTheme();
  return (
    <SyntaxHighlighter
      language={language}
      style={isDark ? atomOneDark : atomOneLight}
      customStyle={{
        background: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.04)',
        borderRadius: '8px',
        padding: '12px',
        fontSize: '0.875rem',
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
