import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/partners");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const commons = (file, width = 500) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

const logos = [
  { slug: "china-telecom", url: commons("China Telecom logotip.png") },
  { slug: "jd-com", url: "https://1000logos.net/wp-content/uploads/2020/11/JD.com-Logo.png" },
  { slug: "cainiao", url: commons("CainiaoLogo.svg") },
  { slug: "catl", url: commons("Contemporary Amperex Technology 2020 logo.svg") },
  { slug: "cgn", url: "https://upload.wikimedia.org/wikipedia/commons/b/be/CGN_logo_PANTONE_PROD.png" },
  { slug: "cimc", url: "https://upload.wikimedia.org/wikipedia/commons/1/1b/CIMC_logo.svg" },
  { slug: "mg", url: commons("MG Motor 2021 logo.svg") },
  { slug: "byd", url: commons("BYD Auto Logo.svg") },
  { slug: "hikvision", url: commons("Hikvision logo.svg") },
  { slug: "dahua", url: commons("Dahua Technology logo.svg") },
  { slug: "sany", url: "https://www.sanyglobal.com/static/common/head-footer-img/logo.svg" },
  { slug: "minth", url: "https://www.minthgroup.com/images/logo.png" },
  { slug: "kengic", url: "https://www.kengic.com/Public/Home/images/logo.png" },
  { slug: "wayzim", url: "https://www.wayzim.com/Public/Home/images/logo.png" },
  { slug: "simba", url: "https://www.simbalogistics.com/images/logo.png" },
  { slug: "gofo", url: "https://hub.gofo.com/logo.svg" },
  { slug: "cirro", url: "https://www.cirroparcel.com/logo.svg" },
];

fs.mkdirSync(outDir, { recursive: true });

for (const { slug, url } of logos) {
  await sleep(1200);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
      redirect: "follow",
    });
    if (!res.ok) {
      console.log(`FAIL ${slug} HTTP ${res.status}`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 500) {
      console.log(`FAIL ${slug} too small (${buf.length}b)`);
      continue;
    }
    const ext = url.includes(".svg") ? ".svg" : ".png";
    fs.writeFileSync(path.join(outDir, `${slug}${ext}`), buf);
    console.log(`OK ${slug}${ext} (${buf.length}b)`);
  } catch (e) {
    console.log(`ERR ${slug}: ${e.message}`);
  }
}

console.log("Done");
