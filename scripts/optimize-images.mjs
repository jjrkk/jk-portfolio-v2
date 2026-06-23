/**
 * Image optimization for static export.
 *
 * Next's Image Optimizer is disabled under `output: "export"`, so we ship
 * correctly-sized assets ourselves. This resizes the source art down to the
 * real display size and emits WebP alongside the original (same basename).
 *
 * Run: node scripts/optimize-images.mjs
 *
 * Add entries to MANIFEST as new assets land. `maxWidth` is the cap — images
 * already smaller are left at native width (only re-encoded to WebP).
 */
import sharp from "sharp";
import { stat } from "node:fs/promises";
import path from "node:path";

const PUBLIC = path.resolve("public");

// Carousel hero cards display in a ~760px slot; cap at 1800px so they stay crisp
// at 2× DPR on large viewports while shedding the multi-MB full-res weight.
const CARD_MAX = 1800;

const MANIFEST = [
  { src: "personality/jk-whiteboard.png", maxWidth: CARD_MAX },
  { src: "work/cloud/ff-cloud.png", maxWidth: CARD_MAX },
  { src: "work/image-capture/cap-app-after-2x.png", maxWidth: CARD_MAX },
  { src: "work/egg-reports/ff-reports-card.png", maxWidth: CARD_MAX },
  { src: "work/synaptive/modus-v-hero-image.jpg", maxWidth: CARD_MAX },
  { src: "work/presto/presto-ticketing-machines.jpg", maxWidth: CARD_MAX },
  { src: "work/experiencepoint/impact.png", maxWidth: CARD_MAX },
];

const kb = (b) => `${(b / 1024).toFixed(0)}KB`;

let beforeTotal = 0;
let afterTotal = 0;

for (const { src, maxWidth } of MANIFEST) {
  const srcPath = path.join(PUBLIC, src);
  const outPath = path.join(PUBLIC, src.replace(/\.(png|jpe?g)$/i, ".webp"));
  try {
    const before = (await stat(srcPath)).size;
    const img = sharp(srcPath);
    const meta = await img.metadata();
    const pipeline =
      meta.width && meta.width > maxWidth
        ? img.resize({ width: maxWidth, withoutEnlargement: true })
        : img;
    await pipeline.webp({ quality: 80, effort: 5 }).toFile(outPath);
    const after = (await stat(outPath)).size;
    beforeTotal += before;
    afterTotal += after;
    console.log(
      `✓ ${src}\n    ${meta.width}px ${kb(before)} → ${Math.min(meta.width ?? 0, maxWidth)}px ${kb(after)}  (${Math.round((1 - after / before) * 100)}% smaller)`,
    );
  } catch (e) {
    console.error(`✗ ${src}: ${e.message}`);
  }
}

console.log(
  `\nTotal: ${kb(beforeTotal)} → ${kb(afterTotal)}  (${Math.round((1 - afterTotal / beforeTotal) * 100)}% smaller)`,
);
