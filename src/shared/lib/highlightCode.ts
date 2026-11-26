export interface CodeToken {
  text: string;
  className?: string;
}

const SUPPORTED_LANGS = new Set(["js", "javascript", "ts", "typescript", "sql", "json", "bash", "sh"]);

const JS_BUILTINS = new Set([
  "console",
  "Math",
  "Number",
  "String",
  "Boolean",
  "BigInt",
  "Symbol",
  "Array",
  "Object",
  "Map",
  "Set",
  "Promise",
  "JSON",
  "Date",
  "Error",
  "TypeError",
  "RangeError",
  "parseInt",
  "parseFloat",
  "isNaN"
]);

export function tokenizeCode(rawCode: string, lang: string): CodeToken[] {
  const l = lang.toLowerCase();
  if (!SUPPORTED_LANGS.has(l)) {
    return [{ text: rawCode }];
  }

  const tokenRegex =
    l === "sql"
      ? /(--[^\n]*|\/\*[\s\S]*?\*\/|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|\b\d+(?:\.\d+)?\b|\b(?:SELECT|FROM|WHERE|JOIN|INNER|LEFT|RIGHT|FULL|CROSS|ON|GROUP|BY|ORDER|HAVING|LIMIT|OFFSET|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|INDEX|UNIQUE|PRIMARY|KEY|FOREIGN|REFERENCES|AS|AND|OR|NOT|IN|IS|NULL|WITH|RECURSIVE|OVER|PARTITION|EXPLAIN|ANALYZE|BEGIN|COMMIT|ROLLBACK|TRANSACTION)\b)/gi
      : /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|`(?:\\.|[^`\\])*`|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|\b\d+(?:\.\d+)?n?\b|\b(?:const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|new|class|extends|super|import|export|from|default|async|await|typeof|instanceof|in|of|true|false|null|undefined|void|interface|type|implements|readonly|enum|public|private|protected)\b|\b(?:console|Math|Number|String|Boolean|BigInt|Symbol|Array|Object|Map|Set|Promise|JSON|Date|Error|TypeError|RangeError|parseInt|parseFloat|isNaN)\b)/g;

  const tokens: CodeToken[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(rawCode)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: rawCode.slice(lastIndex, match.index) });
    }

    const token = match[0];
    let className = "tok-kw";

    if (token.startsWith("//") || token.startsWith("/*") || token.startsWith("--")) {
      className = "tok-com";
    } else if (token.startsWith("'") || token.startsWith('"') || token.startsWith("`")) {
      className = "tok-str";
    } else if (/^\d/.test(token)) {
      className = "tok-num";
    } else if (JS_BUILTINS.has(token)) {
      className = "tok-bi";
    }

    tokens.push({ text: token, className });
    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < rawCode.length) {
    tokens.push({ text: rawCode.slice(lastIndex) });
  }

  return tokens;
}
