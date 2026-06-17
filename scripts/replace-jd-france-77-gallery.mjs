import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { writeCoverJpeg, writeGalleryJpeg } from "./lib/enhance-image.mjs";

const ASSETS = "C:/Users/HP/.cursor/projects/c-Users-HP-Desktop-site-entreprise/assets";
const sources = [
  "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_f6ac75b7be5d1e5318aa158517dd523c_images_image-eccfd7db-f112-40d5-9756-275391d0ede2.png",
  "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_f6ac75b7be5d1e5318aa158517dd523c_images_image-2e0f811a-8515-418f-9425-fc0b1cd62e22.png",
  "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_f6ac75b7be5d1e5318aa158517dd523c_images_image-11a634b8-6a32-4a58-a500-a827fbc73d26.png",
  "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_f6ac75b7be5d1e5318aa158517dd523c_images_image-2f927151-8e33-4866-a4bb-c35d7bd21080.png",
];

const dest = "public/projects/gallery/jd-france-77";
const cover = "public/projects/jd-france-77.jpg";

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
