'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * A box that scrolls its content sideways and says so: while more of the diagram lies to the right, the right edge
 * fades out and a short hint sits underneath; both go away once the end is reached or when everything fits.
 */
export function DiagramScroller({ children, label, hint }: { children: ReactNode; label: string; hint: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [more, setMore] = useState(false);

  useEffect(() => {
    const element = box.current;
    if (!element) return;
    const update = () => setMore(element.scrollWidth - element.clientWidth - element.scrollLeft > 4);
    element.addEventListener('scroll', update, { passive: true });
    // Fires once on observe, and again whenever the box or the diagram inside it changes size.
    const observer = new ResizeObserver(update);
    observer.observe(element);
    if (element.firstElementChild) observer.observe(element.firstElementChild);
    return () => {
      element.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="diagram-frame" data-more={more}>
      {/* Focusable so the keyboard can scroll it; the global :focus-visible ring shows where it is. */}
      <div className="diagram-scroll" ref={box} tabIndex={0} role="region" aria-label={label}>
        {children}
      </div>
      <p className="diagram-hint" hidden={!more}>
        {hint} <span aria-hidden="true">→</span>
      </p>
    </div>
  );
}
