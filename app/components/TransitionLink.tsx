'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { CSSProperties, MouseEvent, ReactNode } from 'react';

type Props = {
  href: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  id?: string;
  'aria-label'?: string;
  'data-reveal'?: boolean;
  'data-tile'?: string;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => Promise<void> | void) => { finished: Promise<void> };
};

/** Resolves once the page for `href` has rendered (its <main> carries data-route), or after a timeout. */
function waitForRoute(href: string, timeoutMs = 2000): Promise<void> {
  const started = performance.now();
  return new Promise((resolve) => {
    const check = () => {
      const main = document.querySelector<HTMLElement>('main[data-route]');
      if (main?.dataset.route === href || performance.now() - started > timeoutMs) resolve();
      else requestAnimationFrame(check);
    };
    requestAnimationFrame(check);
  });
}

/**
 * A link that morphs the clicked tile's media and title into the next page with the View Transitions API.
 * Falls back to a normal navigation when the API is missing, motion is reduced, or the click is modified.
 */
export function TransitionLink({ href, children, ...rest }: Props) {
  const router = useRouter();

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const doc = document as ViewTransitionDocument;
    const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (modified || calm || !doc.startViewTransition) return;

    event.preventDefault();
    // Names must be unique on the outgoing page; clear the ones a project page sets on its own title and media.
    document.querySelectorAll<HTMLElement>('[style*="view-transition-name"]').forEach((element) => {
      element.style.viewTransitionName = 'none';
    });
    const tile = event.currentTarget;
    const media = tile.querySelector<HTMLElement>('[data-vt="media"]');
    const title = tile.querySelector<HTMLElement>('[data-vt="title"]');
    if (media) media.style.viewTransitionName = 'project-media';
    if (title) title.style.viewTransitionName = 'project-title';

    doc.startViewTransition(async () => {
      router.push(href);
      await waitForRoute(href);
    });
  };

  return (
    <Link href={href} prefetch={false} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
