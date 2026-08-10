import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

/*
  Shared GSAP scroll animation helpers.

  Every hook returns a ref you attach to the section root. Animations are
  scoped with gsap.context() so they are reverted cleanly on unmount, which
  matters in React strict mode where effects run twice.

  Users who prefer reduced motion get the final state with no movement.

  Design language: clip-path wipes and mask reveals rather than fly-in/fade
  stagger. Each helper below is a distinct signature move — headings wipe
  open from behind a bar, panels reveal via clip-path, numbers roll like an
  odometer — so sections read as different moments, not one recycled effect.
*/

let registered = false;
export function registerGsap() {
  if (!registered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/*
  Heading wipe: the heading is wrapped in a clipping mask with a solid bar
  laid over it. On trigger the bar sweeps off (left -> right) uncovering the
  text, while the text itself drifts in slightly underneath. This replaces
  the old per-character fly-up used on every section.
*/
export function wipeHeading(root) {
  if (!root) return null;
  const heading = root.querySelector ? root.querySelector('h2, .wipe-heading') : root;
  return wipeHeadingEl(heading);
}

/* Same as wipeHeading but takes the element directly — use this when a
   section has more than one heading to wipe independently. */
export function wipeHeadingEl(heading) {
  if (!heading || heading.dataset.wiped === 'done') return null;
  heading.dataset.wiped = 'done';

  heading.classList.add('g-wipe-mask');
  const bar = document.createElement('span');
  bar.className = 'g-wipe-bar';
  heading.appendChild(bar);

  return { heading, bar };
}

export function animateWipeHeading(wipe, { start = 'top 82%', delay = 0 } = {}) {
  if (!wipe) return;
  const { heading, bar } = wipe;

  gsap.timeline({ scrollTrigger: { trigger: heading, start }, delay })
    .set(heading, { autoAlpha: 1 })
    .to(bar, {
      xPercent: 100,
      duration: 0.85,
      ease: 'power4.inOut',
    }, 0)
    .fromTo(heading, {
      yPercent: 18,
    }, {
      yPercent: 0,
      duration: 0.9,
      ease: 'power3.out',
    }, 0);
}

/*
  Underline: a thin rule that draws from the center outward (scaleX from a
  center transform-origin) rather than the old left-to-right wipe, so it
  reads differently from the heading bar above it.
*/
export function animateUnderline(border, { start = 'top 90%', delay = 0.1 } = {}) {
  if (!border) return;
  gsap.from(border, {
    scrollTrigger: { trigger: border, start },
    scaleX: 0,
    transformOrigin: 'center center',
    duration: 0.8,
    ease: 'power3.out',
    delay,
  });
}

/*
  Combined helper most sections use: wipes the h2, draws the underline.
  Call once per section root; safe to call even if there is no <h2>.
*/
export function useSectionIntro(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    registerGsap();
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        const h = root.querySelector('h2, .wipe-heading');
        if (h) gsap.set(h, { autoAlpha: 1 });
        return;
      }

      const wipe = wipeHeading(root);
      animateWipeHeading(wipe, options);

      const border = root.querySelector('.space-border');
      animateUnderline(border);
    }, root);

    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return ref;
}

/*
  Panel reveal: an element clip-path opens from a chosen edge (default:
  inset from the bottom, like a blind lifting). Used for cards / panels
  instead of the old 3D tilt-scale.
*/
export function revealPanel(el, { edge = 'bottom', start = 'top 85%', delay = 0, once = true } = {}) {
  if (!el) return;

  const clipFrom = {
    bottom: 'inset(0% 0% 100% 0%)',
    top: 'inset(100% 0% 0% 0%)',
    left: 'inset(0% 100% 0% 0%)',
    right: 'inset(0% 0% 0% 100%)',
  }[edge];

  gsap.fromTo(el,
    { clipPath: clipFrom, opacity: 1 },
    {
      scrollTrigger: { trigger: el, start, once },
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 0.9,
      ease: 'power3.inOut',
      delay,
      clearProps: 'clip-path',
    }
  );
}

