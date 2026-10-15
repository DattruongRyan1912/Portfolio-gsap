'use client';

import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/** Title, section and diagram motion on a project page. Runs only when motion is allowed. */
export function ProjectMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      const html = document.documentElement;
      if (!root || !html.classList.contains('motion')) return;
      html.classList.add('motion-live');
      const ease = 'power3.out';

      const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]', root);
      gsap.set(reveals, { opacity: 0, y: 28 });

      const splits: SplitText[] = [];
      const title = root.querySelector<HTMLElement>('[data-split="chars"]');
      if (title) {
        const split = SplitText.create(title, { type: 'chars', aria: 'auto' });
        splits.push(split);
        gsap.from(split.chars, {
          yPercent: 100,
          autoAlpha: 0,
          stagger: 0.025,
          duration: 0.6,
          ease,
          delay: 0.15,
          onComplete: () => split.revert(),
        });
      }

      ScrollTrigger.batch(reveals, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.75, ease, stagger: 0.08, overwrite: true }),
      });

      const edges = gsap.utils.toArray<SVGPathElement>('[data-edge]', root);
      const nodes = gsap.utils.toArray<SVGGElement>('[data-node]', root);
      if (edges.length) {
        gsap.set(edges, { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.set(nodes, { opacity: 0, y: 8 });
        gsap
          .timeline({ scrollTrigger: { trigger: edges[0].ownerSVGElement, start: 'top 85%', once: true } })
          .to(nodes, { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease })
          .to(edges, { strokeDashoffset: 0, duration: 0.6, stagger: 0.1, ease: 'power2.inOut' }, 0.2);
      }

      return () => splits.forEach((split) => split.revert());
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="project-motion">
      {children}
    </div>
  );
}
