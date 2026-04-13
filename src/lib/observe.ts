/**
 * Adds `.is-visible` to elements the first time they cross the viewport,
 * then stops observing. Respects `prefers-reduced-motion` by marking
 * everything visible immediately (no entrance animation, but no missing
 * content either — the CSS transition-gated states still settle correctly).
 */
export function revealOnScroll(
  selector: string,
  {
    threshold = 0.15,
    rootMargin = '0px 0px -10% 0px',
  }: { threshold?: number; rootMargin?: string } = {},
) {
  const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (!els.length) return;

  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;
  if (prefersReduced || typeof IntersectionObserver === 'undefined') {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold, rootMargin },
  );

  els.forEach((el) => observer.observe(el));
}
