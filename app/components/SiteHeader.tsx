import type { Locale, SiteCopy } from '../content';
import { LocaleSwitch } from './LocaleSwitch';
import { TransitionLink } from './TransitionLink';

export function SiteHeader({ copy, locale }: { copy: SiteCopy; locale: Locale }) {
  return (
    <header className="site-header" data-header>
      <TransitionLink className="brand" href="/" aria-label="Dat Truong — home">
        <span className="brand-mark" aria-hidden="true">
          DT
        </span>
        <span className="brand-name">Dat Truong</span>
      </TransitionLink>
      <nav className="site-nav" aria-label="Primary">
        <TransitionLink href="/#projects">{copy.nav.projects}</TransitionLink>
        <TransitionLink href="/#stack">{copy.nav.stack}</TransitionLink>
        <TransitionLink href="/#infrastructure">{copy.nav.infra}</TransitionLink>
        <TransitionLink href="/#contact">{copy.nav.contact}</TransitionLink>
      </nav>
      <LocaleSwitch locale={locale} label={copy.nav.language} />
    </header>
  );
}
