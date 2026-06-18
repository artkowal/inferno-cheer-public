/**
 * Kompresuje zdjęcia z gallery-source/ do src/assets/gallery/
 * Zmienia nazwy na format SEO-friendly i konwertuje do WebP.
 *
 * Użycie:
 *   node scripts/compress-gallery.mjs
 *   npm run compress-gallery
 *
 * Wrzuć surowe zdjęcia do gallery-source/ (folder nie jest w git).
 * Skompresowane pliki trafią do src/assets/gallery/ i będą przetwarzane przez Astro.
 */

import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, parse } from 'node:path';

const SOURCE_DIR = 'gallery-source';
const OUTPUT_DIR = 'src/assets/gallery';
const MAX_WIDTH = 2400;
const QUALITY = 85;
const SEO_PREFIX = 'studio-tanca-inferno-cheer-elite-tarnow';
const SUPPORTED = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tiff', '.tif', '.heic', '.heif']);

async function run() {
  if (!existsSync(SOURCE_DIR)) {
    console.error(`❌  Folder "${SOURCE_DIR}" nie istnieje. Utwórz go i wrzuć tam surowe zdjęcia.`);
    process.exit(1);
  }

  await mkdir(OUTPUT_DIR, { recursive: true });

  const entries = await readdir(SOURCE_DIR, { withFileTypes: true });
  const files = entries
    .filter(e => e.isFile() && SUPPORTED.has(parse(e.name).ext.toLowerCase()))
    .map(e => e.name)
    .sort();

  if (files.length === 0) {
    console.log(`ℹ️  Brak zdjęć w "${SOURCE_DIR}". Wrzuć tam pliki i uruchom skrypt ponownie.`);
    process.exit(0);
  }

  console.log(`\n🖼️  Znaleziono ${files.length} zdjęć. Kompresuję do WebP...\n`);

  let ok = 0;
  let skipped = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const inputPath = join(SOURCE_DIR, file);
    const outputName = `${SEO_PREFIX}-${i + 1}.webp`;
    const outputPath = join(OUTPUT_DIR, outputName);

    try {
      const originalSize = (await import('node:fs')).statSync(inputPath).size;

      const result = await sharp(inputPath)
        .rotate()                          // zachowuje orientację EXIF
        .resize({
          width: MAX_WIDTH,
          withoutEnlargement: true,        // nie powiększa małych zdjęć
        })
        .webp({ quality: QUALITY })
        .toFile(outputPath);

      const ratio = ((1 - result.size / originalSize) * 100).toFixed(0);
      const fromMB = (originalSize / 1024 / 1024).toFixed(1);
      const toKB = (result.size / 1024).toFixed(0);

      console.log(`  ✓  ${file.padEnd(45)} → ${outputName.padEnd(45)} ${fromMB} MB → ${toKB} KB  (–${ratio}%)`);
      ok++;
    } catch (err) {
      console.error(`  ✗  ${file} — błąd: ${err.message}`);
      skipped++;
    }
  }

  console.log(`\n✅  Gotowe: ${ok} skompresowanych, ${skipped} błędów.`);
  console.log(`📁  Pliki zapisane w: ${OUTPUT_DIR}\n`);
}

run();
