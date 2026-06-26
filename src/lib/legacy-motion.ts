import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

let registered = false;

function initGsap() {
  if (registered) return;
  gsap.registerPlugin(CustomEase, ScrollTrigger, SplitText, ScrambleTextPlugin);
  CustomEase.create('zwSmooth', 'M0,0 C0.6,0 0.4,1 1,1');
  CustomEase.create('zwSnap', 'M0,0 C0.835,0 0.19,1 1,1');
  CustomEase.create('zwMenu', 'M0,0 C0.19,1 0.22,1 1,1');
  CustomEase.create('zwOut', 'M0,0 C0.23,1 0.32,1 1,1');
  gsap.defaults({ overwrite: 'auto' });
  registered = true;
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function markVisible(targets: string) {
  document.querySelectorAll<HTMLElement>(targets).forEach((el) => {
    el.classList.add('is-visible');
  });
}

type HeroTextMotion = {
  title?: SplitText;
};

type ScopePhraseMotion = {
  host: HTMLElement;
  text: HTMLElement;
  originalText: string;
};

const SCRAMBLE_CHARS = '01/<>AI-ZW';
const SCOPE_GHOST_CLASS = 'home__scope-ghost';
const SCOPE_TEXT_CLASS = 'home__scope-text';

function makeScrambleSeed(text: string) {
  return Array.from(text, (char, index) => {
    if (/\s/.test(char)) return char;
    if (char === '/') return '/';
    return SCRAMBLE_CHARS[(index * 5 + text.length) % SCRAMBLE_CHARS.length];
  }).join('');
}

function setupHeroTextMotion(home: HTMLElement): HeroTextMotion {
  const title = home.querySelector<HTMLElement>('[data-home-title]');

  const textMotion: HeroTextMotion = {};

  if (title) {
    textMotion.title = SplitText.create(title, {
      type: 'words',
      wordsClass: 'home__title-word',
      tag: 'span',
      aria: 'auto',
    });
  }

  return textMotion;
}

function revertHeroTextMotion(textMotion?: HeroTextMotion) {
  textMotion?.title?.revert();
}

function prepareScopePhrase(host: HTMLElement): ScopePhraseMotion | undefined {
  const originalText = host.textContent?.trim();
  if (!originalText) return undefined;

  host.dataset.originalText = originalText;
  host.setAttribute('aria-label', originalText);
  host.textContent = '';

  const ghost = document.createElement('span');
  ghost.className = SCOPE_GHOST_CLASS;
  ghost.textContent = originalText;
  ghost.setAttribute('aria-hidden', 'true');

  const text = document.createElement('span');
  text.className = SCOPE_TEXT_CLASS;
  text.textContent = makeScrambleSeed(originalText);
  text.setAttribute('aria-hidden', 'true');

  host.append(ghost, text);

  return { host, text, originalText };
}

function setupScrambleHover(targets: ScopePhraseMotion[]) {
  targets.forEach(({ host, text, originalText }) => {
    host.addEventListener('pointerenter', () => {
      if (prefersReducedMotion()) return;
      gsap.killTweensOf(text);
      gsap.to(text, {
        duration: 0.62,
        ease: 'none',
        scrambleText: {
          text: originalText,
          chars: SCRAMBLE_CHARS,
          speed: 0.48,
          revealDelay: 0.08,
          tweenLength: false,
        },
      });
    });
  });
}

export function setupOpeningMotion() {
  initGsap();

  const loader = document.querySelector<HTMLElement>('[data-opening-loader]');
  const mark = loader?.querySelector<HTMLElement>('[data-opening-mark]');
  const markUnit = mark?.querySelector<HTMLElement>('[data-logo-unit]');
  if (!loader || !mark) return;

  if (prefersReducedMotion()) {
    loader.remove();
    return;
  }

  markUnit?.classList.remove('is-active');
  gsap.set(loader, { autoAlpha: 1 });
  gsap.set(mark, {
    autoAlpha: 0,
    scale: 1,
    x: 0,
    y: 50,
    rotation: 0,
    transformOrigin: '50% 50%',
  });

  gsap
    .timeline({
      onComplete: () => loader.remove(),
    })
    .to(mark, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'circ.out' }, 0)
    .to(
      mark,
      {
        rotation: 360,
        duration: 0.5,
        ease: 'power4.inOut',
        repeat: 2,
        repeatDelay: 0.01,
      },
      0.6,
    )
    .set(mark, { rotation: 0 }, 2.0)
    .add(() => markUnit?.classList.add('is-active'), 2.5)
    .to(mark, { rotation: 30, y: 5, duration: 0.6, ease: 'power4.inOut' }, 2.5)
    .to(mark, { scale: 0.7, duration: 0.5, ease: 'power4.inOut' }, 4.0)
    .to(loader, { autoAlpha: 0, duration: 0.6, ease: 'zwSmooth' }, 4.0);
}

