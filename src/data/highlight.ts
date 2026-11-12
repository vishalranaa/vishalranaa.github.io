// Tiny build-time syntax highlighter for the polyglot showcase (no runtime cost).
const KEYWORDS = new Set([
  "from", "import", "def", "return", "class", "private", "final", "val", "var", "fun", "export", "async", "await",
  "const", "let", "new", "function", "null", "true", "false", "this", "String", "Long", "str", "string", "apply",
]);

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const TOKEN =
  /(\/\/[^\n]*|#[^\n]*)|(f?"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(@[A-Za-z]+)|\b(\d+)\b|\b([A-Za-z_][A-Za-z0-9_]*)\b(?=\s*\()|\b([A-Za-z_][A-Za-z0-9_]*)\b/g;

export function highlight(code: string, lang: string) {
  const allowHashComment = lang === "Python";
  let out = "";
  let last = 0;
  for (const m of code.matchAll(TOKEN)) {
    const [full, comment, str, anno, num, fn, word] = m;
    out += esc(code.slice(last, m.index));
    last = m.index! + full.length;
    if (comment && (comment.startsWith("//") || allowHashComment)) out += `<span class="t-c">${esc(full)}</span>`;
    else if (comment) out += esc(full);
    else if (str) out += `<span class="t-s">${esc(full)}</span>`;
    else if (anno) out += `<span class="t-a">${esc(full)}</span>`;
    else if (num) out += `<span class="t-n">${esc(full)}</span>`;
    else if (fn) out += KEYWORDS.has(fn) ? `<span class="t-k">${esc(full)}</span>` : `<span class="t-f">${esc(full)}</span>`;
    else if (word) out += KEYWORDS.has(word) ? `<span class="t-k">${esc(full)}</span>` : /^[A-Z]/.test(word) ? `<span class="t-t">${esc(full)}</span>` : esc(full);
  }
  out += esc(code.slice(last));
  // wrap each line for staggered reveal
  return out.split("\n").map((l, i) => `<span class="ln"><i>${String(i + 1).padStart(2, "0")}</i><span>${l || " "}</span></span>`).join("");
}
