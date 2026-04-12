# CLAUDE.md

Notes for Claude Code working in this repo. Covers current state, how it runs, and what to preserve vs. rebuild for the planned revamp.

## What this is

Personal portfolio for Zhaodong Wang, deployed via **GitHub Pages** from `master` at **www.zhaodongwang.net** (CNAME in repo root). GitHub Pages build source: branch `master`, path `/` (legacy build). No custom CI, no build step — Pages serves the HTML/CSS/JS as-is.

## Current stack (circa 2015)

- **5 static HTML pages** (not a SPA): `index.html`, `education.html`, `projects.html`, `publications.html`, `skills.html`. Linear flow Home → Education → Projects → Publications → Skills → Home, with a hamburger drawer for direct jumps.
- **jQuery 1.11.1** + **jQuery UI** (only used for easings) + **jquery.transform.js** (0.9.5) + **iScroll probe** (custom vertical scroll hijack). HTML5 shim for IE9. No bundler, no package.json, no preprocessor.
- **Pure CSS** in `css/main.css` (~1200 lines), `css/queries.css` (responsive), `css/forks.css` (duplicated patterns). Heavy vendor prefixes. Breakpoints at 1300 / 1140 / 600 / 420.
- **Fonts** self-hosted under `css/font/`: Brandon Grotesque (body), Adobe Caslon Pro (italic/accent), Lato (unused?), fontello (social icons). Multiple formats each (woff/woff2/ttf/eot/svg).
- **Per-page JS** (`js/index.js`, `education.js`, `projects.js`, `publications.js`, `skills.js`) plus shared `js/main.js` and `js/dynamic-home.js`. Each page instantiates its own iScroll and wires scroll-driven animations (parallax, timeline circle pulses, skill-bar fills, counter animations, text reveal masks).
- **`slides/INFORMS/2014/`**: a legacy impress.js deck linked from publications. Leave it alone during the revamp — it's a historical artifact with its own jQuery.

## Design system to preserve

The **visual design is the product** — the revamp keeps it intact. Tokens to honor:

- **Primary accent**: `#bc8420` (warm gold). Used for h3s, italics, skill bars, timeline circles, link hover. Appears ~9× in main.css — on the rebuild, make it a single CSS variable.
- **Neutrals**: `#111` / `#222` (dark covers and nav), `#333–#666` (secondary text), `#aaa–#eee` (borders/backgrounds).
- **Link color**: `#714f13` → `#bc8420` on hover.
- **Typography**: Brandon for UI (300–800 weights + italics), ACaslon for italic/accent (400/500/600 + italics). Base 20px, letter-spacing `0.125em` on uppercase titles, line-height 150% body.
- **Easings used everywhere**: `cubic-bezier(0.6, 0, 0.4, 1)` and `cubic-bezier(0.835, 0, 0.19, 1)`. These define the feel — port them over verbatim.
- **Signature interactions**: hero scroll-words rotator, fade-to-black page transitions, mosaic hover on `#gallary`, timeline circle pulses on scroll into view, skill-bar fills with counting percentage, publication counter animations, panorama parallax backgrounds.

## Pain points driving the revamp

1. jQuery 1.11.1 + jQuery UI (239 KB just for easings) + jquery.transform + iScroll — all replaceable with vanilla JS + CSS.
2. iScroll hijacks mobile scroll with `touchmove preventDefault` — friction on mobile, and parallax effects are degraded or broken there.
3. No semantic HTML (`<div>` soup), no ARIA on the hamburger, no focus states, no alt text on decorative images. Gold-on-light contrast likely fails WCAG AA in some spots.
4. No build step → no minification, no image optimization (background JPGs 150–280 KB), no WebP, no `srcset`, no lazy loading. 2-second artificial preloader delay.
5. `main.css` (~1200 lines) + `forks.css` (~690 lines) duplicate structure. Hard-coded color repeated ~9×. No variables, no grid/flex (floats + absolute positioning).
6. SEO basics missing: no meta description, no Open Graph, no structured data, no sitemap.
7. Content is baked into HTML — every publication, project, skill is a hand-written markup block. Should be data-driven (JSON/MD) for easy updates.

## Content (source of truth, do not lose)

- **Role**: Senior Staff Research Scientist, Meta Superintelligence Lab.
- **Contact**: zhaodong.wang.1992@gmail.com · 1 Hacker Way, Menlo Park, CA · +1 (650) 862-2969.
- **Education**: Tsinghua (B.E. Civil Eng & Economics, 2009–2013) · UIUC (M.S. Applied Math, Ph.D. Civil Eng, 2013–2017).
- **Projects (5)**: FB service-level traffic analysis (2017), ML failure prediction (2015), locomotive footprint (2013–15), bullwhip effect (2013–14), emission mitigation / intelligent vehicles (2013).
- **Publications**: 5 papers (Operations Research 2021, Transp. Research Part B 2015, EJOR 2015, CACAIE 2015, INFORMS 2016 Wagner finalist), 5 manuscripts, 8 conference talks.
- **Skills**: Software (C++ 75, Python 75, Java 65, HTML/CSS 65, JS 50) · Data tools (Hive/Presto 75, Scuba 60, ODS 65, MySQL 55, DataSwarm 50). *Note: these percentages and the data-tools list are ~2017 Facebook-era — likely want to refresh during the rebuild, confirm with Zhaodong.*
- **Socials**: Facebook, Twitter, Google+, LinkedIn, Renren, Weibo, Instagram. Google+ is dead (shut down 2019) — drop on rebuild.

## How to run / deploy

- **Local preview**: open any `.html` file in a browser, or `python3 -m http.server` from repo root. No build.
- **Deploy**: push to `master`. GitHub Pages rebuilds automatically (~1 min). Domain `www.zhaodongwang.net` is enforced HTTPS via GitHub's cert (current cert expires 2026-05-29).
- **Check Pages status**: `gh api repos/zhaodong-wang/zhaodong-wang.github.io/pages`.

## Revamp ground rules

- **Preserve the visual design** — fonts, color palette, easings, section layouts, signature animations. Users will compare screenshot-to-screenshot.
- **Keep the URL stable** — `www.zhaodongwang.net` serves from `master`, GitHub Pages. Whatever the new build outputs, the final HTML/CSS/JS has to be publishable from this repo. Either commit `dist/` or set up GitHub Actions to deploy.
- **Content becomes data** — publications, projects, education entries, skills should live in JSON/MD/YAML, not hand-written HTML blocks.
- **Accessibility is not optional** — semantic HTML, ARIA where needed, visible focus, WCAG AA contrast, keyboard nav for the drawer.
- **Mobile-first responsive** — drop iScroll, use native CSS scroll + `scroll-behavior: smooth`. Honor `prefers-reduced-motion`.
- **Don't touch `slides/INFORMS/2014/`** during the rebuild — it's self-contained legacy.

## Repo quirks

- `.DS_Store` files present in root and subdirs — add to `.gitignore` (done).
- `.claude/memory` is a symlink to the user's auto-memory directory; both `.claude/` and `.DS_Store` are gitignored.
- Git user is `TeXnicians`; main branch is `master` (not `main`).
- Recent commit style is short imperative: "Update info", "Update skills", "Add pubs".
