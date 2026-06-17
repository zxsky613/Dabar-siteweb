import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { writeCoverJpeg, writeGalleryJpeg } from "./lib/enhance-image.mjs";

const ASSETS = "C:/Users/HP/.cursor/projects/c-Users-HP-Desktop-site-entreprise/assets";
const sources = [
  "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_f6ac75b7be5d1e5318aa158517dd523c_images_image-a4e37d02-2a29-4cf8-90df-337c247ebf59.png",
  "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_f6ac75b7be5d1e5318aa158517dd523c_images_image-2e3ce75a-5f6d-4ae1-95f0-10ba95aec1b0.png",
  "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_f6ac75b7be5d1e5318aa158517dd523c_images_image-e01660a8-9810-4331-a9a0-201d7c6dfbe4.png",
  "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_f6ac75b7be5d1e5318aa158517dd523c_images_image-d7ca4f1c-c850-4a15-9e86-8aa68a952004.png",
];

const dest = "public/projects/gallery/cainiao-lyon";
const cover = "public/projects/cainiao-lyon.jpg";

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
