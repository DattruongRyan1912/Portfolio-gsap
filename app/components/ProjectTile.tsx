import type { Locale, SiteCopy } from '../content';
import type { Project } from '../projects';
import { ProjectVideo } from './ProjectVideo';
import { TransitionLink } from './TransitionLink';

export function ProjectTile({
  project,
  locale,
  copy,
  id,
}: {
  project: Project;
  locale: Locale;
  copy: SiteCopy;
  id?: string;
}) {
  const text = project.copy[locale];
  const status = project.status === 'live' ? copy.common.live : copy.common.building;
  return (
    <TransitionLink
      href={`/projects/${project.slug}`}
      id={id}
      className={`tile tile-project area-${project.slug}`}
      style={{ ['--accent' as string]: project.color }}
      data-reveal
      data-tile={project.slug}
      aria-label={`${project.title}: ${text.summary}`}
    >
      <ProjectVideo
        src={project.media.video}
        poster={project.media.poster}
        label={`${project.title} — ${text.category}`}
        playLabel={copy.common.playVideo}
        className="tile-media"
        vt
      />
      <span className="tile-caption">
        <span className="tile-heading">
          <span className="dot" aria-hidden="true" />
          <span className="tile-title" data-vt="title">
            {project.title}
          </span>
        </span>
        <span className="tile-meta">
          {text.category} · <span className={`status status-${project.status}`}>{status}</span>
        </span>
        <span className="tile-arrow" aria-hidden="true">
          ↗
        </span>
      </span>
    </TransitionLink>
  );
}
