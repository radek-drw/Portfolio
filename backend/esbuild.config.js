import path from 'path';
import fs from 'fs';

import { build } from 'esbuild';
import archiver from 'archiver';

const entryFile = 'sendContactForm.mjs';
const outDir = 'dist';
const outFile = 'sendContactForm.js';
const zipFile = 'sendContactForm.zip';

// Function to bundle and zip
async function bundleAndZip() {
  // 1️⃣ Bundle
  await build({
    entryPoints: [entryFile],
    bundle: true,
    platform: 'node',
    target: 'node18',
    outfile: path.join(outDir, outFile),
    format: 'esm',
    external: ['@aws-sdk/client-ses'],
    minify: true,
  });

  console.log('✅ Bundling completed:', outFile);

  // 2️⃣ Create ZIP file
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const zipPath = path.join(outDir, zipFile);
  const output = fs.createWriteStream(zipPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  archive.pipe(output);
  archive.file(path.join(outDir, outFile), { name: 'index.js' });
  await archive.finalize();

  console.log('✅ ZIP file created:', zipPath);
}

bundleAndZip().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
