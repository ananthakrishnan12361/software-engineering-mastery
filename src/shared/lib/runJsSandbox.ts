export interface SandboxResult {
  output: string;
  isError: boolean;
}

function formatValue(val: unknown): string {
  if (typeof val === "string") return val;
  if (typeof val === "bigint") return `${val.toString()}n`;
  if (typeof val === "symbol") return val.toString();
  if (typeof val === "function") return `[Function: ${val.name || "anonymous"}]`;
  if (val === undefined) return "undefined";
  try {
    return JSON.stringify(val);
  } catch {
    return String(val);
  }
}

export function runJsSandbox(code: string): SandboxResult {
  const logs: string[] = [];
  const fakeConsole = {
    log: (...args: unknown[]) => logs.push(args.map(formatValue).join(" ")),
    warn: (...args: unknown[]) => logs.push(`[WARN] ${args.map(formatValue).join(" ")}`),
    error: (...args: unknown[]) => logs.push(`[ERROR] ${args.map(formatValue).join(" ")}`),
    info: (...args: unknown[]) => logs.push(args.map(formatValue).join(" "))
  };

  try {
    const fn = new Function("console", `"use strict";\n${code}`);
    const ret = fn(fakeConsole);
    if (ret !== undefined) logs.push(`=> ${formatValue(ret)}`);
    return {
      output: logs.length ? logs.join("\n") : "(Executed with no console output)",
      isError: false
    };
  } catch (err) {
    const error = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    return { output: error, isError: true };
  }
}
