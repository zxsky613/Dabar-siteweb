import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { writeCoverJpeg, writeGalleryJpeg } from "./lib/enhance-image.mjs";

const ASSETS = "C:/Users/HP/.cursor/projects/c-Users-HP-Desktop-site-entreprise/assets";
const sources = [
  "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_f6ac75b7be5d1e5318aa158517dd523c_images_image-f54498b2-5023-43b6-bf29-add867a1db21.png",
  "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_f6ac75b7be5d1e5318aa158517dd523c_images_image-a95a1287-ece9-401e-ab07-678551157326.png",
];

const dest = "public/projects/gallery/heng-ai";
const cover = "public/projects/heng-ai.jpg";

await rm(dest, { recursive: true, force: true });
await mkdir(dest, { recursive: true });

for (let i = 0; i < sources.length; i++) {
  const input = path.join(ASSETS, sources[i]);
  const output = path.join(dest, `${i + 1}.jpg`);
  await writeGalleryJpeg(input, output);
  console.log(`OK ${output}`);
}

await writeCoverJpeg(path.join(ASSETS, sources[0]), cover);
console.log(`OK ${cover}`);