export function setupLegacyDrawer() {
  initGsap();

  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const drawer = document.querySelector<HTMLElement>('[data-drawer]');
  const header = document.querySelector<HTMLElement>('.site-header');
  if (!toggle || !drawer || !header) return;
  const reducedMotion = prefersReducedMotion();
  const duration = (seconds: number) => (reducedMotion ? 0 : seconds);
  const stagger = (seconds: number) => (reducedMotion ? 0 : seconds);

  const panels = Array.from(
    drawer.querySelectorAll<HTMLElement>('.site-drawer__panel-fill'),
  );
  const items = Array.from(
    drawer.querySelectorAll<HTMLElement>('.site-drawer__list li'),
  );
  const logo = header.querySelector<HTMLElement>('.site-header__logo');
  const logoMark = logo?.querySelector<HTMLElement>('[data-logo-mark]');
  const logoUnit = logoMark?.querySelector<HTMLElement>('[data-logo-unit]');
  const bars = Array.from(toggle.querySelectorAll<HTMLElement>('span'));
  const backgroundTargets = Array.from(
    document.querySelectorAll<HTMLElement>('main, footer'),
  );
  const focusables = () =>
    Array.from(
      drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );

  let isOpen = false;
  let lastY = window.scrollY;
  let closeTimer = 0;

  gsap.set(panels, { scaleX: 0, transformOrigin: 'right center' });
  gsap.set(items, { xPercent: 80, autoAlpha: 0 });
  logoUnit?.classList.add('is-active');
  if (logoMark) {
    gsap.set(logoMark, {
      rotation: 30,
      y: 5,
      scale: 0.7,
      transformOrigin: '50% 50%',
    });
  }
  if (bars.length === 3) {
    gsap.set(bars, { x: 0, rotation: 0, transformOrigin: 'center center' });
    gsap.set(bars[0], { y: -10 });
    gsap.set(bars[1], { y: 0, autoAlpha: 1 });
    gsap.set(bars[2], { y: 10 });
  }

  const setA11y = (open: boolean) => {
    drawer.setAttribute('aria-hidden', String(!open));
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('drawer-open', open);
    drawer.classList.toggle('is-open', open);
    backgroundTargets.forEach((target) => {
      if (open) {
        target.setAttribute('aria-hidden', 'true');
        target.setAttribute('inert', '');
      } else {
        target.removeAttribute('aria-hidden');
        target.removeAttribute('inert');
      }
    });
  };

  const animateBars = (open: boolean) => {
    if (bars.length !== 3) return;
    gsap.to(bars, {
      backgroundColor: open ? '#ccc' : '#7f7f7f',
      duration: duration(0.8),
      ease: 'power2.out',
    });
    gsap.to(bars[0], {
      x: 0,
      y: open ? 0 : -10,
      rotation: open ? 45 : 0,
      duration: duration(0.6),
      ease: 'zwSmooth',
    });
    gsap.to(bars[1], {
      autoAlpha: open ? 0 : 1,
      duration: duration(0.3),
      ease: 'power1.out',
    });
    gsap.to(bars[2], {
      x: 0,
      y: open ? 0 : 10,
      rotation: open ? -45 : 0,
      duration: duration(0.6),
      ease: 'zwSmooth',
    });
  };

  const transformLogo = () => {
    if (!logoMark || !logoUnit || isOpen) return;
    logoUnit.classList.add('is-active');
    gsap.to(logoMark, {
      rotation: 30,
      y: 5,
      scale: 0.7,
      duration: duration(0.6),
      ease: 'power4.inOut',
    });
  };

  const recoverLogo = () => {
    if (!logoMark || !logoUnit || isOpen) return;
    logoUnit.classList.remove('is-active');
    gsap.to(logoMark, {
      rotation: 0,
      y: 0,
      scale: 0.7,
      duration: duration(0.6),
      ease: 'power4.inOut',
    });
  };

  const open = ({ focusFirst = false } = {}) => {
    if (isOpen) return;
    window.clearTimeout(closeTimer);
    isOpen = true;
    setA11y(true);
    animateBars(true);

    const tl = gsap.timeline();
    tl.to(logo, { yPercent: -100, duration: duration(0.6), ease: 'zwSnap' }, 0)
      .to(
        panels,
        {
          scaleX: 1,
          duration: duration(0.5),
          ease: 'none',
          stagger: stagger(0.08),
        },
        0,
      )
      .to(
        items,
        {
          xPercent: 0,
          autoAlpha: 1,
          duration: duration(0.5),
          ease: 'zwMenu',
          stagger: stagger(0.07),
        },
        0.42,
      )
      .call(() => {
        if (focusFirst) focusables()[0]?.focus();
      }, undefined, 0.95);
  };

  const close = ({ restoreFocus = true } = {}) => {
    if (!isOpen) return;
    isOpen = false;
    animateBars(false);

    const tl = gsap.timeline({
      onComplete: () => {
        setA11y(false);
        gsap.set(items, { xPercent: 80, autoAlpha: 0 });
        if (restoreFocus) toggle.focus();
      },
    });
    tl.to(
      items.slice().reverse(),
      {
        xPercent: 80,
        autoAlpha: 0,
        duration: duration(0.5),
        ease: 'zwMenu',
        stagger: stagger(0.07),
      },
      0,
    )
      .to(
        panels.slice().reverse(),
        {
          scaleX: 0,
          duration: duration(0.5),
          ease: 'none',
          stagger: stagger(0.08),
        },
        0.48,
      )
      .to(logo, { yPercent: 0, duration: duration(0.6), ease: 'zwSnap' }, 0.88);
  };

  toggle.addEventListener('click', (event) => {
    const focusFirst = event.detail === 0;
    if (isOpen) close();
    else open({ focusFirst });
  });

  logo?.addEventListener('pointerenter', recoverLogo);
  logo?.addEventListener('pointerleave', transformLogo);
  logo?.addEventListener('mouseenter', recoverLogo);
  logo?.addEventListener('mouseleave', transformLogo);
  logo?.addEventListener('focusin', recoverLogo);
  logo?.addEventListener('focusout', transformLogo);

  document.addEventListener('keydown', (e) => {
    if (!isOpen) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }
    if (e.key !== 'Tab') return;
    const list = focusables();
    if (!list.length) return;
    const first = list[0];
    const last = list[list.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  });

  drawer.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((a) => {
    a.addEventListener('click', (event) => {
      const href = a.getAttribute('href');
      if (!href?.startsWith('#')) {
        close({ restoreFocus: false });
        return;
      }

      const target = document.querySelector<HTMLElement>(href);
      if (!target) {
        close({ restoreFocus: false });
        return;
      }

      event.preventDefault();
      close({ restoreFocus: false });
      window.setTimeout(() => {
        target.scrollIntoView({
          behavior: reducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });
        history.pushState(null, '', href);
      }, duration(920));
    });
  });

  const chromeTarget = logo ?? header;
  const onScroll = () => {
    if (isOpen) return;
    const nextY = window.scrollY;
    const direction = nextY > lastY ? 1 : nextY < lastY ? -1 : 0;
    if (nextY > 100 && direction === 1) {
      gsap.to(chromeTarget, { yPercent: -100, duration: duration(0.6), ease: 'zwSnap' });
    } else if (direction === -1 || nextY < 30) {
      gsap.to(chromeTarget, { yPercent: 0, duration: duration(0.6), ease: 'zwSnap' });
    }
    lastY = nextY;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

export function setupNextArrowMotion() {
  initGsap();
  if (prefersReducedMotion()) return;

  document.querySelectorAll<HTMLElement>('.next-arrow').forEach((arrow) => {
    const pulse = () => {
      const ring = document.createElement('span');
      ring.className = 'next-arrow__pulse';
      ring.setAttribute('aria-hidden', 'true');
      arrow.prepend(ring);
      gsap.fromTo(
        ring,
        { autoAlpha: 0.9, scale: 1 },
        {
          autoAlpha: 0,
          scale: 1.42,
          duration: 0.5,
          ease: 'circ.out',
          onComplete: () => ring.remove(),
        },
      );
    };
    arrow.addEventListener('pointerenter', pulse);
    arrow.addEventListener('click', pulse);
  });
}

export function setupHomeMotion() {
  initGsap();

  if (prefersReducedMotion()) {
    revertHeroTextMotion();
    markVisible('[data-reveal], .mosaic');
    gsap.set('.home__line > *', { clearProps: 'all', autoAlpha: 1 });
    return;
  }

  const home = document.querySelector<HTMLElement>('.home');
  const about = document.querySelector<HTMLElement>('.about');
  const gallery = document.querySelector<HTMLElement>('.gallery');
  const contact = document.querySelector<HTMLElement>('.contact');
  if (!home) return;

  const hasOpeningLoader = Boolean(document.querySelector<HTMLElement>('[data-opening-loader]'));
  const textMotion = setupHeroTextMotion(home);
  const lineContents = gsap.utils.toArray<HTMLElement>('.home__line > *');
  const titleWords = textMotion.title?.words ?? [];
  const kicker = home.querySelector<HTMLElement>('[data-scramble-text]');
  const scope = home.querySelector<HTMLElement>('[data-home-scope]');
  const scopePhrases = gsap.utils.toArray<HTMLElement>('[data-scope-phrase]');
  const scopePhraseMotion = scopePhrases
    .map((phrase) => prepareScopePhrase(phrase))
    .filter((phrase): phrase is ScopePhraseMotion => Boolean(phrase));

  if (kicker?.textContent) {
    kicker.dataset.originalText = kicker.textContent;
    kicker.textContent = makeScrambleSeed(kicker.dataset.originalText);
  }

  gsap.set(lineContents, { yPercent: 105, autoAlpha: 0 });
  gsap.set(titleWords, { yPercent: 118, rotationX: -24, autoAlpha: 0 });

  const intro = gsap.timeline({
    defaults: { ease: 'zwMenu' },
    delay: hasOpeningLoader ? 4.18 : 0,
    onComplete: () => setupScrambleHover(scopePhraseMotion),
  });

  intro
    .to(lineContents, {
      yPercent: 0,
      autoAlpha: 1,
      duration: 0.72,
      stagger: 0.08,
    })
    .to(
      kicker,
      {
        duration: 0.96,
        ease: 'none',
        scrambleText: {
          text: kicker?.dataset.originalText ?? '',
          chars: SCRAMBLE_CHARS,
          speed: 0.5,
          revealDelay: 0.18,
          tweenLength: false,
        },
      },
      0.08,
    )
    .to(
      titleWords,
      {
        yPercent: 0,
        rotationX: 0,
        autoAlpha: 1,
        duration: 1.15,
        ease: 'zwOut',
        stagger: 0.08,
      },
      0.32,
    );

  scopePhraseMotion.forEach((phrase, index) => {
    intro.to(
      phrase.text,
      {
        duration: 0.72,
        ease: 'none',
        scrambleText: {
          text: phrase.originalText,
          chars: SCRAMBLE_CHARS,
          speed: 0.45,
          revealDelay: 0.1,
          tweenLength: false,
        },
      },
      1.1 + index * 0.055,
    );
  });

  intro
    .to(scope, { color: 'rgba(248, 246, 238, 0.62)', duration: 0.7 }, 1.18)
    .to('.home .next-arrow', { autoAlpha: 1, duration: 0.8 }, 1.25);

  gsap.to('.home__cover', {
    autoAlpha: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: home,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      id: 'home-cover',
    },
  });

  if (about) {
    const pic = about.querySelector('.about__pic');
    const body = about.querySelector('.about__body');
    if (pic && body) {
      gsap.set([pic, body], { autoAlpha: 0 });
      gsap.fromTo(
        pic,
        { xPercent: -70, autoAlpha: 0 },
        {
          xPercent: 0,
          autoAlpha: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: home,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            id: 'about-pic',
          },
        },
      );
      gsap.fromTo(
        body,
        { xPercent: 70, autoAlpha: 0 },
        {
          xPercent: 0,
          autoAlpha: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: home,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            id: 'about-body',
          },
        },
      );
    }
  }

  if (gallery) {
    document.querySelectorAll<HTMLElement>('.mosaic').forEach((card) => {
      const title = card.querySelector<HTMLElement>('.mosaic__title');
      if (title) {
        gsap.to(title, {
          y: -90,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      const activate = () => card.classList.add('is-active');
      const deactivate = () => card.classList.remove('is-active');
      card.addEventListener('pointerenter', activate);
      card.addEventListener('pointerleave', deactivate);
      card.addEventListener('focusin', activate);
      card.addEventListener('focusout', deactivate);
    });
  }

  if (contact) {
    const columns = gsap.utils.toArray<HTMLElement>('.contact__column');
    if (!columns.length) {
      ScrollTrigger.refresh();
      return;
    }

    gsap.set(columns, { y: 50, autoAlpha: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contact,
        start: 'top 82%',
        toggleActions: 'play reverse play reverse',
      },
    });

    if (columns.length) {
      tl.to(columns, {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: 'zwOut',
        stagger: 0.18,
      });
    }
  }

  ScrollTrigger.refresh();
}

export function setupSubpageMotion() {
  initGsap();

  if (prefersReducedMotion()) {
    markVisible('[data-reveal], .timeline-item');
    return;
  }

  document
    .querySelectorAll<HTMLElement>('.sub-hero, .panorama, .timeline-item')
    .forEach((el) => {
      const range = el.classList.contains('sub-hero')
        ? 140
        : el.classList.contains('panorama')
          ? 100
          : 80;
      gsap.fromTo(
        el,
        { '--parallax-y': `${range / 2}px` },
        {
          '--parallax-y': `${-range / 2}px`,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    });

  document.querySelectorAll<HTMLElement>('.timeline-item').forEach((item) => {
    const circles = Array.from(
      item.querySelectorAll<HTMLElement>('.timeline-item__circle'),
    );
    const bar = item.querySelector<HTMLElement>('.timeline-item__bar');
    const blocks = Array.from(
      item.querySelectorAll<HTMLElement>('.timeline-item__content > *'),
    );
    const fromLeft = item.classList.contains('timeline-item--left');

    gsap.set(circles, { autoAlpha: 0, scale: 0.86 });
    gsap.set(bar, {
      scaleY: 0,
      scaleX: 0,
      transformOrigin: 'top center',
    });
    gsap.set(blocks, {
      autoAlpha: 0,
      x: fromLeft ? -44 : 44,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'top 70%',
        toggleActions: 'play reverse play reverse',
      },
    });

    tl.to(circles[0], {
      autoAlpha: 1,
      scale: 1,
      duration: 0.5,
      ease: 'zwSmooth',
    })
      .fromTo(
        circles[0],
        { boxShadow: '0 0 0 0 rgba(0,0,0,0.75)' },
        {
          boxShadow: '0 0 0 18px rgba(0,0,0,0)',
          duration: 0.5,
          ease: 'circ.out',
        },
        '<',
      )
      .to(
        bar,
        {
          scaleY: 1,
          scaleX: 1,
          duration: 0.5,
          ease: 'zwSmooth',
        },
        '+=0.1',
      )
      .to(
        circles[1],
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.5,
          ease: 'zwSmooth',
        },
        '+=0.1',
      )
      .fromTo(
        circles[1],
        { boxShadow: '0 0 0 0 rgba(0,0,0,0.75)' },
        {
          boxShadow: '0 0 0 18px rgba(0,0,0,0)',
          duration: 0.5,
          ease: 'circ.out',
        },
        '<',
      )
      .to(
        blocks,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.8,
          ease: 'zwSmooth',
          stagger: 0.06,
        },
        0.3,
      );
  });

  ScrollTrigger.refresh();
}

