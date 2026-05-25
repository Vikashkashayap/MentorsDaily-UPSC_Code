import fs from "fs";
import path from "path";

const root = path.join(process.cwd(), "src", "legacy");

const REPLACEMENTS = [
  ["\u00e2\u0086\u0090", "\u2190"],
  ["\u00e2\u0086", "\u2190"],
  ["\u00e2\u009c\u0093", "\u2713"],
  ["\u00e2\u009c\u201c", "\u2713"],
  ["\u00e2\u0080\u0093", "\u2013"],
  ["\u00e2\u0080\u0094", "\u2014"],
  ["\u00e2\u0080\u00a2", "\u2022"],
  ["\u00e2\u0082\u00b9", "\u20b9"],
  ["\u00f0\u009f\u0093\u009a", "\uD83D\uDCDA"],
  ["\u00f0\u009f\u0093\u0096", "\uD83D\uDCD6"],
  ["\u00e2\u009c\u0085", "\u2705"],
];

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.(jsx?|tsx?|js|ts)$/.test(name)) fixFile(p);
  }
}

function fixFile(file) {
  let buf = fs.readFileSync(file);
  let c = buf.toString("utf8");
  const before = c;

  const literal = [
    ["â†\u0090 Back", "← Back"],
    ["â† Back", "← Back"],
    ["âœ"", "✓"],
    ["âœ"", "✓"],
    ["IMP â€"", "IMP –"],
    ["IMP â€"", "IMP –"],
    ["â€¢", "•"],
    ["â‚¹", "₹"],
    ['ðŸ"š', "📚"],
    ['ðŸ"–', "📖"],
    ["â€"", "–"],
    ["â€"", "—"],
  ];
  for (const [from, to] of literal) {
    c = c.split(from).join(to);
  }
  for (const [from, to] of REPLACEMENTS) {
    c = c.split(from).join(to);
  }

  if (c !== before) {
    fs.writeFileSync(file, c, "utf8");
    console.log("Fixed:", path.relative(process.cwd(), file));
  }
}

walk(root);
console.log("Encoding fix complete");
