import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const legacyMotion = readFileSync(resolve(root, 'src/lib/legacy-motion.ts'), 'utf8');
const homePage = readFileSync(resolve(root, 'src/pages/index.astro'), 'utf8');

const checks = [
  [
    'GSAP SplitText is imported for hero title reveal',
    legacyMotion,
    "import { SplitText } from 'gsap/SplitText';",
  ],
  [
    'GSAP ScrambleTextPlugin is imported for role and scope decoding',
    legacyMotion,
    "import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';",
  ],
  [
    'SplitText and ScrambleTextPlugin are registered once with GSAP',
    legacyMotion,
    'gsap.registerPlugin(CustomEase, ScrollTrigger, SplitText, ScrambleTextPlugin);',
  ],
  [
    'Hero title exposes a text-motion target',
    homePage,
    '<h1 class="home__title" data-home-title>Zhaodong Wang</h1>',
  ],
  [
    'Hero kicker exposes a scramble target',
    homePage,
    '<p class="home__kicker" data-scramble-text>AI Research Scientist / Meta TBD Lab</p>',
  ],
  [
    'Hero deck exposes a stable block reveal target',
    homePage,
    '<p class="home__deck" data-home-deck>',
  ],
  [
    'Hero scope exposes phrase-level scramble targets',
    homePage,
    'data-scope-phrase',
  ],
  [
    'Home motion initializes SplitText title reveal',
    legacyMotion,
    'setupHeroTextMotion',
  ],
  [
    'Scramble hover handlers restore original text',
    legacyMotion,
    'setupScrambleHover',
  ],
  [
    'Reduced motion branch restores split text',
    legacyMotion,
    'revertHeroTextMotion',
  ],
  [
    'Split text wrappers keep transforms stable',
    homePage,
    '.home__title-word',
  ],
];

const failures = checks.filter(([, source, needle]) => !source.includes(needle));

const forbidden = [
  [
    'Hero deck must not be SplitText line-split because line wrapping changes with viewport width',
    legacyMotion,
    'SplitText.create(deck',
  ],
  [
    'Hero deck line classes must not ship because they can flash during two-line/three-line reflow',
    homePage,
    'home__deck-line',
  ],
];

const forbiddenHits = forbidden.filter(([, source, needle]) => source.includes(needle));

if (failures.length > 0 || forbiddenHits.length > 0) {
  console.error('Homepage text motion validation failed:');
  failures.forEach(([label]) => console.error(`- ${label}`));
  forbiddenHits.forEach(([label]) => console.error(`- ${label}`));
  process.exit(1);
}

console.log(`Homepage text motion structure is present (${checks.length} checks).`);
