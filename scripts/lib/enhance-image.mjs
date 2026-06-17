import sharp from "sharp";

/** Pipeline netteté + contraste, sans upscaling (évite le flou). */
export function enhance(input) {
  return sharp(input)
    .rotate()
    .resize({ width: 2560, height: 2560, fit: "inside", withoutEnlargement: true })
    .linear(1.06, -8)
    .modulate({ brightness: 1.02, saturation: 1.05 })
    .sharpen({ sigma: 1.1, m1: 1.4, m2: 0.6, x1: 2, y2: 10, y3: 20 });
}

export async function writeGalleryJpeg(input, output) {
  await enhance(input).jpeg({ quality: 92, mozjpeg: true, chromaSubsampling: "4:4:4" }).toFile(output);
}

/** Couverture 4:3 recadrée à la résolution native (pas d'agrandissement). */
export async function writeCoverJpeg(input, output) {
  const rotated = sharp(input).rotate();
  const meta = await rotated.metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;
  const ratio = 4 / 3;

  let cropW = w;
  let cropH = h;
  if (w / h > ratio) {
    cropW = Math.round(h * ratio);
  } else {
    cropH = Math.round(w / ratio);
  }

  await rotated
    .extract({
      left: Math.max(0, Math.round((w - cropW) / 2)),
      top: Math.max(0, Math.round((h - cropH) / 2)),
      width: cropW,
      height: cropH,
    })
    .linear(1.06, -8)
    .modulate({ brightness: 1.02, saturation: 1.05 })
    .sharpen({ sigma: 1.1, m1: 1.4, m2: 0.6, x1: 2, y2: 10, y3: 20 })
    .jpeg({ quality: 92, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(output);
}
