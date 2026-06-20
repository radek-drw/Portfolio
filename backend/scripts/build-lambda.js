import fs from 'fs';
import path from 'path';

import { build } from 'esbuild';
import archiver from 'archiver';

// Get function name from CLI args
const fnName = process.argv[2];
if (!fnName) {
  console.error('❌ Please provide a function name, e.g. `pnpm build:lambda send-email`');
  process.exit(1);
}

// Define paths
const entry = `src/${fnName}.js`;
const outDir = `dist/${fnName}`;
const outFile = path.join(outDir, 'index.js');
const zipFile = `dist/${fnName}.zip`;

// Validate entry file
if (!fs.existsSync(entry)) {
  console.error(`❌ Entry file not found: ${entry}`);
  process.exit(1);
}

// Ensure dist folder exists
fs.mkdirSync(outDir, { recursive: true });

// BUILD PHASE
console.log(`📦 Building Lambda function: ${fnName}...`);

await build({
  entryPoints: [entry],
  bundle: true,
  platform: 'node',
  target: 'node20',
  outfile: outFile,
  minify: true,
  external: ['aws-sdk'],
});

console.log(`✅ Build completed for ${fnName}. Creating ZIP...`);

// ZIP PHASE
await zipLambda(outDir, zipFile);

// Log ZIP size
const stats = fs.statSync(zipFile);
console.log(`✅ ZIP file created: ${zipFile}`);
console.log(`📦 ZIP size: ${(stats.size / 1024).toFixed(2)} KB`);

async function zipLambda(sourceDir, zipPath) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.on('error', reject);
    output.on('close', resolve);

    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
  });
}
