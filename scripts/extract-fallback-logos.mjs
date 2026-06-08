import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(
  __dirname,
  "../public/partners-source.png"
);
const outDir = path.join(__dirname, "../public/partners");

// Fallback crops from composite for logos not available online (1023x437)
const fallbackCrops = [
  { slug: "jd-com", left: 200, top: 0, width: 200, height: 100 },
  { slug: "gofo", left: 0, top: 105, width: 190, height: 100 },
  { slug: "cirro", left: 190, top: 105, width: 210, height: 100 },
  { slug: "simba", left: 410, top: 105, width: 195, height: 100 },
  { slug: "kengic", left: 500, top: 215, width: 250, height: 100 },
  { slug: "wayzim", left: 0, top: 325, width: 320, height: 112 },
];

async function extractFallback() {
  if (!fs.existsSync(source)) {
    console.log("No composite source, skipping fallback crops");
    return;
  }

  for (const logo of fallbackCrops) {
    const dest = path.join(outDir, `${logo.slug}.png`);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 25000) {
      console.log("Skip (already have HQ):", logo.slug);
      continue;
    }

    await sharp(source)
      .extract({
        left: logo.left,
        top: logo.top,
        width: logo.width,
        height: logo.height,
      })
      .resize({ width: 400, withoutEnlargement: false })
      .png()
      .toFile(dest);

    console.log("Fallback crop:", logo.slug);
  }
}

extractFallback();
