'use client';

import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/** True once the header has slid in, so client-side returns to the home page do not replay it. */
let headerShown = false;

/**
 * Entrance, scroll, hover and ambient motion for the home grid. Content is server-rendered and visible
 * without this component; it only runs when the `motion` class is on <html> (no reduced motion).
 */
export function HomeMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      const html = document.documentElement;
      if (!root || !html.classList.contains('motion')) return;
      html.classList.add('motion-live');

      const ease = 'power3.out';
      const tiles = gsap.utils.toArray<HTMLElement>('[data-reveal]', root);
      gsap.set(tiles, { opacity: 0, y: 32, scale: 0.97 });

      // Intro: header, then the name by character and the headline by word.
      const intro = gsap.timeline({ defaults: { ease } });
      const header = document.querySelector('[data-header]');
      if (header && !headerShown) {
        intro.from(header, { y: -24, autoAlpha: 0, duration: 0.6 }, 0);
        headerShown = true;
      }
      const name = root.querySelector<HTMLElement>('[data-split="chars"]');
      const headline = root.querySelector<HTMLElement>('[data-split="words"]');
      const splits: SplitText[] = [];
      if (name) {
        const split = SplitText.create(name, { type: 'chars', aria: 'auto' });
        splits.push(split);
        intro.from(split.chars, { yPercent: 110, autoAlpha: 0, stagger: 0.03, duration: 0.7 }, 0.15);
      }
      if (headline) {
        const split = SplitText.create(headline, { type: 'words', aria: 'auto' });
        splits.push(split);
        intro.from(split.words, { y: 18, autoAlpha: 0, stagger: 0.04, duration: 0.6 }, 0.35);
      }
      // Restore the text nodes React owns, so a later re-render (language switch) finds the DOM it expects.
      intro.eventCallback('onComplete', () => splits.forEach((split) => split.revert()));

      // Tiles rise in reading order as they reach the viewport (immediately for those already on screen).
      ScrollTrigger.batch(tiles, {
        start: 'top 92%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease, stagger: 0.07, overwrite: true }),
      });

      ScrollTrigger.batch(gsap.utils.toArray<HTMLElement>('[data-chip]', root), {
        start: 'top 95%',
        once: true,
        onEnter: (batch) =>
          gsap.from(batch, { scale: 0.85, autoAlpha: 0, duration: 0.4, ease: 'back.out(1.8)', stagger: 0.025 }),
      });

      // Infrastructure: a dot travels Cloudflare → Nginx → services while the tile is visible.
      const track = root.querySelector<HTMLElement>('[data-infra-path] .infra-track');
      const dot = root.querySelector<HTMLElement>('[data-infra-dot]');
      if (track && dot) {
        const travel = gsap.fromTo(
          dot,
          { x: 0, autoAlpha: 0 },
          {
            keyframes: [
              { autoAlpha: 1, duration: 0.2 },
              { x: () => track.clientWidth - dot.offsetWidth, duration: 2.2, ease: 'power1.inOut' },
              { autoAlpha: 0, duration: 0.25 },
            ],
            repeat: -1,
            repeatDelay: 0.5,
            paused: true,
          },
        );
        ScrollTrigger.create({
          trigger: track,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => (self.isActive ? travel.play() : travel.pause()),
        });
      }

      // Process: the five steps light up in turn.
      const steps = gsap.utils.toArray<HTMLElement>('[data-step]', root);
      if (steps.length) {
        const cycle = gsap.timeline({ repeat: -1, paused: true });
        steps.forEach((step) => {
          cycle.call(() => steps.forEach((other) => other.classList.toggle('is-active', other === step)));
          cycle.to({}, { duration: 1.1 });
        });
        ScrollTrigger.create({
          trigger: steps[0].parentElement,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => (self.isActive ? cycle.play() : cycle.pause()),
        });
      }

      // Hover spotlight that follows the cursor, on devices with a fine pointer.
      const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const onMove = (event: PointerEvent) => {
        const tile = (event.target as HTMLElement).closest<HTMLElement>('[data-tile]');
        if (!tile) return;
        const bounds = tile.getBoundingClientRect();
        tile.style.setProperty('--mx', `${event.clientX - bounds.left}px`);
        tile.style.setProperty('--my', `${event.clientY - bounds.top}px`);
      };
      if (fine) root.addEventListener('pointermove', onMove);

      return () => {
        root.removeEventListener('pointermove', onMove);
        splits.forEach((split) => split.revert());
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="home-motion">
      {children}
    </div>
  );
}
