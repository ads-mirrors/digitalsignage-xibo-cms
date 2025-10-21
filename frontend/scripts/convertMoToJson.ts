// frontend/scripts/i18n.ts
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import * as gettextParser from 'gettext-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths (relative to frontend/scripts)
const inputDir = path.resolve(__dirname, '../../locale');
const outputRoot = path.resolve(__dirname, '../public/locale');
const outputLangDir = path.join(outputRoot, 'langs');

fs.mkdirSync(outputLangDir, { recursive: true });

function convertMoToJson() {
  const files = fs.readdirSync(inputDir).filter((f) => f.endsWith('.mo'));

  for (const file of files) {
    const lang = file.replace(/\.mo$/i, '');
    const mo = fs.readFileSync(path.join(inputDir, file));
    const parsed = gettextParser.mo.parse(mo);

    const messages: Record<string, string> = {};
    const domain = parsed.translations[''] || {};

    for (const key of Object.keys(domain)) {
      if (!key) continue; // skip header
      const entry = domain[key];
      const val = entry?.msgstr?.[0];
      if (val) {
        messages[key] = normalisePlaceholders(val);
      }
    }

    const jsonPath = path.join(outputLangDir, `${lang}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(messages, null, 2), 'utf8');
    console.log(`Converted ${file} → ${path.relative(process.cwd(), jsonPath)}`);
  }
}

function generateAvailableLangs() {
  if (!fs.existsSync(outputLangDir)) {
    console.error('No language output directory found:', outputLangDir);
    process.exit(0);
  }

  const langs = fs
    .readdirSync(outputLangDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => path.basename(f, '.json'))
    .sort();

  const outputFile = path.join(outputRoot, 'available.json');
  fs.writeFileSync(outputFile, JSON.stringify(langs, null, 2), 'utf8');
  console.log(`Generated available.json with languages:`, langs);
}

function cleanLangDir() {
  if (fs.existsSync(outputLangDir)) {
    fs.readdirSync(outputLangDir).forEach((f) => {
      fs.unlinkSync(path.join(outputLangDir, f));
    });
    console.log(`Cleaned ${outputLangDir}`);
  }
}

function normalisePlaceholders(str: string): string {
  let counter = 0;

  return (
    str
      // Convert %word% → {{word}}
      .replace(/%([a-zA-Z0-9_]+)%/g, '{{$1}}')
      // Convert %s → {{0}}, {{1}}, etc.
      .replace(/%s/g, () => `{{${counter++}}}`)
  );
}

function main() {
  cleanLangDir();
  convertMoToJson();
  generateAvailableLangs();
  console.log('i18n conversion complete.');
}

main();
