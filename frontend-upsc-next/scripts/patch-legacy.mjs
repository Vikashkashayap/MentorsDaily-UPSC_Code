import fs from "fs";
import path from "path";

const root = path.join(process.cwd(), "src", "legacy");

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (/\.(jsx?|tsx?)$/.test(name)) patch(p);
  }
}

function patch(file) {
  let c = fs.readFileSync(file, "utf8");
  const before = c;
  c = c.replace(/from\s+["']react-router-dom["']/g, 'from "@/lib/navigation"');
  c = c.replace(/import\.meta\.env\.VITE_/g, "process.env.NEXT_PUBLIC_");
  if (c !== before) fs.writeFileSync(file, c, "utf8");
}

walk(root);
console.log("Patched legacy sources");
