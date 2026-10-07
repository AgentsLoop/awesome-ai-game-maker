#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname, extname } from 'node:path';

const args = process.argv.slice(2);
if (args.length !== 3) {
  console.error('Usage: node embed-assets.mjs template.svg assets.json output.svg');
  process.exit(1);
}
const [templatePath, manifestPath, outputPath] = args.map(path => resolve(path));
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) {
  throw new Error('Provide a JSON object mapping placeholder names to asset paths.');
}
const mimeTypes = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.png': 'image/png' };
const inputs = new Set([templatePath, manifestPath]);
const embedded = new Map();
for (const [name, path] of Object.entries(manifest)) {
  if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(name) || typeof path !== 'string') {
    throw new Error(`Invalid asset mapping: ${name}`);
  }
  const assetPath = resolve(dirname(manifestPath), path);
  inputs.add(assetPath);
  const mime = mimeTypes[extname(assetPath).toLowerCase()];
  if (!mime) throw new Error(`Unsupported asset format: ${assetPath}`);
  embedded.set(name, `data:${mime};base64,${readFileSync(assetPath).toString('base64')}`);
}
if (inputs.has(outputPath)) throw new Error('Use an output path separate from the source files.');
const output = readFileSync(templatePath, 'utf8').replace(/\{\{([^{}]+)\}\}/g, (_, name) => {
  if (!embedded.has(name)) throw new Error(`Missing asset mapping for {{${name}}}`);
  return embedded.get(name);
});
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, output);
console.log(`Built ${outputPath} (${Buffer.byteLength(output)} bytes).`);
