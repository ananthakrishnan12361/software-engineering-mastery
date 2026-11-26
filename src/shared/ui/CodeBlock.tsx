import { useMemo, useState } from "react";
import { tokenizeCode } from "../lib/highlightCode";
import { runJsSandbox, type SandboxResult } from "../lib/runJsSandbox";
import { Button } from "./Button";

export interface CodeBlockProps {
  lang?: string;
  code: string;
  runnable?: boolean;
}

function copyWithFallback(text: string, onDone: () => void) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(onDone)
      .catch(() => fallbackCopy(text, onDone));
  } else {
    fallbackCopy(text, onDone);
  }
}

function fallbackCopy(text: string, onDone: () => void) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
    onDone();
  } catch {
    /* Ignore restricted clipboard failures */
  }
  document.body.removeChild(ta);
}

export function CodeBlock({ lang = "text", code, runnable = false }: CodeBlockProps) {
  const normalizedRaw = useMemo(() => code.replace(/^\n+|\n+$/g, ""), [code]);
  const [editedCode, setEditedCode] = useState(normalizedRaw);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<SandboxResult | null>(null);

  const isJsRunnable = runnable && (lang.toLowerCase() === "js" || lang.toLowerCase() === "javascript");
  const activeCode = isEditing ? editedCode : normalizedRaw;
  const tokens = useMemo(() => tokenizeCode(activeCode, lang), [activeCode, lang]);

  function handleCopy() {
    copyWithFallback(activeCode, () => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    });
  }

  function handleRun() {
    setResult(runJsSandbox(activeCode));
  }

  function handleReset() {
    setEditedCode(normalizedRaw);
    setResult(null);
  }

  return (
    <div className="code-block code-block-enhanced" data-lang={lang.toLowerCase()}>
      <div className="code-toolbar">
        <span className="code-lang">{lang}</span>
        <div className="code-toolbar-actions">
          {isJsRunnable ? (
            <>
              <Button variant="small" onClick={handleRun}>
                Run Demo
              </Button>
              <Button variant="small" onClick={() => setIsEditing((prev) => !prev)}>
                {isEditing ? "View Highlighted" : "Edit"}
              </Button>
              {isEditing ? (
                <Button variant="small" onClick={handleReset}>
                  Reset
                </Button>
              ) : null}
            </>
          ) : null}
          <Button variant="small" onClick={handleCopy}>
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
      </div>

      {!isEditing ? (
        <pre data-lang={lang.toLowerCase()} data-runnable={isJsRunnable ? "true" : undefined}>
          <code className={`language-${lang.toLowerCase()}`}>
            {tokens.map((tok, idx) =>
              tok.className ? (
                <span key={idx} className={tok.className}>
                  {tok.text}
                </span>
              ) : (
                tok.text
              )
            )}
          </code>
        </pre>
      ) : (
        <textarea
          className="demo-editor"
          value={editedCode}
          onChange={(e) => setEditedCode(e.target.value)}
          aria-label="Editable JavaScript code snippet"
        />
      )}

      {result ? (
        <div className={`demo-output ${result.isError ? "is-error" : ""}`.trim()}>{result.output}</div>
      ) : null}
    </div>
  );
}
