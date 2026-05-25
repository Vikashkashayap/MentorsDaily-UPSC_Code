import fs from "fs";
import path from "path";

const root = path.join(process.cwd(), "src", "legacy");
const REPLACEMENTS = [
  ["\u00e2\u0080\u0099", "'"],
  ["\u00e2\u0080\u009c", '"'],
  ["\u00e2\u0080\u009d", '"'],
  ["â€™", "'"],
  ["â€œ", '"'],
  ["â€\u009d", '"'],
];

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.(jsx?|tsx?|js)$/.test(name)) {
      let c = fs.readFileSync(p, "utf8");
      const before = c;
      for (const [from, to] of REPLACEMENTS) {
        c = c.split(from).join(to);
      }
      if (c !== before) {
        fs.writeFileSync(p, c, "utf8");
        console.log("Fixed:", path.relative(root, p));
      }
    }
  }
}

walk(root);
