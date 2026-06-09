import sharp from "sharp";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const PDF_PAGES = "public/projects/pdf-pages";
const OUT_DIR = "public/projects/gallery";

/** @typedef {"grid-2x2" | "row-4" | "row-3"} Layout */

/** @type {Record<string, { page: number; layout: Layout }>} */
const PROJECTS = {
  "gofo-pays-bas": { page: 6, layout: "grid-2x2" },
  "cirro-france": { page: 7, layout: "grid-2x2" },
  "jd-allemagne": { page: 8, layout: "grid-2x2" },
  "faxing-france": { page: 9, layout: "grid-2x2" },
  "racking-uk": { page: 11, layout: "row-3" },
  "rotterdam-220k": { page: 12, layout: "grid-2x2" },
  "rotterdam-17k": { page: 13, layout: "grid-2x2" },
  "gu-cang-allemagne": { page: 14, layout: "grid-2x2" },
  "zhongke-hq": { page: 15, layout: "row-3" },
  "heng-ai": { page: 16, layout: "grid-2x2" },
  "wanbang": { page: 17, layout: "grid-2x2" },
  "heyuan": { page: 18, layout: "grid-2x2" },
  "jd-france-77": { page: 20, layout: "row-4" },
  "jd-dugny": { page: 21, layout: "row-4" },
  "cainiao-lyon": { page: 22, layout: "row-4" },
  "minth-ruitZ": { page: 23, layout: "row-4" },
};

function getRegions(width, height, layout) {
  const padX = Math.round(width * 0.028);
  const top = Math.round(height * 0.108);
  const bottom = Math.round(height * 0.148);
  const gap = Math.round(width * 0.006);
  const photoBottom = height - bottom;
  const photoHeight = photoBottom - top;
  const innerW = width - padX * 2;

  if (layout === "grid-2x2") {
    const cellW = Math.floor((innerW - gap) / 2);
    const cellH = Math.floor((photoHeight - gap) / 2);
    return [
      { left: padX, top, width: cellW, height: cellH },
      { left: padX + cellW + gap, top, width: cellW, height: cellH },
      { left: padX, top: top + cellH + gap, width: cellW, height: cellH },
      { left: padX + cellW + gap, top: top + cellH + gap, width: cellW, height: cellH },
    ];
  }

  if (layout === "row-3") {
    const cellW = Math.floor((innerW - gap * 2) / 3);
    return [0, 1, 2].map((i) => ({
      left: padX + i * (cellW + gap),
      top,
      width: cellW,
      height: photoHeight,
    }));
  }

  const cellW = Math.floor((innerW - gap * 3) / 4);
  return [0, 1, 2, 3].map((i) => ({
    left: padX + i * (cellW + gap),
    top,
    width: cellW,
    height: photoHeight,
  }));
}

async function cropProject(slug, { page, layout }) {
  const src = path.join(PDF_PAGES, `page_${page}_screenshot.png`);
  const outFolder = path.join(OUT_DIR, slug);
  await mkdir(outFolder, { recursive: true });

  const meta = await sharp(src).metadata();
  const regions = getRegions(meta.width, meta.height, layout);
  const paths = [];

  for (let i = 0; i < regions.length; i++) {
    const outPath = path.join(outFolder, `${i + 1}.jpg`);
    await sharp(src)
      .extract(regions[i])
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(outPath);
    paths.push(`/projects/gallery/${slug}/${i + 1}.jpg`);
  }

  return paths;
}

const manifest = {};
for (const [slug, config] of Object.entries(PROJECTS)) {
  manifest[slug] = await cropProject(slug, config);
  console.log(`${slug}: ${manifest[slug].length} images`);
}

await writeFile(
  path.join(OUT_DIR, "manifest.json"),
  JSON.stringify(manifest, null, 2)
);

console.log("Done.");