/*
  Batch panel reveal across a NodeList/selector, staggered by index. Each
  panel clips open from the bottom, a calmer, more editorial motion than a
  fly-in-and-scale.
*/
export function revealPanels(items, { edge = 'bottom', start = 'top 85%', stagger = 0.12 } = {}) {
  const list = Array.isArray(items) ? items : gsap.utils.toArray(items);
  if (!list.length) return;

  if (prefersReducedMotion()) {
    gsap.set(list, { clearProps: 'all', opacity: 1 });
    return;
  }

  const clipFrom = {
    bottom: 'inset(0% 0% 100% 0%)',
    top: 'inset(100% 0% 0% 0%)',
    left: 'inset(0% 100% 0% 0%)',
    right: 'inset(0% 0% 0% 100%)',
  }[edge];

  gsap.set(list, { clipPath: clipFrom });

  ScrollTrigger.batch(list, {
    start,
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.85,
        ease: 'power3.inOut',
        stagger,
        overwrite: true,
        clearProps: 'clip-path',
      }),
  });
}

/*
  Odometer-style number roll: digits count up using a snappy expo ease
  rather than the old scale-pop-then-count combo, paired with a soft
  upward blur-in on the container.
*/
export function rollNumbers({ trigger, duration = 1.8, onUpdate, onComplete, start = 'top 82%' } = {}) {
  if (!trigger) return;
  const proxy = { p: 0 };
  ScrollTrigger.create({
    trigger,
    start,
    once: true,
    onEnter: () => {
      gsap.to(proxy, {
        p: 1,
        duration,
        ease: 'expo.out',
        onUpdate: () => onUpdate?.(proxy.p),
        onComplete: () => onComplete?.(),
      });
    },
  });
}

/* Splits text into per-word spans only (no per-character split anymore). */
export function splitWords(el) {
  if (!el || el.dataset.split === 'done') return [];
  const text = el.textContent;
  el.textContent = '';
  el.classList.add('g-split');

  const words = [];
  text.split(/(\s+)/).forEach((token) => {
    if (!token) return;
    if (/^\s+$/.test(token)) {
      el.appendChild(document.createTextNode(' '));
      return;
    }
    const span = document.createElement('span');
    span.className = 'g-word';
    span.textContent = token;
    el.appendChild(span);
    words.push(span);
  });

  el.dataset.split = 'done';
  return words;
}

/* Refresh ScrollTrigger once images/fonts settle so triggers use final layout. */
export function useScrollRefresh() {
  useEffect(() => {
    registerGsap();
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 400);
    window.addEventListener('load', refresh);
    return () => {
      clearTimeout(t);
      window.removeEventListener('load', refresh);
    };
  }, []);
}

/*
  Safety net: an element whose trigger never fires (too close to the document
  bottom, layout shifted after load, tab restored mid-scroll) would stay stuck
  hidden. This reveals anything still hidden/clipped once it is actually on
  screen, so content is never lost to a missed animation.

  IMPORTANT: this must only ever act on elements GSAP itself left mid-animation,
  never on an element's normal resting style. Checking computed clip-path
  cannot tell those apart — e.g. the portfolio cards have a permanent diagonal
  clip-path (their signature look, not an animation artifact), which never
  equals the fully-open 'inset(0% 0% 0% 0%)' comparison this used to make.
  That made every card look permanently "stuck", so this ran on a 1s interval
  forever and replayed a visible clip/opacity animation on every card, every
  second, indefinitely — the "keeps repeating no matter how long I wait" bug.

  The fix: only look at the element's *inline* style attribute (which is only
  ever non-empty here because GSAP's `fromTo()` start state or an in-progress
  tween put it there) rather than the browser's fully resolved computed style,
  which also reflects permanent CSS the component intentionally set.
*/
export function useRevealFallback(selector = '[style*="opacity"], [style*="clip-path"]') {
  useEffect(() => {
    registerGsap();

    const sweep = () => {
      document.querySelectorAll(selector).forEach((el) => {
        // skip elements still being animated by an active tween
        if (gsap.isTweening(el)) return;

        const inline = el.style;
        const inlineOpacity = inline.opacity === '' ? null : parseFloat(inline.opacity);
        const inlineClip = inline.clipPath || '';
        const stuckHidden = inlineOpacity !== null && inlineOpacity < 0.9;
        const stuckClipped = inlineClip !== '' && inlineClip !== 'inset(0% 0% 0% 0%)';
        if (!stuckHidden && !stuckClipped) return;

        const r = el.getBoundingClientRect();
        const onScreen = r.top < window.innerHeight && r.bottom > 0;
        if (onScreen) {
          gsap.to(el, {
            opacity: 1, y: 0, x: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.5, overwrite: 'auto', clearProps: 'opacity,transform,clip-path',
          });
        }
      });
    };

    const id = setInterval(sweep, 1000);
    window.addEventListener('scroll', sweep, { passive: true });
    return () => {
      clearInterval(id);
      window.removeEventListener('scroll', sweep);
    };
  }, [selector]);
}

export { gsap, ScrollTrigger };
