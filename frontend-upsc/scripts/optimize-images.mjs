import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve('public');
const MIN_BYTES = 80 * 1024;
const QUALITY = 82;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (/\.(png|jpe?g)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

const files = await walk(PUBLIC_DIR);
let converted = 0;
let savedBytes = 0;

for (const file of files) {
  const stat = await fs.stat(file);
  if (stat.size < MIN_BYTES) continue;

  const webpPath = file.replace(/\.(png|jpe?g)$/i, '.webp');
  const before = stat.size;

  await sharp(file)
    .webp({ quality: QUALITY, effort: 4 })
    .toFile(webpPath);

  const after = (await fs.stat(webpPath)).size;
  if (after < before * 0.95) {
    converted += 1;
    savedBytes += before - after;
    console.log(`OK ${path.relative(PUBLIC_DIR, file)} -> ${path.relative(PUBLIC_DIR, webpPath)} (${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB)`);
  } else {
    await fs.unlink(webpPath);
  }
}

console.log(`Converted ${converted} images, saved ~${Math.round(savedBytes / 1024 / 1024 * 10) / 10} MB`);
