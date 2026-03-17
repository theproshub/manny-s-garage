/**
 * One-off: remove solid black background from logo and save as PNG with transparency.
 * Usage: node scripts/make-logo-transparent.mjs <input.png> [output.png]
 */
import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputPath = process.argv[2] || join(__dirname, "../assets/logo-source.png");
const outputPath = process.argv[3] || join(__dirname, "../public/logo.png");

async function main() {
  const image = sharp(inputPath);
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const threshold = 35; // pixels with R,G,B all below this become transparent
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r <= threshold && g <= threshold && b <= threshold) {
      data[i + 3] = 0;
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(outputPath);

  console.log("Wrote:", outputPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