export function setupListRevealMotion(selector = '[data-reveal]') {
  initGsap();
  if (prefersReducedMotion()) {
    markVisible(selector);
    return;
  }

  ScrollTrigger.batch(selector, {
    start: 'top 82%',
    interval: 0.08,
    batchMax: 6,
    onEnter: (batch) => {
      batch.forEach((el) => el.classList.add('is-visible'));
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'zwSmooth',
        stagger: 0.08,
      });
    },
    onLeaveBack: (batch) => {
      batch.forEach((el) => el.classList.remove('is-visible'));
      gsap.to(batch, {
        autoAlpha: 0.88,
        y: 16,
        duration: 0.4,
        ease: 'zwSmooth',
        stagger: 0.04,
      });
    },
  });
}

export function setupPublicationCounters() {
  initGsap();
  const counters = Array.from(
    document.querySelectorAll<HTMLElement>('[data-count]'),
  );
  if (!counters.length) return;

  counters.forEach((el) => {
    const target = Number(el.dataset.count ?? '0');
    if (prefersReducedMotion()) {
      el.textContent = String(target);
      return;
    }
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        const state = { value: 0 };
        gsap.to(state, {
          value: target,
          duration: 1.4,
          ease: 'power3.out',
          onUpdate: () => {
            el.textContent = String(Math.round(state.value));
          },
        });
      },
    });
  });
}
