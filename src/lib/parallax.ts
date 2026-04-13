/**
 * Writes a `--parallax-progress` CSS variable on each element (0 to 1) and
 * a `--parallax-y` variable in pixels, based on the element's own viewport
 * traversal. Reliable fallback when CSS `animation-timeline: view()` doesn't
 * cooperate (absolute-positioned elements, inset hacks, etc.).
 *
 * rAF-throttled, passive listener, respects `prefers-reduced-motion`.
 * Progress is 0 when the element's top enters the bottom of the viewport,
 * 1 when the element's bottom has exited the top.
 */
export function parallax(
  selector: string,
  { range = 120 }: { range?: number } = {},
) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (!els.length) return;

  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    for (const el of els) {
      const rect = el.getBoundingClientRect();
      const total = vh + rect.height;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / total));
      const y = range / 2 - range * progress; // +range/2 → -range/2
      el.style.setProperty('--parallax-progress', progress.toFixed(3));
      el.style.setProperty('--parallax-y', `${y.toFixed(1)}px`);
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
