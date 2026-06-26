import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url);
const read = (path) => readFileSync(join(root.pathname, path), 'utf8');

const files = {
  nav: read('src/components/Nav.astro'),
  motion: read('src/lib/legacy-motion.ts'),
};

const checks = [
  ['Drawer links are hash-only and do not reload the current page', files.nav, "href: '#impact'"],
  ['Drawer work link is hash-only', files.nav, "href: '#work'"],
  ['Drawer contact link is hash-only', files.nav, "href: '#contact'"],
  ['Home logo is hash-only on the one-page site', files.nav, 'href="#home"'],
  ['Drawer link handler receives click events', files.motion, "a.addEventListener('click', (event)"],
  ['Drawer hash links prevent document navigation', files.motion, 'event.preventDefault();'],
  ['Drawer hash links scroll to their section', files.motion, 'target.scrollIntoView({'],
  ['Drawer hash links respect reduced motion while scrolling', files.motion, "behavior: reducedMotion ? 'auto' : 'smooth'"],
  ['Drawer hash links update URL hash without reloading', files.motion, 'history.pushState(null, \'\', href);'],
];

const forbidden = [
  ['Drawer links must not use root hash paths', files.nav, "href: '/#"],
];

const failures = checks.filter(([, content, needle]) => !content.includes(needle));
const forbiddenHits = forbidden.filter(([, content, needle]) => content.includes(needle));

if (failures.length || forbiddenHits.length) {
  console.error('Drawer link validation failed:');
  for (const [label, , needle] of failures) {
    console.error(`- ${label}: missing ${JSON.stringify(needle)}`);
  }
  for (const [label, , needle] of forbiddenHits) {
    console.error(`- ${label}: found forbidden ${JSON.stringify(needle)}`);
  }
  process.exit(1);
}

console.log(`Drawer links stay in-page and scroll sections (${checks.length} checks).`);
