import { Fragment } from "react";

export interface RichTextProps {
  text: string;
}

const TOKEN_RE = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;

export function RichText({ text }: RichTextProps) {
  const parts = text.split(TOKEN_RE);
  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
          return <code key={idx}>{part.slice(1, -1)}</code>;
        }
        if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
          return <strong key={idx}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
          return <em key={idx}>{part.slice(1, -1)}</em>;
        }
        return <Fragment key={idx}>{part}</Fragment>;
      })}
    </>
  );
}
