/**
 * Writes a `--mosaic-title-y` CSS variable on each mosaic card as the user
 * scrolls through the gallery, so the title container can translateY based
 * on scroll progress. Mirrors the 2015 jQuery scroll listener without any
 * framework cost. rAF-throttled, passive listener.
 *
 * Why not CSS Scroll-Driven Animations: the `.mosaic__title` is
 * position:absolute; inset:0 inside an overflow:hidden parent, and
 * Chromium's animation-timeline: view() reports running but the computed
 * transform never varies. This scroll-listener version works everywhere.
 */
export function mosaicFloat(
  selector = '.mosaic',
  { min = 40, max = -40 }: { min?: number; max?: number } = {},
) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cards = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (!cards.length) return;

  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      // progress: 0 when the card just enters the bottom of the viewport,
      // 1 when it has just exited from the top.
      const total = vh + rect.height;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / total));
      const y = min + (max - min) * progress;
      card.style.setProperty('--mosaic-title-y', `${y.toFixed(1)}px`);
    }
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}
