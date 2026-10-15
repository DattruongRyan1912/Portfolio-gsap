import { HomeMotion } from './components/HomeMotion';
import { ProjectTile } from './components/ProjectTile';
import { githubUrl, siteCopy } from './content';
import { getLocale } from './locale';
import { projects } from './projects';

export default async function Home() {
  const locale = await getLocale();
  const copy = siteCopy[locale];
  const { intro, stack, infra, about, process, contact } = copy;

  return (
    <main id="main" data-route="/" className="home">
      <HomeMotion key={locale}>
        <div className="bento">
          <section className="tile tile-intro area-intro" data-reveal data-tile="intro" aria-labelledby="intro-name">
            <p className="intro-status">
              <span className="pulse" aria-hidden="true" />
              {intro.availability} · {intro.timezone}
            </p>
            <div className="intro-copy">
              <h1 id="intro-name" className="intro-name" data-split="chars">
                {intro.name}
              </h1>
              <p className="intro-headline" data-split="words">
                {intro.headline}
              </p>
              <p className="intro-lead">{intro.lead}</p>
            </div>
            <div className="intro-actions">
              <a className="button button-solid" href="#projects">
                {intro.primary} <span aria-hidden="true">↓</span>
              </a>
              <a className="button button-ghost" href={githubUrl} target="_blank" rel="noreferrer">
                {intro.secondary} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </section>

          {projects.map((project, index) => (
            <ProjectTile
              key={project.slug}
              project={project}
              locale={locale}
              copy={copy}
              id={index === 0 ? 'projects' : undefined}
            />
          ))}

          <section id="stack" className="tile tile-stack area-stack" data-reveal data-tile="stack" aria-labelledby="stack-title">
            <h2 id="stack-title" className="tile-label">
              {stack.title}
            </h2>
            <div className="stack-groups">
              {stack.groups.map((group) => (
                <div key={group.title} className="stack-group">
                  <h3>{group.title}</h3>
                  <ul>
                    {group.skills.map((skill) => (
                      <li key={skill} data-chip>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section
            id="infrastructure"
            className="tile tile-infra area-infra"
            data-reveal
            data-tile="infra"
            aria-labelledby="infra-title"
          >
            <h2 id="infra-title" className="tile-label">
              {infra.title}
            </h2>
            <p className="tile-lead">{infra.lead}</p>
            <div className="infra-path" data-infra-path>
              <span className="infra-track" aria-hidden="true">
                <span className="infra-dot" data-infra-dot />
              </span>
              <ol>
                {infra.path.map((node) => (
                  <li key={node.label}>
                    <strong>{node.label}</strong>
                    <span>{node.detail}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="infra-hosts">
              <h3 className="infra-hosts-title">{infra.hostsTitle}</h3>
              <ul>
                {infra.hosts.map((host) => (
                  <li key={host.domain}>
                    <span className="host-dot" aria-hidden="true" />
                    <span className="host-domain">{host.domain}</span>
                    <span className="host-runtime">{host.runtime}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ul className="infra-facts">
              {infra.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </section>

          <section className="tile tile-about area-about" data-reveal data-tile="about" aria-labelledby="about-title">
            <h2 id="about-title" className="tile-label">
              {about.title}
            </h2>
            <p className="about-body">{about.body}</p>
            <ol className="principles">
              {about.principles.map((principle) => (
                <li key={principle.index}>
                  <span className="principle-index">{principle.index}</span>
                  <strong>{principle.title}</strong>
                  <span>{principle.description}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="tile tile-process area-process" data-reveal data-tile="process" aria-labelledby="process-title">
            <h2 id="process-title" className="tile-label">
              {process.title}
            </h2>
            <ol className="process-steps">
              {process.steps.map((step, index) => (
                <li key={step.title} data-step title={step.description}>
                  <span className="step-index">{String(index + 1).padStart(2, '0')}</span>
                  <strong>{step.title}</strong>
                  <span className="step-description">{step.description}</span>
                </li>
              ))}
            </ol>
          </section>

          <section id="contact" className="tile tile-contact area-contact" data-reveal data-tile="contact" aria-labelledby="contact-title">
            <div>
              <h2 id="contact-title" className="contact-title">
                {contact.title}
              </h2>
              <p className="contact-body">{contact.body}</p>
            </div>
            <div className="contact-actions">
              <a className="button button-dark" href={githubUrl} target="_blank" rel="noreferrer">
                {contact.cta} <span aria-hidden="true">↗</span>
              </a>
              <small>{contact.note}</small>
            </div>
          </section>
        </div>
      </HomeMotion>
    </main>
  );
}
