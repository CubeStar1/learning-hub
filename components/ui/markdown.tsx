import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

export function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown className="prose dark:prose-invert max-w-none">
      {children}
    </ReactMarkdown>
  );
} 