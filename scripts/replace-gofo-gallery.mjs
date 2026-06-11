import sharp from "sharp";
import { mkdir, rm, readdir } from "node:fs/promises";
import path from "node:path";

const ASSETS = "C:/Users/HP/.cursor/projects/c-Users-HP-Desktop-site-entreprise/assets";
const sources = [
  "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_f6ac75b7be5d1e5318aa158517dd523c_images______-f36ab599-90b3-4cc3-b43a-5d4c61ea9980.png",
  "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_f6ac75b7be5d1e5318aa158517dd523c_images_______-0313eedd-3a8f-4bed-a3c6-3d3da2ff3994.png",
  "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_f6ac75b7be5d1e5318aa158517dd523c_images_DSC02399-ef6d7480-a48f-494b-9a85-b266c501b9a1.png",
  "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_f6ac75b7be5d1e5318aa158517dd523c_images_____4-786af6a7-8bb2-4b4a-9cc0-0c8cc83f432c.png",
  "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_f6ac75b7be5d1e5318aa158517dd523c_images_____11-7425564a-663c-40e2-b0ed-79a76b768e20.png",
  "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_f6ac75b7be5d1e5318aa158517dd523c_images_____17-08c6661b-1484-4a87-b6ad-27bf713ca8ff.png",
  "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_f6ac75b7be5d1e5318aa158517dd523c_images_____20-e102ce05-8f8e-4445-9881-7a7d940b89e0.png",
  "c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_f6ac75b7be5d1e5318aa158517dd523c_images_____21-70ac60f4-524e-4a37-8b92-a2ab35532555.png",
];

const dest = "public/projects/gallery/gofo-pays-bas";

await rm(dest, { recursive: true, force: true });
await mkdir(dest, { recursive: true });

for (let i = 0; i < sources.length; i++) {
  const input = path.join(ASSETS, sources[i]);
  const output = path.join(dest, `${i + 1}.jpg`);
  await sharp(input)
    .rotate()
    .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(output);
  console.log(`OK ${output}`);
}

const files = await readdir(dest);
console.log("Final:", files.join(", "));
