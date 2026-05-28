import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");

const srcPng = path.join(publicDir, "Logo", "icon.png");

async function main() {
  const base = sharp(srcPng).ensureAlpha();

  await base
    .resize(180, 180, { fit: "cover" })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(publicDir, "apple-touch-icon.png"));

  await base
    .resize(512, 512, { fit: "cover" })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(publicDir, "favicon.png"));

  // Generate multi-size favicon.ico
  const png16 = await base
    .clone()
    .resize(16, 16, { fit: "cover" })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
  const png32 = await base
    .clone()
    .resize(32, 32, { fit: "cover" })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
  const png48 = await base
    .clone()
    .resize(48, 48, { fit: "cover" })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();

  const icoBuf = await pngToIco([png16, png32, png48]);
  await fs.writeFile(path.join(publicDir, "favicon.ico"), icoBuf);

  console.log("Favicons generated in public/ (favicon.ico, favicon.png, apple-touch-icon.png)");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

