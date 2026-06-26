import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url);
const read = (path) => readFileSync(join(root.pathname, path), 'utf8');

const files = {
  logo: read('src/components/LogoMark.astro'),
  nav: read('src/components/Nav.astro'),
  motion: read('src/lib/legacy-motion.ts'),
  index: read('src/pages/index.astro'),
};

const checks = [
  ['Logo exposes the active tetrahedron state', files.logo, "active?: boolean"],
  ['Logo unit is class-toggled for motion', files.logo, 'data-logo-unit'],
  ['Logo uses eight DOM sticks', files.logo, "['inner', 'bottom']"],
  ['Logo root matches legacy 40px width', files.logo, 'width: 40px;'],
  ['Logo root matches legacy 40px height', files.logo, 'height: 40px;'],
  ['Logo sticks match legacy 3px stroke', files.logo, 'height: 3px;'],
  ['Side sticks match legacy 37px width', files.logo, 'width: 37px;'],
  ['Stick morph duration uses legacy 0.6s curve', files.logo, 'transition: transform 0.6s var(--ease-smooth);'],
  [
    'Outer left transform matches legacy endpoint',
    files.logo,
    'transform: rotate(90deg) scaleX(1.38) translateX(-12px);',
  ],
  [
    'Outer top transform matches legacy endpoint',
    files.logo,
    'transform: rotate(20.1deg) scaleX(1.3) translateX(7px);',
  ],
  [
    'Outer right transform matches legacy endpoint',
    files.logo,
    'transform: rotate(-70.1deg) scaleX(0.96) translate(3px, 12px);',
  ],
  [
    'Inner left transform matches legacy endpoint',
    files.logo,
    'transform: rotate(70deg) scaleX(1.1) translateX(-12px) translateY(-6px);',
  ],
  [
    'Inner right transform matches legacy endpoint',
    files.logo,
    'transform: rotate(30deg) scaleX(0.7) translate(23px, 33px);',
  ],
  [
    'Inner top transform matches legacy endpoint',
    files.logo,
    'transform: rotate(-30deg) scaleX(0.95) translate(7px, 9px);',
  ],
  [
    'Inner bottom transform matches legacy endpoint',
    files.logo,
    'transform: rotate(-42deg) scaleX(0.5) translate(-43px, 29px);',
  ],
  ['Header logo starts as active tetrahedron', files.nav, '<LogoMark active />'],
  ['Header wrapper uses legacy 40px box', files.nav, 'width: 40px;'],
  ['Header wrapper uses legacy transform pose', files.nav, 'translateY(5px) rotate(30deg) scale(0.7)'],
  ['Opening logo wrapper uses legacy 40px box', files.index, '.opening-loader__mark'],
  ['Opening animation starts 50px below', files.motion, 'y: 50'],
  ['Opening entrance uses legacy easeOutCirc equivalent', files.motion, "ease: 'circ.out'"],
  ['Opening spin uses easeInOutQuart equivalent', files.motion, "ease: 'power4.inOut'"],
  ['Opening spin keeps the legacy 500ms cycle', files.motion, 'duration: 0.5'],
  ['Opening morph begins at the legacy 2.5s point', files.motion, ".add(() => markUnit?.classList.add('is-active'), 2.5)"],
  ['Opening morph rotates wrapper to legacy 30deg', files.motion, 'rotation: 30'],
  ['Opening morph moves wrapper to legacy 5px', files.motion, 'y: 5'],
  ['Opening shrink uses legacy 0.7 scale', files.motion, 'scale: 0.7'],
  ['Opening exit begins at legacy 4.0s point', files.motion, "}, 4.0)"],
  ['Header hover recovers square state', files.motion, 'logoUnit.classList.remove(\'is-active\');'],
  ['Header hover leave restores tetrahedron state', files.motion, 'logoUnit.classList.add(\'is-active\');'],
  ['Header hover binds pointerenter', files.motion, "logo?.addEventListener('pointerenter', recoverLogo);"],
  ['Header hover binds pointerleave', files.motion, "logo?.addEventListener('pointerleave', transformLogo);"],
  ['Header hover binds mouseenter fallback', files.motion, "logo?.addEventListener('mouseenter', recoverLogo);"],
  ['Header hover binds mouseleave fallback', files.motion, "logo?.addEventListener('mouseleave', transformLogo);"],
  ['Header focus binds focusin', files.motion, "logo?.addEventListener('focusin', recoverLogo);"],
  ['Header focus binds focusout', files.motion, "logo?.addEventListener('focusout', transformLogo);"],
];

const failures = checks.filter(([, content, needle]) => !content.includes(needle));

if (failures.length) {
  console.error('Logo motion validation failed:');
  for (const [label, , needle] of failures) {
    console.error(`- ${label}: missing ${JSON.stringify(needle)}`);
  }
  process.exit(1);
}

console.log(`Logo motion constants match legacy target (${checks.length} checks).`);
