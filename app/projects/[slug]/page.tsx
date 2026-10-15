import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArchDiagram } from '../../components/ArchDiagram';
import { ProjectMotion } from '../../components/ProjectMotion';
import { ProjectToc } from '../../components/ProjectToc';
import { ProjectVideo } from '../../components/ProjectVideo';
import { TransitionLink } from '../../components/TransitionLink';
import { siteCopy } from '../../content';
import { getLocale } from '../../locale';
import { getNeighbours, getProject, projects } from '../../projects';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const locale = await getLocale();
  const text = project.copy[locale];
  return {
    title: project.title,
    description: text.summary,
    openGraph: {
      type: 'article',
      title: `${project.title} · Dat Truong`,
      description: text.summary,
      images: [{ url: project.media.poster, width: 1120, height: 700, alt: project.title }],
    },
    twitter: { card: 'summary_large_image', images: [project.media.poster] },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const locale = await getLocale();
  const copy = siteCopy[locale];
  const text = project.copy[locale];
  const { previous, next } = getNeighbours(project.slug);
  const sections = copy.common.sections;
  const toc = [
    { id: 'problem', label: sections.problem },
    { id: 'architecture', label: sections.architecture },
    { id: 'decisions', label: sections.decisions },
    { id: 'results', label: sections.results },
    { id: 'next-up', label: sections.next },
  ];
  const status = project.status === 'live' ? copy.common.live : copy.common.building;

  return (
    <main id="main" data-route={`/projects/${project.slug}`} className="project" style={{ ['--accent' as string]: project.color }}>
      <ProjectMotion key={project.slug}>
        <Link className="back-link" href="/#projects" prefetch={false}>
          <span aria-hidden="true">←</span> {copy.common.allProjects}
        </Link>

        <header className="project-hero">
          <div className="project-intro">
            <p className="project-kicker">
              <span className="dot" aria-hidden="true" />
              {text.category} · {project.year} · <span className={`status status-${project.status}`}>{status}</span>
            </p>
            <h1 className="project-title" data-split="chars" style={{ viewTransitionName: 'project-title' }}>
              {project.title}
            </h1>
            <p className="project-summary">{text.summary}</p>
            <div className="project-links">
              {project.liveUrl && (
                <a className="button button-solid" href={project.liveUrl} target="_blank" rel="noreferrer">
                  {project.repoUrl ? copy.common.openSite : copy.common.landingPage} <span aria-hidden="true">↗</span>
                </a>
              )}
              {project.repoUrl ? (
                <a className="button button-ghost" href={project.repoUrl} target="_blank" rel="noreferrer">
                  {copy.common.source} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <span className="private-label">{copy.common.privateRepo}</span>
              )}
            </div>
          </div>
          <dl className="project-facts">
            <div>
              <dt>{copy.common.role}</dt>
              <dd>{text.role}</dd>
            </div>
            <div>
              <dt>{copy.common.timeline}</dt>
              <dd>{text.timeline}</dd>
            </div>
            <div className="fact-wide">
              <dt>{copy.common.stack}</dt>
              <dd>
                <ul className="chip-row">
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </header>

        <ProjectVideo
          src={project.media.video}
          poster={project.media.poster}
          label={`${project.title} — ${text.category}`}
          playLabel={copy.common.playVideo}
          className="project-media"
          vtName="project-media"
          playButton
        />

        <div className="project-body">
          <ProjectToc title={copy.common.onThisPage} items={toc} />
          <div className="project-sections">
            <section id="problem" className="project-section" data-reveal>
              <h2>{sections.problem}</h2>
              <p>{text.problem}</p>
            </section>
            <section id="architecture" className="project-section" data-reveal>
              <h2>{sections.architecture}</h2>
              <p>{text.architectureNote}</p>
              <ArchDiagram diagram={text.diagram} color={project.color} label={`${sections.architecture}: ${project.title}`} />
            </section>
            <section id="decisions" className="project-section" data-reveal>
              <h2>{sections.decisions}</h2>
              <div className="decision-grid">
                {text.decisions.map((decision) => (
                  <article key={decision.title} className="decision">
                    <h3>{decision.title}</h3>
                    <p>{decision.body}</p>
                  </article>
                ))}
              </div>
            </section>
            <section id="results" className="project-section" data-reveal>
              <h2>{sections.results}</h2>
              <ul className="check-list">
                {text.results.map((result) => (
                  <li key={result}>{result}</li>
                ))}
              </ul>
            </section>
            <section id="next-up" className="project-section" data-reveal>
              <h2>{sections.next}</h2>
              <ul className="todo-list">
                {text.next.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <nav className="project-pager" aria-label={copy.common.allProjects}>
          {[
            { project: previous, label: copy.common.previous, direction: 'previous' },
            { project: next, label: copy.common.next, direction: 'next' },
          ].map(({ project: other, label, direction }) => (
            <TransitionLink
              key={direction}
              href={`/projects/${other.slug}`}
              className={`pager-link pager-${direction}`}
              style={{ ['--accent' as string]: other.color }}
              aria-label={`${label}: ${other.title}`}
            >
              <span className="pager-label">
                {direction === 'previous' ? '← ' : ''}
                {label}
                {direction === 'next' ? ' →' : ''}
              </span>
              <span className="pager-title">
                <span className="dot" aria-hidden="true" />
                <span data-vt="title">{other.title}</span>
              </span>
            </TransitionLink>
          ))}
        </nav>
      </ProjectMotion>
    </main>
  );
}
