import fs from 'node:fs';
import path from 'node:path';
import { performance } from 'node:perf_hooks';

import { build } from 'esbuild';
import archiver from 'archiver';

const srcDir = 'src';
const distDir = 'dist';

// Find all Lambda entry files in src/
const lambdaFiles = fs.readdirSync(srcDir).filter((file) => file.endsWith('.js'));

if (lambdaFiles.length === 0) {
  console.error('❌ No Lambda functions found in src/');
  process.exit(1);
}

console.log(`🚀 Found ${lambdaFiles.length} Lambda function(s):`);

for (const file of lambdaFiles) {
  console.log(`   • ${file}`);
}

const totalStart = performance.now();

for (const file of lambdaFiles) {
  const fnName = path.basename(file, '.js');

  const entry = path.join(srcDir, file);
  const outDir = path.join(distDir, fnName);
  const outFile = path.join(outDir, 'index.js');
  const zipFile = path.join(distDir, `${fnName}.zip`);

  const start = performance.now();

  // Clean previous build
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.rmSync(zipFile, { force: true });

  // Create output directory
  fs.mkdirSync(outDir, { recursive: true });

  console.log(`\n📦 Building Lambda function: ${fnName}...`);

  await build({
    entryPoints: [entry],
    bundle: true,
    platform: 'node',
    target: 'node24',
    outfile: outFile,
    minify: true,
    external: ['aws-sdk'],
  });

  console.log(`✅ Build completed for ${fnName}. Creating ZIP...`);

  await zipLambda(outDir, zipFile);

  const stats = fs.statSync(zipFile);
  const duration = ((performance.now() - start) / 1000).toFixed(2);

  console.log(`✅ ZIP file created: ${zipFile}`);
  console.log(`📦 ZIP size: ${(stats.size / 1024).toFixed(2)} KB`);
  console.log(`⏱️ Total time: ${duration}s`);
}

const totalDuration = ((performance.now() - totalStart) / 1000).toFixed(2);

console.log('\n✅ All Lambda functions built successfully!');
console.log(`⏱️ Total build time: ${totalDuration}s`);

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
