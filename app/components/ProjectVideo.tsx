'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  poster: string;
  label: string;
  playLabel: string;
  className?: string;
  /** Marks the element for the tile-to-page view transition. */
  vt?: boolean;
  /** Static view-transition name, used on the project page. */
  vtName?: string;
  /** Show a play button under reduced motion. Off inside links, where a button is not allowed. */
  playButton?: boolean;
};

/**
 * A muted, looping recording that only loads and plays while it is on screen.
 * With reduced motion it never autoplays and shows a play button instead.
 */
export function ProjectVideo({ src, poster, label, playLabel, className, vt, vtName, playButton }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [calm, setCalm] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setCalm(query.matches);
    sync();
    query.addEventListener('change', sync);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (query.matches) return;
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    return () => {
      observer.disconnect();
      query.removeEventListener('change', sync);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return (
    <div
      className={`video-frame ${className ?? ''}`}
      data-vt={vt ? 'media' : undefined}
      style={vtName ? { viewTransitionName: vtName } : undefined}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
      />
      {calm && playButton && (
        <button
          type="button"
          className="video-play"
          aria-label={playLabel}
          aria-pressed={playing}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            toggle();
          }}
        >
          <span aria-hidden="true">{playing ? '❚❚' : '▶'}</span>
        </button>
      )}
    </div>
  );
}
