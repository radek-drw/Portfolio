import fs from 'fs';

import { build } from 'esbuild';
import archiver from 'archiver';

// Get the function name from CLI args
const fnName = process.argv[2];
if (!fnName) {
  console.error('❌ Please provide a function name, e.g. `npm run build:lambda sendContactForm`');
  process.exit(1);
}

const entry = `${fnName}.js`;
const outDir = `dist/${fnName}`;
const zipFile = `dist/${fnName}.zip`;

// Validate entry file existence
if (!fs.existsSync(entry)) {
  console.error(`❌Entry file not found: ${entry}`);
  process.exit(1);
}

// BUILD PHASE
console.log(`📦 Building function: ${fnName}...`);

await build({
  entryPoints: [entry],
  bundle: true,
  platform: 'node',
  target: 'node20',
  outfile: `${outDir}/index.js`,
  minify: true,
  external: ['aws-sdk'],
});

console.log(`✅ Build completed for ${fnName}. Starting ZIP creation...`);

// ZIP PHASE
await zipLambda(outDir, zipFile);

console.log(`✅ ZIP file created successfully: ${zipFile}`);

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
