import sharp from "sharp";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";

const ASSETS =
  "C:/Users/HP/.cursor/projects/c-Users-HP-Desktop-site-entreprise/assets";
const render =
  "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_f6ac75b7be5d1e5318aa158517dd523c_images_image-b8dd12a9-0824-4b99-afb4-df1487d6d7ca.png";
const aisle =
  "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_f6ac75b7be5d1e5318aa158517dd523c_images_image-e7c50bd9-c1dd-4df4-aea0-d56fd6bb5464.png";

const dest = "public/projects/gallery/zhongke-hq";
const cover = "public/projects/zhongke-hq.jpg";

async function save(pipeline, outputPath) {
  await pipeline
    .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: false })
    .sharpen({ sigma: 0.7, m1: 0.45, m2: 0.25 })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(outputPath);
  console.log(`OK ${outputPath}`);
}

const renderBase = sharp(path.join(ASSETS, render)).rotate().flatten({ background: "#f4f6f8" });

await rm(dest, { recursive: true, force: true });
await mkdir(dest, { recursive: true });

await save(renderBase.clone().extract({ left: 70, top: 0, width: 326, height: 999 }), path.join(dest, "1.jpg"));

await save(
  sharp(path.join(ASSETS, aisle)).rotate().extract({ left: 40, top: 0, width: 520, height: 360 }),
  path.join(dest, "2.jpg"),
);

await save(renderBase.clone(), path.join(dest, "3.jpg"));

await sharp(path.join(dest, "3.jpg"))
  .resize({ width: 1200, height: 800, fit: "cover", position: "center" })
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(cover);

console.log(`Cover OK ${cover}`);
