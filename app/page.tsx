'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { Flip } from 'gsap/Flip';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Observer } from 'gsap/Observer';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { portfolioContent, type Locale, type Project } from './content';

gsap.registerPlugin(
  useGSAP,
  CustomEase,
  Flip,
  MotionPathPlugin,
  Observer,
  ScrollSmoother,
  ScrollToPlugin,
  ScrollTrigger,
  SplitText,
);

const githubUrl = 'https://github.com/DattruongRyan1912';

function syncDocumentLocale(locale: Locale) {
  document.documentElement.setAttribute('lang', locale);
}

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const projectTrack = useRef<HTMLDivElement>(null);
  const projectsSection = useRef<HTMLElement>(null);
  const activeProjectRef = useRef(0);

  const [locale, setLocale] = useState<Locale>('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState<Project['id'] | null>(null);
  const [activeProject, setActiveProject] = useState(0);
  const copy = portfolioContent[locale];
  const projects = copy.projects.items as readonly Project[];

  useEffect(() => {
    const saved = window.localStorage.getItem('portfolio-locale');
    const initialLocale: Locale = saved === 'vi' ? 'vi' : 'en';
    syncDocumentLocale(initialLocale);

    if (initialLocale === 'en') return;

    const timeout = window.setTimeout(() => setLocale(initialLocale), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    activeProjectRef.current = activeProject;
  }, [activeProject]);

  const changeLocale = (nextLocale: Locale) => {
    setLocale(nextLocale);
    syncDocumentLocale(nextLocale);
    window.localStorage.setItem('portfolio-locale', nextLocale);
    setMenuOpen(false);
  };

  const scrollToTarget = useCallback((target: string) => {
    const destination = target === 'top' ? 0 : `#${target}`;
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(destination, true, target === 'top' ? undefined : 'top 92px');
    } else {
      gsap.to(window, {
        scrollTo: { y: destination, offsetY: target === 'top' ? 0 : 82 },
        duration: 0.9,
        ease: 'power3.inOut',
        overwrite: true,
      });
    }
    setMenuOpen(false);
  }, []);

  const animateProjectLayout = useCallback((nextProject: Project['id'] | null) => {
    const cards = root.current
      ? gsap.utils.toArray<HTMLElement>('.project-card', root.current)
      : [];
    const state = cards.length ? Flip.getState(cards) : null;

    flushSync(() => setExpandedProject(nextProject));

    if (state) {
      Flip.from(state, {
        duration: 0.72,
        ease: 'power3.inOut',
        scale: true,
        nested: true,
        prune: true,
        onComplete: () => ScrollTrigger.refresh(),
      });
    } else {
      ScrollTrigger.refresh();
    }
  }, []);

  const goToProject = useCallback((direction: number) => {
    const track = projectTrack.current;
    if (!track) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>('.project-card'));
    if (!cards.length) return;

    const nextIndex = (activeProjectRef.current + direction + cards.length) % cards.length;
    activeProjectRef.current = nextIndex;
    setActiveProject(nextIndex);

    const railTrigger = ScrollTrigger.getById('project-rail');
    if (railTrigger && window.innerWidth > 980) {
      const progress = cards.length === 1 ? 0 : nextIndex / (cards.length - 1);
      const scrollPosition = railTrigger.start + (railTrigger.end - railTrigger.start) * progress;
      const smoother = ScrollSmoother.get();
      if (smoother) smoother.scrollTo(scrollPosition, true);
      else {
        gsap.to(window, {
          scrollTo: scrollPosition,
          duration: 0.85,
          ease: 'power3.inOut',
          overwrite: true,
        });
      }
      return;
    }

    gsap.to(track, {
      scrollTo: { x: cards[nextIndex].offsetLeft - 18 },
      duration: 0.65,
      ease: 'power3.out',
      overwrite: true,
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        if (expandedProject) animateProjectLayout(null);
        return;
      }

      if (!projectsSection.current?.contains(document.activeElement)) return;
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToProject(1);
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToProject(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [animateProjectLayout, expandedProject, goToProject]);

  useGSAP(
    () => {
      CustomEase.create('signal', 'M0,0 C0.19,0.88 0.3,1 1,1');
      const media = gsap.matchMedia();
      const splits: SplitText[] = [];

      media.add(
        {
          desktop: '(min-width: 981px)',
          mobile: '(max-width: 980px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { desktop, mobile, reduceMotion } = context.conditions as {
            desktop: boolean;
            mobile: boolean;
            reduceMotion: boolean;
          };

          if (reduceMotion) {
            gsap.set('[data-animate], .split-heading, .hero-title-main, .hero-headline', {
              clearProps: 'all',
              autoAlpha: 1,
            });
            return;
          }

          let smoother: ScrollSmoother | undefined;
          if (desktop) {
            ScrollSmoother.get()?.kill();
            smoother = ScrollSmoother.create({
              wrapper: '#smooth-wrapper',
              content: '#smooth-content',
              smooth: 0.85,
              effects: true,
              smoothTouch: 0,
            });
          }

          const titleSplit = SplitText.create('.hero-title-main', {
            type: 'words,chars',
            aria: 'auto',
          });
          const headlineSplit = SplitText.create('.hero-headline', {
            type: 'words',
            aria: 'auto',
          });
          splits.push(titleSplit, headlineSplit);

          const introTimeline = gsap.timeline({
            defaults: { duration: 0.9, ease: 'signal' },
          });

          introTimeline
            .addLabel('boot')
            .from('.topbar', { y: -24, autoAlpha: 0 }, 'boot')
            .from('.hero-status', { y: 18, autoAlpha: 0 }, 'boot+=0.08')
            .from(
              titleSplit.chars,
              { yPercent: 115, autoAlpha: 0, stagger: 0.022, duration: 0.82 },
              'boot+=0.12',
            )
            .from(
              headlineSplit.words,
              { yPercent: 110, autoAlpha: 0, stagger: 0.055, duration: 0.78 },
              'boot+=0.32',
            )
            .from('.hero-intro, .hero-actions, .signal-row', {
              y: 28,
              autoAlpha: 0,
              stagger: 0.09,
            }, 'boot+=0.48')
            .from('.portrait-stage', {
              x: desktop ? 42 : 0,
              y: mobile ? 36 : 0,
              scale: 0.96,
              autoAlpha: 0,
              duration: 1.15,
            }, 'boot+=0.28')
            .from('.terminal-strip', { y: 24, autoAlpha: 0 }, 'boot+=0.7');

          gsap.to('.scroll-progress-bar', {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              start: 0,
              end: 'max',
              scrub: 0.18,
            },
          });

          gsap.to('.ambient-one', {
            rotation: 55,
            duration: 26,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
          gsap.to('.ambient-two', {
            rotation: -42,
            duration: 32,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });

          gsap.utils.toArray<HTMLElement>('.split-heading').forEach((heading) => {
            const split = SplitText.create(heading, { type: 'words', aria: 'auto' });
            splits.push(split);
            gsap.from(split.words, {
              yPercent: 115,
              autoAlpha: 0,
              stagger: 0.035,
              duration: 0.78,
              ease: 'signal',
              scrollTrigger: {
                trigger: heading,
                start: 'top 84%',
                once: true,
              },
            });
          });

          ScrollTrigger.batch('[data-animate="reveal"]', {
            start: 'top 88%',
            once: true,
            onEnter: (elements) => {
              gsap.from(elements, {
                y: 42,
                autoAlpha: 0,
                duration: 0.78,
                stagger: 0.08,
                ease: 'signal',
                overwrite: true,
              });
            },
          });

          ScrollTrigger.batch('.skill-chip', {
            start: 'top 90%',
            once: true,
            onEnter: (elements) => {
              gsap.from(elements, {
                scale: 0.88,
                autoAlpha: 0,
                stagger: 0.025,
                duration: 0.44,
                ease: 'back.out(1.7)',
              });
            },
          });

          const portraitStage = root.current?.querySelector<HTMLElement>('.portrait-stage');
          const portrait = root.current?.querySelector<HTMLElement>('.portrait-shell');
          let handlePointerMove: ((event: PointerEvent) => void) | undefined;
          let handlePointerLeave: (() => void) | undefined;

          if (desktop && portraitStage && portrait) {
            const moveX = gsap.quickTo(portrait, 'x', { duration: 0.55, ease: 'power3.out' });
            const moveY = gsap.quickTo(portrait, 'y', { duration: 0.55, ease: 'power3.out' });
            handlePointerMove = (event: PointerEvent) => {
              const bounds = portraitStage.getBoundingClientRect();
              moveX(((event.clientX - bounds.left) / bounds.width - 0.5) * 18);
              moveY(((event.clientY - bounds.top) / bounds.height - 0.5) * 18);
            };
            handlePointerLeave = () => {
              moveX(0);
              moveY(0);
            };
            portraitStage.addEventListener('pointermove', handlePointerMove);
            portraitStage.addEventListener('pointerleave', handlePointerLeave);
          }

          const processMap = root.current?.querySelector<HTMLElement>('.process-map');
          const packet = root.current?.querySelector<HTMLElement>('.process-packet');
          let packetTween: gsap.core.Tween | undefined;

          if (processMap && packet) {
            const extent = desktop
              ? Math.max(processMap.clientWidth - packet.offsetWidth - 54, 280)
              : Math.max(processMap.clientHeight - packet.offsetHeight - 74, 360);
            const path = desktop
              ? [
                  { x: 0, y: 0 },
                  { x: extent * 0.24, y: -20 },
                  { x: extent * 0.5, y: 22 },
                  { x: extent * 0.75, y: -16 },
                  { x: extent, y: 0 },
                ]
              : [
                  { x: 0, y: 0 },
                  { x: 20, y: extent * 0.25 },
                  { x: -10, y: extent * 0.5 },
                  { x: 18, y: extent * 0.75 },
                  { x: 0, y: extent },
                ];

            packetTween = gsap.to(packet, {
              motionPath: { path, curviness: 1.35 },
              duration: 5.8,
              ease: 'none',
              repeat: -1,
              paused: true,
            });

            ScrollTrigger.create({
              trigger: processMap,
              start: 'top 82%',
              end: 'bottom 18%',
              onEnter: () => packetTween?.play(),
              onEnterBack: () => packetTween?.play(),
              onLeave: () => packetTween?.pause(),
              onLeaveBack: () => packetTween?.pause(),
            });
          }

          let observer: Observer | undefined;
          const track = projectTrack.current;
          const stage = root.current?.querySelector<HTMLElement>('.project-stage');

          if (desktop && track && stage) {
            const cards = Array.from(track.querySelectorAll<HTMLElement>('.project-card'));
            const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + 120);

            gsap.to(track, {
              x: () => -getDistance(),
              ease: 'none',
              scrollTrigger: {
                id: 'project-rail',
                trigger: stage,
                start: 'top top',
                end: () => `+=${getDistance() + window.innerWidth * 0.45}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  const nextIndex = Math.min(
                    cards.length - 1,
                    Math.round(self.progress * (cards.length - 1)),
                  );
                  if (nextIndex !== activeProjectRef.current) {
                    activeProjectRef.current = nextIndex;
                    setActiveProject(nextIndex);
                  }
                },
              },
            });
          }

          if (mobile && track) {
            observer = Observer.create({
              target: track,
              type: 'touch,pointer',
              lockAxis: true,
              tolerance: 42,
              preventDefault: false,
              onLeft: () => goToProject(1),
              onRight: () => goToProject(-1),
            });
          }

          return () => {
            if (portraitStage && handlePointerMove) {
              portraitStage.removeEventListener('pointermove', handlePointerMove);
            }
            if (portraitStage && handlePointerLeave) {
              portraitStage.removeEventListener('pointerleave', handlePointerLeave);
            }
            observer?.kill();
            packetTween?.kill();
            smoother?.kill();
          };
        },
      );

      document.fonts.ready.then(() => ScrollTrigger.refresh());

      return () => {
        media.revert();
        splits.forEach((split) => split.revert());
        ScrollSmoother.get()?.kill();
      };
    },
    { scope: root, dependencies: [locale], revertOnUpdate: true },
  );

  return (
    <div ref={root} className="portfolio-root">
      <a className="skip-link" href="#main-content">
        {copy.common.skip}
      </a>

      <div className="scroll-progress" aria-hidden="true">
        <span className="scroll-progress-bar" />
      </div>

      <header className="topbar">
        <button className="brand" type="button" onClick={() => scrollToTarget('top')}>
          <span className="brand-mark">DT</span>
          <span>DAT TRUONG</span>
        </button>

        <nav className="main-nav" aria-label="Primary navigation">
          {copy.nav.map((item) => (
            <button key={item.target} type="button" onClick={() => scrollToTarget(item.target)}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <div className="locale-switch" aria-label="Language selection">
            {(['en', 'vi'] as const).map((item) => (
              <button
                key={item}
                type="button"
                className={locale === item ? 'is-active' : ''}
                aria-pressed={locale === item}
                onClick={() => changeLocale(item)}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? copy.common.close : copy.common.menu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
          </button>
        </div>

        <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
          {copy.nav.map((item, index) => (
            <button key={item.target} type="button" onClick={() => scrollToTarget(item.target)}>
              <span>0{index + 1}</span>
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main id="main-content">
            <section id="top" className="hero-section section-pad">
              <div className="ambient ambient-one" aria-hidden="true" />
              <div className="ambient ambient-two" aria-hidden="true" />

              <div className="hero-grid">
                <div className="hero-copy">
                  <div className="hero-status">
                    <span className="status-dot" aria-hidden="true" />
                    {copy.hero.eyebrow}
                  </div>

                  <h1 className="hero-title" key={`hero-${locale}`}>
                    <span className="hero-title-main">{copy.hero.title}</span>
                    <strong className="hero-headline">{copy.hero.headline}</strong>
                  </h1>

                  <p className="hero-intro">{copy.hero.intro}</p>

                  <div className="hero-actions">
                    <button
                      className="button button-primary"
                      type="button"
                      onClick={() => scrollToTarget('projects')}
                    >
                      {copy.hero.primary}
                      <span aria-hidden="true">↘</span>
                    </button>
                    <a
                      className="button button-secondary"
                      href={githubUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {copy.hero.secondary}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>

                  <div className="signal-row">
                    <span>{copy.hero.availability}</span>
                    <span aria-hidden="true">{'//'}</span>
                    <span>{copy.hero.timezone}</span>
                  </div>
                </div>

                <div className="portrait-stage" data-speed="0.94">
                  <div className="portrait-orbit" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="portrait-shell">
                    <div className="portrait-frame">
                      <Image
                        src="/ryan-avatar.jpg"
                        alt="Dat Truong (Ryan)"
                        width={460}
                        height={460}
                        priority
                        sizes="(max-width: 980px) 82vw, 430px"
                      />
                      <div className="portrait-scan" aria-hidden="true" />
                      <span className="frame-corner frame-corner-a" aria-hidden="true" />
                      <span className="frame-corner frame-corner-b" aria-hidden="true" />
                      <span className="frame-label frame-label-top">BACKEND / 02Y</span>
                      <span className="frame-label frame-label-bottom">RYAN_1912.JPG</span>
                    </div>
                    <div className="focus-card">
                      <span>{copy.hero.focusLabel}</span>
                      <strong>{copy.hero.focusValue}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="terminal-strip" aria-label="Portfolio status">
                <span className="terminal-prompt">ryan@portfolio:~$</span>
                <span>{copy.hero.terminal}</span>
                <span className="terminal-caret" aria-hidden="true" />
                <span className="scroll-cue">{copy.hero.scroll} ↓</span>
              </div>
            </section>

            <section id="about" className="content-section section-pad about-section">
              <div className="section-intro">
                <span className="section-eyebrow" data-animate="reveal">{copy.about.eyebrow}</span>
                <h2 className="split-heading" key={`about-${locale}`}>{copy.about.title}</h2>
              </div>

              <div className="about-layout">
                <div className="about-copy" data-animate="reveal">
                  <p className="lead-copy">{copy.about.lead}</p>
                  <p>{copy.about.body}</p>
                  <blockquote>{copy.about.quote}</blockquote>
                </div>

                <div className="principles-grid">
                  {copy.about.principles.map((principle) => (
                    <article key={principle.index} className="principle-card" data-animate="reveal">
                      <span>{principle.index}</span>
                      <h3>{principle.title}</h3>
                      <p>{principle.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section id="expertise" className="content-section section-pad expertise-section">
              <div className="section-intro section-intro-wide">
                <span className="section-eyebrow" data-animate="reveal">{copy.expertise.eyebrow}</span>
                <h2 className="split-heading" key={`expertise-${locale}`}>{copy.expertise.title}</h2>
                <p data-animate="reveal">{copy.expertise.lead}</p>
              </div>

              <div className="expertise-grid">
                {copy.expertise.groups.map((group) => (
                  <article key={group.index} className="expertise-card" data-animate="reveal">
                    <div className="expertise-card-head">
                      <span>{group.index}</span>
                      <div>
                        <h3>{group.title}</h3>
                        <p>{group.description}</p>
                      </div>
                    </div>
                    <div className="skill-list">
                      {group.skills.map((skill) => (
                        <span key={skill} className="skill-chip">{skill}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="process" className="content-section section-pad process-section">
              <div className="section-intro section-intro-wide">
                <span className="section-eyebrow" data-animate="reveal">{copy.process.eyebrow}</span>
                <h2 className="split-heading" key={`process-${locale}`}>{copy.process.title}</h2>
                <p data-animate="reveal">{copy.process.lead}</p>
              </div>

              <div className="process-map" data-animate="reveal">
                <div className="process-rail" aria-hidden="true" />
                <div className="process-packet" aria-hidden="true">
                  <span>{copy.process.packet}</span>
                </div>
                <div className="process-steps">
                  {copy.process.steps.map((step) => (
                    <article key={step.index} className="process-step">
                      <span className="process-node" aria-hidden="true" />
                      <small>{step.index}</small>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section id="projects" ref={projectsSection} className="projects-section">
              <div className="project-stage section-pad">
                <div className="project-stage-head">
                  <div>
                    <span className="section-eyebrow" data-animate="reveal">{copy.projects.eyebrow}</span>
                    <h2 className="split-heading" key={`projects-${locale}`}>{copy.projects.title}</h2>
                  </div>
                  <div className="project-stage-meta" data-animate="reveal">
                    <p>{copy.projects.lead}</p>
                    <span>{copy.projects.hint}</span>
                  </div>
                </div>

                <div ref={projectTrack} className="project-track" role="list">
                  {projects.map((project, index) => {
                    const isExpanded = expandedProject === project.id;
                    return (
                      <article
                        key={project.id}
                        className={`project-card ${isExpanded ? 'is-expanded' : ''}`}
                        role="listitem"
                        data-project-index={index}
                      >
                        <button
                          className="project-card-main"
                          type="button"
                          aria-expanded={isExpanded}
                          aria-label={isExpanded ? copy.common.collapseProject : copy.common.viewProject}
                          onClick={() => animateProjectLayout(isExpanded ? null : project.id)}
                        >
                          <div className="project-card-topline">
                            <span>{project.index}</span>
                            <span>{project.category}</span>
                            <span>{project.year}</span>
                          </div>
                          <h3>{project.title}</h3>
                          <p>{project.summary}</p>
                          <div className="project-stack-preview">
                            {project.stack.slice(0, 4).map((item) => <span key={item}>{item}</span>)}
                          </div>
                          <span className="project-open-indicator" aria-hidden="true">
                            {isExpanded ? '×' : '+'}
                          </span>
                        </button>

                        {isExpanded && (
                          <div className="project-detail">
                            <p>{project.detail}</p>
                            <ul>
                              {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                            </ul>
                            <div className="project-links">
                              <a href={project.repoUrl} target="_blank" rel="noreferrer">
                                {copy.common.source} ↗
                              </a>
                              {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                                  {copy.common.live} ↗
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </article>
                    );
                  })}
                  <div className="project-track-end" aria-hidden="true">
                    <span>END / 04</span>
                  </div>
                </div>

                <div className="project-controls">
                  <button type="button" onClick={() => goToProject(-1)} aria-label={copy.common.previous}>←</button>
                  <span>{String(activeProject + 1).padStart(2, '0')} / 04</span>
                  <button type="button" onClick={() => goToProject(1)} aria-label={copy.common.next}>→</button>
                </div>
              </div>
            </section>

            <section id="contact" className="contact-section section-pad">
              <div className="contact-orbit" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <span className="section-eyebrow" data-animate="reveal">{copy.contact.eyebrow}</span>
              <h2 className="split-heading" key={`contact-${locale}`}>{copy.contact.title}</h2>
              <p data-animate="reveal">{copy.contact.body}</p>
              <a className="contact-link" href={githubUrl} target="_blank" rel="noreferrer" data-animate="reveal">
                <span>{copy.contact.cta}</span>
                <span aria-hidden="true">↗</span>
              </a>
              <small data-animate="reveal">{copy.contact.note}</small>
            </section>

            <footer className="site-footer section-pad">
              <span>{copy.contact.footer}</span>
              <button type="button" onClick={() => scrollToTarget('top')}>TOP ↑</button>
              <span>© {new Date().getFullYear()}</span>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
