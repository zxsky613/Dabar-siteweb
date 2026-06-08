import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(__dirname, "../public/partners-source.png");
const outDir = path.join(__dirname, "../public/partners");

const meta = await sharp(source).metadata();
const W = meta.width;
const H = meta.height;
console.log("Size:", W, "x", H);

// Pixel crops tuned for 1023x437 source layout
const logos = [
  { name: "china-telecom", left: 0, top: 0, width: 200, height: 100 },
  { name: "jd-com", left: 200, top: 0, width: 200, height: 100 },
  { name: "cainiao", left: 400, top: 0, width: 200, height: 100 },
  { name: "catl", left: 600, top: 0, width: 200, height: 100 },
  { name: "cgn", left: 800, top: 0, width: 222, height: 100 },
  { name: "gofo", left: 0, top: 105, width: 190, height: 100 },
  { name: "cirro", left: 190, top: 105, width: 210, height: 100 },
  { name: "simba", left: 410, top: 105, width: 195, height: 100 },
  { name: "mg", left: 610, top: 105, width: 195, height: 100 },
  { name: "byd", left: 810, top: 105, width: 213, height: 100 },
  { name: "minth", left: 0, top: 215, width: 250, height: 100 },
  { name: "hikvision", left: 250, top: 215, width: 250, height: 100 },
  { name: "kengic", left: 500, top: 215, width: 250, height: 100 },
  { name: "dahua", left: 750, top: 215, width: 273, height: 100 },
  { name: "wayzim", left: 0, top: 325, width: 320, height: 112 },
  { name: "sany", left: 320, top: 325, width: 320, height: 112 },
  { name: "cimc", left: 640, top: 325, width: 383, height: 112 },
];

fs.mkdirSync(outDir, { recursive: true });

for (const logo of logos) {
  const left = Math.max(0, logo.left);
  const top = Math.max(0, logo.top);
  const width = Math.min(logo.width, W - left);
  const height = Math.min(logo.height, H - top);

  await sharp(source)
    .extract({ left, top, width, height })
    .png()
    .toFile(path.join(outDir, `${logo.name}.png`));
  console.log("OK:", logo.name);
}

console.log("Done:", outDir);
