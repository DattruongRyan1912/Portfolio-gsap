'use client';

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

type ViewTransition = { finished: Promise<void>; ready: Promise<void>; updateCallbackDone: Promise<void> };
type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => Promise<void> | void) => ViewTransition;
};

/**
 * Resolves once the page for `path` has rendered (its <main> carries data-route), or after a timeout.
 *
 * Must not wait on requestAnimationFrame: while a view transition waits for its DOM update the browser stops
 * painting, so frame callbacks stop too and the transition would only end when the browser gives up after 4s.
 */
function waitForRoute(path: string, timeoutMs = 2000): Promise<void> {
  return new Promise((resolve) => {
    const arrived = () => document.querySelector<HTMLElement>('main[data-route]')?.dataset.route === path;
    const observer = new MutationObserver(() => {
      if (arrived()) finish();
    });
    const timer = setTimeout(finish, timeoutMs);
    function finish() {
      clearTimeout(timer);
      observer.disconnect();
      resolve();
    }
    if (arrived()) {
      finish();
      return;
    }
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-route'] });
  });
}

/**
 * The one link used for in-app navigation. It is a plain <a>, so it works before hydration and when opened in a new
 * tab, and every ordinary click goes through the router here.
 *
 * It does not use next/link: in the production build of vinext 1.0.0-beta.3 the client navigation behind <Link>
 * throws ("e is not a function") and the click does nothing at all.
 *
 * When the browser supports the View Transitions API and motion is allowed, the clicked tile's media and title
 * morph into the next page; otherwise the page simply changes.
 */
export function TransitionLink({ href, children, ...rest }: Props) {
  const router = useRouter();

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
    if (modified || event.defaultPrevented) return;

    const target = new URL(href, window.location.origin);
    // A section of the page we are already on: the browser scrolls to it natively.
    if (target.pathname === window.location.pathname && target.hash) return;

    event.preventDefault();
    const doc = document as ViewTransitionDocument;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (calm || !doc.startViewTransition) {
      router.push(href);
      return;
    }

    // Names must be unique on the outgoing page; clear the ones a project page sets on its own title and media.
    document.querySelectorAll<HTMLElement>('[style*="view-transition-name"]').forEach((element) => {
      element.style.viewTransitionName = 'none';
    });
    const tile = event.currentTarget;
    const media = tile.querySelector<HTMLElement>('[data-vt="media"]');
    const title = tile.querySelector<HTMLElement>('[data-vt="title"]');
    if (media) media.style.viewTransitionName = 'project-media';
    if (title) title.style.viewTransitionName = 'project-title';

    const transition = doc.startViewTransition(async () => {
      router.push(href);
      await waitForRoute(target.pathname);
    });
    // A skipped or interrupted transition rejects these; the navigation itself has still happened.
    for (const promise of [transition.ready, transition.finished, transition.updateCallbackDone]) promise.catch(() => {});
  };

  return (
    <a href={href} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}
