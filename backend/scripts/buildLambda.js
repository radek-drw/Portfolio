import fs from 'fs';

import { build } from 'esbuild';
import archiver from 'archiver';

const fnName = process.argv[2];
if (!fnName) {
  console.error('❌ Podaj nazwę funkcji, np. `npm run build:lambda sendContactForm`');
  process.exit(1);
}

const entry = `${fnName}.js`;
const outDir = `dist/${fnName}`;
const zipFile = `dist/${fnName}.zip`;

if (!fs.existsSync(entry)) {
  console.error(`❌ Nie znaleziono pliku: ${entry}`);
  process.exit(1);
}

console.log(`📦 Buduję funkcję: ${fnName}...`);

await build({
  entryPoints: [entry],
  bundle: true,
  platform: 'node',
  target: 'node20',
  outfile: `${outDir}/index.js`,
  external: ['aws-sdk'],
});

console.log(`✅ Zbudowano ${fnName}. Teraz tworzę ZIP...`);

await zipLambda(outDir, zipFile);

console.log(`✅ Utworzono ${zipFile}`);

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
