import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { writeCoverJpeg, writeGalleryJpeg } from "./lib/enhance-image.mjs";

const ASSETS = "C:/Users/HP/.cursor/projects/c-Users-HP-Desktop-site-entreprise/assets";
const sources = [
  "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_f6ac75b7be5d1e5318aa158517dd523c_images_image-3b6fae06-76b5-4728-9d02-ccbda1590c97.png",
  "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_f6ac75b7be5d1e5318aa158517dd523c_images_image-398fe852-4340-49c4-a893-72cb5dc25ccf.png",
  "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_f6ac75b7be5d1e5318aa158517dd523c_images_image-5b147698-ecbe-487c-b73d-2390d8b41c9b.png",
];

const dest = "public/projects/gallery/wanbang";
const cover = "public/projects/wanbang.jpg";

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
