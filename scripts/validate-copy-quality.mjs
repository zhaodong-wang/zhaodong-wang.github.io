import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const files = [
  'src/pages/index.astro',
  'src/pages/404.astro',
  'src/components/LegacyRedirect.astro',
  'src/content/skills/skills.json',
];

const bannedPatterns = [
  { pattern: /\bold site\b/i, reason: 'self-referential redesign copy' },
  { pattern: /\bresearch archive\b/i, reason: 'explains the old site instead of the current profile' },
  { pattern: /\bthis version\b/i, reason: 'meta copy about the website' },
  { pattern: /\bnot the whole story\b/i, reason: 'generic corrective phrasing' },
  { pattern: /\bresearch signal\b/i, reason: 'portfolio jargon' },
  { pattern: /\bcompact arc\b/i, reason: 'vague portfolio scaffold' },
  { pattern: /\bcompressed\b/i, reason: 'abstract design-language filler' },
  { pattern: /\bfrontier\b/i, reason: 'overused AI positioning term' },
  { pattern: /\blast mile\b/i, reason: 'generic product metaphor' },
  { pattern: /\bmore than demos\b/i, reason: 'strawman contrast' },
  { pattern: /\bconnective tissue\b/i, reason: 'metaphor instead of concrete work' },
  { pattern: /\bhard cases\b/i, reason: 'generic AI-product language' },
  { pattern: /\busable by real people\b/i, reason: 'generic product-marketing claim' },
  { pattern: /\bscaffolding\b/i, reason: 'abstract AI-agent filler' },
  { pattern: /\barchive page\b/i, reason: 'self-referential redirect copy' },
  { pattern: /\bone-page site\b/i, reason: 'website-process copy' },
  { pattern: /\bnot routable\b/i, reason: 'jargony 404 copy' },
];

const findings = [];

for (const file of files) {
  const text = readFileSync(resolve(root, file), 'utf8');
  for (const { pattern, reason } of bannedPatterns) {
    if (pattern.test(text)) {
      findings.push(`${file}: ${pattern} (${reason})`);
    }
  }
}

if (findings.length > 0) {
  console.error('Public copy quality validation failed:');
  findings.forEach((finding) => console.error(`- ${finding}`));
  process.exit(1);
}

console.log(`Public copy avoids banned slop patterns (${files.length} files scanned).`);
